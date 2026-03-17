import { PlusIcon, SparkFillIcon, SparkOutlineIcon } from './Icons'

const tags = [
  'SaaS',
  'eCommerce',
  'Cloud Computing',
  'AI Solutions',
  'Blockchain Technology',
  'Mobile Apps',
  'Data Analytics',
  'Cybersecurity Services',
  'Remote Work Tools',
]

export function HeroCard() {
  return (
    <section className="overflow-hidden rounded-[28px] bg-hero text-black shadow-[0_16px_44px_rgba(0,0,0,0.18)]">
      <div className="relative min-h-[270px] px-5 pb-5 pt-5 min-[480px]:min-h-[380px] min-[480px]:px-6 min-[480px]:pb-6 min-[480px]:pt-6 min-[640px]:min-h-[455px] min-[640px]:px-8 min-[640px]:pb-8 min-[640px]:pt-7 lg:min-h-[560px] lg:px-8 lg:pb-7">
        <HeroInkVisual />

        <div className="relative z-10 flex h-full max-w-[208px] flex-col min-[480px]:max-w-[278px] min-[640px]:max-w-[430px]">
          <div>
            <p className="sr-only">9Studio hero section</p>
            <h1
              aria-label="9Studio"
              className="text-[clamp(3.2rem,11.5vw,4.95rem)] font-light leading-[0.9] tracking-[-0.082em] text-[#111111] min-[640px]:text-[clamp(4rem,8vw,6.4rem)]"
            >
              9
              <br />
              Studio
            </h1>

            <div className="mt-4 flex items-center gap-3 text-black min-[640px]:mt-5 min-[640px]:gap-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white min-[480px]:h-10 min-[480px]:w-10 min-[640px]:h-12 min-[640px]:w-12">
                <SparkFillIcon className="h-4 w-4 min-[480px]:h-5 min-[480px]:w-5 min-[640px]:h-6 min-[640px]:w-6" />
              </span>
              <PlusIcon className="h-6 w-6 min-[480px]:h-7 min-[480px]:w-7 min-[640px]:h-8 min-[640px]:w-8" />
            </div>
          </div>

          <div className="mt-10 min-[480px]:mt-14 min-[640px]:mt-auto">
            <p className="text-[10px] uppercase tracking-[0.22em] text-black/45">
              What we do
            </p>

            <div className="mt-3 flex max-w-[242px] flex-wrap gap-1.5 min-[480px]:max-w-[262px] min-[640px]:mt-4 min-[640px]:max-w-[360px] min-[640px]:gap-2">
              {tags.map((tag) => (
                <TagChip key={tag}>{tag}</TagChip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type TagChipProps = {
  children: string
}

export function TagChip({ children }: TagChipProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-black/28 px-2.5 py-[3px] text-[8px] tracking-[-0.02em] text-black/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] min-[480px]:gap-1.5 min-[480px]:px-3 min-[480px]:py-1 min-[480px]:text-[9px] min-[640px]:text-[11px]">
      <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-black text-white min-[640px]:h-3.5 min-[640px]:w-3.5">
        <SparkOutlineIcon className="h-2 w-2" />
      </span>
      {children}
    </span>
  )
}

function HeroInkVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 left-[28%] overflow-hidden min-[480px]:left-[31%] min-[640px]:left-[34%]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_32%,rgba(255,255,255,0.44),transparent_40%)]" />
      <div className="absolute inset-0 opacity-95">
        <div className="absolute right-[18%] top-[-34%] h-[128%] w-[17%] rotate-[21deg] rounded-full bg-[radial-gradient(circle_at_44%_42%,rgba(18,18,18,1)_0%,rgba(18,18,18,0.99)_16%,rgba(18,18,18,0.94)_30%,rgba(18,18,18,0.38)_55%,transparent_78%)] blur-[1.5px] min-[640px]:w-[14%]" />
        <div className="absolute right-[42%] top-[-20%] h-[100%] w-[15%] rotate-[-8deg] rounded-full bg-[radial-gradient(circle_at_48%_46%,rgba(15,15,15,1)_0%,rgba(15,15,15,0.98)_18%,rgba(15,15,15,0.92)_30%,rgba(15,15,15,0.26)_58%,transparent_80%)] blur-[1.5px] min-[640px]:right-[39%]" />
        <div className="absolute right-[-2%] bottom-[-26%] h-[98%] w-[24%] rotate-[24deg] rounded-full bg-[radial-gradient(circle_at_40%_38%,rgba(16,16,16,1)_0%,rgba(16,16,16,0.98)_18%,rgba(16,16,16,0.9)_29%,rgba(16,16,16,0.3)_56%,transparent_78%)] blur-[2px] min-[640px]:w-[20%]" />
        <div className="absolute right-[9%] top-[26%] h-[28%] w-[32%] rounded-full bg-[radial-gradient(circle_at_40%_50%,rgba(17,17,17,0.92)_0%,rgba(17,17,17,0.74)_22%,rgba(17,17,17,0.2)_62%,transparent_80%)] blur-[9px]" />
        <div className="absolute right-[17%] top-[17%] h-[44%] w-[18%] rotate-[14deg] rounded-full bg-[radial-gradient(circle_at_48%_50%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.04)_40%,transparent_72%)] blur-[1px]" />
        <div className="absolute right-[4%] bottom-[2%] h-[40%] w-[32%] bg-[radial-gradient(circle_at_76%_44%,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.08)_30%,transparent_68%)]" />
      </div>
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0.65px,transparent_0.85px)] [background-size:4px_4px]" />
    </div>
  )
}
