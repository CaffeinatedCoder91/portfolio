import type {
  ContactItem,
  Education,
  Fact,
  Project,
  Role,
  Skill,
} from '@/lib/types';

export const name = 'Joanna Joseph';
export const short = 'JJ';
export const location = 'London, UK';
export const timezone = 'Europe/London';

export const role =
  'AI-native frontend engineer building {{things people actually use}}.';

export const tagline =
  'React & TypeScript specialist with 5+ years shipping scalable features for high-traffic platforms serving millions, now building LLM-powered products end to end.';

export const about = [
  "I'm a frontend engineer with 5+ years building scalable React applications for high-traffic platforms. I specialise in component architecture, TypeScript-first development, and shipping features that have real, measurable impact.",
  "At Future Plc I own features from design through to production, and I built the shared component library that became the foundation for frontend work across the whole org. Lately I've gone deep on LLM-powered products, using tool-use APIs to ship AI features that are genuinely useful, not gimmicks.",
  "My route here wasn't typical. A biology degree, a few years training baristas and coffee teams, then a hard pivot into code during the 2020 lockdowns. The throughline never changed: break messy problems down, and teach myself whatever the next one needs.",
  'Outside of code I embroider, build terrariums, and tend to 40 (and counting) houseplants. Apparently I like nurturing things that take patience and attention to detail.',
];

export const facts: Fact[] = [
  { num: '5+', label: 'years engineering' },
  { num: '96', label: 'component library' },
  { num: '6+', label: 'storefronts served' },
  { num: '90%', label: 'fewer API calls' },
];

export const skills: Skill[] = [
  {
    name: 'Frontend & core',
    color: 'ai',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Responsive',
    ],
  },
  {
    name: 'Architecture & systems',
    color: 'fuji',
    items: [
      'Component libraries',
      'Strict TS',
      'Composable APIs',
      'Storybook',
      'WCAG 2.1 AA',
    ],
  },
  {
    name: 'State & data',
    color: 'mizu',
    items: ['Context API', 'Redux', 'React Query', 'REST', 'OpenAPI', 'JWT/OAuth'],
  },
  {
    name: 'Testing & quality',
    color: 'matcha',
    items: ['Jest', 'RTL', 'Cypress', 'Playwright', 'Vitest', 'TDD'],
  },
  {
    name: 'Performance',
    color: 'shu',
    items: ['Core Web Vitals', 'Bundle analysis', 'Lazy loading', 'Code-splitting'],
  },
  {
    name: 'DevOps & tooling',
    color: 'kincha',
    items: ['Vercel', 'GitLab CI/CD', 'Webpack', 'Esbuild', 'Sentry', 'Docker'],
  },
];

export const projects: Project[] = [
  {
    title: 'Flow — AI-Powered Kanban',
    category: 'AI',
    image: '',
    blurb: 'Full-stack kanban platform with an AI assistant that reads and mutates your board from plain English.',
    tags: ['Next.js', 'TypeScript', 'Claude API', 'PostgreSQL', 'Docker'],
    live: 'https://flow-kanban-coral.vercel.app/',
    code: 'https://github.com/CaffeinatedCoder91/Flow-Kanban',
    points: [
      'Built end to end: React frontend, Node serverless API (15+ endpoints), Postgres via Supabase with row-level security.',
      'AI assistant built on Claude tool-use API — autonomously creates, updates and reorders tasks from natural language.',
      'Discrete AI agents: standup narrative generator, deadline risk scanner, task splitter, smart reschedule, duplicate detector.',
      'AI pipeline parses free text and uploaded files (.txt/.pdf/.docx) into structured task objects.',
      'Shipped with full test coverage, Supabase Auth, Redis rate limiting and Sentry observability.',
    ],
  },
  {
    title: 'komorebi — Shopify Store',
    category: 'E-commerce',
    image: '',
    blurb: 'Full-stack e-commerce platform showcasing React architecture and UX thinking, end to end.',
    tags: ['Next.js', 'React', 'TypeScript', 'Shopify API'],
    note: 'Private build · not yet deployed',
    points: [
      'Complete Next.js storefront: product catalogue, product detail pages, cart and checkout flow.',
      'Reusable component system: ProductCard, SpecimenTable, Accordion, AcquireButton.',
      'Mobile-first responsive design; integrated Shopify and payment systems.',
      'Security audit and hardening: environment variables, HTTP headers, form security, validation and error messaging.',
    ],
  },
  {
    title: 'data-quality-checker',
    category: 'Tooling',
    image: '',
    blurb: 'A React app with a webhook backend and full test suite — shipped production-ready in one week.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vitest', 'n8n'],
    live: 'https://data-quality-checker-gamma.vercel.app/',
    code: 'https://github.com/CaffeinatedCoder91/data-quality-checker',
    points: [
      'React frontend with file upload, state management, error handling and validation flows.',
      'Webhook integration for external data processing; handled response-format transformation.',
      'Comprehensive Vitest suite covering all paths and edge cases.',
      'Shipped a production-ready feature with full coverage in a single week.',
    ],
  },
  {
    title: 'vesper',
    category: 'AI',
    image: '',
    blurb: 'A personal PWA where you speak your thoughts freely and an AI companion responds warmly.',
    tags: ['TypeScript', 'PWA', 'AI'],
    code: 'https://github.com/CaffeinatedCoder91/vesper',
    points: [
      'Progressive web app for voice-first journaling.',
      'Add more detail here when ready.',
    ],
  },
  {
    title: 'grandma',
    category: 'Experiment',
    image: '',
    blurb: 'An experiment in progress.',
    tags: ['TypeScript'],
    code: 'https://github.com/CaffeinatedCoder91/grandma',
    note: 'Work in progress',
    points: ['Add description here when ready.'],
  },
];

export const experience: Role[] = [
  {
    period: 'Nov 2022 – Present',
    color: 'ai',
    role: 'Frontend Engineer',
    org: 'Future Plc · London (Remote)',
    points: [
      'Designed and maintained a 96-component shared React library serving 6+ storefronts — became the foundation for all frontend development across the organisation.',
      'Owned e-commerce features end to end: product discovery, shopping cart with persistent state, multi-step checkout flows, payment integration, and search with filtering.',
      'Reduced API calls by 80–90% through debouncing and intelligent caching; improved Core Web Vitals across platforms, contributing to better SEO.',
      'Built a complex campaign management system with dynamic forms and real-time preview, requiring sophisticated state management and careful data flow design.',
      'Implemented WCAG 2.1 AA accessibility standards across all components — proper ARIA labels, semantic HTML, keyboard navigation.',
      'Conducted code reviews emphasising quality, accessibility, and maintainability.',
    ],
  },
  {
    period: 'Oct 2021 – Nov 2022',
    color: 'shu',
    role: 'Graduate Developer',
    org: 'Future Plc',
    points: [
      'Built 20+ reusable React components with Styled Components, establishing UI patterns adopted across the team.',
      'Contributed to a greenfield e-commerce project, shipping features in short Agile cycles with cross-functional teams.',
      'Implemented unit and integration tests with Jest and React Testing Library, improving code reliability and coverage.',
    ],
  },
  {
    period: 'Jul 2021 – Oct 2021',
    color: 'mizu',
    role: 'Intern Developer',
    org: 'Future Plc',
    desc: 'Built interactive React features for high-traffic sites; improved test coverage and learned debugging best practices across real production codebases.',
  },
];

export const education: Education[] = [
  {
    period: 'Jun 2022 – Dec 2023',
    color: 'fuji',
    role: 'Level 4 Software Development Apprenticeship',
    org: 'QA',
  },
  {
    period: '2021',
    color: 'matcha',
    role: 'Full Stack Developer Bootcamp',
    org: 'iO Academy',
  },
  {
    period: '2012',
    color: 'mizu',
    role: 'BSc Biology',
    org: 'Kingston University',
  },
];

export const contact = {
  head: 'Let\'s build something',
  sub: "Got a role, a project, or just want to say hi? My inbox is open.",
  items: [
    {
      kind: 'Email',
      color: 'shu' as const,
      glyph: '@',
      value: 'joannamjosep@gmail.com',
      href: 'mailto:joannamjosep@gmail.com',
    },
    {
      kind: 'Phone',
      color: 'ai' as const,
      glyph: '☎',
      value: '07388 039256',
      href: 'tel:+447388039256',
    },
    {
      kind: 'LinkedIn',
      color: 'mizu' as const,
      glyph: 'in',
      value: 'joannamjoseph',
      href: 'https://linkedin.com/in/joannamjoseph',
    },
    {
      kind: 'GitHub',
      color: 'fuji' as const,
      glyph: '</>',
      value: 'CaffeinatedCoder91',
      href: 'https://github.com/CaffeinatedCoder91',
    },
  ] as ContactItem[],
};
