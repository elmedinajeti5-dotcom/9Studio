import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
}

function Reveal({ children, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    const bounds = node.getBoundingClientRect()

    if (bounds.top < window.innerHeight * 0.92) {
      const frame = window.requestAnimationFrame(() => {
        setVisible(true)
      })

      return () => window.cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -60px 0px',
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`reveal${visible ? ' reveal-visible' : ''}${className ? ` ${className}` : ''}`}
      ref={ref}
    >
      {children}
    </div>
  )
}

export default Reveal
