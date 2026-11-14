/* =========================================================
   OPHTHALMOLOGY · EYELIDS
   Presentation controller — vanilla JavaScript
   Indigo study viewer: slides, contents, progress, fullscreen
   ========================================================= */

(() => {
  "use strict";

  const TOTAL_SLIDES = 49;
  const HOME_HASH = "home";

  /* Each part starts at its divider, but navigation from the
     contents always lands on the first content slide. */
  const PARTS =   [
    {
      "n": 1,
      "title": "The eyelids: anatomy",
      "divider": 2,
      "start": 3,
      "end": 13,
      "summary": "Gross and minute anatomy of the lid — margin and its borders, layers, muscles, blood and nerve supply, and the functions of the eyelids.",
      "topics": [
        [
          "Gross anatomy and palpebral fissure",
          3
        ],
        [
          "The eyelid margin and its four borders",
          4
        ],
        [
          "Layers from skin to conjunctiva",
          6
        ],
        [
          "Orbicularis, levator and Müller's muscle",
          9
        ],
        [
          "Vascular, lymphatic and nerve supply",
          12
        ],
        [
          "Functions of the eyelids",
          13
        ]
      ]
    },
    {
      "n": 2,
      "title": "Blepharitis",
      "divider": 14,
      "start": 15,
      "end": 19,
      "summary": "Anterior and posterior blepharitis — types, predisposing factors, symptoms and signs, complications and lid hygiene.",
      "topics": [
        [
          "Definition and three types",
          15
        ],
        [
          "Predisposing factors and etiology",
          16
        ],
        [
          "Symptoms and signs",
          17
        ],
        [
          "Complications",
          18
        ],
        [
          "Treatment and lid hygiene",
          19
        ]
      ]
    },
    {
      "n": 3,
      "title": "Hordeolum and chalazion",
      "divider": 20,
      "start": 21,
      "end": 25,
      "summary": "External and internal hordeolum, chalazion — definition, etiology, clinical picture, differential diagnosis and treatment.",
      "topics": [
        [
          "Hordeolum externum (stye)",
          22
        ],
        [
          "Hordeolum internum (infected chalazion)",
          23
        ],
        [
          "Chalazion: definition and etiology",
          24
        ],
        [
          "Differential diagnosis and treatment",
          25
        ]
      ]
    },
    {
      "n": 4,
      "title": "Lashes and lid position",
      "divider": 26,
      "start": 27,
      "end": 49,
      "summary": "Distichiasis, trichiasis, entropion, ectropion, lagophthalmos and ptosis — assessment, complications and surgical correction.",
      "topics": [
        [
          "Distichiasis and trichiasis",
          27
        ],
        [
          "Rubbing lashes versus trichiasis",
          28
        ],
        [
          "Entropion: congenital, cicatricial, spastic, senile",
          33
        ],
        [
          "Ectropion: cicatricial, senile, mechanical, paralytic",
          36
        ],
        [
          "Lagophthalmos",
          41
        ],
        [
          "Ptosis: assessment and surgery",
          44
        ]
      ]
    }
  ];

  const body = document.body;
  const stage = document.getElementById("stage");
  const stageShell = document.getElementById("stageShell");
  const frame = document.getElementById("slideFrame");
  const errorPanel = document.getElementById("loadError");
  const tocView = document.getElementById("tocView");
  const tocGrid = document.getElementById("tocGrid");
  const tocTitle = document.getElementById("tocTitle");
  const currentEl = document.getElementById("currentNum");
  const totalEl = document.getElementById("totalNum");
  const progressFill = document.getElementById("progressFill");
  const progressTrack = document.getElementById("progressTrack");
  const progressPercent = document.getElementById("progressPercent");
  const partLabel = document.getElementById("partLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const homeBtn = document.getElementById("homeBtn");
  const brandHome = document.getElementById("brandHome");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const fullscreenExitBtn = document.getElementById("fullscreenExitBtn");
  const resumeBtn = document.getElementById("resumeBtn");
  const resumeNum = document.getElementById("resumeNum");
  const resumeTotal = document.getElementById("resumeTotal");
  const resumeLabel = document.getElementById("resumeLabel");
  const tocPosition = document.getElementById("tocPosition");
  const errorHomeBtn = document.getElementById("errorHomeBtn");
  const keyHint = document.getElementById("keyHint");

  let current = 1;
  let view = "slide";
  let hintTimer = null;
  let resizeFrame = null;
  let pseudoFullscreen = false;
  let frameTitleHandler = null;
  let loadFallbackTimer = null;

  const pad = (number) => String(number).padStart(3, "0");
  const pad2 = (number) => String(number).padStart(2, "0");
  const clamp = (number) => Math.min(TOTAL_SLIDES, Math.max(1, number));
  const slidePath = (number) => `slides/slide-${pad(number)}.html`;
  const slideHash = (number) => `#${pad(number)}`;

  const totalTopics = PARTS.reduce((sum, part) => sum + part.topics.length, 0);
  const contentSlides = PARTS.reduce(
    (sum, part) => sum + (part.end - part.start + 1),
    0
  );

  /* ---------- Shared state ---------- */
  function partForSlide(number) {
    return PARTS.find((part) => number >= part.divider && number <= part.end) || null;
  }

  function isFullscreenActive() {
    return Boolean(
      pseudoFullscreen ||
        document.fullscreenElement ||
        document.webkitFullscreenElement
    );
  }

  function isEditableTarget(target) {
    if (!target || target.nodeType !== 1) return false;
    const tag = target.tagName;
    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      target.isContentEditable
    );
  }

  /* ---------- Contents ---------- */
  function renderContents() {
    tocGrid.innerHTML = PARTS.map((part) => {
      const topics = part.topics
        .map(
          ([label, slide], index) => `
            <a class="toc-topic" href="${slideHash(slide)}" data-slide="${slide}">
              <span class="toc-topic-num">${pad2(index + 1)}</span>
              <span class="toc-topic-label">${label}</span>
            </a>`
        )
        .join("");

      return `
        <article class="toc-card" data-part="${part.n}" data-start="${part.start}">
          <div class="toc-card-head">
            <span class="toc-part-index">Part ${pad2(part.n)}</span>
            <span class="toc-part-range">Slides ${pad(part.divider)}–${pad(part.end)}</span>
          </div>
          <a class="toc-part-link" href="${slideHash(part.start)}" data-slide="${part.start}">
            <h2>${part.title}</h2>
            <span class="toc-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
            </span>
          </a>
          <p class="toc-part-summary">${part.summary}</p>
          <div class="toc-topics">${topics}</div>
        </article>`;
    }).join("");

    const partCount = document.getElementById("tocPartCount");
    const topicCount = document.getElementById("tocTopicCount");
    const slideCount = document.getElementById("tocSlideCount");
    if (partCount) partCount.textContent = String(PARTS.length);
    if (topicCount) topicCount.textContent = String(totalTopics);
    if (slideCount) slideCount.textContent = String(TOTAL_SLIDES);
    if (resumeTotal) resumeTotal.textContent = String(TOTAL_SLIDES);
  }

  function updateContentsState() {
    const part = partForSlide(current);
    const cards = tocGrid.querySelectorAll(".toc-card");

    cards.forEach((card) => {
      const isCurrent = Boolean(part) && Number(card.dataset.part) === part.n;
      card.classList.toggle("is-current", isCurrent);
      const link = card.querySelector(".toc-part-link");
      if (link) {
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      }
    });

    if (resumeNum) resumeNum.textContent = pad(current);
    if (resumeTotal) resumeTotal.textContent = String(TOTAL_SLIDES);
    if (resumeLabel) {
      resumeLabel.textContent =
        current === 1 ? "Start presentation" : `Resume at slide ${pad(current)}`;
    }
    if (tocPosition) tocPosition.textContent = `Slide ${pad(current)}`;
  }

  /* ---------- View switching ---------- */
  function setView(nextView) {
    view = nextView === "home" ? "home" : "slide";
    body.dataset.view = view;

    const isHome = view === "home";
    stageShell.hidden = isHome;
    tocView.hidden = !isHome;

    if (!isHome) {
      window.requestAnimationFrame(resizeStage);
    }
  }

  function showHome(options = {}) {
    const { updateHash = true, focus = true } = options;
    setView("home");
    updateChrome();

    if (updateHash) {
      history.replaceState(null, "", `#${HOME_HASH}`);
    }

    if (focus && tocTitle && typeof tocTitle.focus === "function") {
      tocTitle.focus({ preventScroll: true });
    }
  }

  /* ---------- Navigation ---------- */
  function goTo(number, options = {}) {
    const { force = false, updateHash = true } = options;
    const next = clamp(number);
    const wasHome = view === "home";
    const sameSlide = !wasHome && next === current;

    if (sameSlide && !force) {
      if (updateHash) history.replaceState(null, "", slideHash(current));
      return;
    }

    current = next;

    if (wasHome) setView("slide");
    updateChrome();
    showError(false);

    if (updateHash) {
      history.replaceState(null, "", slideHash(current));
    }

    frame.classList.add("is-loading");
    frame.src = slidePath(current);

    /* Guarantee the slide becomes visible even when the browser blocks
       inspection of the iframe document (for example when index.html is
       opened directly from disk instead of through a local HTTP server). */
    window.clearTimeout(loadFallbackTimer);
    loadFallbackTimer = window.setTimeout(() => {
      if (view === "slide") frame.classList.remove("is-loading");
    }, 2500);

    preload(current + 1);
    preload(current - 1);
    dismissHint();
  }

  function nextSlide() {
    if (view === "home") return;
    if (current < TOTAL_SLIDES) goTo(current + 1);
  }

  function previousSlide() {
    if (view === "home") return;
    if (current > 1) goTo(current - 1);
  }

  /* ---------- Chrome / progress ---------- */
  function updateChrome() {
    const part = partForSlide(current);
    const percent = Math.round((current / TOTAL_SLIDES) * 100);

    currentEl.textContent = pad(current);
    totalEl.textContent = String(TOTAL_SLIDES);

    progressFill.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}%`;
    progressTrack.setAttribute("aria-valuenow", String(current));
    progressTrack.setAttribute("aria-valuemax", String(TOTAL_SLIDES));
    progressTrack.setAttribute(
      "aria-valuetext",
      `Slide ${current} of ${TOTAL_SLIDES}`
    );

    if (partLabel) {
      if (view === "home") {
        partLabel.textContent = "Table of contents";
      } else if (part) {
        partLabel.textContent = `Part ${pad2(part.n)} · ${part.title}`;
      } else if (current === 1) {
        partLabel.textContent = "Cover · Ophthalmology Eyelids";
      } else {
        partLabel.textContent = "Closing · End of Eyelids";
      }
    }

    prevBtn.disabled = view === "home" || current === 1;
    nextBtn.disabled = view === "home" || current === TOTAL_SLIDES;

    document.title =
      view === "home"
        ? "Contents — Ophthalmology · Eyelids"
        : `${pad(current)} ${part ? part.title : current === 1 ? "Cover" : "Closing"} — Ophthalmology · Eyelids`;

    updateContentsState();
  }

  /* ---------- Slide loading ---------- */
  function showError(visible) {
    errorPanel.hidden = !visible;
    if (visible) frame.classList.remove("is-loading");
  }

  function onFrameLoad() {
    let path = "";
    let doc = null;

    try {
      path = frame.contentWindow.location.pathname;
      doc = frame.contentDocument;
    } catch (error) {
      /* Cross-origin restriction — common with file:// URLs. The slide is
         still rendered by the iframe, so reveal it without inspection. */
      window.clearTimeout(loadFallbackTimer);
      frame.classList.remove("is-loading");
      return;
    }

    if (!path.endsWith(slidePath(current))) return;

    window.clearTimeout(loadFallbackTimer);
    frame.classList.remove("is-loading");

    const hasSlide =
      doc && doc.querySelector(".slide-frame, .divider-frame, .cover-frame, .closing-frame");

    showError(!hasSlide);

    if (!hasSlide) {
      if (view === "slide") {
        document.title = "Slide unavailable — Ophthalmology · Eyelids";
      }
      return;
    }

    if (view === "slide") {
      document.title = `${pad(current)} ${doc.title || "Slide"} — Ophthalmology · Eyelids`;
    }

    /* Keyboard focus may sit inside the iframe; mirror shortcuts there. */
    if (doc && doc !== frameTitleHandler) {
      frameTitleHandler = doc;
      doc.addEventListener("keydown", onKeyDown, true);
    }
  }

  /* ---------- Preloading ---------- */
  function preload(number) {
    if (number < 1 || number > TOTAL_SLIDES) return;
    const id = `prefetch-${number}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "prefetch";
    link.href = slidePath(number);
    document.head.appendChild(link);
  }

  /* ---------- Fullscreen ---------- */
  function requestFullscreen() {
    const root = document.documentElement;
    const request =
      root.requestFullscreen ||
      root.webkitRequestFullscreen ||
      root.msRequestFullscreen;

    if (request) {
      Promise.resolve(request.call(root)).catch(() => {
        pseudoFullscreen = true;
        syncFullscreenState();
      });
    } else {
      pseudoFullscreen = true;
      syncFullscreenState();
    }
  }

  function exitFullscreen() {
    if (pseudoFullscreen) {
      pseudoFullscreen = false;
      syncFullscreenState();
      return;
    }

    const exit =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;

    if (exit) {
      Promise.resolve(exit.call(document)).catch(() => {
        pseudoFullscreen = false;
        syncFullscreenState();
      });
    }
  }

  function toggleFullscreen() {
    if (isFullscreenActive()) exitFullscreen();
    else requestFullscreen();
  }

  function syncFullscreenState() {
    const active = isFullscreenActive();
    body.classList.toggle("is-fullscreen", active);

    fullscreenBtn.setAttribute("aria-pressed", String(active));
    fullscreenBtn.setAttribute(
      "aria-label",
      active ? "Exit fullscreen" : "Enter fullscreen"
    );
    fullscreenBtn.title = active ? "Exit fullscreen (F)" : "Fullscreen (F)";

    const label = fullscreenBtn.querySelector(".nav-label");
    if (label) label.textContent = active ? "Exit" : "Full screen";

    window.requestAnimationFrame(resizeStage);
  }

  /* ---------- Scale the 1920 × 1080 stage ---------- */
  function resizeStage() {
    if (view === "home" && !isFullscreenActive()) return;

    const styles = window.getComputedStyle(stageShell);
    const horizontalPadding =
      parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    const verticalPadding =
      parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

    const availableWidth = stageShell.clientWidth - horizontalPadding;
    const availableHeight = stageShell.clientHeight - verticalPadding;

    if (availableWidth <= 0 || availableHeight <= 0) return;

    const scale = Math.min(availableWidth / 1920, availableHeight / 1080);
    stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  function queueResize() {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(resizeStage);
  }

  /* ---------- Keyboard ---------- */
  function onKeyDown(event) {
    if (event.defaultPrevented) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (isEditableTarget(event.target)) return;

    switch (event.key) {
      case "ArrowRight":
      case "PageDown":
        if (view === "slide") {
          event.preventDefault();
          nextSlide();
        }
        break;
      case "ArrowLeft":
      case "PageUp":
        if (view === "slide") {
          event.preventDefault();
          previousSlide();
        }
        break;
      case "Home":
        event.preventDefault();
        showHome();
        break;
      case "End":
        event.preventDefault();
        goTo(TOTAL_SLIDES);
        break;
      case "f":
      case "F":
        event.preventDefault();
        toggleFullscreen();
        break;
      case "Escape":
        if (isFullscreenActive()) {
          event.preventDefault();
          exitFullscreen();
        }
        break;
      default:
        break;
    }
  }

  function dismissHint() {
    window.clearTimeout(hintTimer);
    keyHint.classList.add("is-hidden");
  }

  /* ---------- Initial location ---------- */
  function readInitialLocation() {
    const params = new URLSearchParams(window.location.search);
    const querySlide = params.get("slide");

    if (querySlide) {
      const parsed = Number.parseInt(String(querySlide).replace(/\D/g, ""), 10);
      if (Number.isFinite(parsed)) {
        return { view: "slide", slide: clamp(parsed) };
      }
    }

    const raw = window.location.hash.replace(/^#/, "");

    if (!raw || raw === HOME_HASH || raw === "toc") {
      return { view: "home", slide: 1 };
    }

    const parsed = Number.parseInt(raw.replace(/\D/g, ""), 10);
    if (Number.isFinite(parsed)) {
      return { view: "slide", slide: clamp(parsed) };
    }

    return { view: "home", slide: 1 };
  }

  /* ---------- Events ---------- */
  prevBtn.addEventListener("click", previousSlide);
  nextBtn.addEventListener("click", nextSlide);
  fullscreenBtn.addEventListener("click", toggleFullscreen);
  fullscreenExitBtn.addEventListener("click", exitFullscreen);

  brandHome.addEventListener("click", (event) => {
    event.preventDefault();
    showHome();
  });

  resumeBtn.addEventListener("click", () => {
    goTo(current, { force: true });
  });

  errorHomeBtn.addEventListener("click", () => showHome());

  tocView.addEventListener("click", (event) => {
    const link = event.target.closest("[data-slide]");
    if (link) {
      event.preventDefault();
      goTo(Number(link.dataset.slide));
      return;
    }

    /* The whole part card is a click target; the title link keeps it
       keyboard accessible. */
    const card = event.target.closest(".toc-card[data-start]");
    if (card) goTo(Number(card.dataset.start));
  });

  progressTrack.addEventListener("click", (event) => {
    const rect = progressTrack.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width)
    );
    goTo(Math.max(1, Math.round(ratio * TOTAL_SLIDES)));
  });

  progressTrack.tabIndex = 0;
  progressTrack.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(current + (event.key === "ArrowRight" ? 1 : -1));
  });

  frame.addEventListener("load", onFrameLoad);
  frame.addEventListener("error", () => showError(true));
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", queueResize);
  window.addEventListener("orientationchange", queueResize);

  document.addEventListener("fullscreenchange", syncFullscreenState);
  document.addEventListener("webkitfullscreenchange", syncFullscreenState);

  window.addEventListener("hashchange", () => {
    const raw = window.location.hash.replace(/^#/, "");

    if (!raw || raw === HOME_HASH || raw === "toc") {
      if (view !== "home") showHome({ updateHash: false });
      return;
    }

    const parsed = Number.parseInt(raw.replace(/\D/g, ""), 10);
    if (Number.isFinite(parsed)) {
      goTo(parsed, { updateHash: false });
    }
  });

  /* ---------- Initialise ---------- */
  renderContents();

  const initial = readInitialLocation();
  current = initial.slide;
  totalEl.textContent = String(TOTAL_SLIDES);

  if (initial.view === "home") {
    showHome({ updateHash: true, focus: false });
  } else {
    setView("slide");
    updateChrome();
    history.replaceState(null, "", slideHash(current));
    goTo(current, { force: true });
  }

  updateChrome();
  syncFullscreenState();
  queueResize();

  hintTimer = window.setTimeout(() => keyHint.classList.add("is-hidden"), 9000);
})();
