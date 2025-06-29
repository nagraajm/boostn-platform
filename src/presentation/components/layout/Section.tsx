'use client'

import { cn } from '@/shared/utils/cn'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('relative', className)}>
      {children}
    </section>
  )
}
