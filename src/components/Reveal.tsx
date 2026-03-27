import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type RevealProps = {
  children: ReactNode
  className?: string
}

function Reveal({ children, className = '' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const combinedClassName = `reveal${className ? ` ${className}` : ''}`

  if (reduceMotion) {
    return <div className={combinedClassName}>{children}</div>
  }

  return (
    <motion.div
      className={combinedClassName}
      initial={{ opacity: 0, y: 42 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -80px 0px' }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
