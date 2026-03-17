import { startTransition, useDeferredValue, useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import BeforeAfterSlider from './components/BeforeAfterSlider'
import GuidedContactForm from './components/GuidedContactForm'
import Reveal from './components/Reveal'
import {
  ArrowIcon,
  BannerArtwork,
  ChromeCluster,
  HeroArtwork,
  InfoGlyph,
  MinusIcon,
  PlusIcon,
  SparkIcon,
  WorksArtwork,
} from './components/StudioVisuals'
import {
  approachItems,
  capabilityGroups,
  heroServices,
  insights,
  jobs,
  primaryNav,
  processSteps,
  projectCategories,
  projects,
  selectedClients,
  services,
  siteMapNav,
} from './siteData'

function App() {
  return (
    <Routes>
      <Route element={<StudioLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<StudioPage />} path="/studio" />
        <Route element={<ServicesPage />} path="/services" />
        <Route element={<WorkPage />} path="/work" />
        <Route element={<CaseStudiesPage />} path="/case-studies" />
        <Route element={<CaseStudyPage />} path="/case-studies/:slug" />
        <Route element={<CapabilitiesPage />} path="/capabilities" />
        <Route element={<ProcessPage />} path="/process" />
        <Route element={<InsightsPage />} path="/insights" />
        <Route element={<InsightArticlePage />} path="/insights/:slug" />
        <Route element={<CareersPage />} path="/careers" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  )
}

function StudioLayout() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <div className="frame">
      <div className="site" id="top">
        <header className={`header${mobileMenuOpen ? ' header-menu-open' : ''}`}>
          <button
            aria-controls="mobile-nav"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((current) => !current)}
            type="button"
          >
            <span className="mobile-menu-line" />
            <span className="mobile-menu-line" />
          </button>

          <Link className="brand brand-desktop" to="/">
            9Studio
          </Link>

          <Link className="brand brand-mobile" to="/" onClick={() => setMobileMenuOpen(false)}>
            9Studio
          </Link>

          <nav aria-label="Primary" className="header-nav">
            {primaryNav.map((link) => (
              <NavLink
                className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                key={link.href}
                to={link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Link className="header-cta header-cta-desktop glass-button" to="/contact">
            Book a call
          </Link>

          <Link
            className="header-cta-mobile glass-button"
            onClick={() => setMobileMenuOpen(false)}
            to="/contact"
          >
            Book
          </Link>
        </header>

        <div className={`mobile-nav-shell${mobileMenuOpen ? ' mobile-nav-shell-open' : ''}`}>
          <button
            aria-label="Close navigation menu"
            className="mobile-nav-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            type="button"
          />

          <div aria-label="Mobile navigation" className="mobile-nav-panel" id="mobile-nav">
            <p className="eyebrow mobile-nav-eyebrow">Navigation</p>

            <nav className="mobile-nav-links">
              {primaryNav.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    `mobile-nav-link${isActive ? ' is-active' : ''}`
                  }
                  key={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  to={link.href}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mobile-nav-grid">
              {siteMapNav
                .filter((link) =>
                  ['/case-studies', '/process', '/insights'].includes(link.href),
                )
                .map((link) => (
                  <Link
                    className="mobile-nav-secondary"
                    key={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    to={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
            </div>

            <div className="mobile-nav-actions">
              <Link
                className="mobile-nav-cta glass-button"
                onClick={() => setMobileMenuOpen(false)}
                to="/contact"
              >
                Book a call
              </Link>
              <Link
                className="mobile-nav-contact"
                onClick={() => setMobileMenuOpen(false)}
                to="/contact"
              >
                HELLO@9STUDIO.STUDIO
              </Link>
            </div>
          </div>
        </div>

        <main
          className={`page page-transition${location.pathname === '/' ? ' page-home' : ''}`}
          key={location.pathname}
        >
          <Outlet />
        </main>

        <footer className="footer" id="footer">
          <div className="footer-left">
            <p className="footer-eyebrow">Creative technology studio</p>
            <Link className="footer-email" to="/contact">
              HELLO@9STUDIO.STUDIO
            </Link>
            <p className="footer-note">
              New York, London, Berlin. Brand systems, digital products, and
              launch direction for ambitious teams.
            </p>
          </div>

          <nav aria-label="Footer" className="footer-links footer-links-wide">
            {siteMapNav.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  )
}

function HomePage() {
  const [openService, setOpenService] = useState(0)

  return (
    <>
      <Reveal>
        <section className="hero">
          <div className="hero-copy">
            <h1 aria-label="9Studio" className="hero-title">
              <span className="hero-title-mark">9</span>
              <span>Studio</span>
            </h1>

            <div className="hero-symbols">
              <span className="hero-disc">
                <SparkIcon />
              </span>
              <PlusIcon className="symbol-plus" />
            </div>

            <div className="hero-chip-block">
              <p className="eyebrow eyebrow-dark">What we do</p>
              <div className="hero-services-grid">
                {heroServices.map((service) => (
                  <div className="hero-service-item" key={service}>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <HeroArtwork />
        </section>
      </Reveal>

      <Reveal>
        <section className="manifesto">
          <p className="manifesto-text">
            Building something that is bigger than ourselves and to create
            tools and products that will have a global impact, for good.
          </p>

          <Link className="micro-link" to="/studio">
            <span>About the studio</span>
            <span className="micro-square" />
          </Link>
        </section>
      </Reveal>

      <Reveal>
        <section className="client-section" aria-label="Selected clients">
          <p className="eyebrow client-strip-label">Selected Clients</p>
          <div className="client-strip">
            {selectedClients.map((client) => (
              <p className="client-strip-item" key={client}>
                {client}
              </p>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="approach" id="about">
          <h2 className="section-title section-title-approach">
            About our
            <br />
            approach to work
          </h2>

          <div className="approach-grid">
            {approachItems.map((item) => (
              <article className="approach-item" key={item.label}>
                <div className="approach-label">
                  <span className="approach-icon">
                    <InfoGlyph type={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </div>
                <h3 className="approach-item-title">{item.title}</h3>
                <p className="approach-item-copy">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="progress-line" aria-hidden="true">
            <span />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="works" id="works">
          <div className="section-header">
            <div>
              <h2 className="section-title">Selected Works</h2>
              <p className="section-copy">
                A curated selection of launch systems, brand experiences, and
                product surfaces shaped for ambitious teams.
              </p>
            </div>
            <Link className="section-link" to="/work">
              <span>Explore all projects</span>
              <span className="section-link-disc">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="works-grid">
            <article className="work-card">
              <div className="work-image">
                <WorksArtwork />

                <div className="work-overlay">
                  <p className="work-overlay-label">TaylorMade</p>
                  <p className="work-overlay-copy">
                    Product storytelling, launch motion, and a cleaner digital
                    system shaped for a premium release.
                  </p>
                </div>
              </div>
            </article>

            <Link className="work-rail" to="/services">
              <span className="rail-plus">
                <PlusIcon className="rail-plus-icon" />
              </span>
              <h3 className="rail-title">Design</h3>
            </Link>

            <Link className="work-rail" to="/capabilities">
              <span className="rail-plus">
                <PlusIcon className="rail-plus-icon" />
              </span>
              <h3 className="rail-title">Engineering</h3>
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="story-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Process</p>
              <h2 className="section-title">
                A focused workflow from discovery to launch.
              </h2>
            </div>
            <Link className="section-link" to="/process">
              <span>View process</span>
              <span className="section-link-disc">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="story-grid">
            {processSteps.slice(0, 3).map((step) => (
              <article className="story-card" key={step.step}>
                <p className="story-step">[{step.step}]</p>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="services" id="services">
          <div className="section-header">
            <div>
              <h2 className="section-title">Services</h2>
              <p className="section-copy">
                Three core disciplines that keep brand, product, and launch
                moving in the same direction.
              </p>
            </div>
            <Link className="section-link" to="/services">
              <span>All disciplines</span>
              <span className="section-link-disc">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="service-list">
            {services.map((service, index) => {
              const isOpen = index === openService

              return (
                <section
                  className={`service-row${isOpen ? ' service-row-open' : ''}`}
                  key={service.title}
                >
                  <button
                    aria-expanded={isOpen}
                    className="service-trigger"
                    onClick={() => setOpenService(index)}
                    type="button"
                  >
                    <span className="service-index">[{service.index}]</span>
                    <span className="service-name">{service.title}</span>
                    <span className="service-icon">
                      {isOpen ? (
                        <MinusIcon className="service-icon-svg" />
                      ) : (
                        <PlusIcon className="service-icon-svg" />
                      )}
                    </span>
                  </button>

                  <div className="service-panel">
                    <div className="service-panel-inner">
                      <div className="service-panel-grid">
                        <div>
                          <p className="service-copy">{service.copy}</p>
                          <div className="service-meta-list">
                            {service.capabilities.map((item) => (
                              <span className="service-meta-item" key={item}>
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="chrome-stage">
                          <ChromeCluster />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="banner">
          <BannerArtwork />
          <div className="banner-shade" />

          <div className="banner-content">
            <p className="banner-eyebrow">Featured Case Study</p>
            <h2 className="banner-title">TAYLORMADE</h2>
            <p className="banner-copy">Identity system, launch platform, UX motion</p>

            <Link className="banner-cta glass-button" to="/case-studies/taylormade">
              <span>View case</span>
              <span className="banner-cta-disc">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="connect" id="contact">
          <div className="connect-inner connect-inner-wide">
            <h2 className="connect-title">LET&apos;S CONNECT</h2>
            <GuidedContactForm compact />
          </div>
        </section>
      </Reveal>
    </>
  )
}

function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        summary="9Studio is a creative technology studio that combines brand systems, product design, engineering, and growth strategy into one integrated process."
        title="A studio built where design intelligence meets technical execution."
      />

      <Reveal>
        <section className="editorial-grid">
          <article className="editorial-block">
            <p className="eyebrow">Positioning</p>
            <h2 className="section-title">We help ambitious companies feel coherent at every touchpoint.</h2>
            <p className="section-copy section-copy-wide">
              The studio works at the point where product storytelling, visual
              systems, engineering craft, and growth architecture need to move
              together. We build brands and digital products that feel precise,
              expensive, and ready to scale.
            </p>
          </article>

          <article className="editorial-card">
            <p className="eyebrow">Global footprint</p>
            <p>
              New York
              <br />
              London
              <br />
              Berlin
            </p>
            <p className="editorial-note">
              Distributed by default, tightly collaborative by design.
            </p>
          </article>
        </section>
      </Reveal>

      <Reveal>
        <section className="values-grid">
          <article className="value-card">
            <h3>Integrated teams</h3>
            <p>
              Brand, product, code, motion, and growth strategy stay connected
              from the first brief through launch.
            </p>
          </article>
          <article className="value-card">
            <h3>Editorial rigor</h3>
            <p>
              Every interface, campaign, and narrative system is structured for
              clarity, pacing, and premium perception.
            </p>
          </article>
          <article className="value-card">
            <h3>Measured outcomes</h3>
            <p>
              The work is built to perform, whether the goal is adoption,
              investor confidence, organic growth, or conversion.
            </p>
          </article>
        </section>
      </Reveal>
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        summary="We provide brand design, product design, full-stack development, SEO strategy, launch campaigns, motion, and digital growth systems."
        title="A full creative technology practice shaped for modern digital brands."
      />

      <Reveal>
        <section className="service-catalog">
          {capabilityGroups.map((group) => (
            <article className="catalog-card" key={group.title}>
              <div>
                <p className="eyebrow">{group.title}</p>
                <h3>{group.copy}</h3>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section className="process-callout">
          <div>
            <p className="eyebrow">Client experience</p>
            <h2 className="section-title">Every service is delivered as part of one joined-up studio workflow.</h2>
          </div>
          <Link className="section-link" to="/contact">
            <span>Plan your engagement</span>
            <span className="section-link-disc">
              <ArrowIcon />
            </span>
          </Link>
        </section>
      </Reveal>
    </>
  )
}

function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [filterTransitioning, setFilterTransitioning] = useState(false)
  const deferredCategory = useDeferredValue(activeCategory)
  const filteredProjects =
    deferredCategory === 'All'
      ? projects
      : projects.filter((project) => project.categories.includes(deferredCategory))

  useEffect(() => {
    if (!filterTransitioning) {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      setFilterTransitioning(false)
    }, 240)

    return () => window.clearTimeout(timeout)
  }, [deferredCategory, filterTransitioning])

  return (
    <>
      <PageHero
        eyebrow="Work"
        summary="An expandable project explorer spanning branding, product design, engineering, campaign systems, and growth strategy."
        title="A project browser built for design, engineering, and launch storytelling."
      />

      <Reveal>
        <section className="filter-section">
          <div className="filter-bar">
            {projectCategories.map((category) => (
              <button
                className={`filter-chip${activeCategory === category ? ' filter-chip-active' : ''}`}
                key={category}
                onClick={() => {
                  if (category === activeCategory) {
                    return
                  }

                  setFilterTransitioning(true)
                  startTransition(() => {
                    setActiveCategory(category)
                  })
                }}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className={`project-grid${filterTransitioning ? ' project-grid-transitioning' : ''}`}>
            {filteredProjects.map((project) => (
              <Link className="project-card" key={project.slug} to={`/case-studies/${project.slug}`}>
                <div className="project-card-art">
                  <WorksArtwork />
                </div>
                <div className="project-card-body">
                  <p className="project-meta">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-tags">
                    {project.categories.map((category) => (
                      <span className="mini-chip" key={category}>
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </>
  )
}

function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        summary="Editorial project narratives that show challenge, process, design rationale, technical approach, and measurable outcomes."
        title="Detailed case studies that connect process, craft, and results."
      />

      <Reveal>
        <section className="case-index">
          {projects.map((project) => (
            <article className="case-index-card" key={project.slug}>
              <div className="case-index-head">
                <div>
                  <p className="eyebrow">{project.client}</p>
                  <h2 className="section-title">{project.title}</h2>
                </div>
                <Link className="section-link" to={`/case-studies/${project.slug}`}>
                  <span>Open case study</span>
                  <span className="section-link-disc">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
              <p className="section-copy section-copy-wide">{project.lead}</p>
              <div className="metric-grid">
                {project.metrics.map((metric) => (
                  <article className="metric-card" key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </article>
                ))}
              </div>
            </article>
          ))}
        </section>
      </Reveal>
    </>
  )
}

function CaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <>
      <PageHero
        eyebrow={project.client}
        summary={project.lead}
        title={project.title}
      />

      <Reveal>
        <section className="case-study-grid">
          <article className="case-study-main">
            <div className="metric-grid">
              {project.metrics.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </article>
              ))}
            </div>

            <div className="case-copy-grid">
              <CaseCopyBlock copy={project.overview} title="Project Overview" />
              <CaseCopyBlock copy={project.challenge} title="Challenge" />
              <CaseCopyBlock copy={project.strategy} title="Research & Strategy" />
              <CaseCopyBlock copy={project.design} title="Design Process" />
              <CaseCopyBlock copy={project.development} title="Development Approach" />
              <CaseCopyBlock copy={project.launch} title="Launch & Results" />
            </div>
          </article>

          <aside className="case-study-side">
            <div className="detail-card">
              <p className="eyebrow">Project details</p>
              <p>
                <span>Year</span>
                <strong>{project.year}</strong>
              </p>
              <p>
                <span>Services</span>
                <strong>{project.services.join(', ')}</strong>
              </p>
              <p>
                <span>Categories</span>
                <strong>{project.categories.join(', ')}</strong>
              </p>
            </div>
          </aside>
        </section>
      </Reveal>

      <Reveal>
        <section className="case-study-section">
          <BeforeAfterSlider
            afterLabel="Refined final system"
            beforeLabel="Legacy launch surface"
            description="A tactile comparison layer for exploring narrative, interface, and visual system changes across the project."
            title="Old and new states, compared in one drag interaction."
          />
        </section>
      </Reveal>

      <Reveal>
        <section className="case-study-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Visual Breakdown</p>
              <h2 className="section-title">How the system was shaped.</h2>
            </div>
          </div>

          <div className="breakdown-grid">
            {project.breakdown.map((item) => (
              <article className="breakdown-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
    </>
  )
}

function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        summary="Design, engineering, growth, and storytelling arranged as one consistent operating system for product-led companies."
        title="Capabilities that span brand perception, product experience, and commercial momentum."
      />

      <Reveal>
        <section className="capability-grid capability-grid-dense">
          {capabilityGroups.map((group) => (
            <article className="capability-card" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.copy}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </Reveal>
    </>
  )
}

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        summary="A six-stage workflow that keeps strategy, design, code, and growth aligned from day one through launch and optimization."
        title="A studio process designed to keep every discipline working in the same direction."
      />

      <Reveal>
        <section className="timeline-section">
          {processSteps.map((step) => (
            <article className="timeline-card" key={step.step}>
              <p className="story-step">[{step.step}]</p>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </section>
      </Reveal>
    </>
  )
}

function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        summary="A clean editorial layer for writing about product strategy, design systems, growth, motion, and studio practice."
        title="Studio thinking on systems, launches, interfaces, and growth."
      />

      <Reveal>
        <section className="insight-grid insight-grid-full">
          {insights.map((article) => (
            <Link className="insight-card" key={article.slug} to={`/insights/${article.slug}`}>
              <p className="insight-meta">
                <span>{article.category}</span>
                <span>{article.readTime}</span>
              </p>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </Link>
          ))}
        </section>
      </Reveal>
    </>
  )
}

function InsightArticlePage() {
  const { slug } = useParams()
  const article = insights.find((item) => item.slug === slug)

  if (!article) {
    return <NotFoundPage />
  }

  return (
    <>
      <PageHero eyebrow={article.category} summary={article.readTime} title={article.title} />

      <Reveal>
        <section className="article-layout">
          {article.paragraphs.map((paragraph) => (
            <p className="article-paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      </Reveal>
    </>
  )
}

function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        summary="We hire people who care about systems, craft, performance, collaboration, and building work that feels both precise and generous."
        title="A studio culture built around shared standards and ambitious collaboration."
      />

      <Reveal>
        <section className="values-grid">
          <article className="value-card">
            <h3>Small team energy</h3>
            <p>
              Senior-level collaboration, high trust, and direct access to the
              work from concept through launch.
            </p>
          </article>
          <article className="value-card">
            <h3>Cross-disciplinary thinking</h3>
            <p>
              Designers understand launch goals, engineers care about visual
              pacing, and strategists think in systems.
            </p>
          </article>
          <article className="value-card">
            <h3>High standards, calm process</h3>
            <p>
              We value depth, clarity, and durable quality over noise or speed
              for its own sake.
            </p>
          </article>
        </section>
      </Reveal>

      <Reveal>
        <section className="jobs-grid">
          {jobs.map((job) => (
            <article className="job-card" key={job.title}>
              <p className="insight-meta">
                <span>{job.location}</span>
                <span>{job.type}</span>
              </p>
              <h3>{job.title}</h3>
              <p>{job.summary}</p>
              <Link className="section-link" to="/contact">
                <span>Enquire</span>
                <span className="section-link-disc">
                  <ArrowIcon />
                </span>
              </Link>
            </article>
          ))}
        </section>
      </Reveal>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        summary="A guided briefing flow for teams who need brand, product, engineering, launch support, or a long-term creative technology partner."
        title="A conversational way to shape the right studio engagement."
      />

      <Reveal>
        <section className="connect connect-page">
          <div className="connect-inner connect-inner-wide">
            <GuidedContactForm />
          </div>
        </section>
      </Reveal>
    </>
  )
}

function NotFoundPage() {
  return (
    <section className="empty-state">
      <p className="eyebrow">404</p>
      <h1 className="section-title">This page slipped outside the studio map.</h1>
      <p className="section-copy section-copy-wide">
        The route you opened is not available. Use the link below to return to
        the main experience.
      </p>
      <Link className="banner-cta glass-button" to="/">
        <span>Return home</span>
        <span className="banner-cta-disc">
          <ArrowIcon />
        </span>
      </Link>
    </section>
  )
}

function PageHero({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string
  title: string
  summary: string
}) {
  return (
    <Reveal>
      <section className="page-hero">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="section-title page-hero-title">{title}</h1>
          <p className="page-hero-summary">{summary}</p>
        </div>
      </section>
    </Reveal>
  )
}

function CaseCopyBlock({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="case-copy-card">
      <p className="eyebrow">{title}</p>
      <p>{copy}</p>
    </article>
  )
}

export default App
