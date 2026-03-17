import { PillButton } from './PillButton'

const navItems = ['About', 'Space', 'Locations', 'Contact']

export function Header() {
  return (
    <header className="grid grid-cols-[auto_1fr_auto] items-center gap-2 px-1 py-1.5 min-[480px]:gap-3 sm:px-0">
      <a
        className="text-[8px] uppercase tracking-[0.24em] text-white/92 transition duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-shell min-[480px]:text-[9px] min-[640px]:text-[11px]"
        href="#top"
      >
        9Studio
      </a>

      <nav
        aria-label="Primary"
        className="flex items-center justify-center gap-2 justify-self-center min-[480px]:gap-3 min-[640px]:gap-6"
      >
        {navItems.map((item) => (
          <NavLink href={item === 'About' ? '#about' : item === 'Contact' ? '#contact' : '#'} key={item}>
            {item}
          </NavLink>
        ))}
      </nav>

      <div className="justify-self-end">
        <PillButton href="#contact">Book a Call</PillButton>
      </div>
    </header>
  )
}

type NavLinkProps = {
  children: string
  href: string
}

export function NavLink({ children, href }: NavLinkProps) {
  return (
    <a
      className="text-[7px] uppercase tracking-[0.2em] text-white/68 transition duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-shell min-[480px]:text-[8px] min-[640px]:text-[11px] min-[640px]:tracking-[0.24em]"
      href={href}
    >
      {children}
    </a>
  )
}
