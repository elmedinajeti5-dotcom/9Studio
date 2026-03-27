import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import type { ProjectItem } from '../siteData'
import { ArrowIcon } from './StudioVisuals'
import { ProjectPoster } from './ProjectPoster'

type ProjectGalleryModalProps = {
  project: ProjectItem
  onClose: () => void
  initialIndex?: number
}

type ProjectSlide = {
  id: string
  label: string
  title: string
  copy: string
  note: string
}

function buildSlides(project: ProjectItem): ProjectSlide[] {
  return [
    {
      id: `${project.slug}-intro`,
      label: 'Overview',
      title: project.lead,
      copy: project.summary,
      note: `${project.client} / ${project.year}`,
    },
    {
      id: `${project.slug}-approach`,
      label: 'Approach',
      title: project.breakdown[0]?.title ?? 'Approach',
      copy: project.strategy,
      note: project.breakdown[0]?.copy ?? project.overview,
    },
    {
      id: `${project.slug}-design`,
      label: 'Design',
      title: project.breakdown[1]?.title ?? 'Design system',
      copy: project.design,
      note: project.challenge,
    },
    {
      id: `${project.slug}-result`,
      label: 'Result',
      title: 'What changed',
      copy: project.results,
      note: project.metrics.map((metric) => `${metric.label}: ${metric.value}`).join(' / '),
    },
  ]
}

export function ProjectGalleryModal({
  project,
  onClose,
  initialIndex = 0,
}: ProjectGalleryModalProps) {
  const slides = buildSlides(project)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const activeSlide = slides[activeIndex] ?? slides[0]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current + 1) % slides.length)
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1))
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, slides.length])

  if (!activeSlide || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      aria-labelledby={`project-gallery-${project.slug}`}
      aria-modal="true"
      className="project-gallery"
      role="dialog"
    >
      <button
        aria-label="Close preview"
        className="project-gallery-backdrop"
        onClick={onClose}
        type="button"
      />

      <div className="project-gallery-panel">
        <div className="project-gallery-head">
          <div className="project-gallery-head-copy">
            <p className="studio-eyebrow">Project preview</p>
            <h3 className="project-gallery-title" id={`project-gallery-${project.slug}`}>
              {project.title}
            </h3>
            <p className="project-gallery-summary">{project.summary}</p>
          </div>

          <div className="project-gallery-actions">
            <Link className="studio-button studio-button-dark" to={`/case-studies/${project.slug}`}>
              <span>Case study</span>
              <span className="studio-button-disc">
                <ArrowIcon />
              </span>
            </Link>
            <button className="project-gallery-close" onClick={onClose} type="button">
              Close
            </button>
          </div>
        </div>

        <div className="project-gallery-stage">
          <button
            aria-label="Previous frame"
            className="project-gallery-arrow project-gallery-arrow-prev"
            onClick={() =>
              setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1))
            }
            type="button"
          >
            <ArrowIcon />
          </button>

          <div className="project-gallery-frame">
            <ProjectPoster project={project} variant="feature" />
            <div className="project-gallery-copy">
              <p className="studio-eyebrow">
                {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </p>
              <p className="project-gallery-label">{activeSlide.label}</p>
              <h4>{activeSlide.title}</h4>
              <p className="project-gallery-text">{activeSlide.copy}</p>
              <p className="project-gallery-note">{activeSlide.note}</p>
            </div>
          </div>

          <button
            aria-label="Next frame"
            className="project-gallery-arrow project-gallery-arrow-next"
            onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
            type="button"
          >
            <ArrowIcon />
          </button>
        </div>

        <div className="project-gallery-thumbs">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex

            return (
              <button
                aria-pressed={isActive}
                className={`project-gallery-thumb${isActive ? ' project-gallery-thumb-active' : ''}`}
                key={slide.id}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{slide.label}</strong>
              </button>
            )
          })}
        </div>
      </div>
    </div>,
    document.body,
  )
}
