"""Offline tests for the Wikimedia Commons image downloader."""
import json
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from types import SimpleNamespace
from unittest import mock

import requests

from scripts import download_commons_assets as downloader


class FakeResponse:
    def __init__(self, status_code=200, *, headers=None, content=b"", json_data=None, url=""):
        self.status_code = status_code
        self.headers = headers or {}
        self.content = content
        self._json_data = json_data or {}
        self.url = url
        self.closed = False

    def raise_for_status(self):
        if self.status_code >= 400:
            raise requests.HTTPError(f"HTTP {self.status_code}")

    def json(self):
        return self._json_data

    def close(self):
        self.closed = True


class CommonsDownloaderTests(unittest.TestCase):
    def valid_record(self):
        return {
            "title": "File:coffee.jpg",
            "page_url": "https://commons.wikimedia.org/wiki/File:coffee.jpg",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/coffee.jpg",
            "artist": "Jane Example",
            "licence": "CC BY 4.0",
            "licence_url": "https://creativecommons.org/licenses/by/4.0/",
        }

    def jpeg_bytes(self):
        return b"\xff\xd8\xff" + (b"x" * (downloader.MIN_IMAGE_BYTES - 5)) + b"\xff\xd9"

    def test_retry_after_seconds_are_not_truncated(self):
        response = SimpleNamespace(headers={"Retry-After": "1200"})
        self.assertEqual(downloader.retry_delay(response, 1), 1200.0)

    def test_retry_after_http_date_is_respected(self):
        retry_at = datetime.now(timezone.utc) + timedelta(seconds=20)
        response = SimpleNamespace(
            headers={"Retry-After": retry_at.strftime("%a, %d %b %Y %H:%M:%S GMT")}
        )
        delay = downloader.retry_delay(response, 1)
        self.assertGreater(delay, 1.0)
        self.assertLessEqual(delay, 20.0)

    def test_retry_backoff_has_five_second_initial_floor(self):
        with mock.patch.object(downloader.random, "uniform", return_value=0.25):
            self.assertEqual(downloader.retry_delay(None, 1), 5.25)

    def test_get_retries_rate_limit_and_closes_responses(self):
        limited = FakeResponse(429, headers={"Retry-After": "1"})
        success = FakeResponse(200, content=b"ok")
        with (
            mock.patch.object(downloader.SESSION, "get", side_effect=[limited, success]) as get_mock,
            mock.patch.object(downloader.time, "sleep"),
        ):
            result = downloader.get("https://commons.wikimedia.org/w/api.php")
        self.assertIs(result, success)
        self.assertEqual(get_mock.call_count, 2)
        self.assertTrue(limited.closed)
        self.assertTrue(success.closed)

    def test_get_does_not_retry_permanent_client_errors(self):
        missing = FakeResponse(404)
        with (
            mock.patch.object(downloader.SESSION, "get", return_value=missing) as get_mock,
            mock.patch.object(downloader.time, "sleep"),
        ):
            with self.assertRaises(requests.HTTPError):
                downloader.get("https://commons.wikimedia.org/missing")
        self.assertEqual(get_mock.call_count, 1)
        self.assertTrue(missing.closed)

    def test_jpeg_validation_checks_size_and_both_signatures(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            path = Path(temp_dir) / "valid.jpg"
            path.write_bytes(self.jpeg_bytes())
            self.assertTrue(downloader.valid_jpeg(path))

            path.write_bytes(b"not-a-jpeg")
            self.assertFalse(downloader.valid_jpeg(path))

            path.write_bytes(b"\xff\xd8\xff" + b"x" * 100 + b"\xff\xd9")
            self.assertFalse(downloader.valid_jpeg(path))

            path.write_bytes(self.jpeg_bytes()[:-2] + b"xx")
            self.assertFalse(downloader.valid_jpeg(path))

    def test_source_record_rejects_untrusted_hosts_and_missing_cc_by_creator(self):
        record = self.valid_record()
        self.assertTrue(downloader.source_record_is_valid(record))

        untrusted = dict(record, image_url="https://example.com/coffee.jpg")
        self.assertFalse(downloader.source_record_is_valid(untrusted))

        anonymous = dict(record, artist="Creator not identified")
        self.assertFalse(downloader.source_record_is_valid(anonymous))

    def test_public_domain_record_does_not_require_creator_attribution(self):
        record = dict(
            self.valid_record(),
            artist="Creator not identified",
            licence="Public domain",
            licence_url="https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia",
        )
        self.assertTrue(downloader.source_record_is_valid(record))

    def test_find_skips_cc_by_records_without_creator_metadata(self):
        def info(artist):
            metadata = {
                "LicenseShortName": {"value": "CC BY 4.0"},
                "LicenseUrl": {"value": "https://creativecommons.org/licenses/by/4.0/"},
            }
            if artist is not None:
                metadata["Artist"] = {"value": artist}
            return {
                "mime": "image/jpeg",
                "descriptionurl": "https://commons.wikimedia.org/wiki/File:coffee.jpg",
                "url": "https://upload.wikimedia.org/wikipedia/commons/coffee.jpg",
                "extmetadata": metadata,
            }

        payload = {
            "query": {
                "pages": {
                    "1": {"index": 1, "title": "File:anonymous.jpg", "imageinfo": [info(None)]},
                    "2": {"index": 2, "title": "File:attributed.jpg", "imageinfo": [info("Jane Example")]},
                }
            }
        }
        with mock.patch.object(downloader, "get", return_value=FakeResponse(json_data=payload)):
            record = downloader.find("coffee")
        self.assertEqual(record["title"], "File:attributed.jpg")
        self.assertEqual(record["artist"], "Jane Example")

    def test_download_rejects_redirects_outside_commons_upload_host(self):
        record = self.valid_record()
        response = FakeResponse(content=self.jpeg_bytes(), url="https://example.com/coffee.jpg")
        with tempfile.TemporaryDirectory() as temp_dir:
            destination = Path(temp_dir) / "coffee.jpg"
            with mock.patch.object(downloader, "get", return_value=response):
                with self.assertRaisesRegex(ValueError, "redirected outside"):
                    downloader.download(record, destination)
            self.assertFalse(destination.exists())

    def test_check_verifies_images_lock_and_matching_attribution_offline(self):
        record = self.valid_record()
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            scripts_dir = root / "scripts"
            images_dir = root / "asserts" / "images"
            scripts_dir.mkdir()
            images_dir.mkdir(parents=True)
            manifest_path = scripts_dir / "commons-assets.json"
            lock_path = scripts_dir / "commons-assets.lock.json"
            credits_path = images_dir / "IMAGE-CREDITS.md"
            manifest_path.write_text(
                json.dumps({"coffee.jpg": {"query": "coffee beans"}}),
                encoding="utf-8",
            )
            lock_path.write_text(json.dumps({"coffee.jpg": record}), encoding="utf-8")
            (images_dir / "coffee.jpg").write_bytes(self.jpeg_bytes())

            with (
                mock.patch.object(downloader, "ROOT", root),
                mock.patch.object(downloader, "OUT", images_dir),
                mock.patch.object(downloader, "MANIFEST", manifest_path),
                mock.patch.object(downloader, "LOCK", lock_path),
                mock.patch.object(downloader, "CREDITS", credits_path),
            ):
                downloader.write_credits({"coffee.jpg": record})
                with mock.patch("sys.argv", ["download_commons_assets.py", "--check"]):
                    self.assertEqual(downloader.main(), 0)

    def test_manifest_uses_safe_jpeg_filenames_and_search_queries(self):
        manifest = json.loads(downloader.MANIFEST.read_text(encoding="utf-8"))
        self.assertTrue(manifest)
        for filename, item in manifest.items():
            self.assertEqual(Path(filename).name, filename)
            self.assertTrue(filename.endswith(".jpg"))
            self.assertTrue(item.get("query", "").strip())


if __name__ == "__main__":
    unittest.main()
