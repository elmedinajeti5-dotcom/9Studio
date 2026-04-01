import { useEffect, useLayoutEffect, useState, type CSSProperties, type ReactNode } from 'react'
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
import { BubbleNav } from './components/BubbleNav'
import { ContactForm } from './components/ContactForm'
import { ProjectGalleryModal } from './components/ProjectGalleryModal'
import { ProjectPoster } from './components/ProjectPoster'
import Reveal from './components/Reveal'
import { ArrowIcon } from './components/StudioVisuals'
import {
  capabilityGroups,
  primaryNav,
  processSteps,
  projects,
  siteMapNav,
  socialLinks,
  type CapabilityGroup,
  type ProcessStep,
  type ProjectItem,
} from './siteData'

const marqueeServices = [
  'Brand Identity',
  'Web Design',
  'Campaign Design',
  'Creative Direction',
  'Motion Design',
  'Portfolio Systems',
]

const marqueeClients = [
  'Astera Coffee',
  'Morrow Run Club',
  'Solace Studio',
  'Atelier Mono',
  'Northbound Records',
  'Kite Market',
  'Common Room',
  'Blank State',
]

const surfaceThemes = {
  default: '#fbf8f1',
  paper: '#fbf8f1',
  ivory: '#fffdf7',
  sand: '#f8f1dd',
  blush: '#fee9df',
  sky: '#e9f0ff',
  sage: '#edf7ef',
  lilac: '#f1ecff',
  mist: '#eff5ff',
} as const

type SurfaceThemeName = keyof typeof surfaceThemes

function applySurfaceTheme(themeName: string | null | undefined) {
  if (typeof document === 'undefined') {
    return
  }

  const surface =
    surfaceThemes[(themeName ?? 'default') as SurfaceThemeName] ?? surfaceThemes.default

  document.documentElement.style.setProperty('--page-surface', surface)
}

function App() {
  return (
    <Routes>
      <Route element={<StudioLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<WorkPage />} path="/work" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<CaseStudyPage />} path="/case-studies/:slug" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<Navigate replace to="/" />} path="/studio" />
        <Route element={<Navigate replace to="/about" />} path="/services" />
        <Route element={<Navigate replace to="/about" />} path="/process" />
        <Route element={<Navigate replace to="/about" />} path="/capabilities" />
        <Route element={<Navigate replace to="/work" />} path="/case-studies" />
        <Route element={<Navigate replace to="/contact" />} path="/jobs" />
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
  const footerNav = siteMapNav.filter((link) =>
    ['/', '/work', '/about', '/contact'].includes(link.href),
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
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setMobileMenuOpen(false)
    })

    return () => window.cancelAnimationFrame(frameId)
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
    const themedSections = Array.from(document.querySelectorAll<HTMLElement>('.site [data-surface]'))
    const surfaceSequence = themedSections
      .map((section) => section.dataset.surface)
      .filter(
        (surface, index, surfaces): surface is string =>
          Boolean(surface) && surface !== surfaces[index - 1],
      )

    if (surfaceSequence.length === 0) {
      applySurfaceTheme('default')
      return undefined
    }

    let frameId = 0

    const updateSurface = () => {
      frameId = 0
      const totalScrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      )
      const adjustedOffset = window.innerHeight * 0.12
      const progress = Math.min(
        (window.scrollY + adjustedOffset) / (totalScrollable + adjustedOffset),
        0.999999,
      )
      const activeIndex = Math.min(
        surfaceSequence.length - 1,
        Math.floor(progress * surfaceSequence.length),
      )

      applySurfaceTheme(surfaceSequence[activeIndex])
    }

    const scheduleSurfaceUpdate = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateSurface)
    }

    applySurfaceTheme('default')
    scheduleSurfaceUpdate()

    window.addEventListener('scroll', scheduleSurfaceUpdate, { passive: true })
    window.addEventListener('resize', scheduleSurfaceUpdate)

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', scheduleSurfaceUpdate)
      window.removeEventListener('resize', scheduleSurfaceUpdate)
    }
  }, [location.pathname])

  const headerShellClassName = [
    'header-shell',
    mobileMenuOpen ? 'header-shell-menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="frame">
      <div className="site">
        <div className={headerShellClassName}>
          <div className="header-desktop">
            <BubbleNav links={primaryNav} />
          </div>

          <header className={`header header-mobile${mobileMenuOpen ? ' header-menu-open' : ''}`}>
            <Link className="brand brand-mobile" to="/">
              9 STUDIO
            </Link>

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
          </header>
        </div>

        <div aria-hidden="true" className="header-spacer" />

        <div className={`mobile-nav-shell${mobileMenuOpen ? ' mobile-nav-shell-open' : ''}`}>
          <button
            aria-label="Close navigation menu"
            className="mobile-nav-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            type="button"
          />

          <div aria-label="Mobile navigation" className="mobile-nav-panel" id="mobile-nav">
            <p className="studio-eyebrow mobile-nav-eyebrow">Menu</p>

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
              <Link className="mobile-nav-cta glass-button" to="/contact">
                Start a project
              </Link>

              <a className="mobile-nav-contact" href="mailto:hello@yourstudio.com">
                hello@yourstudio.com
              </a>
            </div>
          </div>
        </div>

        {location.pathname === '/' || location.pathname === '/contact' ? null : (
          <Link className="studio-float-cta" to="/contact">
            <span>Start your project</span>
            <span className="studio-float-cta-disc">
              <ArrowIcon />
            </span>
          </Link>
        )}

        <main
          className={`page page-transition${location.pathname === '/' ? ' page-home' : ''}`}
          key={location.pathname}
        >
          <Outlet />
        </main>

        <footer
          className="footer studio-curated-section"
          data-gallery-label="Final note"
          data-surface="lilac"
          id="footer"
        >
          <div className="footer-left">
            <p className="footer-eyebrow">Independent creative studio</p>
            <h2 className="footer-title">Let&apos;s make the work impossible to miss.</h2>
            <Link className="footer-email" to="/contact">
              hello@yourstudio.com
            </Link>
            <p className="footer-note">
              Replace the sample projects, imagery, and studio details with your own work as the
              portfolio grows.
            </p>
          </div>

          <nav aria-label="Footer" className="footer-links footer-links-wide">
            {footerNav.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ))}

            {socialLinks.map((link) => (
              <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}

            <span>{new Date().getFullYear()}</span>
          </nav>
        </footer>
      </div>
    </div>
  )
}

function HomePage() {
  const heroProject = projects[0]!
  const showreelProject = projects[1] ?? heroProject
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(null)
  const openProject = projects.find((project) => project.slug === openProjectSlug) ?? null

  return (
    <>
      <Reveal>
        <section
          className="studio-home-hero studio-curated-section"
          data-gallery-label="Opening frame"
          data-surface="paper"
        >
          <div className="studio-home-hero-shell">
            <div className="studio-home-hero-body">
              <div className="studio-home-hero-stage">
                <h1 className="studio-home-hero-title">
                  From concept <Accent>to</Accent> creation: we bring <Accent>your</Accent>{' '}
                  brand to life.
                </h1>
              </div>
            </div>

            <div className="studio-home-hero-foot">
              <div className="studio-home-hero-credit">
                <span className="studio-home-hero-credit-link">9 STUDIO</span>
                <span>Agency for branding and digital.</span>
              </div>

              <Link className="studio-home-hero-cta" to="/contact">
                <span>Start your project with us!</span>
                <span className="studio-home-hero-cta-disc">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          className="studio-showreel studio-curated-section"
          data-gallery-label="Featured screening"
          data-surface="ivory"
        >
          <div className="studio-showreel-head">
            <p className="studio-eyebrow">Showreel / featured project</p>
            <Link className="studio-text-link" to="/work">
              Browse projects
            </Link>
          </div>

          <button
            aria-label={`Open ${showreelProject.title} preview`}
            className="studio-showreel-frame"
            onClick={() => setOpenProjectSlug(showreelProject.slug)}
            type="button"
          >
            <ProjectPoster project={showreelProject} variant="feature" />
            <span className="studio-showreel-badge">Open preview</span>
            <span className="studio-showreel-kicker">Selected work 02</span>
          </button>

          <div className="studio-showreel-copy">
            <h2 className="studio-section-title">One stage for the strongest frames.</h2>
            <p className="studio-section-note">
              Use this space for a reel, campaign film, or standout project teaser with the same
              proportions as the final media.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          className="studio-statement studio-curated-section"
          data-gallery-label="Curator note"
          data-surface="blush"
        >
          <p className="studio-eyebrow">Approach</p>
          <h2 className="studio-statement-title">
            Big type, clean grids, clear images. Less explaining, <Accent>more</Accent>{' '}
            showing.
          </h2>
          <p className="studio-statement-copy">
            The structure stays intentionally simple so the work reads quickly on desktop and
            stays clear on mobile.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section
          className="studio-section studio-curated-section"
          data-gallery-label="Selected works"
          data-surface="sky"
          id="works"
        >
          <div className="studio-section-head">
            <div>
              <p className="studio-eyebrow">Selected work</p>
              <h2 className="studio-section-title">
                A cleaner way <Accent>into</Accent> the case studies.
              </h2>
            </div>
            <p className="studio-section-note">
              Large images first, short copy second, then deeper project pages when someone wants
              the full story.
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
        <section
          aria-label="Studio services and clients"
          className="studio-marquee-stack studio-curated-section"
          data-gallery-label="Studio circle"
          data-surface="sage"
        >
          <MarqueeBand items={marqueeServices} />
          <MarqueeBand items={marqueeClients} reverse />
          <MarqueeBand items={[...socialLinks.map((link) => link.label), 'Original content only']} />
        </section>
      </Reveal>

      <Reveal>
        <section
          className="studio-newsletter studio-curated-section"
          data-gallery-label="Private list"
          data-surface="sand"
        >
          <div className="studio-newsletter-copy">
            <p className="studio-eyebrow">Stay in the loop</p>
            <h2 className="studio-section-title">A quieter place for updates, releases, or contact.</h2>
            <p className="studio-section-note">
              Keep this as a newsletter signup, or swap it for a booking form or project inquiry.
            </p>
          </div>

          <form
            className="studio-newsletter-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="studio-newsletter-field">
              <span>Email address</span>
              <input name="email" placeholder="name@email.com" type="email" />
            </label>

            <button className="studio-button studio-button-dark" type="submit">
              <span>Join the list</span>
              <span className="studio-button-disc">
                <ArrowIcon />
              </span>
            </button>
          </form>
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
          galleryLabel="Work index"
          surface="paper"
          summary="A compact portfolio view with placeholder projects you can replace one by one."
          title={
            <>
              Selected projects with <Accent>fast</Accent> previews.
            </>
          }
        />
      </Reveal>

      <Reveal>
        <section
          className="studio-portfolio-grid studio-curated-section"
          data-gallery-label="Archive grid"
          data-surface="sky"
          id="project-grid"
        >
          {projects.map((project, index) => (
            <PortfolioGridCard
              featured={index === 0}
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

function AboutPage() {
  const previewProject = projects[2] ?? projects[0]!

  return (
    <>
      <Reveal>
        <PageIntro
          eyebrow="About"
          galleryLabel="Studio preface"
          surface="paper"
          summary="A small studio setup for identity, web, and campaign work, presented in a cleaner portfolio-first structure."
          title={
            <>
              A simple creative studio with a strong <Accent>point</Accent> of view.
            </>
          }
        />
      </Reveal>

      <Reveal>
        <section
          className="studio-about-grid studio-curated-section"
          data-gallery-label="Studio profile"
          data-surface="sage"
        >
          <div className="studio-about-copy">
            <p className="studio-eyebrow">Studio profile</p>
            <h2 className="studio-section-title">
              Built to keep the work central and the presentation calm.
            </h2>
            <p className="studio-section-note">
              This template is intentionally minimal: stronger typography, clearer image blocks,
              shorter writing, and reusable layouts you can apply to every case study.
            </p>
            <div className="studio-hero-services">
              <span>Original placeholder images</span>
              <span>Editable project data</span>
              <span>Responsive layouts</span>
              <span>Motion-ready sections</span>
            </div>
          </div>

          <div className="studio-about-poster">
            <ProjectPoster project={previewProject} variant="feature" />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          className="studio-service-card-grid studio-service-card-grid-page studio-curated-section"
          data-gallery-label="Capabilities"
          data-surface="sand"
        >
          {capabilityGroups.map((group, index) => (
            <StudioServiceCard detailed group={group} index={index} key={group.title} />
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section
          className="studio-phase-grid studio-curated-section"
          data-gallery-label="Process"
          data-surface="sky"
        >
          {processSteps.map((step) => (
            <StudioPhaseCard key={step.step} step={step} />
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section
          className="studio-banner studio-banner-soft studio-curated-section"
          data-gallery-label="Closing note"
          data-surface="lilac"
        >
          <div>
            <p className="studio-eyebrow">Ready to customize</p>
            <h2 className="studio-banner-title">
              Replace the placeholders and make the system <Accent>yours</Accent>.
            </h2>
          </div>

          <Link className="studio-button studio-button-dark" to="/contact">
            <span>Start a project</span>
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
        <PageIntro
          galleryLabel="Case preface"
          eyebrow={`${project.client} / ${project.year}`}
          surface="paper"
          summary={project.lead}
          title={project.title}
        />
      </Reveal>

      <Reveal>
        <section
          className="studio-case-hero studio-curated-section"
          data-gallery-label="Case overview"
          data-surface="mist"
        >
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
                <span>Category</span>
                <strong>{project.categories.join(' / ')}</strong>
              </div>
              <div className="studio-case-meta-item">
                <span>Services</span>
                <strong>{project.services.join(', ')}</strong>
              </div>
              <div className="studio-case-meta-item">
                <span>Overview</span>
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
        <section
          className="studio-case-story studio-curated-section"
          data-gallery-label="Written notes"
          data-surface="sand"
        >
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
        <section
          className="studio-case-sequence studio-curated-section"
          data-gallery-label="Image sequence"
          data-surface="sage"
        >
          {project.breakdown.map((section, index) => (
            <CaseStudySplit
              copy={section.copy}
              index={index}
              key={section.title}
              project={project}
              title={section.title}
            />
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section
          className="studio-metric-grid studio-curated-section"
          data-gallery-label="Project impact"
          data-surface="sky"
        >
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
          galleryLabel="Open brief"
          surface="paper"
          summary="A short brief, a few references, or the first rough idea is enough to begin."
          title={
            <>
              Start with the project you want people to <Accent>notice</Accent>.
            </>
          }
        />
      </Reveal>

      <Reveal>
        <section
          className="studio-contact studio-curated-section"
          data-gallery-label="Open brief"
          data-surface="blush"
        >
          <div className="studio-contact-copy">
            <p className="studio-eyebrow">Studio email</p>
            <a className="studio-contact-mail" href="mailto:hello@yourstudio.com">
              hello@yourstudio.com
            </a>
            <p className="studio-contact-note">
              Send timing, budget range, references, or just the first direction.
            </p>

            <div className="studio-contact-tags">
              {capabilityGroups.map((group) => (
                <span key={group.title}>{group.title}</span>
              ))}
            </div>

            <div className="studio-contact-links">
              {socialLinks.map((link) => (
                <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
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
    <section
      className="studio-empty-state studio-curated-section"
      data-gallery-label="Not found"
      data-surface="paper"
    >
      <p className="studio-eyebrow">404</p>
      <h1 className="studio-page-title">That page is outside the current edit.</h1>
      <p className="studio-page-summary">Head back to the homepage or browse the work.</p>
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
  galleryLabel,
  title,
  summary,
  surface = 'paper',
}: {
  eyebrow: string
  galleryLabel?: string
  title: ReactNode
  summary: ReactNode
  surface?: SurfaceThemeName
}) {
  return (
    <section
      className="studio-page-intro studio-curated-section"
      data-gallery-label={galleryLabel ?? eyebrow}
      data-surface={surface}
    >
      <p className="studio-eyebrow">{eyebrow}</p>
      <div className="studio-page-intro-grid">
        <h1 className="studio-page-title">{title}</h1>
        <p className="studio-page-summary">{summary}</p>
      </div>
    </section>
  )
}

function Accent({ children }: { children: ReactNode }) {
  return <span className="studio-title-accent">{children}</span>
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

function PortfolioGridCard({
  project,
  onPreview,
  featured = false,
}: {
  project: ProjectItem
  onPreview: () => void
  featured?: boolean
}) {
  const cardStyle = {
    '--feature-accent': project.accent,
  } as CSSProperties

  return (
    <article
      className={`studio-portfolio-card${featured ? ' studio-portfolio-card-featured' : ''}`}
      style={cardStyle}
    >
      <button
        aria-label={`Open ${project.title} preview`}
        className="studio-portfolio-card-media"
        onClick={onPreview}
        type="button"
      >
        <ProjectPoster project={project} variant={featured ? 'feature' : 'card'} />
      </button>

      <div className="studio-portfolio-card-copy">
        <div className="studio-work-card-actions">
          <span className="studio-chip">{project.categories[0]}</span>
          <span className="studio-chip">{project.year}</span>
        </div>
        <h2 className="studio-work-card-title">{project.title}</h2>
        <p className="studio-work-card-lead">{project.lead}</p>
        <div className="studio-work-card-actions">
          <button className="studio-text-link" onClick={onPreview} type="button">
            Preview
          </button>
          <Link className="studio-text-link" to={`/case-studies/${project.slug}`}>
            Open case study
          </Link>
        </div>
      </div>
    </article>
  )
}

function CaseStudySplit({
  project,
  title,
  copy,
  index,
}: {
  project: ProjectItem
  title: string
  copy: string
  index: number
}) {
  return (
    <article className={`studio-case-split${index % 2 === 1 ? ' studio-case-split-reverse' : ''}`}>
      <ProjectDetailMedia index={index} project={project} />

      <div className="studio-case-split-copy">
        <span className="studio-phase-card-step">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="studio-phase-card-title">{title}</h3>
        <p className="studio-phase-card-copy">{copy}</p>
      </div>
    </article>
  )
}

function ProjectDetailMedia({
  project,
  index,
}: {
  project: ProjectItem
  index: number
}) {
  return (
    <div className="studio-detail-media" data-index={index}>
      <img
        alt={`${project.title} placeholder composition ${index + 1}`}
        className="studio-detail-media-image"
        loading="lazy"
        src={project.image}
      />
      <div className="studio-detail-media-caption">
        <span>{project.client}</span>
        <span>{project.categories[index % project.categories.length]}</span>
      </div>
    </div>
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
