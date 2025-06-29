'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, User, Mail, Phone, Building } from 'lucide-react'
import { Package } from '@/domain/entities/package.entity'
import { usePackageViewModel } from '@/presentation/viewmodels/usePackageViewModel'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Utils } from '@/shared/utils'

interface PackagePurchaseFormProps {
  package: Package | null
  isOpen: boolean
  onClose: () => void
}

export function PackagePurchaseForm({ package: pkg, isOpen, onClose }: PackagePurchaseFormProps) {
  const { purchasePackage, isProcessing, error, success } = usePackageViewModel()
  const [formData, setFormData] = useState({
    businessName: '',
    contactPersonName: '',
    email: '',
    phone: '',
    companyRegistration: '',
    paymentMethod: 'CREDIT_CARD' as const,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!pkg) return

    const success = await purchasePackage(formData)
    
    if (success) {
      setTimeout(() => {
        onClose()
        setFormData({
          businessName: '',
          contactPersonName: '',
          email: '',
          phone: '',
          companyRegistration: '',
          paymentMethod: 'CREDIT_CARD',
        })
      }, 2000)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!pkg) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Your Sponsorship" size="lg">
      <div className="space-y-6">
        {/* Package Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{pkg.name}</CardTitle>
            <CardDescription>
              {Utils.formatCurrency(pkg.price.amount, pkg.price.currency)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-300">
              <p className="mb-2">{pkg.description}</p>
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">Tier:</span> {pkg.tier}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">
                <Building className="inline h-4 w-4 mr-2" />
                Business Name *
              </Label>
              <Input
                id="businessName"
                required
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPersonName">
                <User className="inline h-4 w-4 mr-2" />
                Contact Person *
              </Label>
              <Input
                id="contactPersonName"
                required
                value={formData.contactPersonName}
                onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                placeholder="Your full name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline h-4 w-4 mr-2" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="inline h-4 w-4 mr-2" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+49 123 456789"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyRegistration">
              Company Registration (Optional)
            </Label>
            <Input
              id="companyRegistration"
              value={formData.companyRegistration}
              onChange={(e) => handleInputChange('companyRegistration', e.target.value)}
              placeholder="DE123456789"
            />
          </div>

          <div className="space-y-2">
            <Label>
              <CreditCard className="inline h-4 w-4 mr-2" />
              Payment Method
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {['CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => handleInputChange('paymentMethod', method)}
                  className={`p-3 text-sm border rounded-lg transition-colors ${
                    formData.paymentMethod === method
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {method.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg"
            >
              🎉 Sponsorship purchased successfully! Thank you for supporting EHC Koenigsbrunn.
            </motion.div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isProcessing || !formData.businessName || !formData.contactPersonName || !formData.email}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                `Purchase for ${Utils.formatCurrency(pkg.price.amount, pkg.price.currency)}`
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
