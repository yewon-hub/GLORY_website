/* ==========================================================================
   GLORY Team website - draws the content of data/site-data.js on each page.
   The data file is generated from content/glory-content.xlsx and the images/
   folders by tools/build.py. Edit the Excel file, not this script.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.SITE_DATA || {};
  var S = D.settings || {};

  function $(id) { return document.getElementById(id); }
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) { return /^(https?:|mailto:|tel:)/i.test(u || "") ? u : ""; }
  function initials(name) {
    var parts = String(name || "").trim().split(/\s+/);
    var first = parts[0] ? parts[0][0] : "";
    var last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }
  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }
  /* Settings "email" may hold several addresses, separated by a line break, comma or space */
  function emails() {
    return String(S.email || "").split(/[\s,;]+/).filter(function (e) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); });
  }
  var ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  var CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  /* ---------------------------------------------- text from Settings tab */
  document.querySelectorAll("[data-s]").forEach(function (el) {
    var v = S[el.getAttribute("data-s")];
    if (v) el.textContent = v;
  });
  if ($("js-updated") && D.built) $("js-updated").textContent = "Last updated " + D.built;

  /* --------------------------------------------------------- mobile menu */
  var menuBtn = document.querySelector(".menu-button");
  var mobileNav = $("mobile-nav");
  if (menuBtn && mobileNav) {
    var setMenu = function (open) {
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      mobileNav.classList.toggle("is-open", open);
      mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    };
    menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
    mobileNav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------------------------------------------------- shared renderers */
  function pubMeta(p) {
    var bits = [];
    if (p.journal) bits.push("<em>" + esc(p.journal) + "</em>");
    var cite = [p.year, [p.volume, p.pages].filter(Boolean).join(":")].filter(Boolean).join("; ");
    if (cite) bits.push(esc(cite));
    return bits.join(" · ");
  }
  function pubItem(p) {
    var title = esc(p.title);
    if (safeUrl(p.link)) title = '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + title + "</a>";
    var link = p.doi ? ' · <a href="' + esc(p.link) + '" target="_blank" rel="noopener">doi:' + esc(p.doi) + "</a>" : "";
    var chip = p.category ? '<span class="chip">' + (p.category === "clinical" ? "Clinical" : "Translational") + "</span>" : "";
    return '<li class="pub-item"><div><p class="pub-title">' + title + "</p>" +
      (p.authors ? '<p class="pub-authors">' + esc(p.authors) + "</p>" : "") +
      '<p class="pub-meta">' + pubMeta(p) + link + "</p></div><div>" + chip + "</div></li>";
  }
  function newsCard(n, featured) {
    var url = safeUrl(n.link);
    var heading = url
      ? '<a class="stretched" href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(n.title) + "</a>"
      : esc(n.title);
    return '<article class="news-card' + (featured ? " news-card--featured" : "") + '">' +
      (n.image ? '<img class="news-card-image" src="' + esc(n.image) + '" alt="" loading="lazy">' : "") +
      '<div class="news-card-body"><div class="news-card-top">' +
      (n.category ? '<span class="chip">' + esc(n.category) + "</span>" : "<span></span>") +
      '<span class="news-card-date">' + esc(n.date_label) + "</span></div>" +
      "<h3>" + heading + "</h3>" +
      (n.summary ? "<p>" + esc(n.summary) + "</p>" : "") +
      (url ? '<span class="news-card-more">Read more ↗</span>' : "") +
      "</div></article>";
  }

  /* ------------------------------------------------------------ lightbox */
  var lightbox = null, lbItems = [], lbIndex = 0, lbOpener = null;
  function buildLightbox() {
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Photo viewer");
    lightbox.innerHTML =
      '<button class="lightbox-btn lightbox-close" type="button" aria-label="Close">' + CLOSE + "</button>" +
      '<button class="lightbox-btn lightbox-prev" type="button" aria-label="Previous photo">' + ARROW_L + "</button>" +
      '<img alt="">' +
      '<button class="lightbox-btn lightbox-next" type="button" aria-label="Next photo">' + ARROW_R + "</button>" +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(lightbox);
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function () { showPhoto(lbIndex - 1); });
    lightbox.querySelector(".lightbox-next").addEventListener("click", function () { showPhoto(lbIndex + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPhoto(lbIndex - 1);
      if (e.key === "ArrowRight") showPhoto(lbIndex + 1);
    });
    var startX = null;
    lightbox.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }
  function showPhoto(i) {
    lbIndex = (i + lbItems.length) % lbItems.length;
    var p = lbItems[lbIndex];
    var img = lightbox.querySelector("img");
    img.src = p.src;
    img.alt = p.caption || p.album || "Photo";
    lightbox.querySelector(".lightbox-caption").innerHTML =
      esc(p.caption || p.album || "") + '<span class="lightbox-count">' + (lbIndex + 1) + " / " + lbItems.length + "</span>";
    var many = lbItems.length > 1;
    lightbox.querySelector(".lightbox-prev").hidden = !many;
    lightbox.querySelector(".lightbox-next").hidden = !many;
  }
  function openLightbox(items, index, opener) {
    if (!lightbox) buildLightbox();
    lbItems = items; lbOpener = opener || null;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    showPhoto(index);
    lightbox.querySelector(".lightbox-close").focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lbOpener) lbOpener.focus();
  }
  function photoButton(p, i) {
    return '<button class="photo" type="button" data-photo="' + i + '" aria-label="' + esc(p.caption || "Open photo " + (i + 1)) + '">' +
      '<img src="' + esc(p.thumb) + '" alt="' + esc(p.caption || "") + '" loading="lazy"' +
      (p.w ? ' width="' + p.w + '" height="' + p.h + '"' : "") + ">" +
      (p.caption ? '<span class="photo-caption">' + esc(p.caption) + "</span>" : "") + "</button>";
  }
  function bindPhotos(container, items) {
    container.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-photo]");
      if (btn) openLightbox(items, Number(btn.getAttribute("data-photo")), btn);
    });
  }
  var allPhotos = [];
  (D.gallery || []).forEach(function (a) {
    a.photos.forEach(function (p) { allPhotos.push({ src: p.src, thumb: p.thumb, w: p.w, h: p.h, caption: p.caption, album: a.title }); });
  });

  /* ================================================================ HOME */
  var heroMedia = $("js-hero-media");
  if (heroMedia && D.hero && D.hero.image) {
    var probe = new Image();
    probe.onload = function () {
      heroMedia.style.backgroundImage = 'url("' + D.hero.image + '")';
      heroMedia.classList.add("is-loaded");
      heroMedia.parentNode.classList.add("has-photo");
    };
    probe.src = D.hero.image;
  }
  if ($("js-hero-logo") && D.hero && D.hero.logo) {
    $("js-hero-logo").src = D.hero.logo;
    $("js-hero-logo").hidden = false;
  }

  if ($("js-milestones")) {
    $("js-milestones").innerHTML = (D.milestones || []).map(function (m) {
      return '<li class="timeline-item" data-reveal><span class="timeline-year">' + esc(m.year) + "</span><div>" +
        '<h3 class="timeline-title">' + esc(m.title) + "</h3>" +
        (m.detail ? '<p class="timeline-detail">' + esc(m.detail) + "</p>" : "") + "</div></li>";
    }).join("");
  }

  var slider = $("js-pub-slider");
  if (slider) {
    var pubs = D.publications || [];
    var featured = pubs.filter(function (p) { return p.featured; });
    if (!featured.length) featured = pubs.slice(0, 4);
    if (!featured.length) {
      slider.innerHTML = '<div class="pub-slide is-active"><p>Publications will appear here.</p></div>';
    } else {
      slider.setAttribute("role", "region");
      slider.setAttribute("aria-roledescription", "carousel");
      slider.setAttribute("aria-label", "Latest publications");
      slider.innerHTML = '<div class="pub-slides">' + featured.map(function (p, i) {
        return '<article class="pub-slide' + (i === 0 ? " is-active" : "") + '" aria-hidden="' + (i === 0 ? "false" : "true") + '">' +
          '<div class="pub-slide-top"><span class="chip">' + esc(p.year) + '</span><span class="pub-slide-count">' + (i + 1) + " / " + featured.length + "</span></div>" +
          "<h3>" + esc(p.title) + "</h3>" +
          (p.authors ? '<p class="pub-slide-authors">' + esc(p.authors) + "</p>" : "") +
          '<div class="pub-slide-meta">' +
          (p.journal ? "<p><b>Journal:</b> <em>" + esc(p.journal) + "</em></p>" : "") +
          (p.volume || p.pages ? "<p><b>Volume:</b> " + esc([p.volume, p.pages].filter(Boolean).join(", ")) + "</p>" : "") +
          (p.doi ? '<p><b>DOI:</b> <a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.doi) + "</a></p>"
            : (safeUrl(p.link) ? '<p><a href="' + esc(p.link) + '" target="_blank" rel="noopener">View article ↗</a></p>' : "")) +
          "</div></article>";
      }).join("") + "</div>" + (featured.length > 1
        ? '<button class="pub-arrow pub-arrow--prev" type="button" aria-label="Previous publication">' + ARROW_L + "</button>" +
          '<button class="pub-arrow pub-arrow--next" type="button" aria-label="Next publication">' + ARROW_R + "</button>" +
          '<div class="pub-dots">' + featured.map(function (_, i) {
            return '<button class="pub-dot" type="button" aria-label="Publication ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : "") + "></button>";
          }).join("") + "</div>"
        : "");
      var slides = slider.querySelectorAll(".pub-slide");
      var dots = slider.querySelectorAll(".pub-dot");
      var current = 0, timer = null;
      var go = function (i) {
        current = (i + slides.length) % slides.length;
        slides.forEach(function (s, k) {
          s.classList.toggle("is-active", k === current);
          s.setAttribute("aria-hidden", k === current ? "false" : "true");
        });
        dots.forEach(function (d, k) { if (k === current) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
      };
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var start = function () { if (!reduce && slides.length > 1) { stop(); timer = setInterval(function () { go(current + 1); }, 6500); } };
      var stop = function () { if (timer) clearInterval(timer); timer = null; };
      dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); start(); }); });
      var prev = slider.querySelector(".pub-arrow--prev"), next = slider.querySelector(".pub-arrow--next");
      if (prev) prev.addEventListener("click", function () { go(current - 1); start(); });
      if (next) next.addEventListener("click", function () { go(current + 1); start(); });
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);
      slider.addEventListener("focusin", stop);
      slider.addEventListener("focusout", start);
      start();
    }
  }

  if ($("js-home-news")) {
    var latest = (D.news || []).slice(0, 3);
    $("js-home-news").innerHTML = latest.length
      ? latest.map(function (n) { return newsCard(n, false); }).join("")
      : '<p class="empty" style="grid-column:1/-1">News will appear here.</p>';
  }

  if ($("js-home-gallery") && allPhotos.length) {
    var preview = allPhotos.slice(0, 6);
    $("js-home-gallery").innerHTML = preview.map(photoButton).join("");
    bindPhotos($("js-home-gallery"), preview);
    $("js-home-gallery-section").hidden = false;
  }

  if ($("js-contact-inline")) {
    var extra = "";
    emails().forEach(function (e) {
      extra += '<br><a href="mailto:' + esc(e) + '" style="color:var(--teal);font-weight:600">' + esc(e) + "</a>";
    });
    if (S.phone) extra += "<br>" + esc(S.phone);
    $("js-contact-inline").innerHTML = extra;
  }

  /* ============================================================ RESEARCH */
  document.querySelectorAll("[data-figure]").forEach(function (el) {
    var src = (D.research || {})[el.getAttribute("data-figure")];
    if (src) el.innerHTML = '<img src="' + esc(src) + '" alt="" loading="lazy">';
  });

  if ($("js-trials")) {
    var trials = D.trials || [];
    $("js-trials").innerHTML = trials.length ? trials.map(function (t) {
      var st = (t.status || "").toLowerCase();
      var cls = st.indexOf("ongoing") === 0 ? "chip" : st.indexOf("terminated") === 0 ? "chip chip--warn" : "chip chip--plain";
      var meta = [];
      if (t.presentation) meta.push("<b>Presented</b> " + esc(t.presentation));
      if (t.publication) meta.push("<b>Published</b> " + esc(t.publication));
      return '<div class="trial"><p class="trial-code">' + esc(t.code) + "</p>" +
        '<div class="trial-body"><p class="trial-title">' + esc(t.title) + "</p>" +
        (meta.length ? '<p class="trial-meta">' + meta.join(" &nbsp;·&nbsp; ") + "</p>" : "") + "</div>" +
        (t.status ? '<span class="' + cls + '">' + esc(t.status) + "</span>" : "<span></span>") + "</div>";
    }).join("") : '<p class="empty">Trials will appear here.</p>';
  }

  if ($("js-translational-pubs")) {
    var tr = (D.publications || []).filter(function (p) { return p.category === "translational"; }).slice(0, 4);
    $("js-translational-pubs").innerHTML = tr.length ? '<ul style="border-top:1px solid var(--line)">' + tr.map(pubItem).join("") + "</ul>" : "";
  }

  /* ============================================================== PEOPLE */
  if ($("js-people")) {
    var people = D.people || [];
    var card = function (p, kind) {
      var photo = p.photo
        ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + '" loading="lazy">'
        : '<span aria-hidden="true">' + esc(initials(p.name)) + "</span>";
      var links = [];
      if (safeUrl(p.profile_url)) links.push('<a href="' + esc(p.profile_url) + '" target="_blank" rel="noopener">View profile →</a>');
      if (p.orcid) links.push('<a class="orcid" href="https://orcid.org/' + esc(p.orcid) + '" target="_blank" rel="noopener">ORCID</a>');
      return '<article class="team-card' + (kind ? " team-card--" + kind : "") + '">' +
        '<div class="team-photo">' + photo + "</div>" +
        '<h3 class="team-name">' + esc(p.name) + (p.name_ko ? '<span class="team-name-ko">' + esc(p.name_ko) + "</span>" : "") + "</h3>" +
        (p.role ? '<p class="team-role">' + esc(p.role) + "</p>" : "") +
        (p.email ? '<a class="team-email" href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a>" : "") +
        (links.length ? '<div class="team-links">' + links.join("") + "</div>" : "") + "</article>";
    };
    /* Principal investigators: a larger card with affiliation, interests and a fold-out profile */
    var list = function (label, items) {
      return items && items.length
        ? "<h4>" + label + "</h4><ul>" + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"
        : "";
    };
    var piCard = function (p) {
      var photo = p.photo
        ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + '" loading="lazy">'
        : '<span aria-hidden="true">' + esc(initials(p.name)) + "</span>";
      var links = [];
      if (p.email) links.push('<a href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a>");
      if (safeUrl(p.profile_url)) links.push('<a href="' + esc(p.profile_url) + '" target="_blank" rel="noopener">Hospital profile →</a>');
      if (p.orcid) links.push('<a class="orcid" href="https://orcid.org/' + esc(p.orcid) + '" target="_blank" rel="noopener">ORCID</a>');
      var profile = list("Education", p.education) + list("Career", p.career) + list("Awards", p.awards);
      return '<article class="pi-card">' +
        '<div class="pi-card-head"><div class="team-photo pi-photo">' + photo + "</div><div>" +
        '<h3 class="pi-name">' + esc(p.name) + (p.name_ko ? ' <span class="pi-name-ko">' + esc(p.name_ko) + "</span>" : "") + "</h3>" +
        (p.role ? '<p class="pi-role">' + esc(p.role) + "</p>" : "") +
        (p.affiliation ? '<p class="pi-affiliation">' + esc(p.affiliation) + "</p>" : "") +
        "</div></div>" +
        (p.interests && p.interests.length ? '<div class="pi-interests">' + list("Research interests", p.interests) + "</div>" : "") +
        (profile ? '<details class="pi-details"><summary>Education and career</summary><div class="pi-profile">' + profile + "</div></details>" : "") +
        (links.length ? '<div class="team-links pi-links">' + links.join("") + "</div>" : "") +
        "</article>";
    };
    var isLead = function (p) { return /professor|principal investigator|\bpi\b/i.test(p.role || ""); };
    $("js-people").innerHTML = people.length ? (D.teams || []).map(function (team) {
      var members = people.filter(function (p) { return p.team === team; });
      var isPi = /principal investigator/i.test(team);
      var body = isPi
        ? '<div class="pi-grid' + (members.length === 1 ? " pi-grid--single" : "") + '">' + members.map(piCard).join("") + "</div>"
        : '<div class="team-grid">' + members.map(function (p) { return card(p, isLead(p) ? "lead" : ""); }).join("") + "</div>";
      return '<section class="block block--ruled" data-reveal><h2 class="block-title">' + esc(team) +
        (isPi ? "" : '<span class="team-count">' + members.length + "</span>") + "</h2>" + body + "</section>";
    }).join("") : '<p class="empty">Team members will appear here.</p>';
  }

  /* ======================================================== PUBLICATIONS */
  if ($("js-publications")) {
    var all = D.publications || [];
    var years = [];
    all.forEach(function (p) { if (p.year && years.indexOf(p.year) < 0) years.push(p.year); });
    var count = function (cat) { return all.filter(function (p) { return p.category === cat; }).length; };
    var span = years.length ? (years.length > 1 ? years[years.length - 1] + "–" + years[0] : years[0]) : "–";
    $("js-pub-stats").innerHTML = '<div class="stats-grid">' + [
      [all.length, "Publications listed"], [count("clinical"), "Clinical"],
      [count("translational"), "Translational"], [span, "Years covered"]
    ].map(function (s) {
      return '<div><div class="stat-value">' + esc(s[0]) + '</div><div class="stat-label">' + esc(s[1]) + "</div></div>";
    }).join("") + "</div>";

    var fYear = $("f-year"), fCat = $("f-category"), fSearch = $("f-search");
    fYear.insertAdjacentHTML("beforeend", years.map(function (y) { return '<option value="' + esc(y) + '">' + esc(y) + "</option>"; }).join(""));
    var wanted = new URLSearchParams(location.search).get("category");
    if (wanted === "clinical" || wanted === "translational") fCat.value = wanted;

    var renderPubs = function () {
      var q = fSearch.value.trim().toLowerCase();
      var list = all.filter(function (p) {
        if (fYear.value !== "all" && p.year !== fYear.value) return false;
        if (fCat.value !== "all" && p.category !== fCat.value) return false;
        if (q && (p.title + " " + p.authors + " " + p.journal).toLowerCase().indexOf(q) < 0) return false;
        return true;
      });
      $("js-pub-count").textContent = "Showing " + plural(list.length, "publication") + (list.length !== all.length ? " of " + all.length : "");
      var shownYears = [];
      list.forEach(function (p) { if (shownYears.indexOf(p.year) < 0) shownYears.push(p.year); });
      $("js-publications").innerHTML = list.length ? shownYears.map(function (y) {
        var items = list.filter(function (p) { return p.year === y; });
        return '<section class="year-group" id="y' + esc(y) + '"><h2>' + esc(y || "Other") + " <small>" + items.length + "</small></h2><ul>" +
          items.map(pubItem).join("") + "</ul></section>";
      }).join("") : '<p class="empty" style="margin-top:2rem">No publications match these filters.</p>';
      var nav = $("js-year-nav");
      nav.innerHTML = '<div class="year-nav-label">YEARS</div>' + shownYears.map(function (y) {
        var n = list.filter(function (p) { return p.year === y; }).length;
        return '<a href="#y' + esc(y) + '">' + esc(y) + "<small>(" + n + ")</small></a>";
      }).join("");
      nav.classList.toggle("is-ready", shownYears.length > 2);
    };
    fYear.addEventListener("change", renderPubs);
    fCat.addEventListener("change", renderPubs);
    fSearch.addEventListener("input", renderPubs);
    renderPubs();

    if (safeUrl(S.scholar_url)) {
      $("js-scholar").innerHTML = '<div class="cta-panel"><h2>Complete publication list</h2>' +
        "<p>For the full and most up-to-date list of publications, see the Google Scholar profile.</p>" +
        '<a class="btn btn--dark" href="' + esc(S.scholar_url) + '" target="_blank" rel="noopener">Google Scholar profile ↗</a></div>';
    }
  }

  /* ================================================================ NEWS */
  if ($("js-news")) {
    var news = D.news || [];
    var feat = news.filter(function (n) { return n.featured; }).slice(0, 2);
    if (feat.length) {
      $("js-news-featured").innerHTML = feat.map(function (n) { return newsCard(n, true); }).join("");
      $("js-news-featured-block").hidden = false;
    }
    var cats = [];
    news.forEach(function (n) { if (n.category && cats.indexOf(n.category) < 0) cats.push(n.category); });
    var active = "all";
    var renderNews = function () {
      var list = news.filter(function (n) { return active === "all" || n.category === active; });
      $("js-news-count").textContent = plural(list.length, "item");
      $("js-news").innerHTML = list.length
        ? list.map(function (n) { return newsCard(n, false); }).join("")
        : '<p class="empty" style="grid-column:1/-1">No news yet.</p>';
    };
    var bar = $("js-news-filter");
    if (cats.length > 1) {
      bar.innerHTML = ["all"].concat(cats).map(function (c) {
        return '<button class="filter-btn" type="button" data-cat="' + esc(c) + '" aria-pressed="' + (c === "all") + '">' + (c === "all" ? "All" : esc(c)) + "</button>";
      }).join("");
      bar.addEventListener("click", function (e) {
        var b = e.target.closest("[data-cat]");
        if (!b) return;
        active = b.getAttribute("data-cat");
        bar.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        renderNews();
      });
    } else {
      bar.hidden = true;
    }
    renderNews();
  }

  /* ============================================================= GALLERY */
  if ($("js-gallery")) {
    var albums = D.gallery || [];
    if (!albums.length) {
      $("js-gallery").innerHTML = '<p class="empty">Photos are coming soon.</p>';
    } else {
      var offset = 0;
      $("js-gallery").innerHTML = albums.map(function (a) {
        var html = '<section class="album" data-reveal><div class="album-head"><h2>' + esc(a.title) + "</h2>" +
          '<span class="album-meta">' + (a.date ? esc(a.date) + " · " : "") + plural(a.photos.length, "photo") + "</span></div>" +
          '<div class="photo-grid">' + a.photos.map(function (p, i) { return photoButton(p, offset + i); }).join("") + "</div></section>";
        offset += a.photos.length;
        return html;
      }).join("");
      bindPhotos($("js-gallery"), allPhotos);
    }
  }

  /* ============================================================= CONTACT */
  if ($("js-contact-methods")) {
    var panels = "";
    var mails = emails();
    if (mails.length) {
      panels += '<div class="contact-panel"><span class="contact-panel-number">01</span>' +
        '<p class="contact-panel-label">Email</p><h2>Write to the team</h2>' +
        '<p class="contact-panel-desc">For research collaboration, clinical trial enquiries and open positions.</p>' +
        '<ul class="contact-email-list">' + mails.map(function (e) {
          return '<li><a href="mailto:' + esc(e) + '">' + esc(e) + "</a>" +
            '<button type="button" data-copy="' + esc(e) + '">Copy</button></li>';
        }).join("") + "</ul></div>";
    }
    if (S.phone) {
      panels += '<div class="contact-panel contact-panel--dark"><span class="contact-panel-number">' + (mails.length ? "02" : "01") + "</span>" +
        '<p class="contact-panel-label">Phone</p><h2>Call the office</h2>' +
        '<p class="contact-panel-desc">Reach the research office by phone.</p>' +
        '<a class="contact-phone" href="tel:' + esc(String(S.phone).replace(/[^\d+]/g, "")) + '">' + esc(S.phone) + "</a></div>";
    }
    $("js-contact-methods").innerHTML = panels;
    $("js-contact-methods").querySelectorAll("[data-copy]").forEach(function (copy) {
      if (!navigator.clipboard) { copy.hidden = true; return; }
      copy.addEventListener("click", function () {
        navigator.clipboard.writeText(copy.getAttribute("data-copy")).then(function () {
          copy.textContent = "Copied"; copy.classList.add("is-copied");
          setTimeout(function () { copy.textContent = "Copy"; copy.classList.remove("is-copied"); }, 1800);
        });
      });
    });
    if ($("js-map-google") && safeUrl(S.map_url)) $("js-map-google").href = S.map_url;
  }

  /* ------------------------------------------------------- scroll reveal */
  var targets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("is-visible"); });
  }
})();
