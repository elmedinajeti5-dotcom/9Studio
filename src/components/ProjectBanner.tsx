import { ArrowRightIcon } from './Icons'

export function ProjectBanner() {
  return (
    <section className="px-1 sm:px-0">
      <div className="relative isolate overflow-hidden bg-[#1a1a1a] px-5 py-12 text-center min-[480px]:px-6 min-[480px]:py-14 min-[640px]:px-8 min-[640px]:py-16 lg:py-20">
        <BannerVisual />
        <div className="absolute inset-0 bg-black/18" />

        <div className="relative z-10 mx-auto max-w-[420px]">
          <p className="text-[10px] uppercase tracking-[0.26em] text-white/55">
            Project
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,5.8vw,2.65rem)] font-light uppercase tracking-[-0.055em] text-ink min-[640px]:mt-4 min-[640px]:text-[clamp(2rem,4vw,3.35rem)]">
            TAYLORMADE
          </h2>
          <p className="mt-2 text-[8px] uppercase tracking-[0.18em] text-white/48 min-[480px]:text-[9px] min-[640px]:text-[10px] min-[640px]:tracking-[0.22em]">
            Product Design, UX Motion
          </p>

          <a
            className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-black transition duration-300 hover:bg-white/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-shell min-[480px]:px-4 min-[480px]:py-2 min-[480px]:text-[9px] min-[640px]:mt-6 min-[640px]:text-[11px] min-[640px]:tracking-[0.22em]"
            href="#contact"
          >
            <span>View case</span>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-black text-white min-[480px]:h-5 min-[480px]:w-5">
              <ArrowRightIcon className="h-2.5 w-2.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

function BannerVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 opacity-95">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#9c9c9c_0%,#d6d6d2_32%,#8a8a8a_60%,#dadad6_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.34),transparent_52%)]" />
      <div className="absolute left-[6%] top-[-50%] h-[175%] w-[14%] rotate-[18deg] rounded-full bg-[radial-gradient(circle_at_44%_42%,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.85)_18%,rgba(0,0,0,0.48)_40%,transparent_73%)] blur-[4px]" />
      <div className="absolute left-[41%] top-[-42%] h-[165%] w-[13%] rotate-[-12deg] rounded-full bg-[radial-gradient(circle_at_46%_45%,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.82)_18%,rgba(0,0,0,0.36)_40%,transparent_74%)] blur-[4px]" />
      <div className="absolute right-[10%] top-[-40%] h-[180%] w-[18%] rotate-[12deg] rounded-full bg-[radial-gradient(circle_at_40%_44%,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.87)_18%,rgba(0,0,0,0.44)_44%,transparent_74%)] blur-[5px]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.86)_0.7px,transparent_0.9px)] [background-size:4px_4px]" />
    </div>
  )
}
