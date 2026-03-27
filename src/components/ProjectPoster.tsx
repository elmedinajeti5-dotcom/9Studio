import type { CSSProperties } from 'react'
import type { ProjectItem } from '../siteData'
import { WorksArtwork } from './StudioVisuals'

type ProjectPosterProps = {
  project: ProjectItem
  variant?: 'hero' | 'feature' | 'card' | 'compact'
}

export function ProjectPoster({
  project,
  variant = 'card',
}: ProjectPosterProps) {
  const posterStyle = {
    '--project-accent': project.accent,
    '--project-surface': project.surface,
  } as CSSProperties

  return (
    <div
      className={`project-poster project-poster-${variant}`}
      data-work={project.slug}
      style={posterStyle}
    >
      <div className="project-poster-surface">
        <span className="project-poster-paper" />
        <img alt="" className="project-poster-image" src={project.image} />
        <span className="project-poster-overlay" />
        <WorksArtwork />
        <span className="project-poster-accent" />

        <div className="project-poster-topline">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>

        <div className="project-poster-title-wrap">
          <span className="project-poster-title">{project.title}</span>
        </div>

        <div className="project-poster-bottomline">
          <span>{project.categories[0]}</span>
          <span>{project.categories[1] ?? project.services[0]}</span>
        </div>
      </div>
    </div>
  )
}
