import { useId, useState } from 'react'
import { CompareArtwork } from './StudioVisuals'

type BeforeAfterSliderProps = {
  beforeLabel: string
  afterLabel: string
  title: string
  description: string
}

function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  title,
  description,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(54)
  const id = useId()

  return (
    <section className="compare-block">
      <div className="compare-copy">
        <p className="eyebrow">Before / After</p>
        <h3 className="compare-title">{title}</h3>
        <p className="compare-description">{description}</p>
      </div>

      <div className="compare-stage">
        <div className="compare-surface">
          <div className="compare-side compare-side-base">
            <CompareArtwork tone="before" />
            <div className="compare-caption">
              <span>{beforeLabel}</span>
            </div>
          </div>

          <div
            className="compare-side compare-side-overlay"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <CompareArtwork tone="after" />
            <div className="compare-caption">
              <span>{afterLabel}</span>
            </div>
          </div>

          <div className="compare-divider" style={{ left: `${position}%` }}>
            <span className="compare-handle" />
          </div>
        </div>

        <label className="compare-range" htmlFor={id}>
          <span>Comparison slider</span>
          <input
            id={id}
            max={100}
            min={0}
            onChange={(event) => setPosition(Number(event.target.value))}
            type="range"
            value={position}
          />
        </label>
      </div>
    </section>
  )
}

export default BeforeAfterSlider
