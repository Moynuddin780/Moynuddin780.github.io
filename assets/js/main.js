/* ==========================================================================
   Portfolio renderer
   Reads window.PORTFOLIO (from data.js) and builds the whole page.
   You normally never need to edit this file, edit data.js instead.
   ========================================================================== */
(() => {
  "use strict";

  /* ---------- Small helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const list = (x) => (Array.isArray(x) ? x : []);
  const has = (v) => v != null && String(v).trim() !== "";
  const pad = (n) => String(n).padStart(2, "0");
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ESC[c]);
  const safeUrl = (u) => (/^\s*(javascript|data):/i.test(String(u)) ? "#" : String(u));
  const isExternal = (u) => /^(https?:)?\/\//i.test(String(u));
  const extAttrs = (u) => (isExternal(u) ? ' target="_blank" rel="noopener noreferrer"' : "");
  const href = (u) => esc(safeUrl(u));
  const slug = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const prettyUrl = (u) => String(u).replace(/^https?:\/\/(www\.)?/, "").replace(/[?#].*$/, "").replace(/\/$/, "");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* **bold**, *italic* and [text](url) inside text fields */
  const md = (s) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, url) => `<a href="${safeUrl(url)}"${extAttrs(url)}>${text}</a>`);

  /* ---------- Icons (inline SVG) ---------- */
  const STROKE = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    github: { fill: true, p: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>' },
    linkedin: { fill: true, p: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>' },
    leetcode: { fill: true, p: '<path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>' },
    x: { fill: true, p: '<path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z"/>' },
    youtube: { p: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>' },
    kaggle: { p: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>' },
    scholar: { p: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>' },
    medium: { p: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>' },
    huggingface: { p: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>' },
    link: { p: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' },
    mail: { p: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>' },
    phone: { p: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>' },
    pin: { p: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>' },
    download: { p: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>' },
    arrowRight: { p: '<path d="M5 12h14M13 6l6 6-6 6"/>' },
    arrowLeft: { p: '<path d="M19 12H5M11 18l-6-6 6-6"/>' },
    arrowUp: { p: '<path d="M12 19V5M6 11l6-6 6 6"/>' },
    arrowUpRight: { p: '<path d="M7 17 17 7M8 7h9v9"/>' },
    play: { p: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/>' },
    playFill: { fill: true, p: '<path d="M8 5.6v12.8a1 1 0 0 0 1.52.85l10.4-6.4a1 1 0 0 0 0-1.7L9.52 4.75A1 1 0 0 0 8 5.6z"/>' },
    code: { p: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>' },
    paper: { p: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>' },
    copy: { p: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' },
    check: { p: '<path d="M20 6 9 17l-5-5"/>' },
    sun: { p: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>' },
    moon: { p: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>' },
    menu: { p: '<path d="M4 8h16M4 16h16"/>' },
    close: { p: '<path d="M18 6 6 18M6 6l12 12"/>' },
  };
  const icon = (name, cls = "") => {
    const i = ICONS[name] || ICONS.link;
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" ${i.fill ? 'fill="currentColor"' : STROKE}>${i.p}</svg>`;
  };

  /* Labels and icons for the keys used in `links: { ... }` */
  const LINKS = {
    github: ["Source code", "github"],
    code: ["Code", "code"],
    demo: ["Watch demo", "play"],
    video: ["Watch video", "play"],
    live: ["Live app", "arrowUpRight"],
    paper: ["Read paper", "paper"],
    pdf: ["PDF", "paper"],
    doi: ["DOI", "link"],
    docs: ["Docs", "paper"],
    slides: ["Slides", "paper"],
    linkedin: ["LinkedIn post", "linkedin"],
    certificate: ["View certificate", "paper"],
  };
  const linkMeta = (key) => {
    const m = LINKS[key];
    return m ? { label: m[0], icon: m[1] } : { label: key.charAt(0).toUpperCase() + key.slice(1), icon: "link" };
  };
  /* A link value is a URL string, or { url, label } for a custom button text */
  const linkUrl = (v) => (v && typeof v === "object" ? v.url : v);
  const linkLabel = (key, v) => (v && typeof v === "object" && has(v.label) ? v.label : linkMeta(key).label);

  /* ---------- Data guard ---------- */
  const D = window.PORTFOLIO;
  if (!D) return showError(window.__dataError);

  const P = D.profile || {};
  const nameWords = String(P.name || "").trim().split(/\s+/).filter(Boolean);
  const initials = P.initials || (nameWords[0] || "").charAt(0) + (nameWords.length > 1 ? nameWords[nameWords.length - 1].charAt(0) : "");
  // Projects keep the order written in data.js (the same order as the résumé)
  const projects = list(D.projects).map((p, i) => ({ ...p, id: has(p.id) ? slug(p.id) : slug(p.title) || "project-" + (i + 1) }));
  const certs = list(D.certifications).map((c, i) => ({ ...c, id: has(c.id) ? slug(c.id) : "certificate-" + (i + 1) }));
  const H = Object.assign(
    {
      about: "From raw data to *deployed* systems.",
      experience: "Where I’ve *worked*.",
      work: "Selected *work*.",
      workIntro: "Real-time systems I’ve designed, trained and deployed. Open any project for the demo video and the full breakdown.",
      explainer: "Tracking, *explained*.",
      explainerIntro: "A walk-through I recorded on how a tracker remembers what it has seen, so the same person keeps the same ID from one frame to the next.",
      research: "Research & *publications*.",
      researchIntro: "Applied AI research, with a focus on healthcare.",
      expertise: "The *toolkit*.",
      expertiseIntro: "Frameworks and tools I use to take models from idea to production.",
      education: "Education & *certificates*.",
    },
    D.headings || {}
  );

  /* ---------- Project media: local videos, LinkedIn posts, Drive / YouTube embeds ---------- */
  function embedUrl(url) {
    let m;
    if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/))) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
    if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return `https://player.vimeo.com/video/${m[1]}`;
    if ((m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) return `https://drive.google.com/file/d/${m[1]}/preview`;
    if ((m = url.match(/loom\.com\/share\/(\w+)/))) return `https://www.loom.com/embed/${m[1]}`;
    return null;
  }

  function mediaList(p) {
    const out = [];
    list(p.media).forEach((m) => {
      if (!m) return;
      if (m.type === "video" && has(m.src)) out.push({ ...m, kind: "video", label: m.label || "Demo video" });
      else if (m.type === "linkedin" && has(m.id)) {
        out.push({
          ...m,
          kind: "linkedin",
          label: m.label || "LinkedIn post",
          src: `https://www.linkedin.com/embed/feed/update/urn:li:activity:${encodeURIComponent(m.id)}`,
          url: m.url || `https://www.linkedin.com/feed/update/urn:li:activity:${encodeURIComponent(m.id)}/`,
        });
      } else if (m.type === "drive" && has(m.id)) out.push({ ...m, kind: "embed", label: m.label || "Demo video", src: `https://drive.google.com/file/d/${encodeURIComponent(m.id)}/preview` });
      else if ((m.type === "embed" || m.type === "youtube") && has(m.url)) {
        const src = embedUrl(String(m.url));
        if (src) out.push({ ...m, kind: "embed", label: m.label || "Video", src });
      }
    });
    if (has(p.video)) {
      const src = embedUrl(String(p.video));
      if (src) out.push({ kind: "embed", label: "Video", src });
      else if (/\.(mp4|webm|mov)(\?|$)/i.test(p.video)) out.push({ kind: "video", label: "Video", src: p.video });
    }
    return out;
  }
  const cardPoster = (p, media) => (media.find((m) => has(m.poster)) || {}).poster || p.image || "";

  /* ======================================================================
     SECTION BUILDERS, each returns null when there is nothing to show
     ====================================================================== */

  function tags(items, max) {
    const all = list(items).filter(has);
    if (!all.length) return "";
    const shown = max ? all.slice(0, max) : all;
    const more = max && all.length > max ? `<li class="tag tag--more">+${all.length - max}</li>` : "";
    return `<ul class="tags">${shown.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}${more}</ul>`;
  }

  function linkButtons(links, small) {
    const entries = Object.entries(links || {}).filter(([, v]) => has(linkUrl(v)));
    if (!entries.length) return "";
    return `<div class="link-row">${entries
      .map(([k, v]) => {
        const u = linkUrl(v);
        return `<a class="btn btn--ghost${small ? " btn--sm" : ""}" href="${href(u)}"${extAttrs(u)}>${icon(linkMeta(k).icon)}<span>${esc(linkLabel(k, v))}</span></a>`;
      })
      .join("")}</div>`;
  }

  function statValue(v) {
    const pubs = list(D.publications);
    if (v === "auto:projects") return projects.length;
    if (v === "auto:publications") return pubs.length;
    if (v === "auto:accepted") return pubs.filter((p) => /accept|publish/i.test(p.status || "")).length;
    return v;
  }

  function buildHeader(nav) {
    return `<div class="container header__inner">
      <a class="brand" href="#top" aria-label="${esc(P.name)}, back to top">
        <span class="brand__mark" aria-hidden="true">${esc(initials)}</span>
        <span class="brand__name">${esc(P.name)}</span>
      </a>
      <nav class="nav" id="site-nav" aria-label="Primary">
        <ul class="nav__list">${nav.map((s) => `<li><a class="nav__link" href="#${s.id}">${esc(s.nav)}</a></li>`).join("")}</ul>
      </nav>
      <div class="header__actions">
        ${has(P.resume) ? `<a class="btn btn--primary btn--sm" href="${href(P.resume)}" target="_blank" rel="noopener">${icon("download")}<span>Résumé</span></a>` : ""}
        <button class="icon-btn" type="button" id="theme-toggle"></button>
        <button class="icon-btn menu-toggle" type="button" id="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">${icon("menu")}</button>
      </div>
    </div>`;
  }

  function buildHero() {
    const stats = list(D.stats)
      .map((s) => ({ ...s, value: statValue(s.value) }))
      .filter((s) => has(s.value) && String(s.value) !== "0");
    const socials = list(P.socials);
    return `<section class="hero" id="top">
      <div class="container hero__grid">
        <div class="hero__text">
          ${has(P.availability) ? `<p class="status"><span class="status__dot" aria-hidden="true"></span>${esc(P.availability)}</p>` : ""}
          <h1 class="hero__name">${esc(P.name)}</h1>
          ${has(P.role) ? `<p class="hero__role">${esc(P.role)}</p>` : ""}
          ${has(P.headline) ? `<p class="hero__lead">${md(P.headline)}</p>` : ""}
          <div class="hero__actions">
            ${projects.length ? `<a class="btn btn--primary" href="#work">View selected work ${icon("arrowRight", "icon--nudge")}</a>` : ""}
            ${has(P.resume) ? `<a class="btn btn--ghost" href="${href(P.resume)}" download>${icon("download")} Download résumé</a>` : ""}
          </div>
          ${socials.length ? `<ul class="hero__socials">${socials
            .map((s) => `<li><a href="${href(s.url)}" target="_blank" rel="noopener noreferrer">${icon(s.icon)}<span>${esc(s.label)}</span></a></li>`)
            .join("")}</ul>` : ""}
        </div>
        ${has(P.photo) ? `<figure class="hero__portrait">
          <div class="hero__frame"><img src="${href(P.photo)}" alt="Portrait of ${esc(P.name)}" width="368" height="460" fetchpriority="high" /></div>
          ${has(P.location) ? `<figcaption class="hero__caption">${icon("pin")}<span>${esc(P.location)}</span></figcaption>` : ""}
        </figure>` : ""}
      </div>
      ${stats.length ? `<div class="container"><dl class="stats">${stats
        .map((s) => `<div class="stat"><dt class="stat__label">${esc(s.label)}</dt><dd class="stat__value">${esc(s.value)}</dd></div>`)
        .join("")}</dl></div>` : ""}
    </section>`;
  }

  function buildAbout() {
    const A = D.about || {};
    const paras = list(A.paragraphs).filter(has);
    if (!paras.length) return null;
    const facts = list(A.facts).filter((f) => f && has(f.value));
    return {
      title: md(H.about),
      body: `<div class="about">
        <div class="about__text" data-reveal>${paras.map((p, i) => `<p${i === 0 ? ' class="about__lead"' : ""}>${md(p)}</p>`).join("")}</div>
        ${facts.length ? `<dl class="facts" data-reveal>${facts
          .map((f) => `<div class="facts__row"><dt>${esc(f.label)}</dt><dd>${md(f.value)}</dd></div>`)
          .join("")}</dl>` : ""}
      </div>`,
    };
  }

  function buildExperience() {
    const jobs = list(D.experience);
    if (!jobs.length) return null;
    return {
      title: md(H.experience),
      body: `<ol class="rows">${jobs
        .map(
          (x) => `<li class="row" data-reveal>
          <p class="row__side">${esc(x.period)}</p>
          <div class="row__main">
            <h3 class="row__title">${esc(x.role)}${has(x.company) ? ` <span class="row__at">· ${has(x.url) ? `<a href="${href(x.url)}"${extAttrs(x.url)}>${esc(x.company)}</a>` : esc(x.company)}</span>` : ""}</h3>
            ${has(x.location) ? `<p class="row__meta">${esc(x.location)}</p>` : ""}
            ${list(x.points).length ? `<ul class="bullets">${x.points.map((p) => `<li>${md(p)}</li>`).join("")}</ul>` : ""}
            ${tags(x.stack)}
            ${linkButtons(x.links, true)}
          </div>
        </li>`
        )
        .join("")}</ol>`,
    };
  }

  /* Decorative cover drawn when a project has no image */
  function cover(p, i) {
    const variant = `v${i % 3}`;
    const label = esc(String(list(p.stack)[0] || p.category || "").toLowerCase());
    if (/generative|llm|nlp|language|rag|agent|chat/i.test(p.category || "")) {
      return `<div class="cover cover--lang ${variant}" aria-hidden="true">
        <div class="cover__lines"><span class="cover__tag">${label}</span><i></i><i></i><i></i><i></i><i></i></div>
      </div>`;
    }
    return `<div class="cover cover--vision ${variant}" aria-hidden="true">
      <div class="cover__box cover__box--a"><span class="cover__tag">${label}</span></div>
      <div class="cover__box cover__box--b"></div>
      <span class="cover__scan"></span>
    </div>`;
  }

  function card(p, i, wide, k) {
    const L = p.links || {};
    const quick = ["github", "live", "demo", "linkedin"].filter((key) => has(linkUrl(L[key])));
    const media = mediaList(p);
    const poster = cardPoster(p, media);
    const chips = [...new Set(media.map((m) => (m.kind === "linkedin" ? "LinkedIn video" : m.label)))];
    // A project with a local video plays it silently inside the card while the card is on screen
    const clip = media.find((m) => m.kind === "video");
    const thumb = clip
      ? `<video class="card__video" muted loop playsinline preload="none" disablepictureinpicture disableremoteplayback aria-hidden="true" tabindex="-1" data-autoplay data-src="${href(clip.src)}"${has(poster) ? ` poster="${href(poster)}"` : ""}${has(clip.position) ? ` style="object-position:${esc(clip.position)}"` : ""}></video>`
      : has(poster)
        ? `<img src="${href(poster)}" alt="" loading="lazy" decoding="async" />`
        : cover(p, i);
    return `<article class="card${wide ? " card--wide" : ""}" data-reveal style="--d:${(k % 2) * 0.08}s">
      <div class="card__media${clip ? " card__media--clip" : ""}">${thumb}
        ${media.length ? `<span class="card__play" aria-hidden="true">${icon("playFill")}</span><ul class="card__chips">${chips.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
      </div>
      <div class="card__body">
        <p class="card__meta"><span class="card__num">${pad(i + 1)}</span>${has(p.category) ? `<span>${esc(p.category)}</span>` : ""}${has(p.year) ? `<span>${esc(p.year)}</span>` : ""}</p>
        <h3 class="card__title"><button type="button" class="card__open" data-project="${esc(p.id)}">${esc(p.title)}</button></h3>
        ${has(p.summary) ? `<p class="card__summary">${md(p.summary)}</p>` : ""}
        ${tags(p.stack, 4)}
        <div class="card__foot">
          <span class="card__cta" aria-hidden="true">View project ${icon("arrowRight")}</span>
          ${quick.length ? `<div class="card__links">${quick
            .map((key) => {
              const m = linkMeta(key);
              return `<a class="icon-btn icon-btn--sm" href="${href(linkUrl(L[key]))}" target="_blank" rel="noopener noreferrer" aria-label="${esc(linkLabel(key, L[key]))}: ${esc(p.title)}" title="${esc(linkLabel(key, L[key]))}">${icon(m.icon)}</a>`;
            })
            .join("")}</div>` : ""}
        </div>
      </div>
    </article>`;
  }

  function renderGrid(filter) {
    const grid = $("#project-grid");
    if (!grid) return;
    autoplay.forget(grid);
    const items = projects.map((p, i) => ({ p, i })).filter(({ p }) => filter === "*" || p.category === filter);
    // With an odd number of cards, the last one spans the full width so the grid stays even
    // and the cards keep the order written in data.js.
    grid.innerHTML = items.map(({ p, i }, k) => card(p, i, items.length % 2 === 1 && k === items.length - 1, k)).join("");
    observeReveal(grid);
    autoplay.watch(grid);
  }

  function buildMoreWork() {
    const more = list(D.moreWork);
    if (!more.length) return "";
    const gh = list(P.socials).find((s) => s.icon === "github");
    return `<div class="more" data-reveal>
      <div class="more__head">
        <h3 class="more__title">More experiments</h3>
        ${gh ? `<a class="link-arrow" href="${href(gh.url)}" target="_blank" rel="noopener noreferrer">All repositories ${icon("arrowUpRight")}</a>` : ""}
      </div>
      <ul class="more__list">${more
        .map((x) => {
          const inner = `<span class="more__name">${esc(x.title)}</span>
            <span class="more__desc">${md(x.description)}</span>
            <span class="more__tags">${list(x.tags).map(esc).join(" · ")}</span>
            ${has(x.url) ? icon("arrowUpRight", "more__icon") : ""}`;
          return `<li>${has(x.url) ? `<a class="more__item" href="${href(x.url)}"${extAttrs(x.url)}>${inner}</a>` : `<div class="more__item">${inner}</div>`}</li>`;
        })
        .join("")}</ul>
    </div>`;
  }

  function buildWork() {
    if (!projects.length) return null;
    const cats = [...new Set(projects.map((p) => p.category).filter(has))];
    const filters =
      cats.length > 1
        ? `<div class="filters" role="group" aria-label="Filter projects by category" data-reveal>
          <button type="button" class="filter" data-filter="*" aria-pressed="true">All <span>${projects.length}</span></button>
          ${cats
            .map((c) => `<button type="button" class="filter" data-filter="${esc(c)}" aria-pressed="false">${esc(c)} <span>${projects.filter((p) => p.category === c).length}</span></button>`)
            .join("")}
        </div>`
        : "";
    return {
      title: md(H.work),
      intro: md(H.workIntro),
      body: `${filters}<div class="grid" id="project-grid"></div>${buildMoreWork()}`,
      after: () => renderGrid("*"),
    };
  }

  function boldOwnName(authors) {
    const last = nameWords[nameWords.length - 1];
    if (!last) return esc(authors);
    return esc(authors)
      .split(",")
      .map((a) => (new RegExp(`\\b${last}\\b`, "i").test(a) ? `<strong>${a.trim()}</strong>` : a.trim()))
      .join(", ");
  }

  /* Explainer: a long-form video with the idea written out next to it */
  function buildExplainer() {
    const items = list(D.explainers).filter((x) => x && x.video && has(x.video.src));
    if (!items.length) return null;
    return {
      title: md(H.explainer),
      intro: md(H.explainerIntro),
      body: items
        .map((x) => {
          const v = x.video;
          const steps = list(x.steps).filter((s) => s && has(s.title));
          const meta = [x.kicker, v.duration].filter(has).map(esc).join('<span aria-hidden="true"> · </span>');
          return `<article class="explain" data-reveal>
            <figure class="explain__media">
              <div class="stage stage--video"${ratio(v)}><video controls muted loop playsinline preload="none" data-autoplay data-src="${href(v.src)}"${has(v.poster) ? ` poster="${href(v.poster)}"` : ""} aria-label="${esc(v.label || x.title)}">Your browser can’t play this video.</video></div>
              ${has(v.label) ? `<figcaption class="explain__cap">${icon("playFill")}<span>${esc(v.label)}${has(v.duration) ? ` · ${esc(v.duration)}` : ""}</span></figcaption>` : ""}
            </figure>
            <div class="explain__text">
              ${meta ? `<p class="detail__meta"><span>${meta}</span></p>` : ""}
              ${has(x.title) ? `<h3 class="explain__title">${md(x.title)}</h3>` : ""}
              ${has(x.summary) ? `<p class="explain__lead">${md(x.summary)}</p>` : ""}
              ${steps.length ? `<ol class="steps">${steps
                .map((s, n) => `<li class="steps__item"><span class="steps__n" aria-hidden="true">${n + 1}</span><div><h4 class="steps__title">${md(s.title)}</h4>${has(s.text) ? `<p>${md(s.text)}</p>` : ""}</div></li>`)
                .join("")}</ol>` : ""}
              ${has(x.note) ? `<p class="explain__note">${md(x.note)}</p>` : ""}
              ${tags(x.tags)}
            </div>
          </article>`;
        })
        .join(""),
    };
  }

  function buildResearch() {
    const pubs = list(D.publications);
    if (!pubs.length) return null;
    return {
      title: md(H.research),
      intro: md(H.researchIntro),
      body: `<ol class="pubs">${pubs
        .map((p, i) => {
          const solid = /accept|publish/i.test(p.status || "");
          const title = has(p.url) ? `<a href="${href(p.url)}"${extAttrs(p.url)}>${esc(p.title)}</a>` : esc(p.title);
          const venue = [p.venue, p.year].filter(has).join(", ");
          return `<li class="pub" data-reveal>
            <div class="pub__side">
              <span class="pub__num">${pad(i + 1)}</span>
              ${has(p.status) ? `<span class="badge ${solid ? "badge--solid" : "badge--outline"}">${esc(p.status)}</span>` : ""}
            </div>
            <div class="pub__main">
              <h3 class="pub__title">${title}</h3>
              ${has(p.authors) ? `<p class="pub__authors">${boldOwnName(p.authors)}</p>` : ""}
              ${venue ? `<p class="pub__venue">${esc(venue)}</p>` : ""}
              ${has(p.summary) ? `<p class="pub__summary">${md(p.summary)}</p>` : ""}
              <div class="pub__foot">${tags(p.tags)}${linkButtons(p.links, true)}</div>
            </div>
          </li>`;
        })
        .join("")}</ol>`,
    };
  }

  function buildExpertise() {
    const groups = list(D.skills);
    if (!groups.length) return null;
    return {
      title: md(H.expertise),
      intro: md(H.expertiseIntro),
      body: `<div class="skills" data-reveal>${groups
        .map(
          (g, i) => `<article class="skill">
          <p class="skill__num">${pad(i + 1)}</p>
          <h3 class="skill__title">${esc(g.group)}</h3>
          ${has(g.description) ? `<p class="skill__desc">${md(g.description)}</p>` : ""}
          ${tags(g.items)}
        </article>`
        )
        .join("")}</div>`,
    };
  }

  function buildEducation() {
    const edu = list(D.education);
    const awards = list(D.awards);
    if (!edu.length && !certs.length && !awards.length) return null;
    const eduHtml = edu.length
      ? `<ol class="rows">${edu
          .map(
            (e) => `<li class="row" data-reveal>
            <p class="row__side">${esc(e.period)}</p>
            <div class="row__main">
              <h3 class="row__title">${esc(e.school)}</h3>
              ${has(e.degree) ? `<p class="row__sub">${esc(e.degree)}</p>` : ""}
              ${has(e.location) || has(e.details) ? `<p class="row__meta">${[e.location, e.details].filter(has).map(md).join(" · ")}</p>` : ""}
            </div>
          </li>`
          )
          .join("")}</ol>`
      : "";
    const certHtml = certs.length
      ? `<h3 class="subhead" data-reveal>Certificates</h3>
        <ul class="certs">${certs
          .map((c) => {
            const meta = esc([c.issuer, c.year].filter(has).join(" · "));
            const text = `<span class="cert__text"><span class="cert__name">${esc(c.name)}</span><span class="cert__meta">${meta}</span></span>`;
            const thumb = has(c.preview) ? `<span class="cert__thumb"><img src="${href(c.preview)}" alt="" loading="lazy" decoding="async" /></span>` : "";
            // With a preview the card opens the in-page viewer; otherwise it is a plain link to c.url / c.file
            if (has(c.preview) || has(c.file)) return `<li data-reveal><button type="button" class="cert cert--doc" data-cert="${esc(c.id)}" aria-label="View certificate: ${esc(c.name)}">${thumb}${text}${icon("arrowUpRight", "cert__icon")}</button></li>`;
            const url = c.url;
            return `<li data-reveal>${has(url) ? `<a class="cert" href="${href(url)}"${extAttrs(url)}>${text}${icon("arrowUpRight", "cert__icon")}</a>` : `<div class="cert">${text}</div>`}</li>`;
          })
          .join("")}</ul>`
      : "";
    const awardHtml = awards.length
      ? `<h3 class="subhead" data-reveal>Honours &amp; awards</h3>
        <ol class="rows">${awards
          .map(
            (a) => `<li class="row row--compact" data-reveal>
            <p class="row__side">${esc(a.year)}</p>
            <div class="row__main"><p class="row__sub"><strong>${esc(a.title)}</strong>${has(a.detail) ? `, ${md(a.detail)}` : ""}</p></div>
          </li>`
          )
          .join("")}</ol>`
      : "";
    return { title: md(H.education), body: eduHtml + certHtml + awardHtml };
  }

  function buildContact() {
    const C = D.contact || {};
    const socials = list(P.socials);
    if (!has(P.email) && !socials.length) return null;
    const channels = [
      has(P.phone)
        ? `<li><a class="channel" href="tel:${esc(String(P.phone).replace(/[^\d+]/g, ""))}">${icon("phone")}<span class="channel__label">Phone</span><span class="channel__value">${esc(P.phone)}</span></a></li>`
        : "",
      ...socials.map(
        (s) => `<li><a class="channel" href="${href(s.url)}" target="_blank" rel="noopener noreferrer">${icon(s.icon)}<span class="channel__label">${esc(s.label)}</span><span class="channel__value">${esc(prettyUrl(s.url))}</span>${icon("arrowUpRight", "channel__arrow")}</a></li>`
      ),
    ].join("");
    return {
      title: md(C.title || "Get in *touch*."),
      intro: has(C.text) ? md(C.text) : "",
      body: `<div class="contact">
        ${has(P.email) ? `<div class="contact__mail" data-reveal>
          <a class="contact__email" href="mailto:${esc(P.email)}">${esc(P.email)}</a>
          <button class="btn btn--ghost btn--sm" type="button" id="copy-email" data-email="${esc(P.email)}">${icon("copy")}<span>Copy email</span></button>
        </div>` : ""}
        ${channels ? `<ul class="channels" data-reveal>${channels}</ul>` : ""}
      </div>`,
    };
  }

  function buildFooter() {
    return `<div class="container footer__inner">
      <p>© ${new Date().getFullYear()} ${esc(P.name)}</p>
      ${list(P.socials).length ? `<ul class="footer__socials">${list(P.socials)
        .map((s) => `<li><a class="icon-btn icon-btn--sm" href="${href(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)}">${icon(s.icon)}</a></li>`)
        .join("")}</ul>` : ""}
      <a class="link-arrow" href="#top">Back to top ${icon("arrowUp")}</a>
    </div>`;
  }

  /* ======================================================================
     PROJECT DETAIL + CERTIFICATE VIEWER (modal)
     ====================================================================== */

  const MEDIA_ICON = { video: "playFill", linkedin: "linkedin", embed: "playFill" };

  /* Optional  ratio: "1280 / 604"  on a video makes its frame fit the picture exactly (no black bars) */
  const ratio = (m) => (has(m.ratio) && /^[\d.]+\s*\/\s*[\d.]+$/.test(String(m.ratio).trim()) ? ` style="aspect-ratio:${esc(String(m.ratio).trim())}"` : "");

  /* The player / embed shown for one media item */
  function stage(m) {
    if (!m) return "";
    if (m.kind === "video") {
      // Opens already playing (silently), the browser’s controls are there to unmute, pause or go full screen
      return `<div class="stage stage--video"${ratio(m)}><video controls playsinline preload="metadata"${reduceMotion ? "" : " autoplay muted"}${has(m.poster) ? ` poster="${href(m.poster)}"` : ""}><source src="${href(m.src)}" type="video/mp4" />Your browser can’t play this video.</video></div>`;
    }
    if (m.kind === "linkedin") {
      return `<div class="stage stage--post"><iframe src="${esc(m.src)}" title="${esc(m.label)} on LinkedIn" loading="lazy" allowfullscreen></iframe></div>
        <p class="stage__note">Post not loading? <a href="${href(m.url)}" target="_blank" rel="noopener noreferrer">Open it on LinkedIn ${icon("arrowUpRight")}</a></p>`;
    }
    return `<div class="stage stage--video"><iframe src="${esc(m.src)}" title="${esc(m.label)}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
  }

  function mediaColumn(media) {
    const tabs =
      media.length > 1
        ? `<div class="media-tabs" role="tablist" aria-label="Project media">${media
            .map((m, n) => `<button type="button" role="tab" class="media-tab" data-media="${n}" aria-selected="${n === 0}">${icon(MEDIA_ICON[m.kind] || "play")}<span>${esc(m.label)}</span></button>`)
            .join("")}</div>`
        : "";
    return `<div class="detail__media-col">${tabs}<div class="stage-wrap" id="stage">${stage(media[0])}</div></div>`;
  }

  function projectDetail(p, i) {
    const media = mediaList(p);
    const poster = cardPoster(p, media);
    const links = { ...(p.links || {}) };
    if (media.some((m) => m.kind === "linkedin")) delete links.linkedin; // the post is already embedded beside the text
    const metrics = list(p.metrics).filter((m) => m && has(m.value));
    const highlights = list(p.highlights).filter(has);
    const gallery = list(p.gallery).filter(has);
    const meta = [p.category, p.year].filter(has).map(esc).join("<span aria-hidden=\"true\"> · </span>");
    const prev = projects[(i - 1 + projects.length) % projects.length];
    const next = projects[(i + 1) % projects.length];
    const top = media.length
      ? mediaColumn(media)
      : `<div class="detail__media${has(poster) ? "" : " detail__media--cover"}">${has(poster) ? `<img src="${href(poster)}" alt="${esc(p.title)} screenshot" />` : cover(p, i)}</div>`;

    return `<div class="detail-layout${media.length ? " detail-layout--split" : ""}">${top}
      <div class="detail">
        <p class="detail__meta"><span class="card__num">${pad(i + 1)}</span>${meta ? `<span>${meta}</span>` : ""}</p>
        <h2 class="detail__title" id="modal-title">${esc(p.title)}</h2>
        ${has(p.summary) ? `<p class="detail__lead">${md(p.summary)}</p>` : ""}
        ${has(p.description) ? `<p class="detail__text">${md(p.description)}</p>` : ""}
        ${metrics.length ? `<dl class="metrics">${metrics
          .map((m) => `<div class="metric"><dt class="metric__label">${esc(m.label)}</dt><dd class="metric__value">${esc(m.value)}</dd></div>`)
          .join("")}</dl>` : ""}
        ${highlights.length || list(p.stack).length ? `<div class="detail__cols">
          ${highlights.length ? `<div><h3 class="detail__h">What I built</h3><ul class="bullets">${highlights.map((h) => `<li>${md(h)}</li>`).join("")}</ul></div>` : ""}
          ${list(p.stack).length ? `<div><h3 class="detail__h">Stack</h3>${tags(p.stack)}</div>` : ""}
        </div>` : ""}
        ${gallery.length ? `<div class="gallery">${gallery
          .map((g) => `<a href="${href(g)}" target="_blank" rel="noopener"><img src="${href(g)}" alt="${esc(p.title)} screenshot" loading="lazy" /></a>`)
          .join("")}</div>` : ""}
        ${linkButtons(links)}
        ${projects.length > 1 ? `<nav class="detail__nav" aria-label="Other projects">
          <button type="button" class="step" data-project="${esc(prev.id)}">${icon("arrowLeft")}<span><small>Previous</small>${esc(prev.title)}</span></button>
          <button type="button" class="step step--next" data-project="${esc(next.id)}"><span><small>Next</small>${esc(next.title)}</span>${icon("arrowRight")}</button>
        </nav>` : ""}
      </div></div>`;
  }

  function certDetail(c) {
    const file = has(c.file) ? c.file : c.url;
    return `<div class="doc">
      ${has(c.preview) ? `<a class="doc__preview" href="${href(file)}" target="_blank" rel="noopener" title="Open the PDF"><img src="${href(c.preview)}" alt="${esc(c.name)}, ${esc(c.issuer)}" /></a>` : ""}
      <div class="doc__info detail">
        <p class="detail__meta"><span class="card__num">Certificate</span>${has(c.year) ? `<span>${esc(c.year)}</span>` : ""}</p>
        <h2 class="detail__title" id="modal-title">${esc(c.name)}</h2>
        ${has(c.issuer) ? `<p class="detail__lead">${esc(c.issuer)}</p>` : ""}
        ${has(c.note) ? `<p class="detail__text">${esc(c.note)}</p>` : ""}
        ${has(file) ? `<div class="link-row"><a class="btn btn--primary" href="${href(file)}" target="_blank" rel="noopener">${icon("paper")}<span>Open PDF</span></a><a class="btn btn--ghost" href="${href(file)}" download>${icon("download")}<span>Download</span></a></div>` : ""}
      </div>
    </div>`;
  }

  const modal = $("#project-modal");
  const modalBody = $("#modal-body");
  const panel = $(".modal__panel");
  let current = -1; // index of the open project, -1 when a certificate (or nothing) is open
  let lastFocus = null;
  let closeTimer = 0;

  function showModal(html, mode, hash) {
    clearTimeout(closeTimer);
    modalBody.innerHTML = html;
    panel.classList.toggle("is-split", mode === "split");
    panel.classList.toggle("is-doc", mode === "doc");
    if (modal.hidden) {
      lastFocus = document.activeElement;
      autoplay.hold(true);
      modal.hidden = false;
      document.documentElement.classList.add("is-locked");
      requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("is-open")));
    }
    modalBody.scrollTop = 0;
    modalBody.focus({ preventScroll: true });
    history.replaceState(null, "", "#" + hash);
  }

  function openProject(id) {
    const i = projects.findIndex((p) => p.id === id);
    if (i < 0) return false;
    current = i;
    showModal(projectDetail(projects[i], i), mediaList(projects[i]).length ? "split" : "single", "project-" + id);
    return true;
  }

  function openCertificate(id) {
    const c = certs.find((x) => x.id === id);
    if (!c) return false;
    current = -1;
    showModal(certDetail(c), "doc", id);
    return true;
  }

  /* Opens whatever the address bar asks for: #project-<id> or #<certificate id> */
  function openFromHash() {
    const raw = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!raw) return false;
    const m = raw.match(/^project-(.+)$/);
    return m ? openProject(m[1]) : openCertificate(raw);
  }

  function switchMedia(btn) {
    const p = projects[current];
    if (!p) return;
    const media = mediaList(p);
    const n = Number(btn.dataset.media);
    if (!media[n]) return;
    $$(".media-tab", modalBody).forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
    $("#stage", modalBody).innerHTML = stage(media[n]); // replaces the old player, which stops it
  }

  function closeProject() {
    if (modal.hidden) return;
    current = -1;
    modal.classList.remove("is-open");
    document.documentElement.classList.remove("is-locked");
    autoplay.hold(false);
    history.replaceState(null, "", location.pathname + location.search);
    closeTimer = setTimeout(() => {
      modal.hidden = true;
      modalBody.innerHTML = ""; // also stops any playing video
    }, reduceMotion ? 0 : 260);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function trapFocus(e) {
    const f = $$('a[href], button:not([disabled]), iframe, video, [tabindex]:not([tabindex="-1"])', modal).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === modalBody)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ======================================================================
     BEHAVIOUR
     ====================================================================== */

  const revealer =
    !reduceMotion && "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) =>
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add("is-visible");
                revealer.unobserve(en.target);
              }
            }),
          { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
        )
      : null;

  function observeReveal(root = document) {
    $$("[data-reveal]:not(.is-visible)", root).forEach((el) => (revealer ? revealer.observe(el) : el.classList.add("is-visible")));
  }

  /* Videos marked data-autoplay play (silently) while they are on screen and pause when they are not.
     They load only when first needed, stay paused while a dialog is open or the tab is hidden, and
     never autoplay for visitors who asked their system for reduced motion. */
  const autoplay = (() => {
    const off = reduceMotion || !("IntersectionObserver" in window);
    const seen = new Set();
    let held = false;
    const pause = (v) => {
      if (!v.paused) {
        v._self = true;
        v.pause();
      }
    };
    const sync = (v) => {
      if (seen.has(v) && !held && !document.hidden) {
        if (v.dataset.user) return; // the visitor paused it themselves, leave it alone
        if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src;
        v.muted = true;
        const run = v.play();
        if (run && run.catch) run.catch(() => {}); // blocked by the browser → the poster and play badge stay
      } else pause(v);
    };
    const io = off
      ? null
      : new IntersectionObserver((entries) => entries.forEach((en) => { en.isIntersecting ? seen.add(en.target) : seen.delete(en.target); sync(en.target); }), { threshold: 0.35 });
    const bind = (v) => {
      const box = v.closest(".card__media");
      v.addEventListener("playing", () => box && box.classList.add("is-playing"));
      v.addEventListener("pause", () => {
        box && box.classList.remove("is-playing");
        if (v._self) v._self = false;
        else if (v.controls) v.dataset.user = "1";
      });
      v.addEventListener("play", () => { if (!v._self) delete v.dataset.user; });
    };
    document.addEventListener("visibilitychange", () => seen.forEach(sync));
    return {
      watch(root = document) {
        if (off) return;
        $$("video[data-autoplay]", root).forEach((v) => { if (!v._bound) { v._bound = true; bind(v); } io.observe(v); });
      },
      forget(root) {
        if (off) return;
        $$("video[data-autoplay]", root).forEach((v) => { io.unobserve(v); seen.delete(v); });
      },
      hold(on) {
        held = on;
        seen.forEach(sync);
      },
    };
  })();

  /* The site opens in the light theme; the dark theme is only used after the visitor chooses it
     with the toggle (and then remembered on this device). */
  const theme = () => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  const THEME_COLOR = { light: "#F6F5F1", dark: "#0C0E11" };

  function paintThemeToggle() {
    const btn = $("#theme-toggle");
    if (!btn) return;
    const dark = theme() === "dark";
    btn.innerHTML = icon(dark ? "sun" : "moon");
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLOR[theme()]);
  }

  function copyEmail(btn) {
    const email = btn.dataset.email;
    const done = () => {
      btn.innerHTML = `${icon("check")}<span>Copied</span>`;
      setTimeout(() => (btn.innerHTML = `${icon("copy")}<span>Copy email</span>`), 2000);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(done, () => (location.href = "mailto:" + email));
    } else {
      const t = document.createElement("textarea");
      t.value = email;
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand("copy");
        done();
      } catch (_) {
        location.href = "mailto:" + email;
      }
      t.remove();
    }
  }

  function bindEvents() {
    const header = $("#site-header");
    const menuBtn = $("#menu-toggle");
    const setMenu = (open) => {
      header.classList.toggle("nav-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuBtn.innerHTML = icon(open ? "close" : "menu");
    };

    document.addEventListener("click", (e) => {
      const t = e.target;
      const open = t.closest("[data-project]");
      if (open) {
        e.preventDefault();
        openProject(open.dataset.project);
        return;
      }
      const cert = t.closest("[data-cert]");
      if (cert) {
        e.preventDefault();
        openCertificate(cert.dataset.cert);
        return;
      }
      const tab = t.closest("[data-media]");
      if (tab) {
        e.preventDefault();
        return switchMedia(tab);
      }
      if (t.closest("[data-close]")) return closeProject();
      const filter = t.closest("[data-filter]");
      if (filter) {
        $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === filter)));
        return renderGrid(filter.dataset.filter);
      }
      if (t.closest("#theme-toggle")) {
        const next = theme() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem("theme", next);
        } catch (_) {}
        return paintThemeToggle();
      }
      if (t.closest("#menu-toggle")) return setMenu(!header.classList.contains("nav-open"));
      if (t.closest(".nav__link")) setMenu(false);
      const copy = t.closest("#copy-email");
      if (copy) copyEmail(copy);
    });

    document.addEventListener("keydown", (e) => {
      if (modal.hidden) {
        if (e.key === "Escape" && header.classList.contains("nav-open")) setMenu(false);
        return;
      }
      if (e.key === "Escape") closeProject();
      else if (e.key === "Tab") trapFocus(e);
      else if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && current >= 0 && projects.length > 1 && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
        const step = e.key === "ArrowRight" ? 1 : -1;
        openProject(projects[(current + step + projects.length) % projects.length].id);
      }
    });

    window.addEventListener("hashchange", openFromHash);

    // Header background once the page scrolls
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Highlight the nav link of the section in view
    if ("IntersectionObserver" in window) {
      const links = $$(".nav__link");
      const spy = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            links.forEach((a) => (a.getAttribute("href") === "#" + en.target.id ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
          }),
        { rootMargin: "-45% 0px -50% 0px" }
      );
      $$("main section[id]").forEach((s) => spy.observe(s));
    }

  }

  function addStructuredData() {
    const job = list(D.experience)[0] || {};
    const ld = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: P.name,
      jobTitle: P.role,
      url: has((D.site || {}).url) ? D.site.url : location.origin + location.pathname,
      worksFor: has(job.company) ? { "@type": "Organization", name: job.company } : undefined,
      image: has(P.photo) ? new URL(P.photo, location.href).href : undefined,
      email: has(P.email) ? "mailto:" + P.email : undefined,
      address: has(P.location) ? P.location : undefined,
      sameAs: list(P.socials).map((s) => s.url),
      alumniOf: list(D.education).map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
      knowsAbout: list(D.skills).flatMap((g) => list(g.items)),
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  /* ======================================================================
     RENDER
     ====================================================================== */
  function render() {
    const SECTIONS = [
      { id: "about", nav: "About", eyebrow: "About", build: buildAbout },
      { id: "experience", nav: "Experience", eyebrow: "Experience", build: buildExperience },
      { id: "work", nav: "Work", eyebrow: "Projects", build: buildWork },
      { id: "explainer", nav: "Explainer", eyebrow: "Explainer", build: buildExplainer },
      { id: "research", nav: "Research", eyebrow: "Research", build: buildResearch },
      { id: "expertise", nav: "Expertise", eyebrow: "Expertise", build: buildExpertise },
      { id: "education", nav: null, eyebrow: "Education", build: buildEducation },
      { id: "contact", nav: "Contact", eyebrow: "Contact", build: buildContact },
    ];
    const built = SECTIONS.map((s) => ({ ...s, ...(s.build() || { skip: true }) })).filter((s) => !s.skip);

    $("#site-header").innerHTML = buildHeader(built.filter((s) => s.nav));
    $("#main").innerHTML =
      buildHero() +
      built
        .map(
          (s, n) => `<section class="section section--${s.id}" id="${s.id}" aria-labelledby="${s.id}-title">
        <div class="container">
          <header class="section__head" data-reveal>
            <p class="eyebrow"><span class="eyebrow__num">${pad(n + 1)}</span><span class="eyebrow__rule" aria-hidden="true"></span>${esc(s.eyebrow)}</p>
            <h2 class="section__title" id="${s.id}-title">${s.title}</h2>
            ${s.intro ? `<p class="section__intro">${s.intro}</p>` : ""}
          </header>
          ${s.body}
        </div>
      </section>`
        )
        .join("");
    $("#site-footer").innerHTML = buildFooter();
    $(".modal__close").innerHTML = icon("close");

    built.forEach((s) => s.after && s.after());
    autoplay.watch(document);
    if (revealer) document.documentElement.classList.add("js-reveal");
    observeReveal();
    paintThemeToggle();
    bindEvents();
    addStructuredData();

    openFromHash();
  }

  try {
    render();
  } catch (err) {
    console.error(err);
    showError(err);
  }

  /* Friendly message when data.js has a mistake */
  function showError(err) {
    const where = err && err.lineno ? `<p>Look at <strong>line ${err.lineno}</strong> of <code>data.js</code>, or the line just above it.</p>` : "";
    const msg = err && err.message ? `<p><code>${String(err.message).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c])}</code></p>` : "";
    document.body.innerHTML = `<div class="data-error" role="alert">
      <h1>The portfolio couldn’t load its content</h1>
      <p>There is probably a small typo in <code>data.js</code>, usually a missing comma, quote or bracket.</p>
      ${msg}${where}
      <p>Fix it, save the file and refresh this page. Opening the browser console (F12) shows more detail.</p>
    </div>`;
  }
})();
