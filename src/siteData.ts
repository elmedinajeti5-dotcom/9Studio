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

export type SocialLink = {
  label: string
  href: string
}

export const primaryNav: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const siteMapNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const capabilityGroups: CapabilityGroup[] = [
  {
    title: 'Brand Identity',
    copy:
      'Flexible identities, graphic systems, and visual direction built to make a project look intentional from the first glance.',
    items: ['Identity Systems', 'Art Direction'],
  },
  {
    title: 'Web Design',
    copy:
      'Editorial websites and portfolio experiences designed with strong hierarchy, motion, and responsive structure.',
    items: ['Creative Direction', 'Creative Development'],
  },
  {
    title: 'Campaign Design',
    copy:
      'Campaign visuals, launch assets, decks, and social systems that keep a release visually coherent.',
    items: ['Launch Assets', 'Social Kits', 'Deck Design'],
  },
  {
    title: 'Motion',
    copy:
      'Subtle transitions, motion studies, and scroll choreography that make the site feel polished without becoming noisy.',
    items: ['Motion Graphics', 'Video Edits'],
  },
]

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Define',
    copy:
      'Start with a clear brief, references, and the kind of feeling the project should leave behind.',
  },
  {
    step: '02',
    title: 'Design',
    copy:
      'Shape the visual system, typography, color, and structure as one connected experience.',
  },
  {
    step: '03',
    title: 'Build',
    copy:
      'Translate the concept into a responsive front end with refined motion and clean interaction details.',
  },
  {
    step: '04',
    title: 'Refine',
    copy:
      'Test spacing, pacing, responsiveness, and polish until the whole system feels balanced.',
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Behance', href: 'https://behance.net' },
]

export const projects: ProjectItem[] = [
  {
    slug: 'astera',
    title: 'ASTERA',
    client: 'Astera Coffee',
    year: '2025',
    image: placeholderWork1,
    accent: '#d8ff56',
    surface: '#f3efe7',
    lead: 'Identity and launch website for a fictional specialty coffee brand.',
    categories: ['Product Design', 'Web Development', 'Digital Strategy'],
    summary:
      'A placeholder case study focused on packaging, launch visuals, and an editorial commerce site.',
    services: [
      'Brand Identity',
      'Web Design',
      'Creative Development',
      'Motion Design',
      'Campaign Art Direction',
    ],
    metrics: [
      { label: 'Product pages', value: '12' },
      { label: 'Launch assets', value: '24' },
      { label: 'Prototype score', value: '98' },
    ],
    overview:
      'Astera is a fictional placeholder brand used to demonstrate how a portfolio case study can mix identity, product photography, and web design.',
    challenge:
      'The direction had to feel bold and premium while staying simple enough for a student project portfolio.',
    strategy:
      'The system uses oversized type, warm contrast, and modular image blocks to create a clear launch narrative.',
    design:
      'The visual language pairs heavy sans serif typography with soft gradients and poster-like product framing.',
    development:
      'Reusable sections and placeholder media keep the structure easy to swap with real student work later.',
    launch:
      'The result is a flexible template for a future coffee, retail, or product-design case study.',
    results:
      'This placeholder shows how the site can present one project across identity, web, and campaign touchpoints.',
    breakdown: [
      {
        title: 'Brand cover',
        copy:
          'A bold cover image and concise headline establish the project mood immediately.',
      },
      {
        title: 'Editorial product pages',
        copy:
          'The web pages use strong hierarchy and large media blocks to keep the reading rhythm clean.',
      },
      {
        title: 'Campaign rollout',
        copy:
          'Supporting assets, motion frames, and modular sections help the case study feel complete.',
      },
    ],
  },
  {
    slug: 'morrow',
    title: 'MORROW',
    client: 'Morrow Run Club',
    year: '2024',
    image: placeholderWork2,
    accent: '#ffcabd',
    surface: '#f8eee6',
    lead: 'Campaign identity and event microsite for a fictional running club.',
    categories: ['Branding', 'Marketing Campaigns', 'Motion Graphics'],
    summary:
      'A fictional campaign project built to show energetic motion, event storytelling, and social-first design.',
    services: [
      'Campaign Design',
      'Brand Identity',
      'Motion Direction',
      'Launch Assets',
      'Event Visuals',
    ],
    metrics: [
      { label: 'Event posters', value: '18' },
      { label: 'Motion loops', value: '7' },
      { label: 'Social assets', value: '32' },
    ],
    overview:
      'Morrow is a fictional sports-culture project used to demonstrate campaign-led storytelling with a more energetic visual tone.',
    challenge:
      'The project needed to feel fast, social, and youthful without losing clarity or structure.',
    strategy:
      'Use a punchier palette, bolder cropping, and tighter motion to turn a simple event concept into a full visual world.',
    design:
      'Rounded cards, layered surfaces, and oversized captions keep the work playful while still feeling premium.',
    development:
      'The site is built from reusable blocks so the same structure can work for future event or culture projects.',
    launch:
      'The placeholder outcome includes a landing page, campaign tiles, and modular image-led sections.',
    results:
      'It demonstrates how one project can expand into event design, campaign visuals, and motion.',
    breakdown: [
      {
        title: 'Campaign world',
        copy:
          'A single visual system carries the posters, website, and social rollout.',
      },
      {
        title: 'Motion rhythm',
        copy:
          'Soft motion and scrolling accents make the pages feel lively without overdesigning them.',
      },
      {
        title: 'Event structure',
        copy:
          'The case study is structured to show venue imagery, campaign graphics, and digital touchpoints together.',
      },
    ],
  },
  {
    slug: 'solace',
    title: 'SOLACE',
    client: 'Solace Studio',
    year: '2026',
    image: placeholderWork3,
    accent: '#b7d2ff',
    surface: '#edf5f1',
    lead: 'Portfolio website and content system for a fictional interior design studio.',
    categories: ['Web Development', 'Product Design', 'Branding'],
    summary:
      'A calmer portfolio case study showing how large imagery and minimal type can shape a more refined client-facing site.',
    services: [
      'Web Design',
      'Content Structure',
      'Creative Development',
      'SEO Basics',
      'Brand Refresh',
    ],
    metrics: [
      { label: 'Layouts', value: '9' },
      { label: 'Image sets', value: '14' },
      { label: 'Case templates', value: '3' },
    ],
    overview:
      'Solace is a fictional studio project used to show the cleaner, image-led side of the portfolio template.',
    challenge:
      'The challenge was keeping the site extremely minimal while still giving each section enough character.',
    strategy:
      'Use restrained color, large margins, and generous image framing so the work itself carries the page.',
    design:
      'Large text, light surfaces, and alternating content blocks make the case study feel spacious and readable.',
    development:
      'The front end stays simple, fast, and reusable so it can adapt to photography, interiors, fashion, or architecture work.',
    launch:
      'The final placeholder result is a polished portfolio layout ready for real project images and copy.',
    results:
      'It proves out the calmer side of the design system and balances the bolder projects in the portfolio.',
    breakdown: [
      {
        title: 'Quiet layout',
        copy:
          'The layout leaves room for images to breathe and avoids cluttered framing.',
      },
      {
        title: 'Template system',
        copy:
          'A repeatable case-study template makes new work easy to publish later.',
      },
      {
        title: 'Responsive polish',
        copy:
          'Every section is designed to collapse cleanly from desktop to mobile without losing hierarchy.',
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
