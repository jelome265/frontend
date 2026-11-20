#!/usr/bin/env python3
"""Download licensed Wikimedia Commons JPEGs with retries and a persistent asset lock."""
import argparse
import email.utils
import json
import random
import re
import sys
import tempfile
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "asserts/images"
MANIFEST = ROOT / "scripts/commons-assets.json"
LOCK = ROOT / "scripts/commons-assets.lock.json"
CREDITS = OUT / "IMAGE-CREDITS.md"
API = "https://commons.wikimedia.org/w/api.php"
ALLOWED = {
    "CC0", "Public domain", "CC BY 4.0", "CC BY 3.0", "CC BY 2.0",
    "CC BY-SA 4.0", "CC BY-SA 3.0", "CC BY-SA 2.0",
}
RETRYABLE = {429, 500, 502, 503, 504}
MAX_ATTEMPTS = 7
MAX_IMAGE_BYTES = 20 * 1024 * 1024
MIN_IMAGE_BYTES = 20_000
SESSION = requests.Session()
SESSION.headers.update({
    "User-Agent": "BeanBoutiqueAssetFetcher/1.1 (https://github.com/jelome265/frontend; repository asset build)",
    "Accept": "application/json,image/jpeg,*/*",
})


def clean(value):
    return re.sub(r"<[^>]*>", "", str(value or "")).strip()


def retry_delay(response, attempt):
    retry_after = response.headers.get("Retry-After") if response is not None else None
    if retry_after:
        try:
            return max(1.0, float(retry_after))
        except ValueError:
            try:
                retry_at = email.utils.parsedate_to_datetime(retry_after)
                if retry_at.tzinfo is None:
                    retry_at = retry_at.replace(tzinfo=timezone.utc)
                return max(1.0, (retry_at - datetime.now(timezone.utc)).total_seconds())
            except (TypeError, ValueError, OverflowError):
                pass
    return min(180.0, 5.0 * (2 ** (attempt - 1))) + random.uniform(0.0, 1.0)


def get(url, *, params=None, timeout=(15, 90)):
    for attempt in range(1, MAX_ATTEMPTS + 1):
        response = None
        try:
            response = SESSION.get(url, params=params, timeout=timeout)
            if response.status_code not in RETRYABLE:
                response.raise_for_status()
                time.sleep(2.0)
                return response
            if attempt == MAX_ATTEMPTS:
                response.raise_for_status()
            delay = retry_delay(response, attempt)
            print(
                f"HTTP {response.status_code}; retry {attempt}/{MAX_ATTEMPTS - 1} "
                f"after {delay:.1f}s",
                file=sys.stderr,
                flush=True,
            )
        except requests.RequestException as exc:
            if response is not None and response.status_code not in RETRYABLE:
                raise
            if attempt == MAX_ATTEMPTS:
                raise
            delay = min(180.0, 5.0 * (2 ** (attempt - 1))) + random.uniform(0.0, 1.0)
            print(f"Request error ({exc}); retry after {delay:.1f}s", file=sys.stderr, flush=True)
        finally:
            if response is not None:
                response.close()
        time.sleep(delay)
    raise RuntimeError(f"Request failed after {MAX_ATTEMPTS} attempts: {url}")


def source_record_is_valid(record):
    if not isinstance(record, dict):
        return False

    title = clean(record.get("title"))
    artist = clean(record.get("artist"))
    licence = clean(record.get("licence"))
    image_url = urlparse(str(record.get("image_url") or ""))
    page_url = urlparse(str(record.get("page_url") or ""))
    licence_url = urlparse(str(record.get("licence_url") or ""))

    if not title or not artist or licence not in ALLOWED:
        return False
    if image_url.scheme != "https" or image_url.hostname != "upload.wikimedia.org":
        return False
    if page_url.scheme != "https" or page_url.hostname != "commons.wikimedia.org":
        return False
    if licence_url.scheme != "https":
        return False

    licence_host = (licence_url.hostname or "").lower()
    if licence == "Public domain":
        if licence_host != "commons.wikimedia.org":
            return False
    elif licence_host not in {"creativecommons.org", "www.creativecommons.org"}:
        return False

    # CC BY and CC BY-SA require attribution; do not publish an anonymous record.
    if licence.startswith("CC BY") and artist == "Creator not identified":
        return False
    return True


def find(query):
    response = get(API, params={
        "action": "query",
        "generator": "search",
        "gsrsearch": query + " filemime:jpeg",
        "gsrnamespace": 6,
        "gsrlimit": 30,
        "prop": "imageinfo",
        "iiprop": "url|mime|extmetadata",
        "format": "json",
    }, timeout=(10, 45))
    data = response.json()
    if "error" in data:
        raise RuntimeError(f"Commons API error: {data['error']}")
    pages = sorted(
        data.get("query", {}).get("pages", {}).values(),
        key=lambda page: (page.get("index", 9999), page.get("title", "")),
    )
    for page in pages:
        info = (page.get("imageinfo") or [{}])[0]
        metadata = info.get("extmetadata", {})
        licence = clean(metadata.get("LicenseShortName", {}).get("value"))
        page_url = info.get("descriptionurl", "")
        image_url = info.get("url", "")
        if info.get("mime") != "image/jpeg" or licence not in ALLOWED:
            continue
        if clean(metadata.get("Restrictions", {}).get("value")):
            continue
        if urlparse(image_url).scheme != "https" or urlparse(image_url).hostname != "upload.wikimedia.org":
            continue
        if urlparse(page_url).scheme != "https" or urlparse(page_url).hostname != "commons.wikimedia.org":
            continue
        licence_url = clean(metadata.get("LicenseUrl", {}).get("value"))
        if licence != "Public domain" and not licence_url.startswith("https://"):
            continue
        record = {
            "title": page["title"],
            "page_url": page_url,
            "image_url": image_url,
            "artist": clean(metadata.get("Artist", {}).get("value")) or "Creator not identified",
            "licence": licence,
            "licence_url": licence_url or "https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia",
        }
        if source_record_is_valid(record):
            return record
    raise RuntimeError(f"No accepted JPEG licence found for search: {query}")


def valid_jpeg(path):
    if not path.is_file():
        return False
    size = path.stat().st_size
    if size < MIN_IMAGE_BYTES or size > MAX_IMAGE_BYTES:
        return False
    with path.open("rb") as stream:
        if stream.read(3) != b"\xff\xd8\xff":
            return False
        stream.seek(-2, 2)
        return stream.read(2) == b"\xff\xd9"


def download(record, destination):
    if not source_record_is_valid(record):
        raise ValueError("pinned Commons source metadata is invalid")

    response = get(record["image_url"], timeout=(15, 120))
    final_url = urlparse(getattr(response, "url", "") or record["image_url"])
    if final_url.scheme != "https" or final_url.hostname != "upload.wikimedia.org":
        raise ValueError("image download redirected outside upload.wikimedia.org")
    data = response.content
    if not (MIN_IMAGE_BYTES <= len(data) <= MAX_IMAGE_BYTES):
        raise ValueError(f"image size outside accepted range: {len(data)} bytes")
    if not data.startswith(b"\xff\xd8\xff") or not data.endswith(b"\xff\xd9"):
        raise ValueError("downloaded payload is not a complete JPEG")
    destination.write_bytes(data)


def markdown_escape(value):
    return str(value).replace("\\", "\\\\").replace("[", "\\[").replace("]", "\\]").replace("(", "\\(").replace(")", "\\)")


def write_credits(records):
    lines = [
        "# Wikimedia Commons image credits",
        "",
        "Each entry records the creator, source file page and applicable licence.",
        "Images are stored locally; check each linked licence before modifying or redistributing an image.",
        "",
    ]
    for filename, record in records.items():
        lines.extend([
            f"## {filename}",
            f"- Creator: {markdown_escape(record['artist'])}",
            f"- Source: [{markdown_escape(record['title'])}]({record['page_url']})",
            f"- Licence: [{markdown_escape(record['licence'])}]({record['licence_url']})",
            "",
        ])
    CREDITS.write_text("\n".join(lines), encoding="utf-8")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify all images, lock entries and attribution")
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    lock = json.loads(LOCK.read_text(encoding="utf-8")) if LOCK.exists() else {}
    errors = []

    if args.check:
        for filename in manifest:
            if filename not in lock:
                errors.append(f"{filename}: missing pinned Commons metadata in {LOCK.relative_to(ROOT)}")
            else:
                if not source_record_is_valid(lock[filename]):
                    errors.append(f"{filename}: invalid pinned Commons source metadata")
                if not valid_jpeg(OUT / filename):
                    errors.append(f"{filename}: missing or invalid JPEG")
        if not CREDITS.is_file():
            errors.append("missing asserts/images/IMAGE-CREDITS.md")
        else:
            credits_text = CREDITS.read_text(encoding="utf-8")
            for filename in manifest:
                if f"## {filename}" not in credits_text:
                    errors.append(f"{filename}: missing attribution entry")
                    continue
                record = lock.get(filename, {})
                expected = (
                    f"- Creator: {markdown_escape(record.get('artist', ''))}",
                    f"- Source: [{markdown_escape(record.get('title', ''))}]({record.get('page_url', '')})",
                    f"- Licence: [{markdown_escape(record.get('licence', ''))}]({record.get('licence_url', '')})",
                )
                if any(line not in credits_text for line in expected):
                    errors.append(f"{filename}: attribution does not match pinned source metadata")
        if errors:
            print("\n".join(errors), file=sys.stderr)
            return 1
        print(f"Verified {len(manifest)} JPEGs, pinned source records and attribution entries.")
        return 0

    resolved = {}
    with tempfile.TemporaryDirectory(prefix="commons-assets-") as temporary:
        temp_dir = Path(temporary)
        for filename, item in manifest.items():
            try:
                if filename in lock:
                    record = lock[filename]
                    if not source_record_is_valid(record):
                        raise ValueError("pinned Commons source metadata is invalid")
                else:
                    record = find(item["query"])
                if not valid_jpeg(OUT / filename):
                    download(record, temp_dir / filename)
                resolved[filename] = record
                print(f"Prepared {filename}")
            except Exception as exc:
                errors.append(f"{filename}: {exc}")
                print(f"Failed {filename}: {exc}", file=sys.stderr, flush=True)

        if errors:
            print(
                f"Aborting without publishing partial assets ({len(errors)} failure(s)).",
                file=sys.stderr,
            )
            return 1

        for filename in manifest:
            staged = temp_dir / filename
            if staged.exists():
                staged.replace(OUT / filename)

    LOCK.write_text(json.dumps(resolved, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    write_credits(resolved)
    print(f"Prepared {len(resolved)} licensed Commons assets and updated the source lock.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
