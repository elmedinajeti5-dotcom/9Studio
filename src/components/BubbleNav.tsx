import { useState } from 'react'
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import type { NavItem } from '../siteData'

type BubbleNavProps = {
  links: NavItem[]
}

function isPathActive(currentPath: string, href: string) {
  if (href === '/work' && currentPath.startsWith('/case-studies/')) {
    return true
  }

  return currentPath === href || currentPath.startsWith(`${href}/`)
}

export function BubbleNav({ links }: BubbleNavProps) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null)
  const activeTarget = links.find((link) => isPathActive(location.pathname, link.href))?.href ?? null
  const currentTarget = hoveredTarget ?? activeTarget
  const indicatorTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.46, ease: [0.22, 1, 0.36, 1] as const }

  const renderIndicator = (target: string) => {
    if (currentTarget !== target) {
      return null
    }

    return (
      <motion.span
        className="studio-nav-indicator"
        layoutId="studio-nav-indicator"
        transition={indicatorTransition}
      />
    )
  }

  return (
    <LayoutGroup id="studio-nav">
      <nav
        aria-label="Primary"
        className="studio-nav"
        onMouseLeave={() => setHoveredTarget(null)}
      >
        <Link className="studio-nav-brand" to="/">
          <span aria-hidden="true" className="studio-nav-brand-mark" />
          <span className="studio-nav-brand-label">9 Studio</span>
        </Link>

        <div className="studio-nav-links">
          {links.map((link) => {
            const isActive = isPathActive(location.pathname, link.href)
            const isHighlighted = currentTarget === link.href

            return (
              <NavLink
                className={`studio-nav-link${isHighlighted ? ' is-highlighted' : ''}${isActive ? ' is-active' : ''}`}
                key={link.href}
                onBlur={() => setHoveredTarget(null)}
                onFocus={() => setHoveredTarget(link.href)}
                onMouseEnter={() => setHoveredTarget(link.href)}
                to={link.href}
              >
                {renderIndicator(link.href)}
                <span className="studio-nav-label">{link.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </LayoutGroup>
  )
}
