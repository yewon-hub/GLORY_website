/* ==========================================================================
   GLORY Team 웹사이트 — 콘텐츠 데이터 파일
   --------------------------------------------------------------------------
   ★ 구성원 / 논문 / 임상연구 / 소식을 추가·수정하려면 이 파일만 고치면 됩니다.
   ★ HTML 파일은 건드릴 필요가 없습니다.

   작성 규칙
   1) { ko: "한국어", en: "English" } 형태는 한국어/영어 페이지에 각각 표시됩니다.
   2) 각 항목은 쉼표(,)로 구분하고, 마지막 항목 뒤 쉼표는 있어도 없어도 됩니다.
   3) 큰따옴표(") 안에 큰따옴표를 쓰려면 \" 로 적어주세요.
   4) 저장 후 브라우저에서 새로고침(Ctrl+F5)하면 바로 반영됩니다.
   5) 수정 후 화면이 비어 보이면 문법 오류입니다. F12 → Console 에 오류 위치가 나옵니다.
   ========================================================================== */

window.SITE_DATA = {

  /* 사이트 하단에 표시되는 최종 수정일 */
  lastUpdated: "2026-09-17",


  /* =======================================================================
     1. 대표 숫자  —  홈 화면 상단에 크게 표시됩니다
     ======================================================================= */
  stats: [
    { value: "117",  suffix: "",  label: { ko: "누적 연구 과제 (2026년)",         en: "Cumulative studies (2026)" } },
    { value: "22",   suffix: "",  label: { ko: "연구자 주도 임상시험 (2025.11)",  en: "Investigator-initiated trials (Nov 2025)" } },
    { value: "70",   suffix: "+", label: { ko: "의뢰자 주도 임상시험",            en: "Sponsor-initiated trials" } },
    { value: "26",   suffix: "",  label: { ko: "연구팀 구성원",                   en: "Team members" } }
  ],


  /* =======================================================================
     2. 연구팀 연혁  —  연도와 내용을 자유롭게 추가/수정하세요
     ======================================================================= */
  milestones: [
    {
      year: "2017",
      title:  { ko: "연구팀 출범", en: "Research team launched" },
      detail: { ko: "연구간호사 1명, 데이터매니저 1명, 연구원 1명으로 시작했습니다.",
                en: "Started with 1 research nurse, 1 data manager and 1 researcher." }
    },
    {
      year: "2018",
      title:  { ko: "연구자 주도 임상시험(IIT) 시작 — KGOG 3045", en: "Start of investigator-initiated trials (IIT) — KGOG 3045" },
      detail: { ko: "첫 연구자 주도 다기관 임상시험 AMBITION을 개시했습니다.",
                en: "Launched AMBITION, the team's first investigator-initiated multicenter trial." }
    },
    {
      year: "2019",
      title:  { ko: "의뢰자 주도 임상시험(SIT) 시작 · 제약사 연구과제 수주 (AZ, MSD)", en: "Start of sponsor-initiated trials (SIT) · Industry-sponsored research awarded (AZ, MSD)" },
      detail: { ko: "제약사 주도 임상시험 참여를 시작하고, AstraZeneca·MSD의 연구 과제를 수주했습니다.",
                en: "Began participating in sponsor-initiated trials and secured industry-sponsored research from AstraZeneca and MSD." }
    },
    {
      year: "2021",
      title:  { ko: "GLORY 팀 정식 구성", en: "Establishment of the GLORY Team" },
      detail: { ko: "연구간호사 9명, 연구원 3명 규모로 확대되었습니다.",
                en: "Expanded to 9 research nurses and 3 researchers." }
    },
    {
      year: "2023",
      title:  { ko: "KDDF 국가과제 선정", en: "KDDF project awarded" },
      detail: { ko: "국가신약개발사업단(KDDF)의 대규모 연구비를 수주했습니다.",
                en: "Awarded a large-scale research grant from the Korea Drug Development Fund." }
    },
    {
      year: "2024",
      title:  { ko: "글로벌 주관 임상시험 — DOVE", en: "Leading a global IIT — DOVE" },
      detail: { ko: "APGOT-OV7 / ENGOT-ov80 DOVE 연구를 국제 주관 기관으로 이끌고 있습니다.",
                en: "Leading APGOT-OV7 / ENGOT-ov80 (DOVE) as the coordinating center." }
    },
    {
      year: "2026",
      title:  { ko: "GLORY 팀 확대 · 누적 연구 117건", en: "GLORY Team expansion · 117 cumulative studies" },
      detail: { ko: "교수 4명, 연구간호사 15명, 데이터매니저 2명, 연구원 4명, 행정 1명 · 누적 연구 117건, 의뢰자 주도 임상시험 70건 이상",
                en: "4 professors, 15 research nurses, 2 data managers, 4 researchers, 1 administrative officer · 117 cumulative studies, including more than 70 SITs." }
    }
  ],


  /* =======================================================================
     3. 구성원
     --------------------------------------------------------------------
     · 사람을 추가하려면 members 배열에  { name: "이름" }  한 줄을 더하세요.
     · 한글 이름이나 직책을 함께 보이려면:
         { name: "Hong Gildong", sub: { ko: "홍길동 · 연구간호사", en: "Research Nurse" } }
     ======================================================================= */
  team: {
    leadership: [
      { name: "Jung-Yun Lee",  role: { ko: "교수 · 연구책임자",   en: "Professor · Principal Investigator" } },
      { name: "Yong Jae Lee",  role: { ko: "교수 · 임상연구팀",   en: "Professor · Clinical Research Team" } },
      { name: "Junsik Park",   role: { ko: "교수 · 중개연구팀",   en: "Professor · Translational Research Team" } },
      { name: "Yoo-Na Kim",    role: { ko: "교수 · 중개연구팀",   en: "Professor · Translational Research Team" } }
    ],

    groups: [
      {
        name: { ko: "임상연구팀", en: "Clinical Research Team" },
        lead: { ko: "Jung-Yun Lee · Yong Jae Lee", en: "Jung-Yun Lee · Yong Jae Lee" },
        desc: { ko: "연구자 주도 임상시험과 의뢰자 주도 임상시험의 설계·운영·데이터 관리를 담당합니다.",
                en: "Designs, operates and manages data for investigator- and sponsor-initiated clinical trials." },
        members: [
          { name: "Jiwon Lee" },      { name: "YuJeong Huh" },    { name: "JiHyun Lee" },
          { name: "Bona Han" },       { name: "Minji Lee" },      { name: "Soojin Kim" },
          { name: "YeSeul Kim" },     { name: "SeongHye Kang" },  { name: "HoJin Lee" },
          { name: "Eunchae Lee" },    { name: "Ayoung Park" },    { name: "Hyunkyeong Lee" },
          { name: "Seonju Oh" },      { name: "JooWon Choi" },    { name: "YeJin Cha" },
          { name: "Doyoung Seo" },    { name: "Solee Lee" },      { name: "Sungeun Hong" },
          { name: "Yujin Lee" }
        ]
      },
      {
        name: { ko: "중개연구팀 · Dry Lab", en: "Translational Research Team · Dry Lab" },
        lead: { ko: "Junsik Park · Yoo-Na Kim", en: "Junsik Park · Yoo-Na Kim" },
        desc: { ko: "유전체·전사체 데이터와 단일세포 분석을 통해 치료 반응과 내성 기전을 규명합니다.",
                en: "Uses genomic, transcriptomic and single-cell analyses to define treatment response and resistance mechanisms." },
        members: [
          { name: "SoYeon Kim" }, { name: "MinKyung Woo" }, { name: "Eunok Ji" }
        ]
      },
      {
        name: { ko: "중개연구팀 · Wet Lab", en: "Translational Research Team · Wet Lab" },
        lead: { ko: "Junsik Park · Yoo-Na Kim", en: "Junsik Park · Yoo-Na Kim" },
        desc: { ko: "환자 유래 종양 오가노이드와 면역 분석을 통해 전임상 근거를 만듭니다.",
                en: "Generates preclinical evidence through patient-derived tumoroids and immune profiling." },
        members: [
          { name: "Jiyoung Kim" }
        ]
      }
    ]
  },


  /* =======================================================================
     4. 연구자 주도 임상시험 (IIT)
     --------------------------------------------------------------------
     status 는 "ongoing" / "completed" / "terminated" 중 하나를 씁니다.
     ======================================================================= */
  iit: [
    {
      code: "KGOG 3042",
      status: "completed",
      title: { ko: "선행항암화학요법 후 중간 종양감축술에 HIPEC을 병용한 진행성 난소암 환자의 비교효과 연구 (다기관 전향적 코호트)",
               en: "Comparative effectiveness of HIPEC following interval cytoreductive surgery in advanced-stage ovarian cancer after neoadjuvant chemotherapy: a multicenter, prospective cohort study" },
      presentation: "IGCS 2022 plenary",
      publication: "JAMA Surgery"
    },
    {
      code: "KGOG 3045 · AMBITION",
      status: "completed",
      title: { ko: "백금 저항성 재발 난소암 환자를 대상으로 한 바이오마커 기반 표적치료 우산형 연구 (NCT03699449)",
               en: "An umbrella study of biomarker-driven targeted therapy in patients with platinum-resistant recurrent ovarian cancer (NCT03699449)" },
      presentation: "ASCO 2021",
      publication: "JJCO · JGO · Int J Cancer"
    },
    {
      code: "KGOG 3046 · TRU-D",
      status: "completed",
      title: { ko: "진행성 난소암에서 선행항암화학요법에 tremelimumab·durvalumab을 병용한 제2상 연구 (NCT03899610)",
               en: "A phase II study of neoadjuvant chemotherapy plus tremelimumab and durvalumab in advanced-stage ovarian cancer (NCT03899610)" },
      presentation: "SGO 2021 / 2023 plenary · AACR 2022 plenary",
      publication: "JGO · JITC · CCR"
    },
    {
      code: "OPEB-01 · APGOT-OV4",
      status: "completed",
      title: { ko: "BRCA 비변이 백금 민감성 재발 난소암에서 olaparib 유지요법에 pembrolizumab·bevacizumab을 병용한 단일군 제2상 연구 (NCT04361370)",
               en: "A single-arm phase II study of olaparib maintenance with pembrolizumab and bevacizumab in BRCA non-mutated patients with platinum-sensitive recurrent ovarian cancer (NCT04361370)" },
      presentation: "ASGO 2021 plenary",
      publication: "JGO · Nat Commun"
    },
    {
      code: "KGOG 3056 · NIRVANA-R",
      status: "ongoing",
      title: { ko: "PARP 억제제 치료 경험이 있는 백금 민감성 난소암 환자에서 niraparib·bevacizumab 유지요법 단일군 제2상 연구 (NCT04734665)",
               en: "A single-arm phase II study of niraparib and bevacizumab maintenance in platinum-sensitive ovarian cancer previously treated with a PARP inhibitor (NCT04734665)" },
      presentation: "ASCO 2022 poster · IGCS 2023 plenary",
      publication: "JGO"
    },
    {
      code: "KGOG 2032 · NIVEC",
      status: "ongoing",
      title: { ko: "가임력 보존 프로게스틴 치료에 실패한 MMRd 초기 자궁내막암 환자를 대상으로 한 nivolumab window-of-opportunity 연구 (NCT05795244)",
               en: "A window-of-opportunity study of nivolumab in early-stage MMRd endometrial cancer after failure of progestin fertility-sparing treatment (NCT05795244)" },
      presentation: "KSGO 2023 · IGCS 2023 · SGO 2025 plenary",
      publication: ""
    },
    {
      code: "KGOG 3065 · APGOT-OV6 · OPERA",
      status: "completed",
      title: { ko: "백금 재투여가 어려운 PARP 억제제 저항성 난소암·난관암·원발복막암 환자에서 oregovomab과 PLD 병용 제2상 연구",
               en: "A phase II study of oregovomab and PLD in PARP inhibitor–resistant ovarian, fallopian tube or primary peritoneal cancer not candidate for platinum retreatment" },
      presentation: "IGCS 2023 plenary · ASCO 2025 poster",
      publication: ""
    },
    {
      code: "KGOG 3067 · SOCCER-P",
      status: "ongoing",
      title: { ko: "PARP 억제제 유지요법 중 진행한 재발 난소암 환자에서 이차 종양감축술의 무작위 제2상 연구",
               en: "A randomized phase II study of secondary cytoreductive surgery in relapsed ovarian cancer progressing on PARP inhibitor maintenance" },
      presentation: "ESMO 2023",
      publication: "IJGC"
    },
    {
      code: "APGOT-OV7 · DOVE",
      status: "ongoing",
      title: { ko: "재발 부인암 투명세포암에서 dostarlimab 단독 또는 bevacizumab 병용을 비백금 항암화학요법과 비교한 3군 무작위 제2상 연구 (ENGOT-ov80)",
               en: "A three-arm randomized phase II study of dostarlimab alone or with bevacizumab versus non-platinum chemotherapy in recurrent gynecologic clear cell carcinoma (ENGOT-ov80)" },
      presentation: "GCIG 2023 · ASCO 2024",
      publication: "JGO"
    },
    {
      code: "PENELOPE in EC",
      status: "ongoing",
      title: { ko: "진행성·재발 자궁내막암 환자에서 pembrolizumab에 nesuparib(JPI-547) 병용 여부를 평가한 무작위 2군 비교 제2상 연구 (n=80)",
               en: "A randomized two-arm non-comparative phase II study of pembrolizumab with or without nesuparib (JPI-547) in advanced/recurrent endometrial cancer (n=80)" },
      presentation: "ASCO 2025",
      publication: "JGO"
    },
    {
      code: "APGOT-OV14 · TROY",
      status: "ongoing",
      title: { ko: "PARP 억제제 치료 중 진행한 HER2 발현 난소암·원발복막암·난관암에서 T-DXd와 백금 기반 항암화학요법을 비교한 무작위 연구 (n=116)",
               en: "A randomized study comparing T-DXd with platinum-based chemotherapy in HER2-expressing ovarian, primary peritoneal or fallopian tube cancer progressing on a PARP inhibitor (n=116)" },
      presentation: "ESMO 2026 (TiP)",
      publication: ""
    }
  ],


  /* =======================================================================
     5. 의뢰자 주도 임상시험 (SIT) — 발표·출판 성과가 있는 주요 연구
     ======================================================================= */
  sit: [
    { code: "DP-02",         status: "ongoing",    presentation: "IGCS 2023 · ASGO 2023 · ESMO 2025", publication: "JCO" },
    { code: "AdvanTIG-202",  status: "completed",  presentation: "ESMO 2023",                          publication: "Gynecol Oncol" },
    { code: "E7386",         status: "ongoing",    presentation: "ASCO 2024 · ASCO 2025 · ESMO 2025",  publication: "Lancet Oncol (submitted)" },
    { code: "MK4830-002",    status: "ongoing",    presentation: "AACR 2022 · ASCO 2025",              publication: "" },
    { code: "REFRaME-01",    status: "terminated", presentation: "SGO 2025 plenary",                   publication: "" },
    { code: "REGN 1721",     status: "ongoing",    presentation: "ESMO 2025",                          publication: "" }
  ],


  /* =======================================================================
     6. 임상시험 현황 통계 (2025년 11월 기준)
     ======================================================================= */
  trialStats: {
    asOf: { ko: "2025년 11월 기준 · 총 92건", en: "As of November 2025 · 92 trials total" },
    tables: [
      {
        heading: { ko: "주관 형태", en: "Initiation" },
        rows: [
          { label: { ko: "의뢰자 주도 (SIT)",     en: "Sponsor-initiated (SIT)" },          value: "70" },
          { label: { ko: "연구자 주도 (IIT)",     en: "Investigator-initiated (IIT)" },     value: "22" },
          { label: { ko: "└ 다기관 주관",          en: "└ Multicenter coordinating" },       value: "8" },
          { label: { ko: "└ 국제 주관",            en: "└ Global coordinating" },            value: "2" }
        ]
      },
      {
        heading: { ko: "임상시험 상(Phase)", en: "Phase" },
        rows: [
          { label: { ko: "1/2상",       en: "Phase I/II" },    value: "17" },
          { label: { ko: "2상",         en: "Phase II" },      value: "29" },
          { label: { ko: "3상",         en: "Phase III" },     value: "36" },
          { label: { ko: "4상 · PMS",   en: "Phase IV · PMS" }, value: "10" }
        ]
      },
      {
        heading: { ko: "암종", en: "Cancer type" },
        rows: [
          { label: { ko: "난소암",      en: "Ovarian cancer" },     value: "42" },
          { label: { ko: "자궁내막암",  en: "Endometrial cancer" },  value: "15" },
          { label: { ko: "자궁경부암",  en: "Cervical cancer" },     value: "13" },
          { label: { ko: "범종양",      en: "Pan-tumor" },           value: "22" }
        ]
      }
    ]
  },


  /* =======================================================================
     7. 바이오뱅크 — 수집 검체 현황 (2019년 ~ 2026년 9월)
     ======================================================================= */
  biobank: {
    asOf: { ko: "2019년 ~ 2026년 9월 누적", en: "Cumulative, 2019 – September 2026" },
    columns: [
      { ko: "조직 (TIL)",     en: "Tissue (TIL)" },
      { ko: "동결 조직",      en: "Fresh frozen" },
      { ko: "FFPE 블록",      en: "FFPE block" },
      { ko: "혈액 (PBMC)",    en: "Blood (PBMC)" },
      { ko: "혈액 (혈장)",    en: "Blood (plasma)" },
      { ko: "혈액 (ctDNA)",   en: "Blood (ctDNA)" },
      { ko: "복수 (TAL)",     en: "Ascites (TAL)" }
    ],
    rows: [
      { label: { ko: "난소암",     en: "Ovarian cancer" },     values: [1534, 1100, 459, 2302, 200, 731, 737] },
      { label: { ko: "자궁내막암", en: "Endometrial cancer" },  values: [603, 415, 177, 596, 0, 242, 128] },
      { label: { ko: "자궁경부암", en: "Cervical cancer" },     values: [176, 139, 64, 189, 0, 116, 28] }
    ]
  },


  /* =======================================================================
     8. 중개연구 주제
     ======================================================================= */
  translational: [
    { topic: { ko: "난소암의 종양 면역미세환경 연구",                     en: "Tumor immune microenvironment in ovarian cancer" },                               journal: "J Immunother Cancer", year: "2020" },
    { topic: { ko: "난소암 종양 오가노이드와 나노베시클",                 en: "Ovarian cancer tumoroids and nanovesicles" },                                     journal: "Adv Sci",             year: "2021" },
    { topic: { ko: "자궁내막암 호르몬 치료 무반응군 규명",                en: "Non-responders to hormone therapy in endometrial cancer" },                       journal: "Am J Obstet Gynecol", year: "2021" },
    { topic: { ko: "난소암 기능적 HRD 검사법 개발",                       en: "Development of a functional HRD assay in ovarian cancer" },                       journal: "Cancer Res",          year: "2022" },
    { topic: { ko: "선행 항암면역 병용요법의 면역학적 변화",              en: "Immune changes with neoadjuvant chemoimmunotherapy in ovarian cancer" },          journal: "AACR plenary",        year: "2022" },
    { topic: { ko: "ctDNA를 이용한 난소암 내성 기전 규명",                en: "Identification of resistance mechanisms using ctDNA in ovarian cancer" },         journal: "Clin Cancer Res",     year: "2023" },
    { topic: { ko: "PARP 억제제 치료 중 면역학적 변화",                   en: "Immunologic changes during PARP inhibitor therapy in ovarian cancer" },           journal: "Br J Cancer",         year: "2023" },
    { topic: { ko: "소형 ctDNA 패널의 임상적 유용성",                     en: "Utility of a small-sized ctDNA panel in ovarian cancer" },                        journal: "Cancer Res",          year: "2023" },
    { topic: { ko: "BRCA1/2 변이에 따른 CD8⁺ TIL 면역 소진 양상 차이",    en: "Differential immune exhaustion of CD8⁺ TILs by BRCA1/2 mutation status" },        journal: "J Immunother Cancer", year: "2024" },
    { topic: { ko: "자궁내막암에서 자궁경부세포검사 및 혈액 기반 ctDNA",  en: "PAP smear– and blood-based ctDNA in endometrial cancer" },                        journal: "Clin Cancer Res",     year: "2025" }
  ],


  /* =======================================================================
     9. 논문
     --------------------------------------------------------------------
     ★ 새 논문을 추가하려면 아래 형식으로 맨 위에 한 줄 넣으세요.
       {
         year: "2026",
         category: "clinical",                        // clinical 또는 translational
         title:   { ko: "국문 제목", en: "English title" },
         journal: "Journal Name",
         authors: "First Author, et al.",             // 없으면 "" 로 두세요
         link:    "https://doi.org/..."               // 없으면 "" 로 두세요
       },
     ======================================================================= */
  publications: [
    { year: "2025", category: "translational",
      title: { ko: "자궁내막암에서 질 도말 및 혈장 ctDNA 심층 시퀀싱을 이용한 유전체 프로파일링",
               en: "Genomic Profiling in Patients with Endometrial Cancer by Deep Sequencing of Vaginal Swabs and Plasma" },
      journal: "Clinical Cancer Research", authors: "Kim N, Kim YN, Lee K, et al.",
      link: "https://doi.org/10.1158/1078-0432.CCR-24-4263" },

    { year: "2024", category: "translational",
      title: { ko: "BRCA1/2 변이 상태에 따른 난소암 CD8⁺ 종양침윤림프구의 면역 특성과 항PD-1 재활성화 능력 차이",
               en: "Unique immune characteristics and differential anti-PD-1-mediated reinvigoration potential of CD8⁺ TILs based on BRCA1/2 mutation status in epithelial ovarian cancers" },
      journal: "Journal for ImmunoTherapy of Cancer", authors: "Park J, Kim JC, Lee YJ, et al.",
      link: "https://doi.org/10.1136/jitc-2024-009058" },

    { year: "2023", category: "translational",
      title: { ko: "BRCA 변이 난소암에서 연속 채취 ctDNA를 이용한 PARP 억제제 내성 기전 규명",
               en: "Investigation of PARP Inhibitor Resistance Based on Serially Collected Circulating Tumor DNA in Patients With BRCA-Mutated Ovarian Cancer" },
      journal: "Clinical Cancer Research", authors: "Kim YN, Shim Y, Seo J, et al.",
      link: "https://doi.org/10.1158/1078-0432.CCR-22-3715" },

    { year: "2023", category: "translational",
      title: { ko: "난소암 PARP 억제제 유지요법 반응과 말초혈액 PD-1⁺ 조절 T세포 빈도의 연관성",
               en: "Frequency of peripheral PD-1⁺ regulatory T cells is associated with treatment responses to PARP inhibitor maintenance in patients with epithelial ovarian cancer" },
      journal: "British Journal of Cancer", authors: "Park J, Kim JC, Lee M, et al.",
      link: "https://doi.org/10.1038/s41416-023-02455-z" },

    { year: "2023", category: "translational",
      title: { ko: "난소암에서 소형 NGS 패널 기반 연속 ctDNA 검사의 미세잔존질환 검출 및 예후 예측",
               en: "Serial Circulating Tumor DNA Analysis with a Tumor-Naïve Next-Generation Sequencing Panel Detects Minimal Residual Disease and Predicts Outcome in Ovarian Cancer" },
      journal: "Cancer Research", authors: "Heo J, Kim YN, Shin S, et al.",
      link: "https://doi.org/10.1158/0008-5472.CAN-23-1429" },

    { year: "2022", category: "translational",
      title: { ko: "비정상 전사체 사용(aTU)에 기반한 기능적 상동재조합결핍(HRD) 검사법 개발",
               en: "Aberrant Transcript Usage Is Associated with Homologous Recombination Deficiency and Predicts Therapeutic Response" },
      journal: "Cancer Research", authors: "Kang HG, Hwangbo H, Kim MJ, et al.",
      link: "https://doi.org/10.1158/0008-5472.CAN-21-2023" },

    { year: "2021", category: "translational",
      title: { ko: "난소암 환자 조직 유래 티슈오이드와 암세포 유래 나노베시클을 이용한 약물 반응 평가",
               en: "Cancer Patient Tissueoid with Self-Homing Nano-Targeting of Metabolic Inhibitor" },
      journal: "Advanced Science", authors: "Yoon HJ, Chung YS, Lee YJ, et al.",
      link: "https://doi.org/10.1002/advs.202102640" },

    { year: "2021", category: "translational",
      title: { ko: "자궁내막암 가임력 보존 호르몬 치료 반응과 불일치 복구(MMR) 상태의 연관성",
               en: "Mismatch repair status influences response to fertility-sparing treatment of endometrial cancer" },
      journal: "American Journal of Obstetrics and Gynecology", authors: "Chung YS, Woo HY, Lee JY, et al.",
      link: "https://doi.org/10.1016/j.ajog.2020.10.003" },

    { year: "2020", category: "translational",
      title: { ko: "난소암 원발·전이 부위 탈진 CD39⁺ CD8 T세포의 항PD-1 재활성화를 4-1BB 공동자극이 증강",
               en: "4-1BB co-stimulation further enhances anti-PD-1-mediated reinvigoration of exhausted CD39⁺ CD8 T cells from primary and metastatic sites of epithelial ovarian cancers" },
      journal: "Journal for ImmunoTherapy of Cancer", authors: "Leem G, Park J, Jeon M, et al.",
      link: "https://doi.org/10.1136/jitc-2020-001650" },

    { year: "2023", category: "clinical",
      title: { ko: "선행항암화학요법 후 중간 종양감축술에 HIPEC을 병용한 진행성 난소암 환자 연구 (KGOG 3042)",
               en: "Hyperthermic Intraperitoneal Chemotherapy After Interval Cytoreductive Surgery for Patients With Advanced-Stage Ovarian Cancer Who Had Received Neoadjuvant Chemotherapy" },
      journal: "JAMA Surgery", authors: "Lee JY, Lee YJ, Son JH, et al.",
      link: "https://doi.org/10.1001/jamasurg.2023.3944" },

    { year: "2023", category: "clinical",
      title: { ko: "HRR 변이 백금 저항성 난소암에서 olaparib + cediranib 또는 durvalumab 병용 무작위 제2상 연구 (KGOG 3045 하위연구)",
               en: "Randomized, two-arm, noncomparative phase 2 study of olaparib plus cediranib or durvalumab in HRR-mutated, platinum-resistant ovarian cancer: A substudy of KGOG 3045" },
      journal: "International Journal of Cancer", authors: "Kim YN, Joung JG, Park E, et al.",
      link: "https://doi.org/10.1002/ijc.34696" },

    { year: "2022", category: "clinical",
      title: { ko: "백금 저항성 난소암에서 바이오마커 기반 표적치료 우산형 연구 결과 (AMBITION, KGOG 3045)",
               en: "Biomarker-guided targeted therapy in platinum-resistant ovarian cancer (AMBITION; KGOG 3045): a multicentre, open-label, five-arm, uncontrolled, umbrella trial" },
      journal: "Journal of Gynecologic Oncology", authors: "Lee JY, Kim BG, Kim JW, et al.",
      link: "https://doi.org/10.3802/jgo.2022.33.e45" },

    { year: "2019", category: "clinical",
      title: { ko: "백금 저항성 재발 난소암에서 바이오마커 기반 표적치료 우산형 연구 프로토콜 (AMBITION, KGOG 3045)",
               en: "An umbrella study of biomarker-driven targeted therapy in patients with platinum-resistant recurrent ovarian cancer: a Korean Gynecologic Oncology Group study (KGOG 3045), AMBITION" },
      journal: "Japanese Journal of Clinical Oncology", authors: "Lee JY, Yi JY, Kim HS, et al.",
      link: "https://doi.org/10.1093/jjco/hyz085" },

    { year: "2025", category: "clinical",
      title: { ko: "진행성 난소암에서 선행항암화학요법과 이중 면역관문억제제 병용: TRU-D 제2상 연구 최종 분석 (KGOG 3046)",
               en: "Neoadjuvant Chemotherapy with Dual Immune Checkpoint Inhibitors for Advanced-Stage Ovarian Cancer: Final Analysis of TRU-D Phase II Nonrandomized Clinical Trial" },
      journal: "Clinical Cancer Research", authors: "Park J, Joung JG, Lim MC, et al.",
      link: "https://doi.org/10.1158/1078-0432.CCR-24-3753" },

    { year: "2023", category: "clinical",
      title: { ko: "진행성 난소암에서 선행항암화학요법과 durvalumab·tremelimumab 병용 제2상 연구: 1차 분석 (KGOG 3046, TRU-D)",
               en: "Phase II study of durvalumab and tremelimumab with front-line neoadjuvant chemotherapy in patients with advanced-stage ovarian cancer: primary analysis in the original cohort of KGOG3046/TRU-D" },
      journal: "Journal for ImmunoTherapy of Cancer", authors: "Park J, Lee JB, Lim MC, et al.",
      link: "https://doi.org/10.1136/jitc-2023-007444" },

    { year: "2019", category: "clinical",
      title: { ko: "진행성 난소암에서 선행항암화학요법과 durvalumab·tremelimumab 병용 제2상 연구 프로토콜 (KGOG 3046, TRU-D)",
               en: "A phase II study of neoadjuvant chemotherapy plus durvalumab and tremelimumab in advanced-stage ovarian cancer: a Korean Gynecologic Oncology Group Study (KGOG 3046), TRU-D" },
      journal: "Journal of Gynecologic Oncology", authors: "Lee JY, Kim JW, Lim MC, et al.",
      link: "https://doi.org/10.3802/jgo.2019.30.e112" },

    { year: "2023", category: "clinical",
      title: { ko: "BRCA 야생형 백금 민감성 재발 난소암에서 olaparib·pembrolizumab·bevacizumab 3제 유지요법 (OPEB-01, APGOT-OV4)",
               en: "Triplet maintenance therapy of olaparib, pembrolizumab and bevacizumab in women with BRCA wild-type, platinum-sensitive recurrent ovarian cancer: the multicenter, single-arm phase II study OPEB-01/APGOT-OV4" },
      journal: "Nature Communications", authors: "Kim YN, Park B, Kim JW, et al.",
      link: "https://doi.org/10.1038/s41467-023-40829-2" },

    { year: "2021", category: "clinical",
      title: { ko: "BRCA 비변이 백금 민감성 재발 난소암에서 olaparib·pembrolizumab·bevacizumab 유지요법 단일군 제2상 연구 프로토콜 (OPEB-01)",
               en: "A single-arm phase II study of olaparib maintenance with pembrolizumab and bevacizumab in BRCA non-mutated patients with platinum-sensitive recurrent ovarian cancer (OPEB-01)" },
      journal: "Journal of Gynecologic Oncology", authors: "Lee YJ, Lim MC, Kim BG, et al.",
      link: "https://doi.org/10.3802/jgo.2021.32.e31" }
  ],


  /* =======================================================================
     10. 소식 · 공지  —  홈 화면 하단에 최신 3건이 표시됩니다
     ======================================================================= */
  news: [
    {
      date: "2026-09-10",
      title: { ko: "GLORY 팀 소개 자료 업데이트",           en: "GLORY Team introduction updated" },
      body:  { ko: "연구팀 구성과 임상시험 현황을 반영한 최신 소개 자료를 정리했습니다.",
               en: "Updated the team overview with the latest composition and clinical trial portfolio." }
    },
    {
      date: "2026-06-01",
      title: { ko: "ACT-K 월례 미팅 진행",                  en: "ACT-K monthly meeting held" },
      body:  { ko: "국제 임상시험 참여 전략을 논의하는 ACT-K 정기 미팅을 진행했습니다.",
               en: "Held the regular ACT-K meeting on strategies for international clinical trial participation." }
    },
    {
      date: "2026-05-30",
      title: { ko: "APGOT-OV14 · TROY 연구 ESMO 2026 발표 예정 (TiP)", en: "APGOT-OV14 · TROY to be presented at ESMO 2026 (TiP)" },
      body:  { ko: "HER2 발현 난소암을 대상으로 한 TROY 연구를 ESMO 2026에서 Trial-in-Progress로 발표할 예정입니다.",
               en: "TROY, in HER2-expressing ovarian cancer, will be presented as a Trial-in-Progress at ESMO 2026." }
    }
  ],


  /* =======================================================================
     11. 연락처
     ======================================================================= */
  contact: {
    org:     { ko: "연세대학교 의과대학 산부인과학교실", en: "Department of Obstetrics and Gynecology, Yonsei University College of Medicine" },
    hospital:{ ko: "세브란스병원 부인암센터",            en: "Gynecologic Cancer Center, Severance Hospital" },
    address: { ko: "서울특별시 서대문구 연세로 50-1",     en: "50-1 Yonsei-ro, Seodaemun-gu, Seoul, Republic of Korea" },
    email:   "",
    phone:   "",
    /* 지도를 넣으려면 Google 지도 → 공유 → 지도 퍼가기 의 주소를 아래에 붙여넣으세요 */
    mapEmbed: ""
  }
};
