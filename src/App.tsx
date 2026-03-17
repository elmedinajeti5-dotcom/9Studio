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
  HeroArtwork,
  WorksArtwork,
} from './components/StudioVisuals'
import {
  capabilityGroups,
  insights,
  jobs,
  primaryNav,
  processSteps,
  projectCategories,
  projects,
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
  const [headerState, setHeaderState] = useState({
    atTop: true,
    hidden: false,
  })
  const footerNav = siteMapNav.filter((link) =>
    ['/', '/services', '/work', '/process', '/contact'].includes(link.href),
  )

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

  useEffect(() => {
    let frameId = 0
    let lastScrollY = window.scrollY

    const updateHeaderState = () => {
      const currentScrollY = window.scrollY
      const atTop = currentScrollY <= 12
      const delta = currentScrollY - lastScrollY

      setHeaderState((current) => {
        if (mobileMenuOpen) {
          if (current.atTop === atTop && current.hidden === false) {
            return current
          }

          return { atTop, hidden: false }
        }

        let hidden = current.hidden

        if (atTop || currentScrollY <= 96) {
          hidden = false
        } else if (delta > 8) {
          hidden = true
        } else if (delta < -8) {
          hidden = false
        }

        if (current.atTop === atTop && current.hidden === hidden) {
          return current
        }

        return { atTop, hidden }
      })

      lastScrollY = currentScrollY
      frameId = 0
    }

    const handleScroll = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateHeaderState)
    }

    updateHeaderState()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', handleScroll)
    }
  }, [mobileMenuOpen, location.pathname])

  const headerShellClassName = [
    'header-shell',
    headerState.atTop ? 'header-shell-at-top' : 'header-shell-scrolled',
    headerState.hidden && !mobileMenuOpen ? 'header-shell-hidden' : '',
    mobileMenuOpen ? 'header-shell-menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="frame">
      <div className="site" id="top">
        <div className={headerShellClassName}>
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
        </div>

        <div
          aria-hidden="true"
          className={`header-spacer${location.pathname === '/' ? ' header-spacer-home' : ''}`}
        />

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
              New York, London, Berlin. Brand systems, digital products, and launch direction for ambitious teams.
            </p>
          </div>

          <nav aria-label="Footer" className="footer-links footer-links-wide">
            {footerNav.map((link) => (
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
  return (
    <>
      <Reveal>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-main">
              <h1 aria-label="9Studio" className="hero-title">
                <span className="hero-title-mark">9</span>
                <span>Studio</span>
              </h1>

              <p className="hero-summary">
                A creative technology studio for brand systems, digital
                products, and launch experiences shaped with clarity.
              </p>

              <Link className="hero-cta" to="/contact">
                <span>Start a project</span>
                <span className="hero-cta-disc">
                  <ArrowIcon />
                </span>
              </Link>
            </div>

            <div className="hero-chip-block">
              <p className="eyebrow eyebrow-dark">What we do</p>
              <div className="hero-services-grid">
                {capabilityGroups.map((group) => (
                  <div className="hero-service-item" key={group.title}>
                    <span>{group.title}</span>
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
        <section className="story-section" id="process">
          <div className="section-header">
            <div>
              <p className="eyebrow">Process</p>
              <h2 className="section-title">
                One connected workflow from discovery to launch.
              </h2>
              <p className="section-copy">
                Strategy, design, build, and rollout stay joined up so the work
                feels coherent at every stage.
              </p>
            </div>
            <Link className="section-link" to="/process">
              <span>See full process</span>
              <span className="section-link-disc">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="story-grid story-grid-process">
            {processSteps.map((step) => (
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
                Four clear disciplines covering design, builds, growth, and
                content for modern launches.
              </p>
            </div>
            <Link className="section-link" to="/services">
              <span>View all services</span>
              <span className="section-link-disc">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="capability-grid capability-grid-services">
            {capabilityGroups.map((group) => (
              <article className="capability-card capability-card-service" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="works" id="works">
          <div className="section-header">
            <div>
              <h2 className="section-title">Selected Works</h2>
              <p className="section-copy">
                Two recent launch systems showing how brand, product, and build
                come together in one experience.
              </p>
            </div>
            <Link className="section-link" to="/work">
              <span>Explore all projects</span>
              <span className="section-link-disc">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="project-grid project-grid-home">
            {projects.slice(0, 2).map((project) => (
              <Link className="project-card project-card-home" key={project.slug} to={`/case-studies/${project.slug}`}>
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
                </div>
              </Link>
            ))}
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
        <section className="capability-grid capability-grid-services">
          {capabilityGroups.map((group) => (
            <article className="capability-card capability-card-service" key={group.title}>
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
        summary="A four-stage workflow that keeps strategy, design, build, and launch moving in one deliberate direction."
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
