import type { ReactNode } from 'react'

type PillButtonProps = {
  children: ReactNode
  href: string
  variant?: 'light' | 'ghost'
}

export function PillButton({
  children,
  href,
  variant = 'light',
}: PillButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[7px] uppercase tracking-[0.2em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-shell min-[480px]:px-3.5 min-[480px]:py-1.5 min-[480px]:text-[8px] min-[640px]:px-4 min-[640px]:py-2 min-[640px]:text-[11px] min-[640px]:tracking-[0.22em]'
  const variantClasses =
    variant === 'light'
      ? 'bg-white text-black hover:bg-white/88'
      : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'

  return (
    <a className={`${baseClasses} ${variantClasses}`} href={href}>
      {children}
    </a>
  )
}
