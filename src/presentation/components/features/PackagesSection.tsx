'use client'

import { motion } from 'framer-motion'
import { usePackageViewModel } from '@/presentation/viewmodels/usePackageViewModel'
import { PackageCard } from './PackageCard'
import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'

export function PackagesSection() {
  const { packages, loading, error, selectPackage } = usePackageViewModel()

  if (loading) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <div className="glass-card p-8 inline-block">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-white text-shadow">Loading sponsorship packages...</p>
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  if (error) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <div className="glass-card p-8 border-red-400/30">
              <p className="text-red-300">Error loading packages: {error}</p>
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section id="packages" className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white text-shadow mb-4">
            Sponsorship Packages
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto text-shadow">
            Choose the perfect sponsorship package to support EHC Königsberg 
            and gain valuable exposure for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg: any, index: number) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PackageCard
                package={pkg}
                isPopular={index === 1} // Make middle package popular
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="glass-card p-6 inline-block">
            <p className="text-gray-200 mb-4">
              Looking for a custom sponsorship solution?
            </p>
            <button className="glass-button px-6 py-3 rounded-lg text-white hover:bg-white/20 transition-all font-medium">
              Contact us for personalized packages
            </button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
