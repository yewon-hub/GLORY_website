# GLORY 연구팀 웹사이트 — 관리 안내서

한국어/영어 이중 언어 정적 웹사이트입니다. 빌드 도구나 설치 과정이 필요 없고,
파일을 그대로 GitHub에 올리면 웹사이트가 됩니다.

---

## 1. 폴더 구조

```
glory-website/
├── index.html            홈 (한국어)
├── research.html         연구 소개
├── trials.html           임상연구
├── team.html             구성원
├── publications.html     논문
├── contact.html          연락처
│
├── en/                   영어 페이지 (파일 구성 동일)
│   └── index.html, research.html, ...
│
├── data/
│   └── site-data.js      ★ 내용을 수정하는 파일 — 여기만 고치면 됩니다
│
├── assets/
│   ├── css/style.css     디자인(색상·글꼴·여백)
│   ├── js/site.js        데이터를 화면에 그리는 스크립트
│   └── img/favicon.svg   브라우저 탭 아이콘
│
├── .nojekyll             GitHub Pages 설정 파일 (지우지 마세요)
└── README.md             이 문서
```

> **핵심 원칙**
> 구성원·논문·임상연구·소식·연락처는 전부 **`data/site-data.js` 한 파일**에 들어 있습니다.
> HTML 파일은 건드릴 필요가 없습니다.

---

## 2. 내용 수정하기

`data/site-data.js` 를 메모장, VS Code 등 아무 텍스트 편집기로 열어 수정한 뒤 저장하면 됩니다.

### 논문 추가

`publications:` 항목을 찾아 **맨 위에** 아래 형식으로 한 덩어리를 추가하세요.

```js
{ year: "2026", category: "clinical",
  title: { ko: "국문 제목", en: "English title" },
  journal: "Journal of Clinical Oncology",
  authors: "Lee JY, et al.",
  link: "https://doi.org/10.xxxx/xxxxx" },
```

- `category` 는 `"clinical"`(임상연구) 또는 `"translational"`(중개연구) 중 하나입니다.
- `authors`, `link` 가 없으면 `""` 로 비워 두면 됩니다.
- 연도 정렬은 자동으로 됩니다. 순서 신경 쓰지 않아도 됩니다.

### 구성원 추가

`team:` → `groups:` 안에서 해당 팀의 `members:` 에 한 줄을 추가하세요.

```js
{ name: "Hong Gildong" },
```

한글 이름이나 직책을 함께 보이려면:

```js
{ name: "Hong Gildong", sub: { ko: "홍길동 · 연구간호사", en: "Research Nurse" } },
```

교수·연구책임자는 `team:` → `leadership:` 에 있습니다.

### 임상연구 추가

`iit:`(연구자 주도) 또는 `sit:`(의뢰자 주도) 에 추가합니다.
`status` 는 `"ongoing"` / `"completed"` / `"terminated"` 중 하나입니다.

### 소식 추가

`news:` 맨 위에 추가하세요. 날짜는 `"2026-10-01"` 형식입니다.
홈 화면에는 최신 3건, 연락처 페이지에는 전체가 표시됩니다.

### 연락처·이메일·지도

`contact:` 항목에 이메일과 전화번호를 넣으면 연락처 페이지에 자동으로 나타납니다.
비워 두면(`""`) 해당 줄은 표시되지 않습니다.

지도를 넣으려면 Google 지도에서 **공유 → 지도 퍼가기 → HTML 복사** 후,
`src="..."` 안의 주소만 `mapEmbed` 에 붙여넣으세요.

### 대표 숫자 / 연혁

홈 화면의 큰 숫자 4개는 `stats:`, 연혁은 `milestones:` 에서 수정합니다.

---

## 3. 수정한 내용 미리보기

`index.html` 을 더블클릭해 브라우저로 열면 바로 확인할 수 있습니다.
수정 후 반영이 안 되면 **Ctrl + F5**(강력 새로고침)를 눌러 주세요.

> 화면이 비어 보인다면 `site-data.js` 에 문법 오류(쉼표 빠짐, 따옴표 짝 안 맞음)가 있는 경우입니다.
> **F12 → Console** 탭에 오류가 난 줄 번호가 표시됩니다.

---

## 4. GitHub Pages로 인터넷에 올리기

### 처음 한 번만 하는 설정

1. **GitHub 가입** — <https://github.com> 에서 계정을 만듭니다.
2. **GitHub Desktop 설치** — <https://desktop.github.com> (명령어 없이 클릭으로 사용)
3. GitHub 웹사이트에서 **New repository** 클릭
   - Repository name: `glory-team` (원하는 이름)
   - **Public** 선택 (무료 GitHub Pages는 공개 저장소만 가능)
   - **Create repository**
4. GitHub Desktop → **File → Clone repository** → 방금 만든 저장소 선택 → 컴퓨터의 적당한 위치에 저장
5. 클론된 폴더 안에 **`glory-website` 폴더 안의 내용물 전체**를 복사해 넣습니다.
   (`glory-website` 폴더째로가 아니라, 그 **안의 파일들**을 넣어야 합니다.
   `index.html` 이 저장소 최상단에 있어야 합니다.)
6. GitHub Desktop 에서 왼쪽 아래 Summary 칸에 `첫 업로드` 라고 쓰고
   **Commit to main** → **Push origin** 클릭
7. GitHub 웹사이트의 저장소 → **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)** → **Save**
8. 1~2분 후 `https://사용자이름.github.io/glory-team/` 에서 사이트가 열립니다.

### 이후 수정할 때마다 (3단계)

1. 컴퓨터에서 `data/site-data.js` 를 수정하고 저장
2. GitHub Desktop 을 열면 변경 내역이 자동으로 보입니다 → Summary에 간단히 메모 (예: `2026년 논문 추가`)
3. **Commit to main** → **Push origin**

1분 정도 뒤 사이트에 반영됩니다.

### 커스텀 도메인 연결 (선택)

도메인을 갖고 계시다면 **Settings → Pages → Custom domain** 에 입력하고,
도메인 등록업체(가비아, Cloudflare 등)에서 아래 DNS 레코드를 추가하면 됩니다.

| 종류 | 이름 | 값 |
|---|---|---|
| CNAME | www | `사용자이름.github.io` |
| A | @ | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |

학교/병원 서브도메인을 쓰려면 전산팀에 CNAME 설정을 요청하시면 됩니다.

---

## 5. 확인이 필요한 항목

소개 자료(`TEAMGLORY 소개_20260910.pptx`)에서 자동으로 옮긴 내용 중,
아래 항목은 원본에 명시가 없거나 추정이 섞여 있으니 한 번 확인해 주세요.

| 위치 | 확인할 내용 |
|---|---|
| `milestones` | 각 연혁 항목의 **연도** — 원본 타임라인에서 정확한 연도를 확인해 주세요 |
| `publications` | 논문 **저자·정확한 제목·DOI 링크** — 현재는 주제와 학술지명만 들어 있습니다 |
| `team` | 구성원별 **직책**(연구간호사/데이터매니저/연구원)과 한글 이름 |
| `contact` | **이메일·전화번호**가 비어 있습니다 |
| `stats` | 총 연구 117건(2026년)과 92건(2025년 11월) 수치가 문서 내에서 다릅니다. 기준 시점을 정해 주세요 |

### 로고와 사진

현재는 `G` 글자를 쓴 임시 로고가 들어가 있습니다.
연세대·세브란스 공식 로고나 연구팀 단체 사진을 넣으시려면:

1. 이미지 파일을 `assets/img/` 폴더에 넣습니다 (예: `logo.png`)
2. 저에게 "로고를 assets/img/logo.png 로 바꿔줘" 라고 말씀해 주시면 반영해 드립니다.

> 공식 로고는 기관 CI 사용 지침을 따라야 하므로, 사용 전에 담당 부서에 확인하시길 권합니다.

---

## 6. 더 큰 변경이 필요할 때

메뉴 추가, 페이지 신설, 색상 변경, 레이아웃 조정 등은 여러 파일을 함께 고쳐야 합니다.
이런 작업은 저에게 말씀해 주시면 처리해 드립니다.

색상만 바꾸고 싶다면 `assets/css/style.css` 맨 위 `:root { }` 안의 색상 값만
수정하면 사이트 전체에 적용됩니다.
