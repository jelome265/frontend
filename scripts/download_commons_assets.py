#!/usr/bin/env python3
"""Fetch reusable JPEG photographs from Wikimedia Commons and retain attribution."""
import argparse, json, re, sys, time
from pathlib import Path
import requests

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"asserts/images"
MANIFEST=ROOT/"scripts/commons-assets.json"
API="https://commons.wikimedia.org/w/api.php"
ALLOWED={"CC0","Public domain","CC BY 4.0","CC BY 3.0","CC BY 2.0","CC BY-SA 4.0","CC BY-SA 3.0","CC BY-SA 2.0"}
S=requests.Session()
S.headers["User-Agent"]="BeanBoutiqueAssetFetcher/1.0 (repository asset build)"

def api(params):
 r=S.get(API,params={**params,"format":"json"},timeout=(10,45)); r.raise_for_status()
 data=r.json()
 if "error" in data: raise RuntimeError(str(data["error"]))
 return data

def clean(value):
 return re.sub(r"<[^>]*>","",str(value or "")).strip()

def find(query):
 data=api({"action":"query","generator":"search","gsrsearch":query+" filemime:jpeg","gsrnamespace":6,"gsrlimit":30,"prop":"imageinfo","iiprop":"url|mime|extmetadata"})
 pages=sorted(data.get("query",{}).get("pages",{}).values(),key=lambda p:(p.get("index",9999),p.get("title","")))
 for page in pages:
  info=(page.get("imageinfo") or [{}])[0]; ext=info.get("extmetadata",{})
  license=clean(ext.get("LicenseShortName",{}).get("value"))
  if info.get("mime")!="image/jpeg" or license not in ALLOWED: continue
  if clean(ext.get("Restrictions",{}).get("value")): continue
  return {"url":info["url"],"title":page["title"],"page":info.get("descriptionurl",""),
          "artist":clean(ext.get("Artist",{}).get("value")) or "Creator not identified",
          "license":license,"license_url":clean(ext.get("LicenseUrl",{}).get("value"))}
 raise RuntimeError("No accepted JPEG licence found for search: "+query)

def main():
 p=argparse.ArgumentParser(); p.add_argument("--check",action="store_true"); args=p.parse_args()
 manifest=json.loads(MANIFEST.read_text(encoding="utf-8")); OUT.mkdir(parents=True,exist_ok=True)
 credits=["# Wikimedia Commons image credits","","Creator, source and licence are recorded for every downloaded image.",""]
 errors=[]
 for filename,item in manifest.items():
  dest=OUT/filename
  try:
   if args.check:
    data=dest.read_bytes()
    if len(data)<20000 or not data.startswith(b"\xff\xd8\xff") or not data.endswith(b"\xff\xd9"): raise ValueError("missing or invalid JPEG")
    continue
   record=find(item["query"])
   response=S.get(record["url"],timeout=(15,90)); response.raise_for_status()
   data=response.content
   if len(data)<20000 or not data.startswith(b"\xff\xd8\xff") or not data.endswith(b"\xff\xd9"): raise ValueError("invalid JPEG payload")
   if len(data)>20*1024*1024: raise ValueError("image exceeds 20 MiB limit")
   dest.write_bytes(data)
   credits += ["## "+filename,"- Creator: "+record["artist"],"- Source: ["+record["title"]+"]("+record["page"]+")","- Licence: ["+record["license"]+"]("+record["license_url"]+")",""]
   print("Downloaded",filename,len(data),"bytes"); time.sleep(1)
  except Exception as exc: errors.append(filename+": "+str(exc))
 if not args.check: (OUT/"IMAGE-CREDITS.md").write_text("\n".join(credits)+"\n",encoding="utf-8")
 if errors: print("\n".join(errors),file=sys.stderr); return 1
 print("Commons image verification passed."); return 0
if __name__=="__main__": raise SystemExit(main())
