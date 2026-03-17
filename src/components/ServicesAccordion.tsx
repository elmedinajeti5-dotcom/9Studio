import { useState } from 'react'
import { MinusIcon, PlusIcon } from './Icons'

type ServiceKey = 'marketing' | 'web-development' | 'motion-graphics'

const services = [
  {
    key: 'marketing' as const,
    index: '[01]',
    title: 'Marketing',
    body:
      'Editorial campaign systems, launch direction, and narrative design tuned for emerging digital products and sharp category positioning.',
  },
  {
    key: 'web-development' as const,
    index: '[02]',
    title: 'Web Development',
    body:
      'Fast, polished front-end systems built with a close eye on performance, motion, and implementation detail.',
  },
  {
    key: 'motion-graphics' as const,
    index: '[03]',
    title: 'Motion Graphics',
    body:
      'Refined motion language that helps interfaces, launches, and campaigns feel confident without becoming loud.',
  },
]

export function ServicesAccordion() {
  const [activeService, setActiveService] = useState<ServiceKey>('marketing')

  return (
    <section className="px-1 sm:px-0">
      <h2 className="text-[clamp(1.9rem,6vw,2.7rem)] font-light tracking-[-0.06em] text-ink min-[640px]:text-[clamp(2.35rem,4.5vw,3.7rem)]">
        Services
      </h2>
      <p className="mt-2 max-w-[430px] text-[9px] leading-[1.45] text-white/42 min-[480px]:text-[10px] min-[640px]:text-[12px] min-[640px]:leading-[1.5]">
        Structure, strategy, and production shaped into a minimal operating
        rhythm for modern digital brands.
      </p>

      <div className="mt-5 space-y-[1px] min-[480px]:mt-6">
        {services.map((service) => (
          <ServiceRow
            active={service.key === activeService}
            body={service.body}
            index={service.index}
            key={service.key}
            onToggle={() => setActiveService(service.key)}
            title={service.title}
          />
        ))}
      </div>
    </section>
  )
}

type ServiceRowProps = {
  active: boolean
  index: string
  title: string
  body: string
  onToggle: () => void
}

export function ServiceRow({
  active,
  index,
  title,
  body,
  onToggle,
}: ServiceRowProps) {
  return (
    <div
      className={`overflow-hidden border border-white/[0.06] transition-colors duration-500 ${
        active ? 'bg-[#4a4a4a]' : 'bg-[#0d0d0d]'
      }`}
    >
      <button
        aria-expanded={active}
        className="flex w-full items-center gap-2 px-3 py-5 text-left transition duration-300 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset min-[480px]:gap-3 min-[480px]:px-4 min-[480px]:py-5 min-[640px]:gap-4 min-[640px]:px-5 min-[640px]:py-6"
        onClick={onToggle}
        type="button"
      >
        <span className="w-7 text-[7px] uppercase tracking-[0.18em] text-white/44 min-[480px]:w-8 min-[480px]:text-[8px] min-[640px]:w-10 min-[640px]:text-[10px]">
          {index}
        </span>
        <span className="flex-1 text-[clamp(1.2rem,4.3vw,1.7rem)] font-light tracking-[-0.05em] text-ink min-[640px]:text-[clamp(1.7rem,3vw,2.2rem)]">
          {title}
        </span>
        <span className="text-white/70">
          {active ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ease-out ${
          active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_148px] gap-3 px-3 pb-5 min-[480px]:grid-cols-[minmax(0,1fr)_186px] min-[480px]:gap-5 min-[480px]:px-4 min-[480px]:pb-6 min-[640px]:grid-cols-[0.9fr_1.1fr] min-[640px]:gap-8 min-[640px]:px-5 lg:items-end">
            <p className="max-w-[360px] pl-7 text-[8px] leading-[1.45] text-white/74 min-[480px]:pl-8 min-[480px]:text-[9px] min-[640px]:pl-10 min-[640px]:text-[12px] min-[640px]:leading-[1.55]">
              {body}
            </p>

            <div className="relative min-h-[132px] overflow-hidden bg-transparent min-[480px]:min-h-[160px] min-[640px]:min-h-[200px]">
              <ChromeClusterVisual />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChromeClusterVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 scale-[1.14] origin-center min-[640px]:scale-100">
      <div className="absolute right-[8%] top-[12%] h-[72px] w-[72px] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,1)_0%,rgba(210,210,214,0.95)_18%,rgba(110,110,116,0.88)_42%,rgba(28,28,32,0.8)_68%,transparent_77%)] blur-[0.2px]" />
      <div className="absolute right-[24%] top-[18%] h-[88px] w-[88px] rounded-full bg-[radial-gradient(circle_at_33%_32%,rgba(255,255,255,1)_0%,rgba(214,214,218,0.96)_18%,rgba(113,113,120,0.88)_42%,rgba(26,26,29,0.82)_68%,transparent_77%)]" />
      <div className="absolute right-[36%] top-[40%] h-[68px] w-[68px] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,1)_0%,rgba(212,212,216,0.96)_20%,rgba(112,112,117,0.9)_44%,rgba(23,23,27,0.8)_70%,transparent_79%)]" />
      <div className="absolute right-[18%] top-[58%] h-[90px] w-[90px] rounded-full bg-[radial-gradient(circle_at_34%_34%,rgba(255,255,255,1)_0%,rgba(214,214,218,0.95)_18%,rgba(111,111,118,0.86)_42%,rgba(24,24,28,0.8)_68%,transparent_77%)]" />
      <div className="absolute right-[2%] top-[46%] h-[86px] w-[86px] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,1)_0%,rgba(216,216,220,0.95)_18%,rgba(115,115,120,0.87)_42%,rgba(24,24,29,0.78)_68%,transparent_77%)]" />
      <div className="absolute right-[31%] top-[30%] h-16 w-9 rotate-[-22deg] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(126,126,131,0.88)_45%,rgba(26,26,29,0.8)_74%,transparent)] blur-[0.5px]" />
      <div className="absolute right-[17%] top-[28%] h-[82px] w-10 rotate-[20deg] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(126,126,131,0.9)_45%,rgba(26,26,29,0.78)_74%,transparent)] blur-[0.5px]" />
      <div className="absolute right-[22%] top-[56%] h-[74px] w-10 rotate-[14deg] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(126,126,131,0.9)_45%,rgba(26,26,29,0.78)_74%,transparent)] blur-[0.5px]" />
    </div>
  )
}
