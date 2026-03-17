import { DividerProgressLine } from './DividerProgressLine'
import { AnalyticsIcon, DifferenceIcon, ServicesIcon, TechnologyIcon } from './Icons'

const columns = [
  {
    icon: ServicesIcon,
    label: 'SERVICES',
    title: 'Marketing',
    body:
      'Strategic campaigns, launch planning, and expressive brand systems that stay calm under pressure.',
  },
  {
    icon: TechnologyIcon,
    label: 'TECHNOLOGY',
    title: 'Reports',
    body:
      'Technical frameworks, workflows, and platform direction shaped to support ambitious digital products.',
  },
  {
    icon: DifferenceIcon,
    label: 'DIFFERENCE',
    title: 'Team',
    body:
      'An integrated studio model that lets design, motion, and engineering move with a single point of view.',
  },
  {
    icon: AnalyticsIcon,
    label: 'ANALYTICS',
    title: 'Growth',
    body:
      'Measurement and iteration focused on clarity, traction, and resilient decision making after launch.',
  },
]

export function FourColumnInfoSection() {
  return (
    <section className="px-1 sm:px-0" id="about">
      <h2 className="max-w-[270px] text-[clamp(1.95rem,6vw,2.7rem)] font-light leading-[0.98] tracking-[-0.06em] text-ink min-[640px]:max-w-[370px] min-[640px]:text-[clamp(2.45rem,4.8vw,3.85rem)]">
        About our
        <br />
        approach to work
      </h2>

      <div className="mt-8 grid grid-cols-4 gap-3 min-[640px]:mt-9 min-[640px]:gap-7">
        {columns.map(({ icon: Icon, label, title, body }) => (
          <article key={label}>
            <div className="inline-flex items-center gap-2 text-white/90">
              <span className="inline-flex h-3 w-3 items-center justify-center rounded-[3px] border border-white/24 min-[640px]:h-4 min-[640px]:w-4 min-[640px]:rounded-[4px]">
                <Icon className="h-2 w-2 min-[640px]:h-2.5 min-[640px]:w-2.5" />
              </span>
              <span className="text-[7px] uppercase tracking-[0.14em] text-white/88 min-[480px]:text-[8px] min-[640px]:text-[10px] min-[640px]:tracking-[0.22em]">
                {label}
              </span>
            </div>

            <h3 className="mt-4 text-[10px] font-light tracking-[-0.02em] text-ink min-[480px]:text-[11px] min-[640px]:mt-5 min-[640px]:text-[19px] min-[640px]:tracking-[-0.04em]">
              {title}
            </h3>
            <p className="mt-2 max-w-[250px] text-[8px] leading-[1.45] text-white/46 min-[480px]:text-[9px] min-[640px]:mt-3 min-[640px]:text-[12px] min-[640px]:leading-[1.55]">
              {body}
            </p>
          </article>
        ))}
      </div>

      <DividerProgressLine />
    </section>
  )
}
