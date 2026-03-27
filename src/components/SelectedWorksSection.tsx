import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../siteData'
import { ProjectGalleryModal } from './ProjectGalleryModal'
import { ProjectPoster } from './ProjectPoster'

const featuredProjects = projects.slice(0, 3)

export function SelectedWorksSection() {
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(null)
  const openProject =
    featuredProjects.find((project) => project.slug === openProjectSlug) ?? null

  return (
    <>
      <section className="portfolio-work-section" id="works">
        <div className="portfolio-section-head">
          <div>
            <p className="portfolio-kicker">Selected work</p>
            <h2 className="portfolio-section-title">
              Open the work.
              <br />
              Nothing extra.
            </h2>
          </div>

          <p className="portfolio-section-note">
            Tap any cover to move through the project images before opening the case
            study.
          </p>
        </div>

        <div className="portfolio-work-grid">
          {featuredProjects.map((project, index) => (
            <article className="portfolio-work-tile" key={project.slug}>
              <button
                aria-label={`Open ${project.title} preview`}
                className="portfolio-work-tile-visual"
                onClick={() => setOpenProjectSlug(project.slug)}
                type="button"
              >
                <ProjectPoster
                  project={project}
                  variant={index === 0 ? 'feature' : 'card'}
                />
              </button>

              <div className="portfolio-work-tile-copy">
                <div className="portfolio-work-tile-meta">
                  <span>{project.client}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <div className="portfolio-work-tile-actions">
                  <span className="portfolio-work-chip">{project.categories[0]}</span>
                  <Link className="portfolio-text-link" to={`/case-studies/${project.slug}`}>
                    Case study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {openProject ? (
        <ProjectGalleryModal
          onClose={() => setOpenProjectSlug(null)}
          project={openProject}
        />
      ) : null}
    </>
  )
}
