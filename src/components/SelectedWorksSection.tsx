import { PlusIcon } from './Icons'

export function SelectedWorksSection() {
  return (
    <section className="px-1 sm:px-0">
      <h2 className="text-[clamp(1.9rem,6vw,2.7rem)] font-light tracking-[-0.06em] text-ink min-[640px]:text-[clamp(2.35rem,4.5vw,3.7rem)]">
        Selected Works
      </h2>
      <p className="mt-2 max-w-[430px] text-[9px] leading-[1.45] text-white/42 min-[480px]:text-[10px] min-[640px]:text-[12px] min-[640px]:leading-[1.5]">
        A selection of work across product systems, launch campaigns, and
        high-clarity digital experiences for ambitious brands.
      </p>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_52px_52px] gap-2 min-[480px]:mt-6 min-[480px]:grid-cols-[minmax(0,1fr)_60px_60px] min-[640px]:gap-3 min-[820px]:grid-cols-[minmax(0,1fr)_88px_88px]">
        <FeaturedWorkCard />
        <VerticalFeaturePanel title="Design" />
        <VerticalFeaturePanel title="Engineering" />
      </div>
    </section>
  )
}

function FeaturedWorkCard() {
  return (
    <article className="overflow-hidden border border-white/[0.06] bg-[#101010] p-2 min-[480px]:p-3 min-[640px]:p-4">
      <div className="relative min-h-[338px] overflow-hidden bg-[#ecebe7] min-[480px]:min-h-[420px] min-[640px]:min-h-[500px]">
        <SelectedWorkVisual />

        <div className="absolute bottom-[6%] right-[4.5%] w-[118px] bg-[#e6e3dc]/92 px-2.5 py-2.5 backdrop-blur-sm min-[480px]:right-[6%] min-[480px]:w-[160px] min-[480px]:px-3 min-[480px]:py-3 min-[640px]:w-[220px] min-[640px]:px-4 min-[640px]:py-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-black/58">
            Marketing
          </p>
          <p className="mt-1.5 text-[8px] leading-[1.38] tracking-[-0.01em] text-black/60 min-[480px]:text-[9px] min-[640px]:mt-2 min-[640px]:text-[12px] min-[640px]:leading-[1.55]">
            Tailored campaign architecture with a product-first visual system and
            editorial pacing built for modern launches.
          </p>
        </div>
      </div>
    </article>
  )
}

function SelectedWorkVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_42%,rgba(255,255,255,0.18),transparent_48%)]" />
      <div className="absolute -left-[20%] bottom-[-20%] h-[112%] w-[78%] rounded-full bg-[radial-gradient(circle_at_68%_38%,rgba(0,0,0,1)_0%,rgba(0,0,0,0.99)_30%,rgba(0,0,0,0.95)_42%,rgba(0,0,0,0.28)_62%,transparent_79%)]" />
      <div className="absolute right-[-11%] top-[-7%] h-[76%] w-[58%] rounded-full bg-[radial-gradient(circle_at_28%_70%,rgba(0,0,0,1)_0%,rgba(0,0,0,0.99)_32%,rgba(0,0,0,0.93)_42%,rgba(0,0,0,0.26)_62%,transparent_80%)]" />
      <div className="absolute left-[33%] top-[43%] h-[20%] w-[24%] rounded-full bg-[radial-gradient(circle_at_50%_48%,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.84)_32%,rgba(0,0,0,0.12)_70%,transparent_84%)] blur-[2px]" />
      <div className="absolute left-[44%] top-[56%] h-[8%] w-[14%] rounded-full bg-[#efefeb]" />
      <div className="absolute -left-[7%] top-[4%] h-[38%] w-[18%] rotate-[14deg] rounded-full bg-[radial-gradient(circle_at_70%_46%,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.42)_38%,transparent_74%)] blur-[3px]" />
      <div className="absolute right-[20%] top-[-16%] h-[54%] w-[18%] rotate-[-14deg] rounded-full bg-[radial-gradient(circle_at_42%_56%,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.4)_42%,transparent_74%)] blur-[3px]" />
      <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.85)_0.7px,transparent_0.9px)] [background-size:4px_4px]" />
    </div>
  )
}

export function VerticalFeaturePanel({ title }: { title: string }) {
  return (
    <article className="flex min-h-[338px] flex-col items-center justify-between border border-white/[0.06] bg-[#111111] px-1 py-3 min-[480px]:min-h-[420px] min-[640px]:px-2 min-[640px]:py-4 min-[820px]:min-h-[532px] min-[820px]:px-3 min-[820px]:py-5">
      <span className="text-white/84">
        <PlusIcon className="h-4 w-4" />
      </span>
      <h3 className="mb-2 text-[20px] font-light tracking-[-0.05em] text-ink min-[480px]:text-[24px] min-[820px]:text-[35px] min-[820px]:leading-none">
        <span className="[writing-mode:vertical-rl] rotate-180">{title}</span>
      </h3>
    </article>
  )
}
