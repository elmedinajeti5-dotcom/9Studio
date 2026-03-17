import { useState } from 'react'
import { ArrowIcon } from './StudioVisuals'

const projectTypes = ['Brand Identity', 'Product Design', 'Full-Stack Build', 'Launch Campaign']
const timelines = ['4-6 weeks', '6-10 weeks', '10-16 weeks', 'Ongoing retainer']
const serviceChoices = [
  'Graphic Design',
  'UI / UX Design',
  'Brand Identity',
  'Full-Stack Development',
  'SEO Strategy',
  'Marketing Campaigns',
  'Motion Design',
]

type GuidedContactFormProps = {
  compact?: boolean
}

function GuidedContactForm({ compact = false }: GuidedContactFormProps) {
  const [projectType, setProjectType] = useState(projectTypes[1])
  const [timeline, setTimeline] = useState(timelines[1])
  const [selectedServices, setSelectedServices] = useState<string[]>(['UI / UX Design', 'Full-Stack Development'])
  const [submitted, setSubmitted] = useState(false)

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    )
  }

  return (
    <div className={`guided-contact${compact ? ' guided-contact-compact' : ''}`}>
      <div className="guided-grid">
        <div className="guided-pane">
          <p className="eyebrow">Project Type</p>
          <div className="guided-options">
            {projectTypes.map((option) => (
              <button
                className={`guided-chip${projectType === option ? ' guided-chip-active' : ''}`}
                key={option}
                onClick={() => setProjectType(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {!compact ? (
          <div className="guided-pane">
            <p className="eyebrow">Timeline</p>
            <div className="guided-options">
              {timelines.map((option) => (
                <button
                  className={`guided-chip${timeline === option ? ' guided-chip-active' : ''}`}
                  key={option}
                  onClick={() => setTimeline(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="guided-pane">
          <p className="eyebrow">Services Needed</p>
          <div className="guided-options">
            {serviceChoices.map((option) => (
              <button
                className={`guided-chip${selectedServices.includes(option) ? ' guided-chip-active' : ''}`}
                key={option}
                onClick={() => toggleService(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form
        className="connect-form guided-form"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
        }}
      >
        <label className="form-field">
          <span>Name</span>
          <input name="name" placeholder="Your name" type="text" />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input name="email" placeholder="you@company.com" type="email" />
        </label>

        <label className="form-field">
          <span>Project details / brief</span>
          <textarea
            name="brief"
            placeholder={
              compact
                ? `We’re exploring a ${projectType.toLowerCase()} engagement and need a clearer creative partner.`
                : `We’re exploring a ${projectType.toLowerCase()} engagement with a ${timeline.toLowerCase()} timeline.`
            }
            rows={3}
          />
        </label>

        <div className="guided-summary">
          <p>
            <span>Type</span>
            <strong>{projectType}</strong>
          </p>
          <p>
            <span>Timeline</span>
            <strong>{compact ? 'Flexible' : timeline}</strong>
          </p>
          <p>
            <span>Services</span>
            <strong>{selectedServices.join(', ')}</strong>
          </p>
        </div>

        <div className="connect-submit-wrap">
          <button className="connect-submit glass-button" type="submit">
            <span>{submitted ? 'Request received' : 'Start a project conversation'}</span>
            <span className="connect-submit-disc">
              <ArrowIcon />
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default GuidedContactForm
