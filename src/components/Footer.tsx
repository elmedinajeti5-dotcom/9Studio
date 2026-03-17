const footerLinks = [
  'Home',
  'Agency',
  'Locations',
  'Projects',
  '9Studio Dev',
  'Blog',
  'Contact',
]

export function Footer() {
  return (
    <footer className="mt-10 px-1 pb-3 pt-8 sm:px-0 sm:pt-10 lg:mt-14 lg:pb-1">
      <div className="grid grid-cols-[minmax(0,1fr)_100px] items-end gap-4 min-[480px]:grid-cols-[minmax(0,1fr)_122px] min-[640px]:gap-8 min-[820px]:grid-cols-[minmax(0,1fr)_160px] lg:gap-12">
        <div className="max-w-[720px]">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/45 min-[480px]:text-[9px] min-[640px]:text-[10px] min-[640px]:tracking-[0.28em]">
            Get in touch
          </p>
          <a
            className="mt-3 block text-[clamp(1.85rem,6vw,2.6rem)] font-light uppercase tracking-[-0.06em] text-ink transition duration-300 hover:text-white/82 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-shell min-[640px]:mt-4 min-[640px]:text-[clamp(2.15rem,4.3vw,3.5rem)]"
            href="mailto:hello@9studio.studio"
          >
            HELLO@9STUDIO.STUDIO
          </a>
          <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-white/38 min-[480px]:text-[9px] min-[640px]:mt-3 min-[640px]:text-[11px] min-[640px]:tracking-[0.18em]">
            23 Mercer St, New York, NY
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid max-w-[260px] grid-cols-2 gap-x-3 gap-y-2 text-[7px] uppercase tracking-[0.14em] text-white/48 min-[480px]:gap-x-5 min-[480px]:text-[8px] min-[640px]:gap-x-8 min-[640px]:gap-y-3 min-[640px]:text-[10px] min-[820px]:gap-x-10 min-[820px]:text-[11px] min-[820px]:tracking-[0.18em]"
        >
          {footerLinks.map((link) => (
            <a
              className="transition duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-shell"
              href="#"
              key={link}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
