// ─────────────────────────────────────────────────────────────────────────────
//  PROFILE DATA — the single source of truth for the whole site.
//  Paste real resume content in here and every section updates itself.
//  ⚠ Everything below is PLACEHOLDER content until the real resume lands.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Ankit Kumar',
  heroLines: ['ANKIT', 'KUMAR'], // big chrome title, one line per array item
  monogram: 'AK.EXE',
  role: 'FULL-STACK DEVELOPER',
  kicker: '✦ PORTFOLIO v2.0 — NOW WITH 100% MORE NEON ✦',
  tagline:
    'I build fast, slick web experiences with a retro soul — turning coffee into clean code and ideas into interfaces people actually remember.',
  location: 'Pune, Maharashtra, India',
  email: 'ankit@example.com', // TODO: real email
  resumeUrl: '#', // TODO: link to PDF

  socials: [
    { label: 'GITHUB', handle: '@ankitkumar131', url: 'https://github.com/ankitkumar131' },
    { label: 'LINKEDIN', handle: 'in/ankitkumar', url: 'https://www.linkedin.com/' },
    { label: 'EMAIL', handle: 'say hi 👋', url: 'mailto:ankit@example.com' },
    { label: 'RÉSUMÉ', handle: 'one-pager', url: '#' },
  ],

  heroMarquee: [
    'OPEN TO WORK',
    'FULL-STACK DEVELOPER',
    'REACT',
    'NODE.JS',
    'TYPESCRIPT',
    'PYTHON',
    'AWS',
    'MOTION & ANIMATION',
    'BASED IN PUNE',
  ],

  // ── ABOUT ──────────────────────────────────────────────────────────────────
  aboutLines: [
    "Hey — I'm Ankit, a full-stack developer who treats every pixel like it owes him money.",
    'I spend my days shipping performant products and my nights arguing with CSS. (CSS usually wins.)',
    'Give me a problem worth solving and watch me disappear into the matrix until it runs at 60fps.',
  ],

  stats: [
    { value: 3, suffix: '+', label: 'YEARS SHIPPING CODE' },
    { value: 25, suffix: '+', label: 'PROJECTS DEPLOYED' },
    { value: 97, suffix: '%', label: 'CAFFEINE SATURATION' },
  ],

  chips: [
    { k: 'LOCATION', v: 'PUNE, IN' },
    { k: 'STATUS', v: 'OPEN TO WORK', live: true },
    { k: 'TIMEZONE', v: 'IST (UTC+5:30)' },
    { k: 'CURRENTLY', v: 'BUILDING COOL SH*T' },
  ],

  // ── SKILLS ─────────────────────────────────────────────────────────────────
  skillGroups: [
    {
      title: 'FRONTEND',
      skills: [
        { name: 'React / Next.js', level: 90 },
        { name: 'JavaScript / TypeScript', level: 88 },
        { name: 'HTML / CSS / Motion', level: 92 },
      ],
    },
    {
      title: 'BACKEND',
      skills: [
        { name: 'Node.js / Express', level: 85 },
        { name: 'Python / FastAPI', level: 75 },
        { name: 'PostgreSQL / MongoDB', level: 80 },
      ],
    },
    {
      title: 'TOOLS & CLOUD',
      skills: [
        { name: 'AWS / Docker', level: 78 },
        { name: 'Git / CI-CD', level: 86 },
        { name: 'Figma / Design Systems', level: 70 },
      ],
    },
  ],

  toolsMarquee: [
    'REACT', 'NEXT.JS', 'TYPESCRIPT', 'NODE.JS', 'EXPRESS', 'PYTHON', 'FASTAPI',
    'POSTGRESQL', 'MONGODB', 'REDIS', 'DOCKER', 'AWS', 'GIT', 'FIGMA', 'GSAP',
    'TAILWIND', 'VITE', 'JEST',
  ],

  // ── EXPERIENCE ─────────────────────────────────────────────────────────────
  experience: [
    {
      tag: 'LEVEL 3',
      period: '2024 — NOW',
      role: 'Software Engineer II',
      company: 'Nebulon Labs',
      points: [
        'Own the frontend of a product used by 50k+ humans (and broken by none of them, thank you very much).',
        'Cut initial page load by 60% — speed is a feature, fight me.',
        'Mentor interns in the dark arts of clean code and ruthless code review.',
      ],
    },
    {
      tag: 'LEVEL 2',
      period: '2022 — 2024',
      role: 'Software Engineer',
      company: 'PixelForge Technologies',
      points: [
        'Built and shipped 10+ features end-to-end across a React + Node stack.',
        'Introduced a design system that made "make it pop" a measurable science.',
        'Automated CI/CD pipelines, saving the team ~6 hours a week of manual misery.',
      ],
    },
    {
      tag: 'LEVEL 1',
      period: '2021 — 2022',
      role: 'SDE Intern',
      company: 'OrbitX',
      points: [
        'Shipped an internal dashboard 3 devs said was "impossible in 8 weeks". It took 7.',
        'Wrote tests. Voluntarily. Nobody asked. Nobody forgot.',
      ],
    },
  ],

  // ── PROJECTS ───────────────────────────────────────────────────────────────
  projects: [
    {
      id: 'nebula-cart',
      title: 'NEBULA CART',
      desc: 'An e-commerce platform with a cart that never wobbles. 60fps everything, because shoppers bounce and so do frames.',
      tech: ['NEXT.JS', 'STRIPE', 'POSTGRESQL', 'TAILWIND'],
      repo: 'https://github.com/ankitkumar131',
      live: '#',
      cover: '/covers/build-01.jpg',
    },
    {
      id: 'synth-ai',
      title: 'SYNTH.AI',
      desc: 'An AI chat companion that actually remembers your birthday. Streaming responses, voice input, zero cringe.',
      tech: ['REACT', 'NODE.JS', 'OPENAI', 'REDIS'],
      repo: 'https://github.com/ankitkumar131',
      live: '#',
      cover: '/covers/build-02.jpg',
    },
    {
      id: 'retrowave-fm',
      title: 'RETROWAVE.FM',
      desc: 'A music streamer for people who miss the 80s they never lived in. Web Audio API visualizers included.',
      tech: ['REACT', 'WEB AUDIO API', 'NODE.JS'],
      repo: 'https://github.com/ankitkumar131',
      live: '#',
      cover: '/covers/build-03.jpg',
    },
    {
      id: 'dev-toolbox',
      title: 'DEV/TOOLBOX',
      desc: '20+ developer utilities in one dashboard. My open-source Swiss Army knife — starred by strangers, trusted by me.',
      tech: ['TYPESCRIPT', 'VITE', 'EXPRESS'],
      repo: 'https://github.com/ankitkumar131',
      live: '#',
      cover: '/covers/build-04.jpg',
    },
  ],

  // ── CONTACT / FOOTER ───────────────────────────────────────────────────────
  contactLines: ['LET\u2019S BUILD', 'SOMETHING', 'LEGENDARY'],
  footerMarquee: [
    'THANKS FOR SCROLLING',
    'BUILT WITH REACT + GSAP + COFFEE',
    'MADE IN PUNE ✦ 18.52°N 73.85°E',
    'NO PIXELS WERE HARMED',
    'INSERT COIN TO CONTINUE',
  ],
};
