# GLORY Team 웹사이트 관리 안내서

홈페이지 주소: <https://yewon-hub.github.io/GLORY_website/>

엑셀 파일 하나와 사진 폴더만 관리하면 됩니다.
GitHub에 파일을 올리면 1~2분 뒤 홈페이지에 자동으로 반영됩니다.

| 바꾸고 싶은 것 | 고칠 곳 |
|---|---|
| 구성원, 논문, 소식, 연혁, 임상시험 목록, 연락처, 홈 화면 문구 | `content/glory-content.xlsx` |
| 구성원 사진 | `images/people/` 폴더 |
| 갤러리 사진 | `images/gallery/` 폴더 |
| 홈 화면 배경 사진 | `images/hero/` 폴더 |
| Research 페이지 사진 | `images/research/` 폴더 |
| 소식에 붙는 사진 | `images/news/` 폴더 |

---

## 1. 엑셀로 내용 수정하기

1. GitHub 저장소에서 `content` 폴더 → `glory-content.xlsx` → **Download raw file** (⬇ 아이콘) 로 내려받습니다.
2. 엑셀에서 수정하고 저장합니다. **파일 이름은 바꾸지 마세요.**
3. GitHub의 `content` 폴더에서 **Add file → Upload files** 를 누르고 파일을 끌어다 놓은 뒤 **Commit changes** 를 누릅니다.
4. 1~2분 뒤 홈페이지를 새로고침(Ctrl + F5)하면 반영되어 있습니다.

### 탭 설명

| 탭 | 내용 | 표시되는 곳 |
|---|---|---|
| **People** | 구성원 | People 페이지 |
| **Publications** | 논문 | Publications 페이지, 홈 화면 Latest publications |
| **News** | 소식 | News 페이지, 홈 화면 News (최신 3건) |
| **Milestones** | 연구팀 연혁 | 홈 화면 Milestones |
| **Trials** | 연구자 주도 임상시험 | Research 페이지 |
| **Settings** | 홈 화면 문구, 주소, 이메일, 전화 | 여러 곳 |

### 공통 규칙

- 첫째 줄(진한 색)의 영문 열 이름은 바꾸지 마세요.
- 둘째 줄(연한 초록색, ※ 로 시작)은 설명입니다. 홈페이지에 나오지 않습니다.
- 셋째 줄부터 한 줄에 한 건씩 적습니다. 줄을 지우면 홈페이지에서도 사라집니다.
- 빈칸은 홈페이지에 표시되지 않습니다.

### People 탭

- 위에서부터 적힌 순서대로 표시됩니다.
- `team` 칸이 같은 사람끼리 한 묶음이 됩니다. 묶음의 순서는 엑셀에 처음 나온 순서입니다.
- `role` 에 Professor 가 들어간 사람은 같은 팀 안에서 강조된 카드로 표시됩니다.
- 졸업·퇴직한 구성원은 `team` 을 `Alumni` 로 바꾸고 맨 아래로 옮기면 따로 묶입니다.

### Publications 탭

- 연도 순서는 자동으로 정렬됩니다. 같은 연도 안에서는 엑셀에 적힌 순서입니다.
- `doi` 칸에는 `10.1158/1078-0432.CCR-24-4263` 처럼 DOI만 넣으면 링크가 자동으로 만들어집니다.
- `category` 는 `Clinical` 또는 `Translational` 입니다.
- `featured` 에 `Y` 를 적은 논문이 홈 화면 Latest publications 에 나옵니다. 하나도 없으면 최신 4편이 나옵니다.

### News 탭

- `date` 는 `2026-10-07`, `2026-10`, `2026` 모두 가능합니다. 최신순으로 자동 정렬됩니다.
- `link` 를 넣으면 카드를 눌렀을 때 그 주소로 이동합니다.
- `image` 에는 `images/news` 폴더에 올린 사진의 파일 이름을 적습니다.
- `featured` 에 `Y` 를 적으면 News 페이지 맨 위에 크게 표시됩니다 (최대 2건).

### Settings 탭

`value` 칸만 고칩니다. `email`, `phone` 을 채우면 Contact 페이지에 이메일·전화 칸이 생깁니다.

---

## 2. 사진 올리기

GitHub에서 해당 폴더로 들어가 **Add file → Upload files** 로 올리면 됩니다.
사진 크기는 신경 쓰지 않아도 됩니다. 홈페이지용 크기로 자동으로 줄어듭니다.
휴대폰 사진(JPG, PNG, HEIC)을 그대로 올려도 됩니다.

### 구성원 사진 — `images/people/`

파일 이름을 엑셀 People 탭의 이름과 같게 올리면 자동으로 연결됩니다.

- `Jung-Yun Lee.jpg` (영문 이름)
- `이정윤.jpg` (한글 이름, 엑셀 `name_ko` 칸에 같은 이름이 있어야 함)
- 띄어쓰기, 대소문자, 하이픈은 달라도 됩니다. `jungyun_lee.jpg`, `Lee Jungyun.png` 모두 연결됩니다.
- 사진이 없는 사람은 이름 머리글자가 표시됩니다.
- 얼굴이 가운데 위쪽에 오는 정사각형에 가까운 사진이 가장 잘 나옵니다.

### 갤러리 — `images/gallery/`

행사마다 폴더를 하나 만들고 그 안에 사진을 올립니다. **폴더 이름이 앨범 제목**이 됩니다.

```
images/gallery/
├── 2026-06 ASCO Annual Meeting/      → 앨범 "ASCO Annual Meeting" (June 2026)
│   ├── 01_Poster session.jpg         → 사진 설명 "Poster session"
│   └── IMG_1234.jpg                  → 설명 없음
└── 2025-12-18 Year-end dinner/       → 앨범 "Year-end dinner" (December 18, 2025)
```

- 폴더 이름을 날짜(`2026-06` 또는 `2026-06-15`)로 시작하면 최신 앨범이 위로 옵니다.
- 사진 파일 이름이 사진 설명이 됩니다. `IMG_1234`, `KakaoTalk_...` 같은 자동 이름은 표시되지 않습니다.
- 앞에 `01_`, `02_` 를 붙이면 그 순서대로 나옵니다.
- 가장 최근 사진 6장이 홈 화면 Gallery 에도 나옵니다. 사진이 한 장도 없으면 홈 화면에서 Gallery 칸이 숨겨집니다.
- 새 앨범을 만들 때는 컴퓨터에서 폴더를 만들어 사진을 넣은 뒤, GitHub의 `images/gallery` 화면에 **폴더째로 끌어다 놓으면** 됩니다.

### 홈 화면 배경 — `images/hero/`

가로로 넓은 사진 한 장을 올리면 홈 화면 맨 위 제목 뒤에 어둡게 깔립니다. 비어 있으면 기본 배경이 나옵니다.

### Research 페이지 — `images/research/`

`clinical.jpg`, `translational.jpg` 라는 이름으로 올리면 각 영역 옆에 들어갑니다.

### 로고 — `images/logo/` (선택)

이 폴더를 만들고 로고 파일 한 개를 올리면 홈 화면 제목 위에 표시됩니다.
연세대·세브란스 공식 로고는 기관 CI 사용 지침을 따라야 하니, 담당 부서에 확인한 뒤 올리세요.

---

## 3. 반영이 안 될 때

1. GitHub 저장소 상단의 **Actions** 탭을 엽니다.
2. 맨 위 항목이 초록색 ✓ 이면 정상입니다. Ctrl + F5 로 새로고침해 보세요.
3. 빨간색 ✗ 이면 그 항목 → **build** → **Build site** 를 눌러 메시지를 확인합니다.
   - `could not read glory-content.xlsx` : 엑셀 파일이 깨졌거나 `.xls` 형식입니다. `.xlsx` 로 다시 저장해 올리세요.
4. 초록색인데 일부가 빠졌다면 **Build site** 기록에서 `!` 로 시작하는 줄을 봅니다.
   - `does not match any name in the People sheet` : 사진 파일 이름이 엑셀의 이름과 다릅니다.
   - `'title' is empty - skipped` : 제목이 비어 있는 줄입니다.

---

## 4. 내 컴퓨터에서 미리 보기 (선택)

저장소를 내려받은 폴더에서 `preview.bat` 를 더블클릭하면 사이트를 만들어 브라우저로 엽니다.
(Python 이 설치되어 있어야 합니다. 끝낼 때는 검은 창을 닫으면 됩니다.)

---

## 5. 폴더 구조

```
content/glory-content.xlsx   ★ 내용 (엑셀)
images/                      ★ 사진
  people/  gallery/  hero/  research/  news/

index.html                   홈
research.html                Research (Clinical / Translational)
people.html  publications.html  news.html  gallery.html  contact.html
partials/                    모든 페이지에 공통인 머리말·메뉴·바닥글
assets/css/style.css         디자인 (색상·글꼴은 맨 위 :root 에서 변경)
assets/js/site.js            엑셀 내용을 화면에 그리는 스크립트
tools/build.py               엑셀·사진을 읽어 사이트를 만드는 프로그램
.github/workflows/deploy.yml 업로드할 때마다 자동으로 사이트를 만들어 게시
preview.bat                  내 컴퓨터에서 미리 보기
```

★ 표시가 없는 파일은 평소에는 건드릴 필요가 없습니다.

Research 페이지의 소개 문구와 연구 주제 카드는 `research.html` 에, 홈 화면의 Research areas 카드는 `index.html` 에 직접 적혀 있습니다.

---

## 6. 확인이 필요한 내용

소개 자료(`TEAMGLORY 소개_20260910.pptx`)와 PubMed를 바탕으로 채웠습니다. 아래는 자료에 없거나 추정이 섞인 항목입니다.

| 탭 | 확인할 내용 |
|---|---|
| People | 구성원의 `role`(직책)과 `name_ko`(한글 이름)가 비어 있습니다. 교수 4명은 모두 `Professor` 로만 적었습니다 |
| People | 조직도에는 교수 4명과 구성원 23명(총 27명)인데, 연혁의 인원 합계는 26명입니다 |
| Settings | `email`, `phone` 이 비어 있습니다. `address_1`(Department of Obstetrics and Gynecology)도 확인해 주세요 |
| News | 6건은 논문·학회 발표 사실을 바탕으로 만든 초안입니다. 문구와 날짜(월 단위로 적은 것)를 확인해 주세요 |
| Milestones | 2026년 항목(교수 4명, 연구간호사 15명 등)은 자료에서 연도가 분명하지 않아 현재 구성으로 보고 2026년에 넣었습니다 |
| Publications | 대표 논문 18편만 들어 있습니다. 전체 목록을 넣으려면 엑셀에 줄을 추가하면 됩니다 |
