/**
 * Pract — Mock Interview Simulator
 * Vanilla ES6 · High-End SaaS Interactions · Client-Side Only
 */

'use strict';

/* ============================================================================
 * QUESTION BANK & DATA STRUCTURE
 * Each object: { question, expectedKeywords, role }
 * ============================================================================ */

const QUESTIONS = [
  // Software Engineer
  {
    id: 'swe-1',
    role: 'Software Engineer',
    category: 'System Design',
    question: 'How would you design a URL shortening service that handles millions of redirects per second?',
    expectedKeywords: ['hashing', 'cache', 'redis', 'database', 'load balancer', 'base62', 'sharding'],
    time: 120,
    optWords: [40, 220]
  },
  {
    id: 'swe-2',
    role: 'Software Engineer',
    category: 'Debugging',
    question: 'Walk me through how you\'d diagnose a memory leak in a production service.',
    expectedKeywords: ['profiler', 'heap dump', 'garbage collection', 'metrics', 'concurrency', 'latency', 'logs'],
    time: 120,
    optWords: [35, 200]
  },
  {
    id: 'swe-3',
    role: 'Software Engineer',
    category: 'Incident Response',
    question: 'Tell me about a time a critical bug hit production. What did you do?',
    expectedKeywords: ['rollback', 'monitoring', 'incident', 'triage', 'post-mortem', 'prevention', 'ci/cd'],
    time: 120,
    optWords: [45, 220]
  },

  // Data Analyst
  {
    id: 'da-1',
    role: 'Data Analyst',
    category: 'Experimentation',
    question: 'How do you design and evaluate an A/B test for a checkout flow?',
    expectedKeywords: ['hypothesis', 'sample size', 'p-value', 'statistical significance', 'conversion rate', 'variance', 'bias'],
    time: 120,
    optWords: [40, 200]
  },
  {
    id: 'da-2',
    role: 'Data Analyst',
    category: 'Data Quality',
    question: 'You\'re building a churn dashboard and the underlying data is messy. How do you handle it?',
    expectedKeywords: ['imputation', 'nulls', 'data cleaning', 'sql', 'outliers', 'joins', 'validation'],
    time: 120,
    optWords: [35, 190]
  },
  {
    id: 'da-3',
    role: 'Data Analyst',
    category: 'Communication',
    question: 'How do you explain a complex attribution analysis to a non-technical exec?',
    expectedKeywords: ['storytelling', 'visualization', 'roi', 'actionable', 'kpi', 'stakeholders', 'clarity'],
    time: 120,
    optWords: [40, 200]
  },

  // Product Manager
  {
    id: 'pm-1',
    role: 'Product Manager',
    category: 'Prioritization',
    question: 'Sales, Eng, and Design all want different features shipped. How do you decide?',
    expectedKeywords: ['rice', 'impact', 'effort', 'okrs', 'user research', 'trade-offs', 'roadmap'],
    time: 120,
    optWords: [45, 220]
  },
  {
    id: 'pm-2',
    role: 'Product Manager',
    category: 'Metric Debugging',
    question: 'A key engagement metric dropped 18% overnight. Walk me through your response.',
    expectedKeywords: ['funnel', 'segmentation', 'tracking', 'telemetry', 'release', 'hypothesis', 'communication'],
    time: 120,
    optWords: [40, 210]
  },
  {
    id: 'pm-3',
    role: 'Product Manager',
    category: 'Go-to-Market',
    question: 'How would you figure out pricing for a new B2B SaaS product?',
    expectedKeywords: ['customer interviews', 'retention', 'pricing', 'ltv', 'churn', 'adoption', 'feedback loop'],
    time: 120,
    optWords: [40, 210]
  },

  // Marketing
  {
    id: 'mkt-1',
    role: 'Marketing',
    category: 'Acquisition',
    question: 'How do you build a customer acquisition campaign when the budget is tight?',
    expectedKeywords: ['cac', 'ltv', 'conversion rate', 'funnel', 'attribution', 'channels', 'retargeting'],
    time: 120,
    optWords: [40, 200]
  },
  {
    id: 'mkt-2',
    role: 'Marketing',
    category: 'Content Strategy',
    question: 'Describe how you\'d build an SEO and content engine in a competitive space.',
    expectedKeywords: ['seo', 'organic', 'distribution', 'backlinks', 'intent', 'flywheel', 'content syndication'],
    time: 120,
    optWords: [35, 190]
  },
  {
    id: 'mkt-3',
    role: 'Marketing',
    category: 'Retention',
    question: 'Your company just raised prices. Customers are upset. What do you do?',
    expectedKeywords: ['nps', 'sentiment', 'messaging', 'retention', 'segmentation', 'transparency', 'churn'],
    time: 120,
    optWords: [35, 190]
  }
];

const ROLES = [
  {
    title: 'Software Engineer',
    desc: 'System design, distributed architectures, concurrency, and production incident response.',
    tags: ['System Design', 'Concurrency', 'CI/CD']
  },
  {
    title: 'Data Analyst',
    desc: 'A/B testing experimentation, SQL/ETL pipelines, and executive stakeholder storytelling.',
    tags: ['Hypothesis Testing', 'SQL', 'Attribution']
  },
  {
    title: 'Product Manager',
    desc: 'Prioritization frameworks (RICE), metric triage, telemetry, and GTM strategy.',
    tags: ['RICE Matrix', 'Telemetry', 'Roadmaps']
  },
  {
    title: 'Marketing',
    desc: 'Customer acquisition loops, CAC/LTV economics, organic flywheels, and churn retention.',
    tags: ['CAC:LTV', 'Flywheels', 'Retention']
  }
];

const FILLERS = ['um', 'uh', 'like', 'actually', 'basically', 'literally', 'you know', 'sort of', 'kind of'];

/* ============================================================================
 * STATE
 * ============================================================================ */

const S = {
  role: null,
  questions: [],
  qi: 0,
  timerId: null,
  totalTime: 120,
  remaining: 120,
  results: [],
  currentView: 'vSelect',
  isModalOpen: false,
  matchedKeywordsSet: new Set()
};

/* ============================================================================
 * DOM REFERENCES
 * ============================================================================ */

const el = id => document.getElementById(id);

const D = {
  // Navigation
  navHome: el('navHome'),
  breadcrumbWrap: el('breadcrumbWrap'),
  breadcrumb: el('breadcrumb'),
  btnExit: el('btnExit'),

  // Views
  vSelect: el('vSelect'),
  vInterview: el('vInterview'),
  vFeedback: el('vFeedback'),
  vSummary: el('vSummary'),

  // Role selection
  roles: el('roles'),

  // Interview stage
  ivCat: el('ivCat'),
  audioWave: el('audioWave'),
  ivNum: el('ivNum'),
  ivTotal: el('ivTotal'),
  timerPill: el('timerPill'),
  timerText: el('timerText'),
  timerBar: el('timerBar'),
  ivQ: el('ivQ'),
  answerBox: el('answerBox'),
  radarCount: el('radarCount'),
  radarChipsList: el('radarChipsList'),
  metaWords: el('metaWords'),
  metaFillers: el('metaFillers'),
  metaChars: el('metaChars'),
  btnSkip: el('btnSkip'),
  btnSubmit: el('btnSubmit'),

  // Feedback stage
  fbRing: el('fbRing'),
  fbScoreNum: el('fbScoreNum'),
  fbVerdict: el('fbVerdict'),
  fbBenchmarkTag: el('fbBenchmarkTag'),
  fbQEcho: el('fbQEcho'),
  scoreCompText: el('scoreCompText'),
  segKw: el('segKw'),
  segDepth: el('segDepth'),
  segFluency: el('segFluency'),
  segPen: el('segPen'),
  fbKw: el('fbKw'),
  fbWc: el('fbWc'),
  fbFc: el('fbFc'),
  fbKwList: el('fbKwList'),
  fbFillerSection: el('fbFillerSection'),
  fbFillerList: el('fbFillerList'),
  fbNotes: el('fbNotes'),
  fbTranscript: el('fbTranscript'),
  btnCopyTranscript: el('btnCopyTranscript'),
  copyFeedback: el('copyFeedback'),
  btnNext: el('btnNext'),
  btnNextLabel: el('btnNextLabel'),

  // Summary stage
  sumSub: el('sumSub'),
  sumRing: el('sumRing'),
  sumScoreNum: el('sumScoreNum'),
  sumVerdict: el('sumVerdict'),
  sumVerdictDesc: el('sumVerdictDesc'),
  ssAvg: el('ssAvg'),
  ssKw: el('ssKw'),
  ssWords: el('ssWords'),
  ssFillers: el('ssFillers'),
  histList: el('histList'),
  btnRetry: el('btnRetry'),

  // Modal
  exitModal: el('exitModal'),
  modalBtnCancel: el('modalBtnCancel'),
  modalBtnConfirm: el('modalBtnConfirm')
};

/* ============================================================================
 * GSAP VIEW ROUTER & TRANSITIONS
 * ============================================================================ */

const VIEWS = [D.vSelect, D.vInterview, D.vFeedback, D.vSummary];

function show(targetViewEl) {
  const currentEl = VIEWS.find(v => !v.classList.contains('v-hidden'));
  const tl = gsap.timeline();

  if (currentEl && currentEl !== targetViewEl) {
    tl.to(currentEl, {
      opacity: 0,
      y: -6,
      duration: 0.16,
      ease: 'power2.in',
      onComplete() {
        currentEl.classList.add('v-hidden');
        gsap.set(currentEl, { clearProps: 'all' });
      }
    });
  }

  tl.call(() => {
    targetViewEl.classList.remove('v-hidden');
    gsap.set(targetViewEl, { opacity: 0, y: 10 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNavigationChrome();
  });

  tl.to(targetViewEl, {
    opacity: 1,
    y: 0,
    duration: 0.26,
    ease: 'power2.out'
  });
}

function updateNavigationChrome() {
  if (D.vSelect && !D.vSelect.classList.contains('v-hidden')) {
    S.currentView = 'vSelect';
    D.breadcrumbWrap.classList.add('hidden');
    D.btnExit.classList.add('hidden');
  } else if (D.vInterview && !D.vInterview.classList.contains('v-hidden')) {
    S.currentView = 'vInterview';
    D.breadcrumbWrap.classList.remove('hidden');
    D.breadcrumb.textContent = `${S.role} · Q${S.qi + 1} of ${S.questions.length}`;
    D.btnExit.classList.remove('hidden');
  } else if (D.vFeedback && !D.vFeedback.classList.contains('v-hidden')) {
    S.currentView = 'vFeedback';
    D.breadcrumbWrap.classList.remove('hidden');
    D.breadcrumb.textContent = `${S.role} · Evaluation`;
    D.btnExit.classList.remove('hidden');
  } else if (D.vSummary && !D.vSummary.classList.contains('v-hidden')) {
    S.currentView = 'vSummary';
    D.breadcrumbWrap.classList.remove('hidden');
    D.breadcrumb.textContent = `${S.role} · Digest`;
    D.btnExit.classList.add('hidden');
  }
}

/* ============================================================================
 * GSAP MICRO-ANIMATIONS (Waveform & Interactive Spotlight)
 * ============================================================================ */

/**
 * Animate the live 4-bar waveform visualizer
 */
function pulseAudioWaveform() {
  if (!D.audioWave) return;
  const bars = D.audioWave.querySelectorAll('.wave-bar');
  D.audioWave.classList.add('active');

  bars.forEach((bar, idx) => {
    gsap.to(bar, {
      scaleY: Math.random() * 0.8 + 0.3,
      duration: 0.15 + idx * 0.05,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    });
  });
}

/* ============================================================================
 * TIMER ENGINE
 * ============================================================================ */

function startTimer(seconds) {
  stopTimer();
  S.totalTime = seconds;
  S.remaining = seconds;
  paintTimer();

  S.timerId = setInterval(() => {
    S.remaining--;
    paintTimer();
    // Subtle waveform pulse every few seconds of active time
    if (S.remaining % 3 === 0) pulseAudioWaveform();

    if (S.remaining <= 0) {
      stopTimer();
      submitAnswer(true);
    }
  }, 1000);
}

function stopTimer() {
  if (S.timerId !== null) {
    clearInterval(S.timerId);
    S.timerId = null;
  }
}

function paintTimer() {
  const t = Math.max(0, S.remaining);
  const m = Math.floor(t / 60);
  const s = t % 60;
  D.timerText.textContent = `${m}:${String(s).padStart(2, '0')}`;

  const pct = t / S.totalTime;
  D.timerBar.style.width = `${pct * 100}%`;

  D.timerPill.classList.remove('warning', 'critical');
  D.timerBar.classList.remove('warning', 'critical');

  if (t <= 15) {
    D.timerPill.classList.add('critical');
    D.timerBar.classList.add('critical');
  } else if (t <= 40) {
    D.timerPill.classList.add('warning');
    D.timerBar.classList.add('warning');
  }
}

/* ============================================================================
 * REAL-TIME INPUT MONITORING & KEYWORD RADAR
 * ============================================================================ */

function getWords(text) {
  if (!text || !text.trim()) return [];
  return text.trim().split(/\s+/);
}

function findFillers(text) {
  if (!text || !text.trim()) return [];
  const lower = text.toLowerCase();
  const out = [];

  FILLERS.forEach(f => {
    const escaped = f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches) {
      out.push({ word: f, count: matches.length });
    }
  });

  return out;
}

/**
 * Initializes the keyword HUD tracker for the current question
 */
function initKeywordRadar(questionObj) {
  D.radarChipsList.innerHTML = '';
  S.matchedKeywordsSet.clear();

  questionObj.expectedKeywords.forEach(kw => {
    const chip = document.createElement('span');
    chip.className = 'radar-chip';
    chip.dataset.keyword = kw.toLowerCase();
    chip.textContent = kw;
    D.radarChipsList.appendChild(chip);
  });

  updateRadarCount(0, questionObj.expectedKeywords.length);
}

function updateRadarCount(hitCount, totalCount) {
  D.radarCount.textContent = `${hitCount} of ${totalCount} mentioned`;
}

function handleInputKeyup(e) {
  const text = D.answerBox.value;
  const wordCount = getWords(text).length;
  const charCount = text.length;

  // Pulse live waveform while typing
  pulseAudioWaveform();

  D.metaWords.textContent = `${wordCount} word${wordCount === 1 ? '' : 's'}`;
  D.metaChars.textContent = `${charCount} char${charCount === 1 ? '' : 's'}`;

  // Check Fillers
  const fillers = findFillers(text);
  const fillerCount = fillers.reduce((sum, item) => sum + item.count, 0);

  if (fillerCount === 0) {
    D.metaFillers.textContent = '0 fillers';
    D.metaFillers.className = 'meta-item meta-clean';
  } else {
    D.metaFillers.textContent = `${fillerCount} filler${fillerCount === 1 ? '' : 's'}`;
    D.metaFillers.className = 'meta-item meta-alert';
  }

  // Real-time keyword matching in Radar HUD
  const q = S.questions[S.qi];
  if (q) {
    const lower = text.toLowerCase();
    let hitCount = 0;

    const chips = D.radarChipsList.querySelectorAll('.radar-chip');
    chips.forEach(chip => {
      const kw = chip.dataset.keyword;
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}`, 'i');

      if (regex.test(lower) || lower.includes(kw)) {
        hitCount++;
        if (!chip.classList.contains('active')) {
          chip.classList.add('active');
          chip.textContent = `✓ ${chip.dataset.keyword}`;
          // Micro GSAP pop
          gsap.fromTo(chip, { scale: 0.9 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
        }
      } else {
        if (chip.classList.contains('active')) {
          chip.classList.remove('active');
          chip.textContent = chip.dataset.keyword;
        }
      }
    });

    updateRadarCount(hitCount, q.expectedKeywords.length);
  }

  // Shortcut: Cmd/Ctrl + Enter to submit
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    // Tactile button bounce
    gsap.timeline()
      .to(D.btnSubmit, { scale: 0.95, duration: 0.1 })
      .to(D.btnSubmit, { scale: 1, duration: 0.15, onComplete: () => submitAnswer(false) });
  }
}

/* ============================================================================
 * EVALUATION ENGINE
 * ============================================================================ */

function evaluate(q, text, timedOut) {
  const clean = (text || '').trim();
  const wordsList = getWords(clean);
  const wordCount = wordsList.length;
  const lower = clean.toLowerCase();

  // 1. Keyword coverage
  const hit = [];
  const miss = [];
  q.expectedKeywords.forEach(kw => {
    const escaped = kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}`, 'i');
    if (regex.test(lower) || lower.includes(kw.toLowerCase())) {
      hit.push(kw);
    } else {
      miss.push(kw);
    }
  });

  const kwTotal = q.expectedKeywords.length;
  const kwRatio = kwTotal > 0 ? hit.length / kwTotal : 0;
  const kwScore = Math.round(kwRatio * 55);

  // 2. Length & depth
  const [minOpt, maxOpt] = q.optWords || [40, 200];
  let lenScore = 35;
  let lenLabel = '';

  if (wordCount === 0) {
    lenScore = 0;
    lenLabel = 'No response provided.';
  } else if (wordCount < 20) {
    lenScore = 8;
    lenLabel = `Very brief (${wordCount} words). Interviews require substantive explanations.`;
  } else if (wordCount < minOpt) {
    lenScore = 20;
    lenLabel = `Slightly concise (${wordCount} words). Expand with concrete trade-offs and examples.`;
  } else if (wordCount > maxOpt + 100) {
    lenScore = 24;
    lenLabel = `Verbose response (${wordCount} words). Structured conciseness projects confidence.`;
  } else {
    lenScore = 35;
    lenLabel = `Well-calibrated response depth (${wordCount} words).`;
  }

  // 3. Filler words penalty
  const fillers = findFillers(clean);
  const fillerCount = fillers.reduce((acc, curr) => acc + curr.count, 0);
  const fillerPen = Math.min(25, fillerCount * 4);

  // 4. Fluency base
  const fluency = wordCount >= 15 ? 10 : 0;

  // Composite score
  let score = kwScore + lenScore + fluency - fillerPen;
  if (wordCount === 0) score = 0;
  score = Math.max(0, Math.min(100, Math.round(score)));

  // Interviewer notes
  const notes = [];
  if (timedOut) notes.push('Time expired before submission. Practice pacing within 2 minutes.');
  notes.push(lenLabel);

  if (hit.length === kwTotal && wordCount > 0) {
    notes.push('Exemplary terminology coverage — all expected technical keywords articulated.');
  } else if (hit.length > 0) {
    notes.push(`Covered ${hit.length} of ${kwTotal} target keywords. Review missing technical terms.`);
  } else if (wordCount > 0) {
    notes.push('None of the target domain keywords were detected.');
  }

  if (fillerCount === 0 && wordCount >= 25) {
    notes.push('Clean articulation — zero speech fillers detected.');
  } else if (fillerCount > 0) {
    notes.push(`Detected ${fillerCount} filler word${fillerCount === 1 ? '' : 's'} (${fillers.map(f => `"${f.word}" ×${f.count}`).join(', ')}).`);
  }

  let verdict = 'Needs work';
  let benchmarkTag = 'Below Bar';
  if (score >= 85) {
    verdict = 'Excellent response';
    benchmarkTag = 'Top 5%';
  } else if (score >= 70) {
    verdict = 'Strong answer';
    benchmarkTag = 'Meets Bar';
  } else if (score >= 50) {
    verdict = 'Competent with gaps';
    benchmarkTag = 'Developing';
  }

  return {
    qText: q.question,
    category: q.category,
    response: clean,
    wc: wordCount,
    hit,
    miss,
    kwRatio,
    kwScore,
    lenScore,
    fluency,
    fillers,
    fillerCount,
    fillerPen,
    score,
    verdict,
    benchmarkTag,
    notes,
    timedOut
  };
}

/* ============================================================================
 * RENDER: ROLES SELECTION (2x2 Grid + GSAP Mouse Spotlight)
 * ============================================================================ */

function renderRoles() {
  D.roles.innerHTML = '';

  ROLES.forEach((r, idx) => {
    const qCount = QUESTIONS.filter(q => q.role === r.title).length;
    const card = document.createElement('div');
    card.className = 'role-card';
    card.dataset.index = idx;

    // Mouse Spotlight Tracking
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.onclick = () => {
      // Tactile launch animation
      gsap.timeline()
        .to(card, { scale: 0.98, duration: 0.08 })
        .to(card, { scale: 1, duration: 0.15, onComplete: () => selectRole(r.title) });
    };

    card.innerHTML = `
      <div>
        <div class="role-card-header">
          <h3 class="role-card-title">${r.title}</h3>
          <div class="role-card-badges">
            <kbd class="kbd-subtle">${idx + 1}</kbd>
          </div>
        </div>
        <p class="role-card-desc">${r.desc}</p>
      </div>
      <div class="role-card-footer">
        <div class="role-card-tags">
          ${r.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
        </div>
        <span class="role-q-count">${qCount} Qs</span>
      </div>
    `;

    D.roles.appendChild(card);
  });
}

/* ============================================================================
 * RENDER: FEEDBACK
 * ============================================================================ */

function highlightTranscript(text, hitKws, fillers) {
  if (!text) return '<span style="color:var(--text-dim)">[No response recorded]</span>';
  let safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  fillers.forEach(({ word }) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
    safe = safe.replace(regex, '<span class="hl-filler">$1</span>');
  });

  hitKws.forEach(kw => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
    safe = safe.replace(regex, '<span class="hl-kw">$1</span>');
  });

  return safe;
}

function countUp(targetEl, targetNum, duration = 0.6, suffix = '') {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetNum,
    duration,
    ease: 'power2.out',
    onUpdate() {
      targetEl.textContent = Math.round(obj.val) + suffix;
    }
  });
}

function renderFeedback(report) {
  const circ = 2 * Math.PI * 32; // r=32 -> ~201.06
  gsap.set(D.fbRing, { attr: { 'stroke-dashoffset': circ } });
  D.fbScoreNum.textContent = '0';

  D.fbVerdict.textContent = report.verdict;
  D.fbBenchmarkTag.textContent = report.benchmarkTag;
  D.fbQEcho.textContent = report.qText;

  // Segmented Breakdown Track
  D.scoreCompText.textContent = `${report.score} / 100`;
  D.segKw.style.width = `${report.kwScore}%`;
  D.segDepth.style.width = `${report.lenScore}%`;
  D.segFluency.style.width = `${report.fluency}%`;
  D.segPen.style.width = `${report.fillerPen}%`;

  // Stats Strip
  const totalKw = report.hit.length + report.miss.length;
  D.fbKw.textContent = `${report.hit.length} / ${totalKw}`;
  D.fbWc.textContent = `${report.wc} words`;
  D.fbFc.textContent = report.fillerCount === 0 ? 'None' : `${report.fillerCount} found`;

  // Keywords List
  D.fbKwList.innerHTML = '';
  report.hit.forEach(kw => {
    const span = document.createElement('span');
    span.className = 'kw-badge hit';
    span.textContent = `✓ ${kw}`;
    D.fbKwList.appendChild(span);
  });
  report.miss.forEach(kw => {
    const span = document.createElement('span');
    span.className = 'kw-badge miss';
    span.textContent = `✕ ${kw}`;
    D.fbKwList.appendChild(span);
  });

  // Fillers List
  D.fbFillerList.innerHTML = '';
  if (report.fillers.length === 0) {
    D.fbFillerSection.style.display = 'none';
  } else {
    D.fbFillerSection.style.display = '';
    report.fillers.forEach(({ word, count }) => {
      const span = document.createElement('span');
      span.className = 'filler-tag';
      span.innerHTML = `"${word}" <span class="filler-ct">×${count}</span>`;
      D.fbFillerList.appendChild(span);
    });
  }

  // Notes
  D.fbNotes.innerHTML = '';
  report.notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    D.fbNotes.appendChild(li);
  });

  // Transcript
  D.fbTranscript.innerHTML = highlightTranscript(report.response, report.hit, report.fillers);
  D.copyFeedback.textContent = 'Copy';

  // Next Button Label
  const isFinal = S.qi >= S.questions.length - 1;
  D.btnNextLabel.textContent = isFinal ? 'View Session Summary' : 'Next question';

  show(D.vFeedback);

  // GSAP Ring Animation
  const offset = circ * (1 - report.score / 100);
  gsap.to(D.fbRing, {
    attr: { 'stroke-dashoffset': offset },
    duration: 0.85,
    delay: 0.18,
    ease: 'power3.out'
  });

  setTimeout(() => countUp(D.fbScoreNum, report.score, 0.75), 220);

  // GSAP Stagger Keyword Badges
  gsap.from('.kw-badge', {
    opacity: 0,
    y: 6,
    scale: 0.95,
    duration: 0.25,
    stagger: 0.03,
    delay: 0.35,
    ease: 'power2.out',
    clearProps: 'all'
  });
}

/* ============================================================================
 * RENDER: SESSION SUMMARY
 * ============================================================================ */

function renderSummary() {
  const evals = S.results;
  const count = evals.length;
  if (count === 0) return;

  const avg = Math.round(evals.reduce((sum, e) => sum + e.score, 0) / count);
  const totalHit = evals.reduce((sum, e) => sum + e.hit.length, 0);
  const totalPossible = evals.reduce((sum, e) => sum + e.hit.length + e.miss.length, 0);
  const avgWords = Math.round(evals.reduce((sum, e) => sum + e.wc, 0) / count);
  const totalFillers = evals.reduce((sum, e) => sum + e.fillerCount, 0);

  D.sumSub.textContent = `${S.role} track · ${count} questions completed`;

  let verdict = 'Practice recommended.';
  let desc = 'Focus on incorporating core domain keywords and structuring concise answers.';
  if (avg >= 85) {
    verdict = 'You\'re ready.';
    desc = 'Strong keyword density, structured depth, and clean verbal fluency.';
  } else if (avg >= 70) {
    verdict = 'Looking strong.';
    desc = 'Solid domain grasp. Fine-tune technical coverage and eliminate occasional filler habits.';
  } else if (avg >= 50) {
    verdict = 'Getting there.';
    desc = 'Good foundation. Practice delivering more specific technical substance within the time limit.';
  }

  D.sumVerdict.textContent = verdict;
  D.sumVerdictDesc.textContent = desc;

  // Ring
  const circ = 2 * Math.PI * 46; // r=46 -> ~289.02
  gsap.set(D.sumRing, { attr: { 'stroke-dashoffset': circ } });
  D.sumScoreNum.textContent = '0';

  D.ssAvg.textContent = '0%';
  D.ssKw.textContent = `0/${totalPossible}`;
  D.ssWords.textContent = '0';
  D.ssFillers.textContent = '0';

  // History List
  D.histList.innerHTML = '';
  evals.forEach((e, i) => {
    const row = document.createElement('div');
    row.className = 'hist-row';
    row.innerHTML = `
      <div class="hist-left">
        <div class="hist-q">Q${i + 1}. ${e.qText}</div>
        <div class="hist-meta">${e.wc} words · ${e.hit.length} keywords · ${e.fillerCount} fillers</div>
      </div>
      <span class="hist-score">${e.score}/100</span>
    `;
    D.histList.appendChild(row);
  });

  show(D.vSummary);

  const offset = circ * (1 - avg / 100);
  gsap.to(D.sumRing, {
    attr: { 'stroke-dashoffset': offset },
    duration: 1.1,
    delay: 0.25,
    ease: 'power3.out'
  });

  setTimeout(() => {
    countUp(D.sumScoreNum, avg, 0.9);
    countUp(D.ssAvg, avg, 0.7, '%');
    D.ssKw.textContent = `${totalHit}/${totalPossible}`;
    countUp(D.ssWords, avgWords, 0.7);
    countUp(D.ssFillers, totalFillers, 0.5);
  }, 320);

  // Stagger History Rows
  gsap.from('.hist-row', {
    opacity: 0,
    x: -8,
    duration: 0.25,
    stagger: 0.05,
    delay: 0.4,
    ease: 'power2.out',
    clearProps: 'all'
  });
}

/* ============================================================================
 * WORKFLOW & BESPOKE MODAL
 * ============================================================================ */

function selectRole(title) {
  S.role = title;
  S.questions = QUESTIONS.filter(q => q.role === title);
  S.qi = 0;
  S.results = [];
  loadQuestion();
}

function loadQuestion() {
  const q = S.questions[S.qi];
  D.ivNum.textContent = S.qi + 1;
  D.ivTotal.textContent = S.questions.length;
  D.ivCat.textContent = q.category;
  D.answerBox.value = '';
  D.metaWords.textContent = '0 words';
  D.metaChars.textContent = '0 chars';
  D.metaFillers.textContent = '0 fillers';
  D.metaFillers.className = 'meta-item meta-clean';

  // Init Real-Time Keyword Radar HUD
  initKeywordRadar(q);

  D.ivQ.textContent = q.question;
  D.ivQ.style.opacity = 0;

  show(D.vInterview);

  gsap.to(D.ivQ, { opacity: 1, duration: 0.3, delay: 0.22, ease: 'power2.out' });

  setTimeout(() => D.answerBox.focus(), 320);
  startTimer(q.time || 120);
}

function submitAnswer(timedOut = false) {
  stopTimer();
  const q = S.questions[S.qi];
  const report = evaluate(q, D.answerBox.value, timedOut);
  S.results.push(report);
  renderFeedback(report);
}

function nextQuestion() {
  S.qi++;
  if (S.qi < S.questions.length) {
    loadQuestion();
  } else {
    renderSummary();
  }
}

/**
 * Bespoke SaaS Modal for Exiting Sessions
 */
function openExitModal() {
  if (S.currentView === 'vSelect') return;
  if (S.currentView === 'vSummary') {
    resetSession();
    return;
  }

  // Pause timer during active interview
  if (S.currentView === 'vInterview') {
    stopTimer();
  }

  S.isModalOpen = true;
  D.exitModal.classList.remove('hidden');
}

function closeExitModal() {
  S.isModalOpen = false;
  D.exitModal.classList.add('hidden');

  // Resume remaining time if still in active interview
  if (S.currentView === 'vInterview' && S.remaining > 0) {
    startTimer(S.remaining);
    D.answerBox.focus();
  }
}

function confirmExitModal() {
  closeExitModal();
  resetSession();
}

function resetSession() {
  stopTimer();
  S.role = null;
  S.questions = [];
  S.qi = 0;
  S.results = [];
  D.answerBox.value = '';
  show(D.vSelect);
}

/**
 * Copy Transcript utility
 */
function copyTranscriptToClipboard() {
  const currentReport = S.results[S.results.length - 1];
  if (!currentReport || !currentReport.response) return;

  navigator.clipboard.writeText(currentReport.response).then(() => {
    D.copyFeedback.textContent = 'Copied!';
    setTimeout(() => {
      D.copyFeedback.textContent = 'Copy';
    }, 2000);
  }).catch(() => {
    D.copyFeedback.textContent = 'Failed';
  });
}

/* ============================================================================
 * GLOBAL KEYBOARD SHORTCUTS
 * ============================================================================ */

function handleGlobalKeydown(e) {
  // If modal is open
  if (S.isModalOpen) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeExitModal();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      confirmExitModal();
    }
    return;
  }

  // Escape to trigger exit modal from interview or feedback
  if (e.key === 'Escape') {
    if (S.currentView === 'vInterview' || S.currentView === 'vFeedback') {
      e.preventDefault();
      openExitModal();
      return;
    }
  }

  // Track selection shortcuts 1-4 when on vSelect
  if (S.currentView === 'vSelect') {
    if (['1', '2', '3', '4'].includes(e.key)) {
      const index = parseInt(e.key, 10) - 1;
      const card = D.roles.querySelectorAll('.role-card')[index];
      if (ROLES[index] && card) {
        e.preventDefault();
        // Tactile keypress bounce on card
        gsap.timeline()
          .to(card, { scale: 0.97, duration: 0.08 })
          .to(card, { scale: 1, duration: 0.15, onComplete: () => selectRole(ROLES[index].title) });
      }
    }
  }
}

/* ============================================================================
 * EVENT BINDINGS
 * ============================================================================ */

function bindEvents() {
  // Navigation
  D.navHome.onclick = openExitModal;
  D.btnExit.onclick = openExitModal;

  // Modal actions
  D.modalBtnCancel.onclick = closeExitModal;
  D.modalBtnConfirm.onclick = confirmExitModal;

  // Interview stage
  D.answerBox.onkeyup = handleInputKeyup;
  D.btnSubmit.onclick = () => submitAnswer(false);
  D.btnSkip.onclick = () => {
    D.answerBox.value = '';
    submitAnswer(false);
  };

  // Feedback & Summary
  D.btnCopyTranscript.onclick = copyTranscriptToClipboard;
  D.btnNext.onclick = nextQuestion;
  D.btnRetry.onclick = resetSession;

  // Global keyboard shortcuts
  document.addEventListener('keydown', handleGlobalKeydown);
}

/* ============================================================================
 * INITIALIZATION
 * ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderRoles();
  bindEvents();
  updateNavigationChrome();

  // GSAP entrance sequence
  gsap.from('.hero-eyebrow', { opacity: 0, y: 8, duration: 0.35, ease: 'power2.out' });
  gsap.from('.hero-headline', { opacity: 0, y: 12, duration: 0.42, delay: 0.08, ease: 'power2.out' });
  gsap.from('.hero-subtext', { opacity: 0, y: 10, duration: 0.38, delay: 0.15, ease: 'power2.out' });
  gsap.from('.role-card', {
    opacity: 0,
    y: 12,
    duration: 0.32,
    stagger: 0.06,
    delay: 0.22,
    ease: 'power2.out',
    clearProps: 'all'
  });
});
