/* =========================================================
   OPHTHALMOLOGY · WEEK 3
   Presentation controller — vanilla JavaScript
   Indigo study viewer: slides, contents, progress, fullscreen
   ========================================================= */

(() => {
  "use strict";

  const TOTAL_SLIDES = 150;
  const SLIDE_PAD = 3;
  const WEEK_NAME = "Week 3";
  const HOME_URL = "../index.html";
  const HOME_HASH = "home";

  /* Each part starts at its divider, but navigation from the
     contents always lands on the first content slide. */
  const PARTS =   [
    {
      "n": 1,
      "title": "Glaucoma",
      "divider": 2,
      "start": 3,
      "end": 41,
      "summary": "Aqueous physiology, intraocular pressure, congenital and primary open-angle glaucoma, angle closure and secondary glaucoma.",
      "topics": [
        [
          "Objectives &amp; Anatomy of the Angle",
          3
        ],
        [
          "Gonioscopic Appearance of the Angle",
          4
        ],
        [
          "Physiology of the Aqueous",
          5
        ],
        [
          "Functions of the Aqueous &amp; the Aqueous Flow",
          6
        ],
        [
          "Intraocular Pressure (IOP)",
          7
        ],
        [
          "Measurement of IOP: Tonometry",
          8
        ],
        [
          "Optic Nerve Head (ONH)",
          9
        ],
        [
          "Glaucoma: Definition &amp; Classification",
          10
        ],
        [
          "Congenital Glaucoma (Buphthalmos)",
          11
        ],
        [
          "Etiology &amp; Clinical Picture",
          12
        ],
        [
          "Clinical Picture: Signs (1–5)",
          13
        ],
        [
          "Clinical Picture: Signs (6–9)",
          14
        ],
        [
          "Differential Diagnosis",
          15
        ],
        [
          "Diagnosis &amp; Complications",
          16
        ],
        [
          "Management",
          17
        ],
        [
          "Primary Open Angle Glaucoma (POAG)",
          18
        ],
        [
          "Clinical Picture",
          19
        ],
        [
          "1) High IOP &amp; How to Confirm the Diagnosis",
          20
        ],
        [
          "2) Glaucomatous Cupping of the ONH",
          21
        ],
        [
          "3) Visual Field Changes — Central field (central 30°)",
          22
        ],
        [
          "Visual Field Changes (continued)",
          23
        ],
        [
          "Treatment: Medical, Laser or Surgical",
          24
        ],
        [
          "Topical Treatment: 2nd Line",
          25
        ],
        [
          "B) Systemic Treatment &amp; 2) Laser Trabeculoplasty",
          26
        ],
        [
          "3) Surgical Treatment",
          27
        ],
        [
          "2) Primary Angle Closure Glaucoma (PACG)",
          28
        ],
        [
          "Pathogenesis: Mechanism of Angle Closure",
          29
        ],
        [
          "Clinical Picture: The Five Stages",
          30
        ],
        [
          "B. Intermittent ACG (Prodromal / Subacute)",
          31
        ],
        [
          "C. Acute Congestive ACG",
          32
        ],
        [
          "C. Acute Congestive ACG — Treatment",
          33
        ],
        [
          "D. Chronic Stage of Angle Closure Glaucoma",
          34
        ],
        [
          "E. Absolute Glaucoma",
          35
        ],
        [
          "Secondary Glaucoma (1)",
          36
        ],
        [
          "Local Causes (2): A.C. &amp; Iris / C.B. Disorders",
          37
        ],
        [
          "4) Lens Disorders (Phacogenic Causes) — Open Angle",
          38
        ],
        [
          "Lens Subluxation &amp; Exfoliation Glaucoma",
          39
        ],
        [
          "4) Lens Disorders — Closed Angle",
          40
        ],
        [
          "Local Causes (3): Hemorrhage, Trauma &amp; Steroids",
          41
        ]
      ]
    },
    {
      "n": 2,
      "title": "The uveal tract &amp; uveitis",
      "divider": 42,
      "start": 43,
      "end": 75,
      "summary": "Anatomy and physiology of the uveal tract, iridocyclitis, choroiditis, endophthalmitis and panophthalmitis.",
      "topics": [
        [
          "ILOs of the Topic &amp; the Uveal Tract",
          43
        ],
        [
          "1) Anatomy of the Iris — Gross Anatomy",
          44
        ],
        [
          "1) Anatomy of the Iris — Minute Anatomy",
          45
        ],
        [
          "Blood Supply &amp; Nerve Supply of the Iris",
          46
        ],
        [
          "2) Anatomy of the Ciliary Body — Gross Anatomy",
          47
        ],
        [
          "2) Anatomy of the Ciliary Body — Minute Anatomy",
          48
        ],
        [
          "3) Anatomy of the Choroid",
          49
        ],
        [
          "1) Functions of the Iris",
          50
        ],
        [
          "2) Functions of the Ciliary Body &amp; 3) Functions of the Choroid",
          51
        ],
        [
          "Accommodation — Definition &amp; Mechanism",
          52
        ],
        [
          "Range and Amplitude of Accommodation",
          53
        ],
        [
          "Uveitis: Definition &amp; Classification",
          54
        ],
        [
          "1) Iridocyclitis: Definition &amp; Primary Etiology",
          55
        ],
        [
          "Syndromes of Unknown Etiology &amp; Secondary Iridocyclitis",
          56
        ],
        [
          "Clinical Picture — Symptoms: 1) Neuralgic Pain",
          57
        ],
        [
          "Symptoms: Photophobia &amp; Rapid Diminution of Vision",
          58
        ],
        [
          "Signs: Eye Lids, Conjunctiva &amp; Cornea",
          59
        ],
        [
          "Sign 4: Anterior Chamber",
          60
        ],
        [
          "Signs 5-10: Iris, Pupil, Ciliary Body, Lens, Vitreous, Tension",
          61
        ],
        [
          "Complications: 1) Synechiae",
          62
        ],
        [
          "Complications: Occlusio-pupillae &amp; Cyclitic Membrane",
          63
        ],
        [
          "Complications 3-6: Glaucoma, Cataract, Endophthalmitis, Atrophia Bulbi",
          64
        ],
        [
          "Differential Diagnosis of Acute Iridocyclitis",
          65
        ],
        [
          "Treatment: Etiological &amp; Local (Mydriatic–Cycloplegic)",
          66
        ],
        [
          "Local Corticosteroids &amp; General Treatment",
          67
        ],
        [
          "C. Treatment of the Complications (1-3)",
          68
        ],
        [
          "C. Treatment of the Complications (4-6)",
          69
        ],
        [
          "2) Choroiditis — How Posterior Uveitis Differs",
          70
        ],
        [
          "Endophthalmitis: Definition &amp; Clinical Picture",
          71
        ],
        [
          "Endophthalmitis: Complications &amp; Treatment",
          72
        ],
        [
          "Panophthalmitis: Definition &amp; Etiology",
          73
        ],
        [
          "Panophthalmitis: Clinical Picture",
          74
        ],
        [
          "Panophthalmitis: Complications, DD &amp; Treatment",
          75
        ]
      ]
    },
    {
      "n": 3,
      "title": "Strabismus &amp; ocular motility",
      "divider": 76,
      "start": 77,
      "end": 112,
      "summary": "Binocular vision, heterophoria, paralytic and concomitant squint, diplopia, cover testing and surgical treatment.",
      "topics": [
        [
          "Strabismus — Intended Learning Outcomes",
          77
        ],
        [
          "Anatomy of Extraocular Muscles — Origin &amp; Insertion",
          78
        ],
        [
          "Nerve Supply of the Extraocular Muscles",
          79
        ],
        [
          "Action of the Extraocular Muscles",
          80
        ],
        [
          "Binocular Vision — Definition, Development &amp; Importance",
          81
        ],
        [
          "Grades of Binocular Vision",
          82
        ],
        [
          "True Squint, Apparent Squint &amp; Orthophoria",
          83
        ],
        [
          "Classification of Strabismus &amp; the Visual / Optic Axes",
          84
        ],
        [
          "Angle Alpha &amp; Apparent Squint (Pseudo-strabismus)",
          85
        ],
        [
          "A. Latent Squint (Heterophoria)",
          86
        ],
        [
          "Clinical Picture of Latent Squint",
          87
        ],
        [
          "Diagnosis of Latent Squint: Cover (Screen) Test",
          88
        ],
        [
          "Maddox Rod Test &amp; Maddox Wing Test",
          89
        ],
        [
          "Treatment of Latent Squint (Heterophoria)",
          90
        ],
        [
          "a) Paralytic Squint (Incomitant Strabismus)",
          91
        ],
        [
          "Signs: Primary and Secondary Deviation",
          92
        ],
        [
          "Explanation: Hering Law of Equal Innervation",
          93
        ],
        [
          "Limitation of Movement &amp; Binocular Diplopia",
          94
        ],
        [
          "Uncrossed vs Crossed Diplopia",
          95
        ],
        [
          "Further Characters of Diplopia &amp; False Projection",
          96
        ],
        [
          "5) Ocular Torticollis (Compensatory Head Posture)",
          97
        ],
        [
          "Clinical Features of Ocular Motor Palsies: Right 6th Nerve Palsy",
          98
        ],
        [
          "Ophthalmoplegia &amp; Secondary Changes",
          99
        ],
        [
          "Treatment of Paralytic Squint",
          100
        ],
        [
          "b) Concomitant Squint (Heterotropia): Definition &amp; Etiology",
          101
        ],
        [
          "Types of Concomitant Squint",
          102
        ],
        [
          "Suppression in Squint",
          103
        ],
        [
          "Clinical Picture of Concomitant Squint",
          104
        ],
        [
          "Examination of Extraocular Muscles: Inspection &amp; Cover Test",
          105
        ],
        [
          "3) Results: Manifest Squint in Concomitant Squint",
          106
        ],
        [
          "Cover Test Results: Paralytic, Latent &amp; Apparent Squint",
          107
        ],
        [
          "Values of the Cover Test &amp; Ocular Movements",
          108
        ],
        [
          "4) Measurement of the Angle of Squint: Corneal Reflex (Hirschberg)",
          109
        ],
        [
          "Perimeter, Synoptophore &amp; Prism Bar Tests",
          110
        ],
        [
          "Treatment of Concomitant Squint: Aim, Time &amp; Lines",
          111
        ],
        [
          "Surgical Treatment: Indications &amp; Aim",
          112
        ]
      ]
    },
    {
      "n": 4,
      "title": "The retina",
      "divider": 113,
      "start": 114,
      "end": 150,
      "summary": "Retinal anatomy and circulation, diabetic and hypertensive retinopathy, vascular occlusions and retinal detachment.",
      "topics": [
        [
          "Gross anatomy of the retina",
          114
        ],
        [
          "Microscopic anatomy: the retinal layers",
          115
        ],
        [
          "Blood supply of the retina",
          116
        ],
        [
          "Retinal capillaries: two groups",
          117
        ],
        [
          "The appearance of the normal fundus",
          118
        ],
        [
          "The vitreous",
          119
        ],
        [
          "Retinal vascular diseases: changes in the blood vessels",
          120
        ],
        [
          "Leakage from microcirculation",
          121
        ],
        [
          "Occlusion of microcirculation",
          122
        ],
        [
          "Diabetes mellitus",
          123
        ],
        [
          "Diabetic retinopathy: risk factors &amp; pathogenesis",
          124
        ],
        [
          "Clinical picture: symptoms &amp; early signs",
          125
        ],
        [
          "Proliferative DR &amp; diabetic maculopathy",
          126
        ],
        [
          "Treatment: medical control &amp; follow up",
          127
        ],
        [
          "Treatment: laser, injections &amp; surgery",
          128
        ],
        [
          "Arteriosclerosis: clinical signs",
          129
        ],
        [
          "Grading of arteriosclerosis",
          130
        ],
        [
          "Hypertensive retinopathy",
          131
        ],
        [
          "Hypertensive retinopathy: leakage, treatment, N.B.",
          132
        ],
        [
          "Retinopathy of toxemia of pregnancy",
          133
        ],
        [
          "Retinopathy of prematurity: pathogenesis &amp; stages",
          134
        ],
        [
          "Retinopathy of prematurity: management",
          135
        ],
        [
          "Retinal vein occlusion: pathogenesis &amp; risk factors",
          136
        ],
        [
          "Central retinal vein occlusion (CRVO)",
          137
        ],
        [
          "CRVO: complications &amp; treatment",
          138
        ],
        [
          "Branch retinal vein occlusion (BRVO)",
          139
        ],
        [
          "Retinal arterial occlusion: causes",
          140
        ],
        [
          "Central retinal artery occlusion (CRAO): early picture",
          141
        ],
        [
          "CRAO: late signs &amp; differential diagnosis",
          142
        ],
        [
          "Branch retinal artery occlusion &amp; investigations",
          143
        ],
        [
          "Treatment of retinal artery occlusion",
          144
        ],
        [
          "Retinal detachment (RD): definition &amp; classification",
          145
        ],
        [
          "I. Rhegmatogenous retinal detachment",
          146
        ],
        [
          "Rhegmatogenous RD: clinical picture",
          147
        ],
        [
          "Rhegmatogenous RD: complications &amp; treatment",
          148
        ],
        [
          "II. Tractional retinal detachment",
          149
        ],
        [
          "III. Exudative retinal detachment",
          150
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
