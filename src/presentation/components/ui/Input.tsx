'use client'

import { cn } from '@/shared/utils/cn'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <motion.input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border border-white/20 glass-card px-3 py-2 text-sm text-white placeholder:text-gray-400 focus-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...(props as any)}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
