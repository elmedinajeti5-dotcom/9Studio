import placeholderWork1 from './assets/placeholder-work-1.svg'
import placeholderWork2 from './assets/placeholder-work-2.svg'
import placeholderWork3 from './assets/placeholder-work-3.svg'

export type NavItem = {
  label: string
  href: string
}

export type ProjectMetric = {
  label: string
  value: string
}

export type CaseStudySection = {
  title: string
  copy: string
}

export type ProjectItem = {
  slug: string
  title: string
  client: string
  year: string
  image: string
  accent: string
  surface: string
  lead: string
  categories: string[]
  summary: string
  services: string[]
  metrics: ProjectMetric[]
  overview: string
  challenge: string
  strategy: string
  design: string
  development: string
  launch: string
  results: string
  breakdown: CaseStudySection[]
}

export type InsightItem = {
  slug: string
  title: string
  category: string
  readTime: string
  excerpt: string
  paragraphs: string[]
}

export type JobOpening = {
  title: string
  location: string
  type: string
  summary: string
}

export type CapabilityGroup = {
  title: string
  copy: string
  items: string[]
}

export type ProcessStep = {
  step: string
  title: string
  copy: string
}

export const primaryNav: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

export const siteMapNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

export const capabilityGroups: CapabilityGroup[] = [
  {
    title: 'Brand Identity',
    copy:
      'Logos, type, art direction, and visual systems that make the work feel sharper and easier to recognise.',
    items: ['Identity Systems', 'Art Direction'],
  },
  {
    title: 'Web Design',
    copy:
      'Websites and digital experiences built to feel clean, fast, and visually confident from the first screen.',
    items: ['Creative Direction', 'Creative Development'],
  },
  {
    title: 'Campaign Design',
    copy:
      'Launch assets, decks, social sets, and campaign systems built to keep a release visually tight.',
    items: ['Launch Assets', 'Social Kits', 'Deck Design'],
  },
  {
    title: 'Motion',
    copy:
      'Loops, edits, and motion graphics that add rhythm without making the work feel overproduced.',
    items: ['Motion Graphics', 'Video Edits'],
  },
]

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    copy:
      'We audit the current brand, product, and launch friction before anything is designed.',
  },
  {
    step: '02',
    title: 'Design',
    copy:
      'Identity, interface, and narrative systems are shaped together so the work feels precise.',
  },
  {
    step: '03',
    title: 'Build',
    copy:
      'We translate the concept into a fast, flexible digital experience with measured motion.',
  },
  {
    step: '04',
    title: 'Launch',
    copy:
      'Release and rollout are handled as one system so the work performs as well as it looks.',
  },
]

export const projects: ProjectItem[] = [
  {
    slug: 'taylormade',
    title: 'TAYLORMADE',
    client: 'TaylorMade Systems',
    year: '2025',
    image: placeholderWork1,
    accent: '#d8ff56',
    surface: '#f3efe7',
    lead: 'Launch site and campaign system for an AI operations suite.',
    categories: ['Product Design', 'Web Development', 'Digital Strategy'],
    summary:
      'A sharp black-and-white launch system that unified product story, motion, and conversion.',
    services: [
      'Product Design',
      'UI / UX Design',
      'Full-Stack Development',
      'Motion Design',
      'Marketing Campaigns',
    ],
    metrics: [
      { label: 'Conversion lift', value: '+41%' },
      { label: 'Launch engagement', value: '3.4x' },
      { label: 'Performance score', value: '98' },
    ],
    overview:
      'TaylorMade needed one launch surface that could explain a technical AI suite quickly.',
    challenge:
      'The old story lived across decks, scattered pages, and inconsistent visuals.',
    strategy:
      'We turned messaging, product flow, and motion into one simple launch narrative.',
    design:
      'Oversized type, hard contrast, and modular sections kept the experience graphic and legible.',
    development:
      'A modular front end made the system fast to ship and easy to update.',
    launch:
      'The release included campaign pages, motion assets, and a reusable launch toolkit.',
    results:
      'The launch became easier to understand, easier to sell, and easier to reuse.',
    breakdown: [
      {
        title: 'Narrative system',
        copy:
          'Headlines, proof points, and motion were built as one sequence.',
      },
      {
        title: 'Interface clarity',
        copy:
          'Complex product information was cut into simpler, faster-reading sections.',
      },
      {
        title: 'Launch tooling',
        copy:
          'The team left with reusable launch parts instead of one-off pages.',
      },
    ],
  },
  {
    slug: 'northstar',
    title: 'NORTHSTAR',
    client: 'Northstar Mobility',
    year: '2024',
    image: placeholderWork2,
    accent: '#ffcabd',
    surface: '#f8eee6',
    lead: 'Brand relaunch and campaign system for a mobility platform.',
    categories: ['Branding', 'Marketing Campaigns', 'Motion Graphics'],
    summary:
      'A cleaner identity and rollout system built to reposition a complex product.',
    services: [
      'Graphic Design',
      'Brand Identity Design',
      'Brand Strategy',
      'Marketing Campaigns',
      'Video Editing',
    ],
    metrics: [
      { label: 'Pipeline growth', value: '+28%' },
      { label: 'Investor engagement', value: '+62%' },
      { label: 'Campaign completion', value: '91%' },
    ],
    overview:
      'Northstar had a strong product but no visual system that could hold every touchpoint together.',
    challenge:
      'The brand felt fragmented in investor decks, marketing pages, and motion.',
    strategy:
      'We built one identity system and pushed it through campaign, deck, and motion work.',
    design:
      'The direction mixed strict typography with atmospheric image treatment and motion.',
    development:
      'Campaign pages were built as fast, reusable blocks for the internal team.',
    launch:
      'Delivery covered the brand site, campaign toolkit, and first-wave rollout assets.',
    results:
      'Northstar left with a sharper story and a more consistent public face.',
    breakdown: [
      {
        title: 'Identity rebuild',
        copy:
          'One visual language now runs through every launch surface.',
      },
      {
        title: 'Campaign framework',
        copy:
          'Templates made it easier for the team to publish quickly without drift.',
      },
      {
        title: 'Motion toolkit',
        copy:
          'Motion turned the relaunch into a single, coherent rollout.',
      },
    ],
  },
  {
    slug: 'lumenos',
    title: 'LUMENOS',
    client: 'Lumenos Health',
    year: '2026',
    image: placeholderWork3,
    accent: '#b7d2ff',
    surface: '#edf5f1',
    lead: 'A health platform redesign focused on trust, clarity, and speed.',
    categories: ['Web Development', 'Product Design', 'Branding'],
    summary:
      'A product and brand refresh that made a regulated platform feel calmer and easier to use.',
    services: [
      'UI / UX Design',
      'Product Design',
      'Full-Stack Development',
      'SEO Strategy',
      'Brand Identity Design',
    ],
    metrics: [
      { label: 'Task completion', value: '+36%' },
      { label: 'Bounce reduction', value: '-31%' },
      { label: 'Organic growth', value: '+54%' },
    ],
    overview:
      'Lumenos needed a calmer experience without losing compliance or usability.',
    challenge:
      'Legacy templates and weak hierarchy created friction across marketing and onboarding.',
    strategy:
      'We aligned brand, UX, content, and front-end cleanup into one phased redesign.',
    design:
      'The system used calmer typography, cleaner modules, and less visual noise.',
    development:
      'The build prioritized accessibility, performance, and reusable components.',
    launch:
      'Launch planning covered migration, QA, and a staged rollout.',
    results:
      'Lumenos shipped with better adoption, stronger search visibility, and a clearer brand.',
    breakdown: [
      {
        title: 'Accessibility first',
        copy:
          'Accessibility shaped the layout from the start, not as a final check.',
      },
      {
        title: 'Scalable system',
        copy:
          'Reusable templates gave the product team speed without losing consistency.',
      },
      {
        title: 'SEO continuity',
        copy:
          'The migration preserved search performance while the new site rolled out.',
      },
    ],
  },
]

export const insights: InsightItem[] = [
  {
    slug: 'design-systems-for-ai-platforms',
    title: 'Design systems for AI platforms need narrative, not just consistency.',
    category: 'Design Systems',
    readTime: '6 min read',
    excerpt:
      'Why AI products require a design system that can explain behavior, confidence, and product intent as clearly as it defines components.',
    paragraphs: [
      'Most AI interfaces inherit patterns from SaaS dashboards, but the real challenge is not component consistency. It is communicating system behavior in a way that feels legible, trustworthy, and calm.',
      'A durable design system for AI products has to include language strategy, feedback states, product tone, confidence handling, and the visual pacing of decision moments.',
      'When those elements are missing, even technically strong interfaces can feel opaque. Narrative becomes a structural requirement, not a layer added after the interface is complete.',
    ],
  },
  {
    slug: 'how-editorial-ux-improves-product-launches',
    title: 'How editorial UX improves product launches for technical teams.',
    category: 'UX Strategy',
    readTime: '5 min read',
    excerpt:
      'A product launch works better when the narrative structure is treated with the same rigor as the interface system.',
    paragraphs: [
      'Launch environments often fail because they split product detail, emotional storytelling, and campaign conversion into separate systems.',
      'Editorial UX gives technical teams a way to structure information so that product logic, messaging, and momentum live in the same scroll experience.',
      'The result is a launch that performs better commercially while also making the product itself easier to understand.',
    ],
  },
  {
    slug: 'seo-after-a-brand-reposition',
    title: 'What SEO strategy should do after a brand reposition.',
    category: 'Growth Strategy',
    readTime: '4 min read',
    excerpt:
      'Rebrands often lose momentum because search architecture is treated as cleanup rather than as part of the new brand system.',
    paragraphs: [
      'A repositioned brand changes language, hierarchy, and user expectations. Search strategy has to evolve with it or the new experience will feel disconnected from how people actually find the product.',
      'The best SEO migrations are led by structure, not keywords alone. Information architecture, metadata, content transitions, and technical quality all have to move together.',
      'When growth strategy is built into the redesign from the start, the new brand feels coherent across both discovery and product experience.',
    ],
  },
  {
    slug: 'motion-as-interface-clarity',
    title: 'Motion as interface clarity, not decoration.',
    category: 'Creative Workflow',
    readTime: '7 min read',
    excerpt:
      'Premium motion systems work best when they reinforce product structure, hierarchy, and confidence.',
    paragraphs: [
      'Motion becomes expensive-looking when it feels inevitable. The user should sense order, hierarchy, and intentionality rather than animation for its own sake.',
      'For studio work, motion is often the bridge between editorial storytelling and interface utility. It can direct attention, soften transitions, and show relationships that static states hide.',
      'That is why motion belongs inside the system. It should be planned with the same care as typography, spacing, and content structure.',
    ],
  },
]

export const jobs: JobOpening[] = [
  {
    title: 'Senior Brand Designer',
    location: 'Remote / New York',
    type: 'Full-time',
    summary:
      'Lead visual systems, identity thinking, and launch narratives for product-led clients across technology and culture.',
  },
  {
    title: 'Creative Front-End Engineer',
    location: 'Remote / Berlin',
    type: 'Full-time',
    summary:
      'Build premium digital experiences with an eye for interaction, motion, performance, and visual detail.',
  },
  {
    title: 'Growth Strategist',
    location: 'Remote / London',
    type: 'Contract',
    summary:
      'Shape launch plans, search strategy, and campaign systems that connect brand intent to measurable commercial outcomes.',
  },
]

export const projectCategories = [
  'All',
  'Branding',
  'Product Design',
  'Web Development',
  'Marketing Campaigns',
  'Motion Graphics',
  'Digital Strategy',
]
