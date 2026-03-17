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
  { label: 'Studio', href: '/studio' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
]

export const siteMapNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Studio', href: '/studio' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export const capabilityGroups: CapabilityGroup[] = [
  {
    title: 'Design',
    copy:
      'Identity direction, visual systems, and interface design shaped to make digital brands feel precise and recognisable.',
    items: ['Graphic Design', 'UI / UX'],
  },
  {
    title: 'Development',
    copy:
      'Design-led builds and launch platforms delivered with calm technical rigor and careful implementation detail.',
    items: ['Web Development', 'Full-Stack'],
  },
  {
    title: 'Growth',
    copy:
      'Search, campaigns, and social rollout shaped to keep momentum building after the product ships.',
    items: ['Digital Marketing', 'SEO', 'Social Media'],
  },
  {
    title: 'Content',
    copy:
      'Editing and motion content that extends the brand with the same editorial precision as the product experience.',
    items: ['Video Editing', 'Motion Graphics'],
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
    lead: 'Product launch platform for an AI operations suite.',
    categories: ['Product Design', 'Web Development', 'Digital Strategy'],
    summary:
      'A monochrome launch environment designed to unify product storytelling, UX motion, and conversion architecture for a global release.',
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
      'TaylorMade needed a premium product launch platform that could explain a technical AI suite with unusual clarity while still feeling emotionally charged and cinematic.',
    challenge:
      'The previous ecosystem was fragmented across sales decks, static pages, and disconnected campaign materials, making it difficult to communicate one coherent product story.',
    strategy:
      'We combined product architecture, launch messaging, and a high-contrast editorial system into a single platform that could support sales, marketing, and onboarding simultaneously.',
    design:
      'The experience used disciplined typography, generous negative space, and monochrome motion to create a confident narrative rhythm without sacrificing usability.',
    development:
      'We built a modular front-end system focused on performance, reusable motion patterns, and flexible content slots for rapid campaign iteration.',
    launch:
      'Launch delivery included product pages, motion assets, a sales demo environment, and analytics instrumentation for team-wide reporting.',
    results:
      'The new platform improved launch consistency, accelerated the sales narrative, and gave internal teams a single source of truth for campaign deployment.',
    breakdown: [
      {
        title: 'Narrative system',
        copy:
          'Headlines, proof points, and motion cues were designed together so every scroll moment moved the story forward with precision.',
      },
      {
        title: 'Interface clarity',
        copy:
          'Dense product information was reorganized into modular sections, interactive demos, and structured hierarchy that made technical ideas accessible.',
      },
      {
        title: 'Launch tooling',
        copy:
          'Teams received editable campaign modules, analytics hooks, and a reusable design language for future releases.',
      },
    ],
  },
  {
    slug: 'northstar',
    title: 'NORTHSTAR',
    client: 'Northstar Mobility',
    year: '2024',
    lead: 'Brand and growth relaunch for a mobility intelligence platform.',
    categories: ['Branding', 'Marketing Campaigns', 'Motion Graphics'],
    summary:
      'A full identity and growth system built to reposition a complex mobility product for investors, enterprise buyers, and product teams.',
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
      'Northstar had a powerful platform but no unified brand language capable of supporting board presentations, enterprise marketing, and digital product storytelling.',
    challenge:
      'The product felt utilitarian and fragmented, which limited both perceived maturity and clarity during high-stakes presentations.',
    strategy:
      'We rebuilt the identity around a disciplined narrative system, then extended it across campaign pages, investor materials, and motion-led product explainers.',
    design:
      'The visual direction balanced minimal structure with atmospheric monochrome imagery, allowing the brand to feel future-facing without becoming generic.',
    development:
      'Campaign delivery focused on fast landing environments, animation systems, and CMS-ready blocks for the internal marketing team.',
    launch:
      'The relaunch included a brand site, launch campaign toolkit, investor assets, and organic social templates for the first quarter after release.',
    results:
      'Northstar gained a sharper market position, stronger internal alignment, and a more persuasive digital story across every audience touchpoint.',
    breakdown: [
      {
        title: 'Identity rebuild',
        copy:
          'We defined a visual language that could move seamlessly from investor decks to motion campaigns and landing pages.',
      },
      {
        title: 'Campaign framework',
        copy:
          'Messaging architecture was translated into modular content templates that allowed the brand team to ship quickly and consistently.',
      },
      {
        title: 'Motion toolkit',
        copy:
          'Short-form films, social loops, and product sequences brought coherence to a previously fragmented release process.',
      },
    ],
  },
  {
    slug: 'lumenos',
    title: 'LUMENOS',
    client: 'Lumenos Health',
    year: '2026',
    lead: 'A regulated health platform redesigned for trust, speed, and product adoption.',
    categories: ['Web Development', 'Product Design', 'Branding'],
    summary:
      'A full experience redesign combining accessibility, product UX, and engineering modernization for a healthcare intelligence product.',
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
      'Lumenos needed to modernize a trust-critical health product without losing the clarity, compliance, and accessibility required by its users.',
    challenge:
      'Legacy navigation, inconsistent brand assets, and underperforming templates created friction across both acquisition and product onboarding.',
    strategy:
      'We aligned brand, UX, content structure, and technical modernization into one phased redesign that balanced regulation with a premium user experience.',
    design:
      'The system used elevated typography, measured motion, and modular interface patterns to create confidence without visual noise.',
    development:
      'Front-end implementation prioritized accessibility, performance budgets, and a scalable component system that internal teams could extend.',
    launch:
      'Release planning included SEO migration, analytics QA, CMS training, and a staged rollout to protect traffic and user trust.',
    results:
      'Lumenos launched with stronger product adoption, improved organic discovery, and a clearer brand position across both marketing and product touchpoints.',
    breakdown: [
      {
        title: 'Accessibility first',
        copy:
          'Interaction patterns, hierarchy, and content semantics were designed to exceed baseline accessibility requirements without compromising elegance.',
      },
      {
        title: 'Scalable system',
        copy:
          'Reusable templates and a disciplined component library gave the product team speed without diluting quality.',
      },
      {
        title: 'SEO continuity',
        copy:
          'Migration planning and content structure helped the new experience launch without sacrificing long-term search performance.',
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
