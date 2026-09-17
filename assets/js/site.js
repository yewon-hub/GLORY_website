/* ==========================================================================
   GLORY Team 웹사이트 — 렌더링 스크립트
   data/site-data.js 의 내용을 각 페이지에 그려 넣습니다.
   일반적인 콘텐츠 수정에는 이 파일을 건드릴 필요가 없습니다.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.SITE_DATA;
  var LANG = document.documentElement.lang === "en" ? "en" : "ko";
  var IS_EN = LANG === "en";

  /* 다국어 필드에서 현재 언어 값을 꺼냅니다 */
  function t(v) {
    if (v === null || v === undefined) return "";
    if (typeof v === "string") return v;
    return v[LANG] || v.ko || v.en || "";
  }

  /* HTML 특수문자 escape */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function $(sel) { return document.querySelector(sel); }

  /* 해당 id 의 요소가 있을 때만 HTML을 채웁니다 */
  function fill(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  var STATUS_LABEL = {
    ongoing:    { ko: "진행 중", en: "Ongoing" },
    completed:  { ko: "완료",    en: "Completed" },
    terminated: { ko: "중단",    en: "Terminated" }
  };

  function statusBadge(s) {
    var key = (s || "ongoing").toLowerCase();
    var label = t(STATUS_LABEL[key] || STATUS_LABEL.ongoing);
    return '<span class="badge badge--' + esc(key) + '">' + esc(label) + "</span>";
  }

  function formatDate(iso) {
    var p = String(iso).split("-");
    if (p.length < 3) return iso;
    if (IS_EN) {
      var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return m[parseInt(p[1], 10) - 1] + " " + parseInt(p[2], 10) + ", " + p[0];
    }
    return p[0] + "년 " + parseInt(p[1], 10) + "월 " + parseInt(p[2], 10) + "일";
  }

  /* ---------------------------------------------------------- 모바일 메뉴 */
  var toggle = $(".nav-toggle");
  var nav = $(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  if (!D) {
    console.error("site-data.js 를 불러오지 못했습니다. 파일 경로와 문법을 확인하세요.");
    return;
  }

  /* ---------------------------------------------------------------- 통계 */
  if (D.stats) {
    fill("js-stats", D.stats.map(function (s) {
      return '<div class="stat"><div class="stat__value">' + esc(s.value) +
        (s.suffix ? "<span>" + esc(s.suffix) + "</span>" : "") +
        '</div><div class="stat__label">' + esc(t(s.label)) + "</div></div>";
    }).join(""));
  }

  /* ---------------------------------------------------------------- 연혁 */
  if (D.milestones) {
    fill("js-milestones", D.milestones.map(function (m) {
      return '<div class="timeline__item">' +
        '<div class="timeline__year">' + esc(m.year) + "</div>" +
        '<div class="timeline__title">' + esc(t(m.title)) + "</div>" +
        '<p class="timeline__detail">' + esc(t(m.detail)) + "</p></div>";
    }).join(""));
  }

  /* -------------------------------------------------------------- 연구책임자 */
  if (D.team && D.team.leadership) {
    fill("js-leadership", D.team.leadership.map(function (p) {
      var initials = p.name.split(/[\s-]+/).map(function (w) { return w[0]; }).slice(0, 2).join("");
      return '<div class="lead-card">' +
        '<div class="lead-card__avatar">' + esc(initials.toUpperCase()) + "</div>" +
        '<div><div class="lead-card__name">' + esc(p.name) + "</div>" +
        '<div class="lead-card__role">' + esc(t(p.role)) + "</div></div></div>";
    }).join(""));
  }

  /* ---------------------------------------------------------------- 팀 목록 */
  if (D.team && D.team.groups) {
    fill("js-team-groups", D.team.groups.map(function (g) {
      var count = g.members.length;
      var countLabel = IS_EN
        ? count + (count === 1 ? " member" : " members")
        : count + "명";
      return '<div class="org-node">' +
        '<h3 class="org-node__title">' + esc(t(g.name)) + "</h3>" +
        '<p class="org-node__meta">' + esc(t(g.lead)) + " · " + esc(countLabel) + "</p>" +
        (t(g.desc) ? "<p>" + esc(t(g.desc)) + "</p>" : "") +
        '<ul class="people">' + g.members.map(function (m) {
          return '<li><span class="person">' + esc(m.name) +
            (m.sub ? "<small>" + esc(t(m.sub)) + "</small>" : "") + "</span></li>";
        }).join("") + "</ul></div>";
    }).join(""));
  }

  /* ------------------------------------------------------------------ IIT */
  if (D.iit) {
    fill("js-iit", D.iit.map(function (s) {
      return "<tr><td><span class='study-code'>" + esc(s.code) + "</span>" +
        "<span class='study-title'>" + esc(t(s.title)) + "</span></td>" +
        "<td>" + statusBadge(s.status) + "</td>" +
        "<td>" + esc(s.presentation || "—") + "</td>" +
        "<td>" + (s.publication ? "<em>" + esc(s.publication) + "</em>" : "—") + "</td></tr>";
    }).join(""));
  }

  /* ------------------------------------------------------------------ SIT */
  if (D.sit) {
    fill("js-sit", D.sit.map(function (s) {
      return "<tr><td><span class='study-code'>" + esc(s.code) + "</span></td>" +
        "<td>" + statusBadge(s.status) + "</td>" +
        "<td>" + esc(s.presentation || "—") + "</td>" +
        "<td>" + (s.publication ? "<em>" + esc(s.publication) + "</em>" : "—") + "</td></tr>";
    }).join(""));
  }

  /* -------------------------------------------------------- 임상시험 통계 */
  if (D.trialStats) {
    fill("js-trial-stats", D.trialStats.tables.map(function (tb) {
      return '<div class="card"><h3>' + esc(t(tb.heading)) + "</h3><table style='min-width:0'><tbody>" +
        tb.rows.map(function (r) {
          return "<tr><td>" + esc(t(r.label)) + "</td><td class='num'>" + esc(r.value) + "</td></tr>";
        }).join("") + "</tbody></table></div>";
    }).join(""));
    var asOf = document.getElementById("js-trial-stats-asof");
    if (asOf) asOf.textContent = t(D.trialStats.asOf);
  }

  /* ------------------------------------------------------------ 바이오뱅크 */
  if (D.biobank) {
    var head = "<tr><th>" + (IS_EN ? "Cancer type" : "암종") + "</th>" +
      D.biobank.columns.map(function (c) { return "<th>" + esc(t(c)) + "</th>"; }).join("") + "</tr>";
    fill("js-biobank-head", head);
    fill("js-biobank", D.biobank.rows.map(function (r) {
      return "<tr><td><strong>" + esc(t(r.label)) + "</strong></td>" +
        r.values.map(function (v) {
          return "<td class='num'>" + (v ? v.toLocaleString("en-US") : "—") + "</td>";
        }).join("") + "</tr>";
    }).join(""));
    var bAsOf = document.getElementById("js-biobank-asof");
    if (bAsOf) bAsOf.textContent = t(D.biobank.asOf);
  }

  /* -------------------------------------------------------------- 중개연구 */
  if (D.translational) {
    fill("js-translational", D.translational.map(function (r) {
      return "<tr><td>" + esc(t(r.topic)) + "</td>" +
        "<td><em>" + esc(r.journal) + "</em></td>" +
        "<td class='num'>" + esc(r.year) + "</td></tr>";
    }).join(""));
  }

  /* ------------------------------------------------------------------ 논문 */
  if (D.publications) {
    var pubs = D.publications.slice().sort(function (a, b) { return Number(b.year) - Number(a.year); });

    function renderPubs(cat) {
      var list = cat === "all" ? pubs : pubs.filter(function (p) { return p.category === cat; });
      if (!list.length) {
        fill("js-publications", "<li style='display:block;color:var(--muted)'>" +
          (IS_EN ? "No publications in this category yet." : "해당 분류의 논문이 아직 없습니다.") + "</li>");
        return;
      }
      fill("js-publications", list.map(function (p) {
        var title = esc(t(p.title));
        if (p.link) title = '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + title + "</a>";
        return '<li><div class="pub-year">' + esc(p.year) + "</div><div>" +
          '<p class="pub-title">' + title + "</p>" +
          '<p class="pub-meta">' + (p.authors ? esc(p.authors) + " · " : "") +
          '<span class="pub-journal">' + esc(p.journal) + "</span></p></div></li>";
      }).join(""));
    }

    renderPubs("all");

    var filter = document.getElementById("js-pub-filter");
    if (filter) {
      filter.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-cat]");
        if (!btn) return;
        filter.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        renderPubs(btn.dataset.cat);
      });
    }

    /* 홈 화면 — 최근 논문 4건 */
    fill("js-publications-recent", pubs.slice(0, 4).map(function (p) {
      return '<li><div class="pub-year">' + esc(p.year) + "</div><div>" +
        '<p class="pub-title">' + esc(t(p.title)) + "</p>" +
        '<p class="pub-meta"><span class="pub-journal">' + esc(p.journal) + "</span></p></div></li>";
    }).join(""));
  }

  /* ------------------------------------------------------------------ 소식 */
  if (D.news) {
    var news = D.news.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    function renderNews(id, items) {
      fill(id, items.map(function (n) {
        return '<li><div class="news-date">' + esc(formatDate(n.date)) + "</div><div>" +
          '<p class="news-title">' + esc(t(n.title)) + "</p>" +
          (t(n.body) ? '<p class="news-body">' + esc(t(n.body)) + "</p>" : "") + "</div></li>";
      }).join(""));
    }
    renderNews("js-news", news.slice(0, 3));
    renderNews("js-news-all", news);
  }

  /* ---------------------------------------------------------------- 연락처 */
  if (D.contact) {
    var c = D.contact;
    var rows = [
      { k: { ko: "소속",   en: "Affiliation" }, v: t(c.org) },
      { k: { ko: "센터",   en: "Center" },      v: t(c.hospital) },
      { k: { ko: "주소",   en: "Address" },     v: t(c.address) }
    ];
    if (c.email) rows.push({ k: { ko: "이메일", en: "Email" }, v: '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>", raw: true });
    if (c.phone) rows.push({ k: { ko: "전화",   en: "Phone" }, v: esc(c.phone), raw: true });

    fill("js-contact", rows.map(function (r) {
      return '<li><span class="contact-key">' + esc(t(r.k)) + "</span><span>" +
        (r.raw ? r.v : esc(r.v)) + "</span></li>";
    }).join(""));

    var map = document.getElementById("js-map");
    if (map && c.mapEmbed) {
      map.innerHTML = '<iframe src="' + esc(c.mapEmbed) + '" width="100%" height="320" style="border:0;border-radius:12px" ' +
        'allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
    }
  }

  /* -------------------------------------------------------------- 최종 수정일 */
  document.querySelectorAll(".js-updated").forEach(function (el) {
    el.textContent = (IS_EN ? "Last updated: " : "최종 수정: ") + formatDate(D.lastUpdated);
  });

  /* ------------------------------------------------------------ 연도 자동 표시 */
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
