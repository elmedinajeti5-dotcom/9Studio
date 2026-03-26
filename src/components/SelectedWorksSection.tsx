import { startTransition, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../siteData'
import { ArrowIcon, WorksArtwork } from './StudioVisuals'

const featuredProjects = projects.slice(0, 3)

const selectedWorkNotes: Record<
  string,
  {
    label: string
    copy: string
  }
> = {
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

export function SelectedWorksSection() {
  const [activeSlug, setActiveSlug] = useState(featuredProjects[0]?.slug ?? '')

  if (featuredProjects.length === 0) {
    return null
  }

  const activeProject =
    featuredProjects.find((project) => project.slug === activeSlug) ?? featuredProjects[0]
  const activeNote = selectedWorkNotes[activeProject.slug] ?? {
    label: 'Signature move',
    copy: activeProject.breakdown[0]?.copy ?? activeProject.strategy,
  }

  return (
    <section className="works works-curated" id="works">
      <div className="section-header">
        <div>
          <h2 className="section-title">Selected Works</h2>
          <p className="section-copy">
            A tighter project selector built to preview the thinking, launch
            approach, and measurable outcomes behind each engagement.
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
                <Link className="selected-work-link" to={`/case-studies/${activeProject.slug}`}>
                  <span>Open case study</span>
                  <span className="selected-work-link-disc">
                    <ArrowIcon />
                  </span>
                </Link>
                <p className="selected-work-stage-caption">
                  {activeProject.categories.slice(0, 3).join(' / ')}
                </p>
              </div>
            </div>

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
            </div>
          </div>
        </article>

        <div className="selected-work-options" aria-label="Featured work options">
          {featuredProjects.map((project, index) => {
            const isActive = project.slug === activeProject.slug

            return (
              <button
                aria-pressed={isActive}
                className={`selected-work-option${
                  isActive ? ' selected-work-option-active' : ''
                }`}
                data-work={project.slug}
                key={project.slug}
                onClick={() => {
                  if (isActive) {
                    return
                  }

                  startTransition(() => {
                    setActiveSlug(project.slug)
                  })
                }}
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
  )
}
