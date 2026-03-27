import { useEffect, useLayoutEffect, useState, type CSSProperties } from 'react'
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import { ContactForm } from './components/ContactForm'
import { ProjectGalleryModal } from './components/ProjectGalleryModal'
import { ProjectPoster } from './components/ProjectPoster'
import Reveal from './components/Reveal'
import { ArrowIcon } from './components/StudioVisuals'
import {
  capabilityGroups,
  processSteps,
  primaryNav,
  projects,
  siteMapNav,
  type CapabilityGroup,
  type ProjectItem,
  type ProcessStep,
} from './siteData'

function App() {
  return (
    <Routes>
      <Route element={<StudioLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<WorkPage />} path="/work" />
        <Route element={<ServicesPage />} path="/services" />
        <Route element={<CaseStudyPage />} path="/case-studies/:slug" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<Navigate replace to="/" />} path="/studio" />
        <Route element={<Navigate replace to="/services" />} path="/process" />
        <Route element={<Navigate replace to="/services" />} path="/capabilities" />
        <Route element={<Navigate replace to="/work" />} path="/case-studies" />
        <Route element={<Navigate replace to="/" />} path="/insights" />
        <Route element={<Navigate replace to="/" />} path="/insights/:slug" />
        <Route element={<Navigate replace to="/contact" />} path="/careers" />
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
    ['/', '/work', '/services', '/contact'].includes(link.href),
  )

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) {
      return undefined
    }

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    resetScroll()

    if (location.pathname === '/' && window.innerWidth >= 760) {
      window.requestAnimationFrame(resetScroll)
    }
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
              9 STUDIO
            </Link>

            <Link className="brand brand-mobile" to="/" onClick={() => setMobileMenuOpen(false)}>
              9 STUDIO
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

            <a className="header-contact" href="mailto:hello@9studio.studio">
              hello@9studio.studio
            </a>

            <Link
              className="header-cta-mobile glass-button"
              onClick={() => setMobileMenuOpen(false)}
              to="/contact"
            >
              Contact
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
            <p className="portfolio-kicker mobile-nav-eyebrow">Menu</p>

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

            <div className="mobile-nav-actions">
              <Link
                className="mobile-nav-cta glass-button"
                onClick={() => setMobileMenuOpen(false)}
                to="/contact"
              >
                Send a brief
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
            <p className="footer-eyebrow">Graphic design and web studio</p>
            <Link className="footer-email" to="/contact">
              HELLO@9STUDIO.STUDIO
            </Link>
            <p className="footer-note">
              Identity, web, campaigns, and motion with a sharper graphic point of view.
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
  const heroProject = projects[0]!
  const marqueeServices = capabilityGroups.map((group) => group.title)
  const marqueeClients = projects.map((project) => project.client)
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(null)
  const openProject = projects.find((project) => project.slug === openProjectSlug) ?? null

  return (
    <>
      <Reveal>
        <section className="studio-home-hero">
          <div className="studio-home-hero-copy">
            <div className="studio-home-hero-topline">
              <p className="studio-eyebrow">Independent graphic design studio</p>
              <p className="studio-home-hero-note">
                Berlin based. Working across identity, web, campaigns, and motion.
              </p>
            </div>

            <h1 className="studio-home-hero-title">
              Visual identities, websites, and launch worlds with more personality.
            </h1>
            <p className="studio-home-hero-summary">
              9 Studio shapes cleaner covers, sharper typography, and image-led digital
              experiences for brands that want the work to feel obvious and memorable.
            </p>

            <div className="studio-hero-actions">
              <Link className="studio-button studio-button-dark" to="/work">
                <span>View work</span>
                <span className="studio-button-disc">
                  <ArrowIcon />
                </span>
              </Link>

              <Link className="studio-button studio-button-light" to="/contact">
                <span>Start project</span>
                <span className="studio-button-disc">
                  <ArrowIcon />
                </span>
              </Link>
            </div>

            <div className="studio-hero-services">
              <span>Identity systems</span>
              <span>Web design</span>
              <span>Campaign art direction</span>
              <span>Motion</span>
            </div>
          </div>

          <div className="studio-home-hero-visuals">
            <button
              aria-label={`Open ${heroProject.title} preview`}
              className="studio-home-hero-poster"
              onClick={() => setOpenProjectSlug(heroProject.slug)}
              type="button"
            >
              <ProjectPoster project={heroProject} variant="hero" />
            </button>

            <div className="studio-home-hero-caption">
              <div>
                <p className="studio-eyebrow">Featured project</p>
                <div className="studio-home-hero-caption-line">
                  <strong>{heroProject.client}</strong>
                  <span>{heroProject.year}</span>
                </div>
              </div>
              <p>{heroProject.summary}</p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="studio-marquee-stack" aria-label="Studio services and clients">
          <MarqueeBand items={marqueeServices} />
          <MarqueeBand items={marqueeClients} reverse />
        </section>
      </Reveal>

      <Reveal>
        <section className="studio-section" id="works">
          <div className="studio-section-head">
            <div>
              <p className="studio-eyebrow">Selected work</p>
              <h2 className="studio-section-title">Three projects. Fast to scan.</h2>
            </div>
            <p className="studio-section-note">
              Big covers first, then previews and case studies only when you want more.
            </p>
          </div>

          <div className="studio-feature-list">
            {projects.map((project, index) => (
              <StudioFeatureBlock
                index={index}
                key={project.slug}
                onPreview={() => setOpenProjectSlug(project.slug)}
                project={project}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="studio-section">
          <div className="studio-section-head">
            <div>
              <p className="studio-eyebrow">Services</p>
              <h2 className="studio-section-title">A focused studio offer.</h2>
            </div>
            <p className="studio-section-note">
              Fewer lanes, better art direction, tighter execution.
            </p>
          </div>

          <div className="studio-service-card-grid">
            {capabilityGroups.map((group, index) => (
              <StudioServiceCard group={group} index={index} key={group.title} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="studio-banner studio-banner-spotlight">
          <div>
            <p className="studio-eyebrow">Start a project</p>
            <h2 className="studio-banner-title">
              Bring the idea.
              <br />
              We shape the cover.
            </h2>
          </div>

          <Link className="studio-button studio-button-dark" to="/contact">
            <span>Send a brief</span>
            <span className="studio-button-disc">
              <ArrowIcon />
            </span>
          </Link>
        </section>
      </Reveal>

      {openProject ? (
        <ProjectGalleryModal onClose={() => setOpenProjectSlug(null)} project={openProject} />
      ) : null}
    </>
  )
}

function WorkPage() {
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(null)
  const openProject = projects.find((project) => project.slug === openProjectSlug) ?? null

  return (
    <>
      <Reveal>
        <PageIntro
          eyebrow="Work"
          summary="A tighter edit of identity, web, and campaign projects with instant previews."
          title="Work built to be seen quickly."
        />
      </Reveal>

      <Reveal>
        <section className="studio-feature-list studio-feature-list-page">
          {projects.map((project, index) => (
            <StudioFeatureBlock
              index={index}
              key={project.slug}
              onPreview={() => setOpenProjectSlug(project.slug)}
              project={project}
            />
          ))}
        </section>
      </Reveal>

      {openProject ? (
        <ProjectGalleryModal onClose={() => setOpenProjectSlug(null)} project={openProject} />
      ) : null}
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <Reveal>
        <PageIntro
          eyebrow="Services"
          summary="A small studio offer centered on identity, web design, campaign systems, and motion."
          title="Identity, web, campaigns, motion."
        />
      </Reveal>

      <Reveal>
        <section className="studio-service-card-grid studio-service-card-grid-page">
          {capabilityGroups.map((group, index) => (
            <StudioServiceCard detailed group={group} index={index} key={group.title} />
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section className="studio-phase-grid">
          {processSteps.map((step) => (
            <StudioPhaseCard key={step.step} step={step} />
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section className="studio-banner studio-banner-soft studio-banner-process">
          <div>
            <p className="studio-eyebrow">Process</p>
            <h2 className="studio-banner-title">
              One clear direction.
              <br />
              Then the build.
            </h2>
          </div>

          <Link className="studio-button studio-button-dark" to="/contact">
            <span>Send a brief</span>
            <span className="studio-button-disc">
              <ArrowIcon />
            </span>
          </Link>
        </section>
      </Reveal>
    </>
  )
}

function CaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  const [previewOpen, setPreviewOpen] = useState(false)

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <>
      <Reveal>
        <PageIntro eyebrow={project.client} summary={project.lead} title={project.title} />
      </Reveal>

      <Reveal>
        <section className="studio-case-hero">
          <button
            aria-label={`Open ${project.title} preview`}
            className="studio-case-poster"
            onClick={() => setPreviewOpen(true)}
            type="button"
          >
            <ProjectPoster project={project} variant="feature" />
          </button>

          <aside className="studio-case-sidebar">
            <div className="studio-case-meta">
              <div className="studio-case-meta-item">
                <span>Year</span>
                <strong>{project.year}</strong>
              </div>
              <div className="studio-case-meta-item">
                <span>Services</span>
                <strong>{project.services.slice(0, 3).join(', ')}</strong>
              </div>
              <div className="studio-case-meta-item">
                <span>Category</span>
                <strong>{project.categories[0]}</strong>
              </div>
              <div className="studio-case-meta-item">
                <span>Summary</span>
                <strong>{project.summary}</strong>
              </div>
            </div>

            <button
              className="studio-button studio-button-dark"
              onClick={() => setPreviewOpen(true)}
              type="button"
            >
              <span>Open preview</span>
              <span className="studio-button-disc">
                <ArrowIcon />
              </span>
            </button>
          </aside>
        </section>
      </Reveal>

      <Reveal>
        <section className="studio-case-story">
          <article className="studio-case-card">
            <p className="studio-eyebrow">Summary</p>
            <p>{project.summary}</p>
          </article>
          <article className="studio-case-card">
            <p className="studio-eyebrow">Approach</p>
            <p>{project.strategy}</p>
          </article>
          <article className="studio-case-card">
            <p className="studio-eyebrow">Result</p>
            <p>{project.results}</p>
          </article>
        </section>
      </Reveal>

      <Reveal>
        <section className="studio-phase-grid studio-phase-grid-case">
          {project.breakdown.map((section, index) => (
            <article className="studio-phase-card" key={section.title}>
              <span className="studio-phase-card-step">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="studio-phase-card-title">{section.title}</h3>
              <p className="studio-phase-card-copy">{section.copy}</p>
            </article>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section className="studio-metric-grid">
          {project.metrics.map((metric) => (
            <article className="studio-metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </section>
      </Reveal>

      {previewOpen ? (
        <ProjectGalleryModal onClose={() => setPreviewOpen(false)} project={project} />
      ) : null}
    </>
  )
}

function ContactPage() {
  return (
    <>
      <Reveal>
        <PageIntro
          eyebrow="Contact"
          summary="A short brief, a deck, or a few references is enough to start."
          title="Start with the work you want people to notice."
        />
      </Reveal>

      <Reveal>
        <section className="studio-contact">
          <div className="studio-contact-copy">
            <p className="studio-eyebrow">Studio email</p>
            <a className="studio-contact-mail" href="mailto:hello@9studio.studio">
              hello@9studio.studio
            </a>
            <p className="studio-contact-note">
              Send references, timing, budget range, or just the messy first idea.
            </p>

            <div className="studio-contact-tags">
              {capabilityGroups.map((group) => (
                <span key={group.title}>{group.title}</span>
              ))}
            </div>
          </div>

          <div className="studio-contact-form-shell">
            <ContactForm showTitle={false} />
          </div>
        </section>
      </Reveal>
    </>
  )
}

function NotFoundPage() {
  return (
    <section className="studio-empty-state">
      <p className="studio-eyebrow">404</p>
      <h1 className="studio-page-title">That page is outside the current edit.</h1>
      <p className="studio-page-summary">Head back to the homepage or the work.</p>
      <Link className="studio-button studio-button-dark" to="/work">
        <span>Go to work</span>
        <span className="studio-button-disc">
          <ArrowIcon />
        </span>
      </Link>
    </section>
  )
}

function PageIntro({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string
  title: string
  summary: string
}) {
  return (
    <section className="studio-page-intro">
      <p className="studio-eyebrow">{eyebrow}</p>
      <h1 className="studio-page-title">{title}</h1>
      <p className="studio-page-summary">{summary}</p>
    </section>
  )
}

function StudioFeatureBlock({
  project,
  index,
  onPreview,
}: {
  project: ProjectItem
  index: number
  onPreview: () => void
}) {
  const blockStyle = {
    '--feature-accent': project.accent,
    '--feature-surface': project.surface,
  } as CSSProperties

  return (
    <article
      className={`studio-feature-block${index % 2 === 1 ? ' studio-feature-block-reverse' : ''}`}
      style={blockStyle}
    >
      <button
        aria-label={`Open ${project.title} preview`}
        className="studio-feature-media"
        onClick={onPreview}
        type="button"
      >
        <ProjectPoster project={project} variant="feature" />
      </button>

      <div className="studio-feature-copy">
        <div className="studio-feature-topline">
          <span className="studio-feature-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="studio-chip">{project.categories[0]}</span>
        </div>

        <div className="studio-feature-head">
          <h2 className="studio-feature-title">{project.title}</h2>
          <p className="studio-feature-summary">{project.lead}</p>
        </div>

        <div className="studio-feature-meta">
          <span>{project.client}</span>
          <span>{project.year}</span>
          <span>{project.services.slice(0, 2).join(' / ')}</span>
        </div>

        <div className="studio-work-card-actions">
          <button className="studio-text-link" onClick={onPreview} type="button">
            Preview
          </button>
          <Link className="studio-text-link" to={`/case-studies/${project.slug}`}>
            Case study
          </Link>
        </div>
      </div>
    </article>
  )
}

function StudioServiceCard({
  group,
  index,
  detailed = false,
}: {
  group: CapabilityGroup
  index: number
  detailed?: boolean
}) {
  return (
    <article className="studio-service-card">
      <span className="studio-service-card-index">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="studio-service-card-title">{group.title}</h3>
      <p className="studio-service-card-copy">{group.copy}</p>
      <p className="studio-service-card-list">{group.items.join(' / ')}</p>
      {detailed ? (
        <p className="studio-service-card-detail">
          Typical deliverables: {group.items.join(', ')}.
        </p>
      ) : null}
    </article>
  )
}

function StudioPhaseCard({ step }: { step: ProcessStep }) {
  return (
    <article className="studio-phase-card">
      <span className="studio-phase-card-step">{step.step}</span>
      <h3 className="studio-phase-card-title">{step.title}</h3>
      <p className="studio-phase-card-copy">{step.copy}</p>
    </article>
  )
}

function MarqueeBand({
  items,
  reverse = false,
}: {
  items: string[]
  reverse?: boolean
}) {
  const repeatedItems = [...items, ...items, ...items]

  return (
    <div className={`studio-marquee-band${reverse ? ' studio-marquee-band-reverse' : ''}`}>
      <div className="studio-marquee-inner">
        <div className="studio-marquee-track">
          {repeatedItems.map((item, index) => (
            <span className="studio-marquee-item" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
        <div aria-hidden="true" className="studio-marquee-track">
          {repeatedItems.map((item, index) => (
            <span className="studio-marquee-item" key={`${item}-${index}-duplicate`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
