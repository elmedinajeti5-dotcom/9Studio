import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { projects } from '../siteData'
import { ArrowIcon, WorksArtwork } from './StudioVisuals'

type FeaturedProject = (typeof projects)[number]

type SelectedWorkNote = {
  label: string
  copy: string
}

type GallerySlide = {
  id: string
  label: string
  eyebrow: string
  title: string
  copy: string
  detail: string
  tone: 'intro' | 'strategy' | 'design' | 'build' | 'results'
  stats?: FeaturedProject['metrics']
}

const featuredProjects = projects.slice(0, 3)

const selectedWorkNotes: Record<string, SelectedWorkNote> = {
  taylormade: {
    label: 'Launch architecture',
    copy:
      'Narrative structure, conversion detail, and product clarity were shaped as one cinematic release system.',
  },
  northstar: {
    label: 'Brand relaunch',
    copy:
      'Identity, investor narrative, and campaign tooling were rebuilt together so the platform could feel sharper in every room.',
  },
  lumenos: {
    label: 'Trust-led redesign',
    copy:
      'Accessibility, performance, and brand confidence were treated as one product system instead of separate fixes.',
  },
}

function buildProjectGallery(
  project: FeaturedProject,
  note: SelectedWorkNote,
): GallerySlide[] {
  return [
    {
      id: `${project.slug}-intro`,
      label: 'Opening frame',
      eyebrow: `${project.client} / ${project.year}`,
      title: project.lead,
      copy: project.summary,
      detail: note.copy,
      tone: 'intro',
    },
    {
      id: `${project.slug}-strategy`,
      label: note.label,
      eyebrow: project.categories.slice(0, 2).join(' / '),
      title: project.breakdown[0]?.title ?? 'Narrative system',
      copy: project.breakdown[0]?.copy ?? project.strategy,
      detail: project.overview,
      tone: 'strategy',
    },
    {
      id: `${project.slug}-design`,
      label: 'Design system',
      eyebrow: project.services.slice(0, 2).join(' / '),
      title: project.breakdown[1]?.title ?? 'Interface clarity',
      copy: project.design,
      detail: project.challenge,
      tone: 'design',
    },
    {
      id: `${project.slug}-build`,
      label: 'Build and launch',
      eyebrow: project.services.slice(2, 4).join(' / '),
      title: project.breakdown[2]?.title ?? 'Launch tooling',
      copy: project.development,
      detail: project.launch,
      tone: 'build',
    },
    {
      id: `${project.slug}-results`,
      label: 'Measured outcome',
      eyebrow: 'Results snapshot',
      title: 'What changed after release',
      copy: project.results,
      detail: project.categories.join(' / '),
      tone: 'results',
      stats: project.metrics,
    },
  ]
}

function getSelectedWorkNote(project: FeaturedProject): SelectedWorkNote {
  return (
    selectedWorkNotes[project.slug] ?? {
      label: 'Signature move',
      copy: project.breakdown[0]?.copy ?? project.strategy,
    }
  )
}

function findFeaturedProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug)
}

export function SelectedWorksSection() {
  const [activeSlug, setActiveSlug] = useState(featuredProjects[0]?.slug ?? '')
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const initialProject = featuredProjects[0] ?? null
  const activeProject = findFeaturedProject(activeSlug) ?? initialProject
  const activeNote = activeProject ? getSelectedWorkNote(activeProject) : null
  const activeGallery =
    activeProject && activeNote ? buildProjectGallery(activeProject, activeNote) : []
  const galleryProject = openSlug ? findFeaturedProject(openSlug) ?? null : null
  const galleryNote = galleryProject ? getSelectedWorkNote(galleryProject) : null
  const gallerySlides =
    galleryProject && galleryNote ? buildProjectGallery(galleryProject, galleryNote) : []

  useEffect(() => {
    if (!galleryProject) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenSlug(null)
        return
      }

      if (gallerySlides.length <= 1) {
        return
      }

      if (event.key === 'ArrowRight') {
        setActiveSlide((current) => (current + 1) % gallerySlides.length)
      }

      if (event.key === 'ArrowLeft') {
        setActiveSlide((current) =>
          current === 0 ? gallerySlides.length - 1 : current - 1,
        )
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [galleryProject, gallerySlides.length])

  const previewProject = (slug: string) => {
    if (slug === activeSlug) {
      return
    }

    setActiveSlug(slug)
  }

  const openGallery = (project: FeaturedProject, index = 0) => {
    setActiveSlug(project.slug)
    setOpenSlug(project.slug)
    setActiveSlide(index)
  }

  const closeGallery = () => {
    setOpenSlug(null)
  }

  if (!activeProject || !activeNote) {
    return null
  }

  const galleryCountLabel = `${activeGallery.length} preview frames`

  return (
    <>
      <section className="works works-curated" id="works">
        <div className="section-header">
          <div>
            <h2 className="section-title">Selected Works</h2>
            <p className="section-copy">
              Tap any project to open a fullscreen preview gallery and step
              through the story, system, and results.
            </p>
          </div>
          <Link className="section-link" to="/work">
            <span>Explore all projects</span>
            <span className="section-link-disc">
              <ArrowIcon />
            </span>
          </Link>
        </div>

        <div className="selected-works-shell">
          <article className="selected-work-stage" data-work={activeProject.slug}>
            <div className="selected-work-stage-inner">
              <div className="selected-work-stage-copy">
                <div className="selected-work-stage-topline">
                  <p className="eyebrow">{activeProject.client}</p>
                  <span className="selected-work-stage-year">{activeProject.year}</span>
                </div>

                <div className="selected-work-stage-heading">
                  <p className="selected-work-stage-label">{activeNote.label}</p>
                  <h3 className="selected-work-stage-title">{activeProject.title}</h3>
                  <p className="selected-work-stage-lead">{activeProject.lead}</p>
                  <p className="selected-work-stage-summary">{activeProject.summary}</p>
                </div>

                <div className="selected-work-service-list" aria-label="Project services">
                  {activeProject.services.slice(0, 4).map((service) => (
                    <span className="selected-work-service-pill" key={service}>
                      {service}
                    </span>
                  ))}
                </div>

                <div className="selected-work-metrics" aria-label="Project metrics">
                  {activeProject.metrics.map((metric) => (
                    <article className="selected-work-metric" key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </article>
                  ))}
                </div>

                <div className="selected-work-stage-actions">
                  <button
                    aria-label={`Open ${activeProject.title} preview gallery`}
                    className="selected-work-link selected-work-link-button"
                    onClick={() => openGallery(activeProject)}
                    type="button"
                  >
                    <span>View gallery</span>
                    <span className="selected-work-link-disc">
                      <ArrowIcon />
                    </span>
                  </button>
                  <Link className="selected-work-link" to={`/case-studies/${activeProject.slug}`}>
                    <span>Open case study</span>
                    <span className="selected-work-link-disc">
                      <ArrowIcon />
                    </span>
                  </Link>
                  <p className="selected-work-stage-caption">
                    {activeProject.categories.slice(0, 3).join(' / ')} / {galleryCountLabel}
                  </p>
                </div>
              </div>

              <button
                aria-label={`Open ${activeProject.title} preview gallery`}
                className="selected-work-art-button"
                onClick={() => openGallery(activeProject)}
                type="button"
              >
                <div className="selected-work-art-frame" aria-hidden="true">
                  <span className="selected-work-aurora selected-work-aurora-a" />
                  <span className="selected-work-aurora selected-work-aurora-b" />
                  <span className="selected-work-ring selected-work-ring-a" />
                  <span className="selected-work-ring selected-work-ring-b" />
                  <WorksArtwork />

                  <div className="selected-work-note">
                    <p className="selected-work-note-label">{activeNote.label}</p>
                    <p className="selected-work-note-copy">{activeNote.copy}</p>
                  </div>

                  <div className="selected-work-art-hint">
                    <span>Tap to preview</span>
                    <span>{galleryCountLabel}</span>
                  </div>
                </div>
              </button>
            </div>
          </article>

          <div className="selected-work-options" aria-label="Featured work options">
            {featuredProjects.map((project, index) => {
              const isActive = project.slug === activeProject.slug

              return (
                <button
                  aria-label={`Preview ${project.title} gallery`}
                  aria-pressed={isActive}
                  className={`selected-work-option${
                    isActive ? ' selected-work-option-active' : ''
                  }`}
                  data-work={project.slug}
                  key={project.slug}
                  onClick={() => openGallery(project)}
                  onFocus={() => previewProject(project.slug)}
                  onMouseEnter={() => previewProject(project.slug)}
                  type="button"
                >
                  <span className="selected-work-option-topline">
                    <span className="selected-work-option-index">[0{index + 1}]</span>
                    <span className="selected-work-option-year">{project.year}</span>
                  </span>
                  <span className="selected-work-option-title">{project.title}</span>
                  <span className="selected-work-option-client">{project.client}</span>
                  <span className="selected-work-option-copy">{project.lead}</span>
                  <span className="selected-work-option-tags">
                    {project.categories.slice(0, 2).join(' / ')}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {galleryProject && galleryNote
        ? (
            <SelectedWorkGallery
              onClose={closeGallery}
              onSelectSlide={setActiveSlide}
              project={galleryProject}
              selectedIndex={activeSlide}
              slides={gallerySlides}
            />
          )
        : null}
    </>
  )
}

type SelectedWorkGalleryProps = {
  project: FeaturedProject
  slides: GallerySlide[]
  selectedIndex: number
  onSelectSlide: (index: number) => void
  onClose: () => void
}

function SelectedWorkGallery({
  project,
  slides,
  selectedIndex,
  onSelectSlide,
  onClose,
}: SelectedWorkGalleryProps) {
  const safeIndex =
    selectedIndex < slides.length ? selectedIndex : Math.max(slides.length - 1, 0)
  const activeSlide = slides[safeIndex]

  if (slides.length === 0 || !activeSlide || typeof document === 'undefined') {
    return null
  }

  const goToPrevious = () => {
    onSelectSlide(safeIndex === 0 ? slides.length - 1 : safeIndex - 1)
  }

  const goToNext = () => {
    onSelectSlide((safeIndex + 1) % slides.length)
  }

  const slideCounter = `${String(safeIndex + 1).padStart(2, '0')} / ${String(
    slides.length,
  ).padStart(2, '0')}`

  return createPortal(
    <div
      aria-labelledby={`selected-work-gallery-title-${project.slug}`}
      aria-modal="true"
      className="selected-work-gallery"
      role="dialog"
    >
      <button
        aria-label="Close gallery"
        className="selected-work-gallery-backdrop"
        onClick={onClose}
        type="button"
      />

      <div className="selected-work-gallery-panel">
        <div className="selected-work-gallery-head">
          <div className="selected-work-gallery-title-block">
            <p className="eyebrow">{project.client}</p>
            <h3
              className="selected-work-gallery-title"
              id={`selected-work-gallery-title-${project.slug}`}
            >
              {project.title} Preview
            </h3>
            <p className="selected-work-gallery-counter">{slideCounter}</p>
          </div>

          <div className="selected-work-gallery-head-actions">
            <Link className="selected-work-gallery-link" to={`/case-studies/${project.slug}`}>
              <span>Open case study</span>
              <span className="selected-work-gallery-link-disc">
                <ArrowIcon />
              </span>
            </Link>

            <button
              aria-label="Close gallery"
              className="selected-work-gallery-close"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        </div>

        <div className="selected-work-gallery-stage">
          <button
            aria-label="Previous preview frame"
            className="selected-work-gallery-arrow"
            onClick={goToPrevious}
            type="button"
          >
            <ArrowIcon />
          </button>

          <article
            className={`selected-work-gallery-slide selected-work-gallery-slide-${activeSlide.tone}`}
            data-work={project.slug}
          >
            <div className="selected-work-gallery-visual">
              <span className="selected-work-gallery-aurora selected-work-gallery-aurora-a" />
              <span className="selected-work-gallery-aurora selected-work-gallery-aurora-b" />
              <span className="selected-work-gallery-line selected-work-gallery-line-a" />
              <span className="selected-work-gallery-line selected-work-gallery-line-b" />
              <WorksArtwork />

              <div className="selected-work-gallery-float">
                <p>{activeSlide.label}</p>
                <span>{activeSlide.eyebrow}</span>
              </div>
            </div>

            <div className="selected-work-gallery-copy">
              <p className="selected-work-gallery-slide-label">{activeSlide.label}</p>
              <h4>{activeSlide.title}</h4>
              <p className="selected-work-gallery-slide-copy">{activeSlide.copy}</p>
              <p className="selected-work-gallery-slide-detail">{activeSlide.detail}</p>

              {activeSlide.stats ? (
                <div className="selected-work-gallery-stats">
                  {activeSlide.stats.map((metric) => (
                    <article className="selected-work-gallery-stat" key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </article>

          <button
            aria-label="Next preview frame"
            className="selected-work-gallery-arrow selected-work-gallery-arrow-next"
            onClick={goToNext}
            type="button"
          >
            <ArrowIcon />
          </button>
        </div>

        <div className="selected-work-gallery-thumbnails" aria-label="Preview frames">
          {slides.map((slide, index) => {
            const isActive = index === safeIndex

            return (
              <button
                aria-pressed={isActive}
                className={`selected-work-gallery-thumb${
                  isActive ? ' selected-work-gallery-thumb-active' : ''
                }`}
                data-work={project.slug}
                key={slide.id}
                onClick={() => onSelectSlide(index)}
                type="button"
              >
                <span className="selected-work-gallery-thumb-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="selected-work-gallery-thumb-title">{slide.label}</span>
                <span className="selected-work-gallery-thumb-copy">{slide.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>,
    document.body,
  )
}
