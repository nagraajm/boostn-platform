'use client'

import { useState } from 'react'
import { DIContainer } from '@/infrastructure/di/container'
import { PackageRepository } from '@/domain/repositories/package.repository'

export default function TestPage() {
  const [result, setResult] = useState<string>('')

  const testDI = async () => {
    try {
      console.log('Testing DI container...')
      const container = DIContainer.getInstance()
      console.log('Container instance:', container)
      
      const packageRepo = container.resolve<PackageRepository>('PackageRepository')
      console.log('PackageRepository resolved:', packageRepo)
      
      const packages = await packageRepo.findByClubId('ehc-koenigsberg')
      console.log('Packages found:', packages)
      
      setResult(`Success! Found ${packages.length} packages`)
    } catch (error) {
      console.error('Test failed:', error)
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">DI Container Test</h1>
      <button 
        onClick={testDI}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test Package Loading
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <strong>Result:</strong> {result || 'Click the button to test'}
      </div>
    </div>
  )
}
