/* =========================================================
   OPHTHALMOLOGY · WEEK 2
   Presentation controller — vanilla JavaScript
   Indigo study viewer: slides, contents, progress, fullscreen
   ========================================================= */

(() => {
  "use strict";

  const TOTAL_SLIDES = 121;
  const SLIDE_PAD = 2;
  const WEEK_NAME = "Week 2";
  const HOME_URL = "../index.html";
  const HOME_HASH = "home";

  /* Each part starts at its divider, but navigation from the
     contents always lands on the first content slide. */
  const PARTS =   [
    {
      "n": 1,
      "title": "The cornea",
      "divider": 3,
      "start": 4,
      "end": 37,
      "summary": "Anatomy and physiology of the cornea, corneal ulceration, dendritic and fungal ulcers, keratoconus, keratoplasty and refractive surgery.",
      "topics": [
        [
          "Learning objectives",
          4
        ],
        [
          "Macro-anatomy",
          5
        ],
        [
          "Micro-anatomy",
          6
        ],
        [
          "Blood supply and nerve supply",
          7
        ],
        [
          "The Limbus",
          8
        ],
        [
          "Nutrition and functions of the cornea",
          9
        ],
        [
          "Causes of corneal transparency",
          10
        ],
        [
          "Definition and classification",
          11
        ],
        [
          "Hypopyon ulcer (Acute serpiginous ulcer)",
          12
        ],
        [
          "Predisposing and precipitating factors",
          13
        ],
        [
          "Clinical picture — symptoms",
          14
        ],
        [
          "Clinical picture — signs",
          15
        ],
        [
          "Complications",
          16
        ],
        [
          "Corneal fistula",
          17
        ],
        [
          "Types of corneal scars",
          18
        ],
        [
          "Treatment of the uncomplicated ulcer",
          19
        ],
        [
          "Treatment of the resistant corneal ulcers",
          20
        ],
        [
          "Treatment of the complications of a corneal ulcer",
          21
        ],
        [
          "Definition and etiology",
          22
        ],
        [
          "Clinical picture — symptoms and signs",
          23
        ],
        [
          "Typical features and complications",
          24
        ],
        [
          "Treatment",
          25
        ],
        [
          "Herpes zoster ophthalmicus (HZO)",
          26
        ],
        [
          "Signs: the ophthalmic division of the Trigeminal",
          27
        ],
        [
          "Other ocular manifestations and treatment",
          28
        ],
        [
          "Yeast and filamentous fungi",
          29
        ],
        [
          "Diagnosis and treatment",
          30
        ],
        [
          "Neurotrophic keratitis",
          31
        ],
        [
          "Ulcer with lagophthalmos",
          32
        ],
        [
          "Definition and clinical picture",
          33
        ],
        [
          "Symptoms and signs",
          34
        ],
        [
          "Differential diagnosis and treatment",
          35
        ],
        [
          "Keratoplasty (Corneal Graft)",
          36
        ],
        [
          "Keratorefractive surgery",
          37
        ]
      ]
    },
    {
      "n": 2,
      "title": "The conjunctiva",
      "divider": 38,
      "start": 39,
      "end": 74,
      "summary": "Conjunctival anatomy, bacterial and viral conjunctivitis, ophthalmia neonatorum, trachoma, allergic disease, pterygium and symblepharon.",
      "topics": [
        [
          "Intended learning outcomes",
          39
        ],
        [
          "Histology and vascular system",
          40
        ],
        [
          "Nerve supply of the conjunctiva",
          41
        ],
        [
          "Conjunctivitis",
          42
        ],
        [
          "Mucopurulent conjunctivitis (MPC)",
          43
        ],
        [
          "MPC: clinical picture and treatment",
          44
        ],
        [
          "Purulent conjunctivitis (P.C, Acute Blenorrhoea)",
          45
        ],
        [
          "P.C: clinical picture",
          46
        ],
        [
          "P.C: complications and treatment",
          47
        ],
        [
          "Ophthalmia Neonatorum",
          48
        ],
        [
          "ON: clinical pictures",
          49
        ],
        [
          "ON: complications and treatment",
          50
        ],
        [
          "Inclusion conjunctivitis (Inclusion Blenorrhoea)",
          51
        ],
        [
          "Adenoviral conjunctivitis",
          52
        ],
        [
          "Trachoma (Egyptian Ophthalmia)",
          53
        ],
        [
          "T1: Trachoma at onset",
          54
        ],
        [
          "T2: Established or florid trachoma",
          55
        ],
        [
          "T3: starting cicatrization and T4",
          56
        ],
        [
          "WHO Classification of trachoma",
          57
        ],
        [
          "WHO Simplified Grading System",
          58
        ],
        [
          "Corneal manifestations: Pannus",
          59
        ],
        [
          "Pannus types and trachomatous corneal ulcer",
          60
        ],
        [
          "Complications and treatment of trachoma",
          61
        ],
        [
          "Allergic conjunctivitis and vernal kerato-conjunctivitis",
          62
        ],
        [
          "VKC: symptoms and conjunctival manifestations",
          63
        ],
        [
          "VKC: corneal manifestations",
          64
        ],
        [
          "Phlycten versus limbal type of spring catarrh",
          65
        ],
        [
          "Papillae of spring catarrh versus papillae of trachoma",
          66
        ],
        [
          "Treatment of vernal kerato-conjunctivitis",
          67
        ],
        [
          "Phlyctenular Kerato- Conjunctivitis",
          68
        ],
        [
          "Phlyctenular: signs, differential diagnosis and treatment",
          69
        ],
        [
          "Phlycten and pannus differential diagnosis",
          70
        ],
        [
          "Pterygium",
          71
        ],
        [
          "Pterygium: treatment and operations",
          72
        ],
        [
          "Pinguecula and symblepharon",
          73
        ],
        [
          "Symblepharon: complications and treatment",
          74
        ]
      ]
    },
    {
      "n": 3,
      "title": "Cataract",
      "divider": 75,
      "start": 76,
      "end": 98,
      "summary": "Congenital and senile cataract, preoperative assessment, surgical technique and complicated or traumatic cataract.",
      "topics": [
        [
          "ILOS",
          76
        ],
        [
          "Applied Anatomy and Applied Physiology",
          77
        ],
        [
          "Classification of Cataract",
          78
        ],
        [
          "1) Congenital &amp; Developmental Cataract",
          79
        ],
        [
          "Clinical Picture and Complications",
          80
        ],
        [
          "Types of Congenital &amp; Developmental Cataract",
          81
        ],
        [
          "Posterior Polar, Blue Dotted and Coronary Cataract",
          82
        ],
        [
          "General Lines for Treatment of Congenital Cataract",
          83
        ],
        [
          "1) Senile Cataract",
          84
        ],
        [
          "1) Senile Cortical Cataract — Pathogenesis and Incipient Stage",
          85
        ],
        [
          "2) Immature Stage of Senile Cortical Cataract",
          86
        ],
        [
          "3) Mature Stage of Senile Cortical Cataract",
          87
        ],
        [
          "4) Hypermature Stage and the Morgagnian Form",
          88
        ],
        [
          "2) Senile Nuclear Cataract",
          89
        ],
        [
          "DD between Nuclear Sclerosis &amp; Nuclear Cataract",
          90
        ],
        [
          "Cataract Morphology",
          91
        ],
        [
          "Outline for Preoperative Examination of Cataract",
          92
        ],
        [
          "Treatment of Senile Cataract",
          93
        ],
        [
          "Surgical Techniques, IOL Implantation and Complications",
          94
        ],
        [
          "1) Complicated Cataract to a Local Eye Disease",
          95
        ],
        [
          "2) Complicated Cataract to a Systemic Eye Disease (Presenile Cataract)",
          96
        ],
        [
          "Traumatic Cataract",
          97
        ],
        [
          "After Cataract (Posterior Capsule Opacification, PCO)",
          98
        ]
      ]
    },
    {
      "n": 4,
      "title": "Refraction",
      "divider": 99,
      "start": 100,
      "end": 120,
      "summary": "Emmetropia and ametropia, myopia, hypermetropia, astigmatism, aphakia, anisometropia and presbyopia.",
      "topics": [
        [
          "Intended learning objectives",
          100
        ],
        [
          "Emmetropia &amp; Ametropia",
          101
        ],
        [
          "Myopia (Short Sightedness): definition, far point &amp; etiology",
          102
        ],
        [
          "Types of axial myopia",
          103
        ],
        [
          "Myopia: clinical picture — symptoms",
          104
        ],
        [
          "Myopia: signs — only with high myopia",
          105
        ],
        [
          "Myopia: complications &amp; optical treatment",
          106
        ],
        [
          "Myopia: refractive surgery",
          107
        ],
        [
          "Hypermetropia (Hyperopia - Far Sightedness): definition &amp; etiology",
          108
        ],
        [
          "Components of hypermetropia",
          109
        ],
        [
          "Hypermetropia: accommodation, clinical picture &amp; complications",
          110
        ],
        [
          "Hypermetropia: treatment",
          111
        ],
        [
          "Astigmatism: definition &amp; etiology",
          112
        ],
        [
          "Types of astigmatism &amp; the rule of regular astigmatism",
          113
        ],
        [
          "Regular astigmatism: simple, compound &amp; mixed",
          114
        ],
        [
          "Accommodation &amp; the clinical picture of astigmatism",
          115
        ],
        [
          "Signs of astigmatism",
          116
        ],
        [
          "Treatment of astigmatism",
          117
        ],
        [
          "Aphakia",
          118
        ],
        [
          "Anisometropia",
          119
        ],
        [
          "Presbyopia",
          120
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

  const pad = (number) => String(number).padStart(SLIDE_PAD, "0");
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
        partLabel.textContent = `Cover · Ophthalmology ${WEEK_NAME}`;
      } else {
        partLabel.textContent = `Closing · End of ${WEEK_NAME}`;
      }
    }

    prevBtn.disabled = view === "home" || current === 1;
    nextBtn.disabled = view === "home" || current === TOTAL_SLIDES;

    document.title =
      view === "home"
        ? `Contents — Ophthalmology · ${WEEK_NAME}`
        : `${pad(current)} ${part ? part.title : current === 1 ? "Cover" : "Closing"} — Ophthalmology · ${WEEK_NAME}`;

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
      doc && doc.querySelector(".slide-frame, .divider-frame, .cover-frame, .closing-frame, .slide, .cover, .divider, .closing");

    showError(!hasSlide);

    if (!hasSlide) {
      if (view === "slide") {
        document.title = `Slide unavailable — Ophthalmology · ${WEEK_NAME}`;
      }
      return;
    }

    if (view === "slide") {
      document.title = `${pad(current)} ${doc.title || "Slide"} — Ophthalmology · ${WEEK_NAME}`;
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
