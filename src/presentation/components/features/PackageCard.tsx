'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { Package } from '@/domain/entities/package.entity'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Utils } from '@/shared/utils'
import { PackagePurchaseForm } from './PackagePurchaseForm'

interface PackageCardProps {
  package: Package
  onSelect?: (packageId: string) => void
  isPopular?: boolean
}

export function PackageCard({ package: pkg, onSelect, isPopular = false }: PackageCardProps) {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)

  const handleSelect = () => {
    if (onSelect) {
      onSelect(pkg.id)
    }
    setShowPurchaseForm(true)
  }
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium glow-purple">
            <Star className="h-3 w-3" />
            Most Popular
          </div>
        </div>
      )}
      
      <Card className={`h-full transition-all duration-300 ${
        isPopular ? 'glow-purple' : 'glow'
      }`}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-white text-shadow">
            {pkg.name}
          </CardTitle>
          <CardDescription className="text-gray-300">
            {pkg.description}
          </CardDescription>
          <div className="mt-4">
            <div className="text-3xl font-bold gradient-text">
              {Utils.formatCurrency(pkg.price.amount, pkg.price.currency)}
            </div>
            <div className="text-sm text-gray-400">
              one-time payment
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 text-white text-shadow">Benefits included:</h4>
            <ul className="space-y-2">
              {pkg.benefits.map((benefit: string, index: number) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="pt-2 border-t border-white/20">
            <div className="text-sm text-gray-300">
              <span className="font-medium text-white">Tier:</span> {pkg.tier}
            </div>
            {pkg.maxSponsorships && (
              <div className="text-sm text-gray-300 mt-1">
                <span className="font-medium text-white">Available:</span> {pkg.maxSponsorships - pkg.currentSponsorships} of {pkg.maxSponsorships}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button
            className="w-full"
            variant={isPopular ? 'primary' : 'secondary'}
            onClick={handleSelect}
            disabled={!pkg.isAvailable()}
          >
            {pkg.isAvailable() ? 'Select Package' : 'Sold Out'}
          </Button>
        </CardFooter>
      </Card>
      
      <PackagePurchaseForm
        package={pkg}
        isOpen={showPurchaseForm}
        onClose={() => setShowPurchaseForm(false)}
      />
    </motion.div>
  )
}
