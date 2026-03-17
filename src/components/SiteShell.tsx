import type { ReactNode } from 'react'

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div
      className="mx-auto max-w-[1120px] bg-shell px-[10px] py-[10px] shadow-shell min-[480px]:px-[12px] min-[480px]:py-[12px] min-[640px]:px-5 min-[640px]:py-5 lg:px-6 lg:py-5"
      id="top"
    >
      {children}
    </div>
  )
}
