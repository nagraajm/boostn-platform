'use client'

import { useEffect } from 'react'
import { setupDI } from '@/infrastructure/di/setup'

export function DIProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('Setting up DI container...');
    setupDI()
    console.log('DI container setup complete');
  }, [])

  return <>{children}</>
}
