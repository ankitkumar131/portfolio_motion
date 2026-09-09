// ─────────────────────────────────────────────────────────────────────────────
//  RESUME DATA — single source of truth. Every section renders from here.
// ─────────────────────────────────────────────────────────────────────────────

export const data = {
  name: 'Ankit Kumar',
  heroLines: ['ANKIT', 'KUMAR'],
  monogram: 'AK.EXE',

  roles: [
    'SOFTWARE DEVELOPER',
    'ANGULAR / MEAN STACK',
    'CLOUD ENGINEER',
    'DEVOPS ENGINEER',
    'DATA ENGINEER',
  ],

  tagline:
    'Versatile developer & Bronze Medal graduate — I build scalable Angular apps, automate cloud infrastructure and ship full-stack MEAN solutions that don\u2019t break at 3 AM.',

  location: 'Pune, Maharashtra, India',
  email: 'ankit.kumar.career9@gmail.com',
  phone: '+91-8308477769',
  phoneHref: 'tel:+918308477769',
  linkedin: 'https://www.linkedin.com/in/ankit-kumar-510387270',
  linkedinHandle: 'in/ankit-kumar-510387270',
  github: 'https://github.com/ankitkumar131',
  githubHandle: '@ankitkumar131',

  heroMarquee: [
    'OPEN TO WORK',
    'ANGULAR v19–21',
    'TYPESCRIPT',
    'NODE.JS / EXPRESS',
    'AWS · GCP',
    'TERRAFORM',
    'DOCKER · KUBERNETES',
    'FASTAPI · PYTHON',
    'BASED IN PUNE',
  ],

  // ── ABOUT ──────────────────────────────────────────────────────────────────
  aboutLines: [
    'Versatile Software Developer & Bronze Medal graduate (GPA 9.13) with 1.5+ years of professional experience.',
    'I build scalable Angular applications, automate cloud infrastructure, and deliver full-stack MEAN Stack solutions.',
    'Fluent in AWS, GCP, Docker, Kubernetes, Terraform & CI/CD — with strong foundations in REST APIs, E2E testing and infrastructure-as-code.',
    'Architected real-world platforms: a visual Terraform code generator and a full-stack mock API management system.',
  ],

  stats: [
    { value: 1.5, decimals: 1, suffix: '+', label: 'YEARS OF EXPERIENCE' },
    { value: 9.13, decimals: 2, suffix: '', label: 'GPA — BRONZE MEDAL' },
    { value: 7, decimals: 0, suffix: '', label: 'CERTIFICATIONS' },
    { value: 2, decimals: 0, suffix: '', label: 'FLAGSHIP PLATFORMS BUILT' },
  ],

  chips: [
    { k: 'LOCATION', v: 'PUNE, MH' },
    { k: 'STATUS', v: 'OPEN TO WORK', live: true },
    { k: 'STACK', v: 'ANGULAR × MEAN' },
    { k: 'CLOUD', v: 'AWS + GCP' },
    { k: 'TIMEZONE', v: 'IST (UTC+5:30)' },
  ],

  // ── SKILLS ─────────────────────────────────────────────────────────────────
  skillGroups: [
    {
      title: 'FRONTEND',
      skills: [
        { name: 'Angular (v19 / 20 / 21)', level: 92 },
        { name: 'TypeScript (ES6+)', level: 90 },
        { name: 'RxJS & Signals', level: 88 },
        { name: 'HTML5 / CSS3 / Tailwind / Bootstrap', level: 90 },
      ],
    },
    {
      title: 'BACKEND',
      skills: [
        { name: 'Node.js & Express.js', level: 85 },
        { name: 'FastAPI & Python scripting', level: 80 },
        { name: 'REST API design & integration', level: 88 },
      ],
    },
    {
      title: 'CLOUD & IaC',
      skills: [
        { name: 'AWS', level: 85 },
        { name: 'Google Cloud Platform', level: 87 },
        { name: 'Terraform', level: 90 },
        { name: 'Ansible · Vagrant · Oracle OCI', level: 76 },
      ],
    },
    {
      title: 'DEVOPS / CI-CD',
      skills: [
        { name: 'Docker', level: 88 },
        { name: 'Kubernetes', level: 82 },
        { name: 'GitLab CI / GitHub Actions', level: 85 },
        { name: 'Linux & Protractor E2E', level: 84 },
      ],
    },
    {
      title: 'DATA',
      skills: [
        { name: 'MongoDB & MySQL', level: 84 },
        { name: 'BigQuery & Streaming Analytics', level: 78 },
        { name: 'Dataplex & Cloud Storage APIs', level: 75 },
      ],
    },
  ],

  toolsMarquee: [
    'ANGULAR', 'TYPESCRIPT', 'RXJS', 'SIGNALS', 'NODE.JS', 'EXPRESS', 'FASTAPI',
    'PYTHON', 'JAVA (DSA)', 'AWS', 'GCP', 'TERRAFORM', 'ANSIBLE', 'VAGRANT',
    'DOCKER', 'KUBERNETES', 'GITLAB CI', 'GITHUB ACTIONS', 'PROTRACTOR',
    'MONGODB', 'MYSQL', 'INDEXEDDB', 'BIGQUERY', 'DATAPLEX', 'CLOUD STORAGE',
    'GIT', 'POSTMAN', 'JIRA', 'AZURE DEVOPS', 'LINUX',
  ],

  // ── EXPERIENCE ─────────────────────────────────────────────────────────────
  experience: [
    {
      tag: 'LEVEL 2',
      period: 'SEP 2025 — MAR 2026',
      role: 'Software Developer — Angular / MEAN',
      company: 'Scalar TechHub, Pune',
      points: [
        'Developed & maintained scalable Angular applications with responsive UI components, ensuring cross-browser compatibility across Chrome, Firefox and Edge.',
        'Authored E2E test cases with Protractor — improving code coverage by 40% and cutting post-release regression defects.',
        'Integrated RESTful APIs into Angular services with HTTP interceptors, secure data handling and structured error management.',
        'Optimized component performance with OnPush change detection, lazy loading and signals-based reactivity — 25% faster renders.',
        'Collaborated with backend teams to define and align API contracts, streamlining data flow across the stack.',
        'Ran in Agile ceremonies — sprint planning, standups, code reviews and CI/CD pipeline contributions.',
      ],
    },
    {
      tag: 'LEVEL 1',
      period: 'JUL 2024 — MAR 2025',
      role: 'MEAN Stack Developer',
      company: 'MobiCloud Technologies, Pune',
      points: [
        'Engineered frontend components integrated with AWS hosting, optimized for Linux production environments and deployed via Docker containers.',
        'Automated API testing & integration workflows with Python scripting — reducing manual QA effort by 35%.',
        'Managed MySQL database operations and query optimization, improving backend response times for high-volume requests.',
        'Implemented Terraform IaC practices and Docker containerization for consistent, reproducible deployments.',
      ],
    },
  ],

  // ── PROJECTS ───────────────────────────────────────────────────────────────
  projects: [
    {
      id: 'cloudcanvas',
      idx: '01',
      title: 'CLOUDCANVAS-TF',
      sub: 'Visual Infrastructure Designer',
      period: 'DEC 2025 — FEB 2026',
      desc: 'A drag-and-drop visual studio for Google Cloud that auto-generates production-ready Terraform (HCL) code — eliminating manual IaC authoring entirely.',
      points: [
        'Real-time validation engine with dependency-graph analysis prevents architectural misconfigurations before deployment.',
        'Plugin-based architecture with extensible GCP resources — Compute, Storage, Kubernetes, Networking — and deterministic AST-based code generation.',
        'Web Workers offload heavy processing: smooth 60fps across 200–500 node infrastructure graphs.',
      ],
      stats: [
        { big: '60FPS', small: 'on 200–500 node graphs' },
        { big: '100%', small: 'HCL auto-generated' },
        { big: 'AST', small: 'deterministic codegen' },
      ],
      tech: ['ANGULAR 21', 'SIGNALS', 'INDEXEDDB', 'CI/CD EXPORT'],
      cover: '/covers/cloudcanvas.jpg',
      repo: 'https://github.com/ankitkumar131',
      live: 'https://github.com/ankitkumar131',
    },
    {
      id: 'mockflow',
      idx: '02',
      title: 'MOCKFLOW',
      sub: 'Mock API Management Platform',
      period: 'JAN 2025 — MAR 2026',
      desc: 'A full-stack platform (FastAPI + Angular + MongoDB) for instant mock API creation — so frontend teams can build without waiting on backend dependencies.',
      points: [
        'Faker-powered synthetic data generation across 15+ data types with customizable endpoint schemas.',
        'Comprehensive CRUD operations with MongoDB-backed persistence.',
        'Cut development environment setup time by 60%.',
      ],
      stats: [
        { big: '15+', small: 'synthetic data types' },
        { big: '−60%', small: 'dev environment setup time' },
        { big: 'CRUD', small: 'MongoDB-backed persistence' },
      ],
      tech: ['FASTAPI', 'ANGULAR', 'MONGODB', 'FAKER'],
      cover: '/covers/mockflow.jpg',
      repo: 'https://github.com/ankitkumar131',
      live: 'https://github.com/ankitkumar131',
    },
  ],

  // ── TROPHY ROOM ────────────────────────────────────────────────────────────
  trophies: [
    {
      symbol: '★',
      color: 'brass',
      title: 'BRONZE MEDALLIST',
      sub: 'GPA 9.13 — top of the Cloud Technology program, ADYPU',
    },
    {
      symbol: '▲',
      color: 'cyan',
      title: 'SMART INDIA HACKATHON',
      sub: 'Selected for SIH — Government of India',
    },
    {
      symbol: '◆',
      color: 'pink',
      title: 'HACKATHON WINNER',
      sub: 'Ajeenkya DY Patil University 2022 — #Tech event',
    },
    {
      symbol: '●',
      color: 'yellow',
      title: 'FLIPKART LEVEL 1.1',
      sub: 'E-Commerce Test selection — problem-solving & analytics',
    },
  ],

  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    field: 'Cloud Technology',
    school: 'Ajeenkya DY Patil University, Pune',
    period: 'JUN 2022 — JUL 2025',
    gpa: 9.13,
    badge: 'BRONZE MEDALLIST',
  },

  certifications: [
    { issuer: 'ORACLE', title: 'OCI 2025 Certified AI Foundations Associate' },
    { issuer: 'GOOGLE CLOUD', title: 'Scaling with Google Cloud Operations' },
    { issuer: 'GOOGLE CLOUD', title: 'Modernize Infrastructure & Applications with Google Cloud' },
    { issuer: 'GOOGLE CLOUD', title: 'Streaming Analytics into BigQuery' },
    { issuer: 'GOOGLE CLOUD', title: 'Deploy Kubernetes Applications on Google Cloud' },
    { issuer: 'GOOGLE CLOUD', title: 'Configure Service Accounts & IAM Roles for Google Cloud' },
    { issuer: 'GOOGLE CLOUD', title: 'Use APIs to Work with Cloud Storage' },
  ],

  // ── CONTACT ────────────────────────────────────────────────────────────────
  contactLines: ['LET\u2019S BUILD', 'SOMETHING', 'LEGENDARY'],
  footerMarquee: [
    'THANKS FOR SCROLLING',
    'BUILT WITH ANIME.JS + TOO MUCH COFFEE',
    'MADE IN PUNE ✦ 18.52°N 73.85°E',
    'NO PIXELS WERE HARMED',
    'INSERT COIN TO CONTINUE',
  ],
};
