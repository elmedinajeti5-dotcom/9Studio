export function ManifestoBlock() {
  return (
    <section className="px-1 pt-1 sm:px-0">
      <p className="max-w-[1010px] text-[clamp(2rem,7vw,3.1rem)] font-light leading-[1.03] tracking-[-0.065em] text-ink min-[640px]:text-[clamp(2.45rem,5.3vw,4.35rem)]">
        Building something that is bigger than ourselves and to create tools and
        products that will have a global impact, for good.
      </p>

      <a
        className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/52 transition duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-shell"
        href="#about"
      >
        <span>Next About us</span>
        <span className="inline-block h-3.5 w-3.5 rounded-[4px] border border-white/30 bg-white/8" />
      </a>
    </section>
  )
}
