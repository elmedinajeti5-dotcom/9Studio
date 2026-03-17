import type { CSSProperties } from 'react'
import heroImage from '../assets/hero-9.webp'

const strokeProps = {
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.7,
}

export function HeroArtwork({ style }: { style?: CSSProperties }) {
  return (
    <div className="hero-art" aria-hidden="true" style={style}>
      <div className="hero-nine-scene">
        <span className="hero-nine-shadow" />
        <img alt="" className="hero-nine-image" src={heroImage} />
      </div>
    </div>
  )
}

export function WorksArtwork() {
  return (
    <div className="works-art" aria-hidden="true">
      <span className="works-mass works-mass-left" />
      <span className="works-mass works-mass-right" />
      <span className="works-bridge" />
      <span className="works-cutout" />
      <span className="works-haze works-haze-left" />
      <span className="works-haze works-haze-right" />
      <span className="works-grain" />
    </div>
  )
}

export function ChromeCluster() {
  return (
    <div className="chrome-cluster" aria-hidden="true">
      <span className="chrome-orb chrome-orb-1" />
      <span className="chrome-orb chrome-orb-2" />
      <span className="chrome-orb chrome-orb-3" />
      <span className="chrome-orb chrome-orb-4" />
      <span className="chrome-orb chrome-orb-5" />
      <span className="chrome-link chrome-link-1" />
      <span className="chrome-link chrome-link-2" />
      <span className="chrome-link chrome-link-3" />
    </div>
  )
}

export function BannerArtwork() {
  return (
    <div className="banner-art" aria-hidden="true">
      <span className="banner-stroke banner-stroke-a" />
      <span className="banner-stroke banner-stroke-b" />
      <span className="banner-stroke banner-stroke-c" />
      <span className="banner-grain" />
    </div>
  )
}

export function SparkIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24">
      <path
        clipRule="evenodd"
        d="M12 2.9L13.92 10.08L21.1 12L13.92 13.92L12 21.1L10.08 13.92L2.9 12L10.08 10.08L12 2.9ZM12 8.75L11.18 11.18L8.75 12L11.18 12.82L12 15.25L12.82 12.82L15.25 12L12.82 11.18L12 8.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export function ChipSparkIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24">
      <path
        clipRule="evenodd"
        d="M12 4.45L13.58 10.42L19.55 12L13.58 13.58L12 19.55L10.42 13.58L4.45 12L10.42 10.42L12 4.45ZM12 9.25L11.36 11.36L9.25 12L11.36 12.64L12 14.75L12.64 12.64L14.75 12L12.64 11.36L12 9.25Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <path {...strokeProps} d="M12 6.65V17.35M6.65 12H17.35" />
    </svg>
  )
}

export function MinusIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <path {...strokeProps} d="M6.65 12H17.35" />
    </svg>
  )
}

export function ArrowIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24">
      <path {...strokeProps} d="M6.85 12H17.15M13.2 8.1L17.15 12L13.2 15.9" />
    </svg>
  )
}

export function InfoGlyph({ type }: { type: string }) {
  switch (type) {
    case 'technology':
      return (
        <svg fill="none" viewBox="0 0 24 24">
          <path {...strokeProps} d="M4.9 8.2H9.8L11.75 6.2H18.9" />
          <path {...strokeProps} d="M4.9 15.8H9.8L11.75 17.8H18.9" />
          <path {...strokeProps} d="M11.1 8.2V15.8" />
        </svg>
      )
    case 'difference':
      return (
        <svg fill="none" viewBox="0 0 24 24">
          <path {...strokeProps} d="M5.25 6.35H18.75V17.65H5.25V6.35Z" />
          <path {...strokeProps} d="M8.1 10.15H15.9" />
          <path {...strokeProps} d="M8.1 13.85H13.25" />
        </svg>
      )
    case 'analytics':
      return (
        <svg fill="none" viewBox="0 0 24 24">
          <path {...strokeProps} d="M5.5 18V12.4M12 18V8.9M18.5 18V14.1M4.6 18H19.4" />
          <path {...strokeProps} d="M5.5 12.3L12 9.15L18.5 10.95" />
        </svg>
      )
    default:
      return (
        <svg fill="none" viewBox="0 0 24 24">
          <path {...strokeProps} d="M5.2 18.2H18.8" />
          <path {...strokeProps} d="M7.15 14.9L10.55 11.5L13.25 14.2L17.15 10.3" />
          <path {...strokeProps} d="M14.45 10.3H17.15V13" />
        </svg>
      )
  }
}

export function CompareArtwork({ tone }: { tone: 'before' | 'after' }) {
  return (
    <div className={`compare-art compare-art-${tone}`} aria-hidden="true">
      <span className="compare-blur compare-blur-a" />
      <span className="compare-blur compare-blur-b" />
      <span className="compare-line compare-line-a" />
      <span className="compare-line compare-line-b" />
      <span className="compare-grain" />
    </div>
  )
}
