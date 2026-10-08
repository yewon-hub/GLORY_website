#!/usr/bin/env python3
"""Build the GLORY Team website into the _site/ folder.

Reads   content/glory-content.xlsx   (people, publications, news, ...)
        images/**                    (people photos, gallery, hero, ...)
        *.html, partials/, assets/   (page templates and design)
Writes  _site/                       (the finished website)

GitHub runs this automatically on every upload (.github/workflows/deploy.yml).
To preview on your own computer, double-click preview.bat.
"""
from __future__ import annotations

import datetime as dt
import hashlib
import io
import json
import re
import shutil
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_site"
CONTENT_DIR = ROOT / "content"
IMAGES = ROOT / "images"

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff", ".heic", ".heif", ".avif"}
PASSTHROUGH_EXT = {".gif", ".svg"}
MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]
TRUTHY = {"y", "yes", "true", "1", "o", "v", "x", "예", "네", "✓", "✔"}

warnings: list[str] = []


def warn(msg: str) -> None:
    warnings.append(msg)
    print("  ! " + msg)


# ---------------------------------------------------------------- Excel ----
def text(value) -> str:
    """Cell value -> clean string ('' for empty)."""
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        value = int(value)
    if isinstance(value, (dt.datetime, dt.date)):
        return value.strftime("%Y-%m-%d")
    return re.sub(r"[ \t ]+", " ", str(value)).strip()


def find_workbook() -> Path | None:
    preferred = CONTENT_DIR / "glory-content.xlsx"
    if preferred.exists():
        return preferred
    others = sorted(p for p in CONTENT_DIR.glob("*.xlsx") if not p.name.startswith("~$"))
    if others:
        warn(f"content/glory-content.xlsx not found; using {others[0].name} instead")
        return others[0]
    warn("No Excel file found in content/ - the site will be built without people, publications or news")
    return None


def read_sheet(wb, name: str) -> list[dict]:
    """Rows of a sheet as dicts keyed by lower-case header. Row 2 is skipped when it is the notes row."""
    ws = next((s for s in wb.worksheets if s.title.strip().lower() == name.lower()), None)
    if ws is None:
        warn(f"Sheet '{name}' is missing from the Excel file")
        return []
    rows = list(ws.iter_rows())
    if not rows:
        return []
    headers = [text(c.value).lower().replace(" ", "_") for c in rows[0]]
    out = []
    for idx, row in enumerate(rows[1:], start=2):
        values = [text(c.value) for c in row]
        if not any(values):
            continue
        if idx == 2 and any(v.startswith("※") for v in values):
            continue
        rec = {h: v for h, v in zip(headers, values) if h}
        rec["_row"] = idx
        rec["_cells"] = {h: c for h, c in zip(headers, row) if h}
        out.append(rec)
    return out


def lines(v: str) -> list[str]:
    """A cell with several lines (Alt+Enter in Excel) -> list of items."""
    return [x.strip(" 	-•·") for x in v.splitlines() if x.strip(" 	-•·")]


def truthy(v: str) -> bool:
    return v.strip().lower() in TRUTHY


def parse_date(rec: dict, key: str = "date") -> tuple[str, str]:
    """-> (sortable 'YYYY-MM-DD' with 00 for unknown parts, human label)."""
    cell = rec["_cells"].get(key)
    raw = rec.get(key, "")
    y = m = d = 0
    if cell is not None and isinstance(cell.value, (dt.datetime, dt.date)):
        v = cell.value
        y, m = v.year, v.month
        # Excel turns "2026-10" into 1 Oct 2026; only keep the day if the cell shows one.
        if "d" in (cell.number_format or "").lower():
            d = v.day
    else:
        nums = re.findall(r"\d+", raw)
        if nums and len(nums[0]) == 4:
            y = int(nums[0])
            if len(nums) > 1 and 1 <= int(nums[1]) <= 12:
                m = int(nums[1])
                if len(nums) > 2 and 1 <= int(nums[2]) <= 31:
                    d = int(nums[2])
    if not y:
        return "", raw
    label = f"{MONTHS[m - 1]} {d}, {y}" if d else (f"{MONTHS[m - 1]} {y}" if m else str(y))
    return f"{y:04d}-{m:02d}-{d:02d}", label


# --------------------------------------------------------------- images ----
try:
    from PIL import Image, ImageOps

    try:  # iPhone photos (.heic)
        import pillow_heif

        pillow_heif.register_heif_opener()
    except Exception:
        pass
    HAVE_PIL = True
except Exception:  # pragma: no cover
    HAVE_PIL = False
    print("  ! Pillow is not installed - photos are copied without resizing (pip install Pillow)")


def is_image(p: Path) -> bool:
    return p.is_file() and p.suffix.lower() in IMAGE_EXT | {".svg"} and not p.name.startswith((".", "~"))


def ascii_slug(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:40]


def emit_image(src: Path, subdir: str, max_side: int, square: int | None = None, tag: str = "") -> dict | None:
    """Resize src into _site/images/<subdir>/ and return {'src', 'w', 'h'} (path relative to the site root)."""
    try:
        data = src.read_bytes()
    except OSError as e:
        warn(f"Cannot read {src.relative_to(ROOT)}: {e}")
        return None
    digest = hashlib.sha1(data).hexdigest()[:10]
    stem = "-".join(x for x in (ascii_slug(src.stem), digest, tag) if x)
    dest_dir = OUT / "images" / subdir
    dest_dir.mkdir(parents=True, exist_ok=True)
    ext = src.suffix.lower()

    if not HAVE_PIL or ext in PASSTHROUGH_EXT:
        dest = dest_dir / (stem + ext)
        dest.write_bytes(data)
        return {"src": dest.relative_to(OUT).as_posix(), "w": 0, "h": 0}
    try:
        im = Image.open(io.BytesIO(data))
        im = ImageOps.exif_transpose(im)
        keep_png = ext == ".png" and im.mode in ("RGBA", "LA", "P") and square is None and subdir == "logo"
        if not keep_png and im.mode != "RGB":
            if im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGBA")
                bg = Image.new("RGB", im.size, (255, 255, 255))
                bg.paste(im, mask=im.split()[-1])
                im = bg
            else:
                im = im.convert("RGB")
        if square:
            # faces usually sit in the upper part of a portrait
            im = ImageOps.fit(im, (square, square), Image.LANCZOS, centering=(0.5, 0.3))
        else:
            im.thumbnail((max_side, max_side), Image.LANCZOS)
        if keep_png:
            dest = dest_dir / (stem + ".png")
            im.save(dest, "PNG", optimize=True)
        else:
            dest = dest_dir / (stem + ".jpg")
            im.save(dest, "JPEG", quality=84, optimize=True, progressive=True)
        return {"src": dest.relative_to(OUT).as_posix(), "w": im.width, "h": im.height}
    except Exception as e:
        warn(f"Cannot process image {src.relative_to(ROOT)} ({e.__class__.__name__}: {e})")
        return None


def first_image(folder: Path, prefer: str | None = None) -> Path | None:
    if not folder.is_dir():
        return None
    files = sorted((p for p in folder.iterdir() if is_image(p)), key=lambda p: p.name.lower())
    if prefer:
        for p in files:
            if p.stem.lower() == prefer:
                return p
        return None
    return files[0] if files else None


def norm_key(s: str) -> str:
    """'Jung-Yun Lee' / 'jung_yun lee.JPG' -> 'jungyunlee'. Keeps Hangul."""
    s = unicodedata.normalize("NFC", s).casefold()
    return re.sub(r"[\W_]+", "", s)


# -------------------------------------------------------------- sections ---
def build_people(rows: list[dict]) -> tuple[list[dict], list[str]]:
    folder = IMAGES / "people"
    files = sorted(p for p in folder.iterdir() if is_image(p)) if folder.is_dir() else []
    by_key = {norm_key(p.stem): p for p in files}
    by_name = {norm_key(p.name): p for p in files}
    used: set[Path] = set()

    def signature(k: str) -> str:
        return "".join(sorted(k))

    name_sigs: dict[str, int] = {}
    for r in rows:
        sig = signature(norm_key(r.get("name", "")))
        name_sigs[sig] = name_sigs.get(sig, 0) + 1

    people, teams = [], []
    for r in rows:
        name = r.get("name", "")
        if not name:
            warn(f"People row {r['_row']}: 'name' is empty - skipped")
            continue
        photo = None
        explicit = r.get("photo", "")
        if explicit:
            photo = by_name.get(norm_key(explicit)) or by_key.get(norm_key(Path(explicit).stem))
            if photo is None:
                warn(f"People row {r['_row']} ({name}): photo '{explicit}' not found in images/people")
        if photo is None:
            for cand in (name, r.get("name_ko", "")):
                if cand and norm_key(cand) in by_key:
                    photo = by_key[norm_key(cand)]
                    break
        if photo is None:
            # same letters in a different order, e.g. 'lee_jungyun.jpg' for 'Jung-Yun Lee'
            sig = signature(norm_key(name))
            if name_sigs.get(sig) == 1:
                matches = [p for k, p in by_key.items() if signature(k) == sig]
                if len(matches) == 1:
                    photo = matches[0]
        img = None
        if photo is not None:
            used.add(photo)
            img = emit_image(photo, "people", 640, square=640)
        orcid = re.sub(r"^https?://orcid\.org/", "", r.get("orcid", "")).strip("/")
        team = r.get("team", "") or "Team"
        if team not in teams:
            teams.append(team)
        people.append({
            "name": name, "name_ko": r.get("name_ko", ""), "role": r.get("role", ""), "team": team,
            "email": r.get("email", ""), "profile_url": r.get("profile_url", ""), "orcid": orcid,
            "photo": img["src"] if img else "",
            "affiliation": r.get("affiliation", ""),
            "interests": lines(r.get("research_interests", "")), "education": lines(r.get("education", "")),
            "career": lines(r.get("career", "")), "awards": lines(r.get("awards", "")),
        })
    for p in files:
        if p not in used:
            warn(f"images/people/{p.name} does not match any name in the People sheet")
    return people, teams


def build_publications(rows: list[dict]) -> list[dict]:
    pubs = []
    for r in rows:
        title = r.get("title", "")
        if not title:
            warn(f"Publications row {r['_row']}: 'title' is empty - skipped")
            continue
        year = re.search(r"\d{4}", r.get("year", ""))
        doi_raw = r.get("doi", "") or r.get("link", "")
        doi, link = "", ""
        m = re.search(r"10\.\d{4,9}/\S+", doi_raw)
        if m:
            doi = m.group(0).rstrip(".,;")
            link = "https://doi.org/" + doi
        elif doi_raw.lower().startswith("http"):
            link = doi_raw
        cat = r.get("category", "").strip().lower()
        category = "clinical" if cat.startswith("c") else "translational" if cat.startswith("t") else ""
        pubs.append({
            "year": year.group(0) if year else "", "title": title.rstrip("."), "authors": r.get("authors", ""),
            "journal": r.get("journal", ""), "volume": r.get("volume", ""), "pages": r.get("pages", ""),
            "doi": doi, "link": link, "category": category, "featured": truthy(r.get("featured", "")),
        })
    pubs.sort(key=lambda p: p["year"], reverse=True)  # stable: keeps the Excel order within a year
    return pubs


def build_news(rows: list[dict]) -> list[dict]:
    folder = IMAGES / "news"
    files = {norm_key(p.name): p for p in folder.iterdir() if is_image(p)} if folder.is_dir() else {}
    stems = {norm_key(p.stem): p for p in files.values()}
    news = []
    for r in rows:
        title = r.get("title", "")
        if not title:
            warn(f"News row {r['_row']}: 'title' is empty - skipped")
            continue
        sort, label = parse_date(r)
        if not sort:
            warn(f"News row {r['_row']} ({title[:30]}...): date '{r.get('date', '')}' not understood")
        img = None
        if r.get("image"):
            src = files.get(norm_key(r["image"])) or stems.get(norm_key(Path(r["image"]).stem))
            if src is None:
                warn(f"News row {r['_row']}: image '{r['image']}' not found in images/news")
            else:
                img = emit_image(src, "news", 1400)
        news.append({
            "date": sort, "date_label": label, "title": title, "summary": r.get("summary", ""),
            "category": r.get("category", ""), "link": r.get("link", ""),
            "image": img["src"] if img else "", "featured": truthy(r.get("featured", "")),
        })
    news.sort(key=lambda n: n["date"], reverse=True)
    return news


CAMERA_NAME = re.compile(
    r"^(img|dsc|dscn|dscf|pxl|mvimg|kakaotalk|screenshot|screen shot|photo|image|picture|scan|wp|p)?[\s_\-]*[\d\s_\-().]*$",
    re.I)


def caption_from(stem: str) -> str:
    s = re.sub(r"^\d{1,3}[\s._\-)]+", "", stem)          # leading order number: "01_", "2. "
    s = re.sub(r"[_]+", " ", s).strip()
    if not s or CAMERA_NAME.match(s) or re.fullmatch(r"[0-9a-f\-]{16,}", s, re.I):
        return ""
    return s


def album_title(folder_name: str) -> tuple[str, str, str]:
    """'2026-06 ASCO Annual Meeting' -> (title, date label, sort key)."""
    m = re.match(r"^\s*(\d{4})(?:[.\-_/ ]?(\d{1,2}))?(?:[.\-_/ ]?(\d{1,2}))?[\s._\-]*(.*)$", folder_name)
    if not m:
        return folder_name.strip(), "", "0000-" + folder_name.lower()
    y, mo, d, rest = int(m.group(1)), m.group(2), m.group(3), m.group(4).strip()
    mo_i = int(mo) if mo and 1 <= int(mo) <= 12 else 0
    d_i = int(d) if d and mo_i and 1 <= int(d) <= 31 else 0
    if not (1990 <= y <= 2100):
        return folder_name.strip(), "", "0000-" + folder_name.lower()
    label = f"{MONTHS[mo_i - 1]} {d_i}, {y}" if d_i else (f"{MONTHS[mo_i - 1]} {y}" if mo_i else str(y))
    return (rest or label), label, f"{y:04d}-{mo_i:02d}-{d_i:02d}-{rest.lower()}"


def build_gallery() -> list[dict]:
    folder = IMAGES / "gallery"
    if not folder.is_dir():
        return []
    groups: dict[str, list[Path]] = {}
    for p in sorted(folder.rglob("*"), key=lambda p: str(p).lower()):
        if not is_image(p):
            continue
        rel = p.relative_to(folder)
        groups.setdefault(rel.parts[0] if len(rel.parts) > 1 else "", []).append(p)
    albums = []
    for name, paths in groups.items():
        title, label, sort = album_title(name) if name else ("Photos", "", "0000")
        photos = []
        for p in paths:
            full = emit_image(p, "gallery", 1800)
            thumb = emit_image(p, "gallery", 720, tag="t")
            if full and thumb:
                photos.append({"src": full["src"], "thumb": thumb["src"], "w": thumb["w"], "h": thumb["h"],
                               "caption": caption_from(p.stem)})
        if photos:
            albums.append({"title": title, "date": label, "_sort": sort, "photos": photos})
    albums.sort(key=lambda a: a["_sort"], reverse=True)
    for a in albums:
        del a["_sort"]
    return albums


# ------------------------------------------------------------------ html ---
NAV_KEYS = {"index": "home", "research": "research", "people": "people", "publications": "publications",
            "news": "news", "gallery": "gallery", "contact": "contact"}


def build_pages(version: str, settings: dict) -> None:
    header = (ROOT / "partials" / "header.html").read_text(encoding="utf-8")
    footer = (ROOT / "partials" / "footer.html").read_text(encoding="utf-8")
    head = (ROOT / "partials" / "head.html").read_text(encoding="utf-8")
    full_name = settings.get("lab_full_name", "GLORY Team")
    for page in sorted(ROOT.glob("*.html")):
        html = page.read_text(encoding="utf-8")
        # each page starts with <!--title: ...--> and <!--desc: ...--> comments
        title = re.search(r"<!--title:(.*?)-->", html)
        desc = re.search(r"<!--desc:(.*?)-->", html)
        page_title = f"{title.group(1).strip()} | {full_name}" if title else full_name
        page_head = head.replace("{{page_title}}", page_title).replace("{{page_desc}}", desc.group(1).strip() if desc else "")
        html = re.sub(r"<!--(?:title|desc):.*?-->\s*", "", html).replace("<!--#include head-->", page_head)
        key = NAV_KEYS.get(page.stem, "")
        nav = re.sub(r'(<a\b[^>]*?)\sdata-nav="%s"' % re.escape(key), r'\1 data-nav="%s" aria-current="page"' % key,
                     header) if key else header
        html = html.replace("<!--#include header-->", nav).replace("<!--#include footer-->", footer)
        html = html.replace("{{v}}", version).replace("{{year}}", str(dt.date.today().year))
        html = html.replace("{{lab_name}}", settings.get("lab_name", "GLORY"))
        html = html.replace("{{lab_full_name}}", settings.get("lab_full_name", "GLORY Team"))
        (OUT / page.name).write_text(html, encoding="utf-8", newline="\n")


def main() -> int:
    print("Building GLORY Team website ->", OUT)
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    people_rows = pub_rows = news_rows = ms_rows = trial_rows = setting_rows = []
    book = find_workbook()
    if book is not None:
        try:
            from openpyxl import load_workbook

            wb = load_workbook(book, data_only=True)
            people_rows = read_sheet(wb, "People")
            pub_rows = read_sheet(wb, "Publications")
            news_rows = read_sheet(wb, "News")
            ms_rows = read_sheet(wb, "Milestones")
            trial_rows = read_sheet(wb, "Trials")
            setting_rows = read_sheet(wb, "Settings")
        except Exception as e:
            print(f"\nERROR: could not read {book.name}: {e.__class__.__name__}: {e}")
            print("Close the file in Excel, save it as .xlsx and upload it again.")
            return 1

    settings = {r["key"]: r.get("value", "") for r in setting_rows if r.get("key")}
    people, teams = build_people(people_rows)
    publications = build_publications(pub_rows)
    news = build_news(news_rows)
    gallery = build_gallery()

    def single(folder: str, max_side: int, prefer: str | None = None):
        p = first_image(IMAGES / folder, prefer)
        img = emit_image(p, folder, max_side) if p else None
        return img["src"] if img else ""

    data = {
        "built": dt.date.today().isoformat(),
        "settings": settings,
        "hero": {"image": single("hero", 2400), "logo": single("logo", 400)},
        "research": {"clinical": single("research", 1600, "clinical"),
                     "translational": single("research", 1600, "translational")},
        "milestones": [{"year": r.get("year", ""), "title": r.get("title", ""), "detail": r.get("detail", "")}
                       for r in ms_rows if r.get("title")],
        "trials": [{"code": r.get("code", ""), "title": r.get("title", ""), "status": r.get("status", ""),
                    "presentation": r.get("presentation", ""), "publication": r.get("publication", "")}
                   for r in trial_rows if r.get("code")],
        "people": people, "teams": teams,
        "publications": publications, "news": news, "gallery": gallery,
    }

    (OUT / "data").mkdir(exist_ok=True)
    payload = json.dumps(data, ensure_ascii=False, indent=1)
    (OUT / "data" / "site-data.js").write_text("window.SITE_DATA = " + payload + ";\n", encoding="utf-8", newline="\n")

    shutil.copytree(ROOT / "assets", OUT / "assets")
    for extra in ("CNAME", "robots.txt"):
        if (ROOT / extra).exists():
            shutil.copy2(ROOT / extra, OUT / extra)
    (OUT / ".nojekyll").write_text("", encoding="utf-8")
    for stray in ROOT.iterdir():
        if is_image(stray):
            warn(f"{stray.name} is in the top folder and is not shown anywhere - move it into images/gallery (or another images/ folder)")
    build_pages(hashlib.sha1(payload.encode()).hexdigest()[:8] + dt.datetime.now().strftime("%H%M%S"), settings)

    photos = sum(len(a["photos"]) for a in gallery)
    with_photo = sum(1 for p in people if p["photo"])
    print(f"\n  people        {len(people)}  ({with_photo} with a photo)")
    print(f"  publications  {len(publications)}")
    print(f"  news          {len(news)}")
    print(f"  gallery       {len(gallery)} album(s), {photos} photo(s)")
    print(f"  warnings      {len(warnings)}")
    print("\nDone.")
    return 0


if __name__ == "__main__":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    sys.exit(main())
