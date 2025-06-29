'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Heart, Gift, Users, Zap } from 'lucide-react'
import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { useDonationViewModel } from '@/presentation/viewmodels/useDonationViewModel'

const quickAmounts = [25, 50, 100, 250]

export function DonationSection() {
  const [localCustomAmount, setLocalCustomAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const { processDonation, isProcessing, error, success, setCustomAmount } = useDonationViewModel()

  const handleQuickDonation = async (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount(amount.toString())
    
    const success = await processDonation({
      donorName: 'Anonymous Supporter',
      email: 'anonymous@example.com',
      paymentMethod: 'CREDIT_CARD',
      isAnonymous: true
    })

    if (success) {
      setSelectedAmount(null)
      setLocalCustomAmount('')
      setCustomAmount('')
    }
  }

  const handleCustomDonation = async () => {
    const amount = parseFloat(localCustomAmount)
    if (isNaN(amount) || amount <= 0) return

    setSelectedAmount(amount)
    setCustomAmount(localCustomAmount)
    
    const success = await processDonation({
      donorName: 'Anonymous Supporter',
      email: 'anonymous@example.com',
      paymentMethod: 'CREDIT_CARD',
      isAnonymous: true
    })

    if (success) {
      setSelectedAmount(null)
      setLocalCustomAmount('')
      setCustomAmount('')
    }
  }

  return (
    <Section id="donate" className="py-20 relative">
      <div className="absolute inset-0 bg-black/10"></div>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl font-bold text-white text-shadow mb-4">
            Support Our Club
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto text-shadow">
            Make a direct donation to support EHC Koenigsbrunn's activities, 
            equipment, and youth programs. Every contribution makes a difference!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
          {/* Quick Donation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-shadow">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Quick Donation
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Make a fast donation with one click
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => handleQuickDonation(amount)}
                      disabled={isProcessing && selectedAmount === amount}
                      className="h-12 text-lg font-semibold glass-button text-white"
                    >
                      {isProcessing && selectedAmount === amount ? (
                        <div className="spinner" />
                      ) : (
                        `€${amount}`
                      )}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="custom-amount" className="text-white text-shadow">Custom Amount (€)</Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter amount"
                      min="1"
                      value={localCustomAmount}
                      onChange={(e) => setLocalCustomAmount(e.target.value)}
                      className="glass-card text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleCustomDonation}
                      disabled={!localCustomAmount || isProcessing}
                      className="h-11 glass-button"
                    >
                      {isProcessing && selectedAmount === parseFloat(localCustomAmount || '0') ? (
                        <div className="spinner" />
                      ) : (
                        'Donate'
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="text-red-300 text-sm bg-red-500/20 p-3 rounded-lg">{error}</div>
                )}

                {success && (
                  <div className="text-green-300 text-sm bg-green-500/20 p-3 rounded-lg">
                    Thank you for your donation! 🎉
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Impact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-shadow">
                  <Heart className="h-5 w-5 text-red-400" />
                  Your Impact
                </CardTitle>
                <CardDescription className="text-gray-300">
                  See how your donation helps our club
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Gift className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-white text-shadow">€25 - Training Equipment</h4>
                    <p className="text-sm text-gray-300">
                      Helps purchase training cones, pucks, and practice gear
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-white text-shadow">€50 - Youth Program</h4>
                    <p className="text-sm text-gray-300">
                      Supports our youth development and coaching programs
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-white text-shadow">€100 - Team Support</h4>
                    <p className="text-sm text-gray-300">
                      Covers team meals, transportation, and tournament fees
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-white text-shadow">€250 - Facility Improvement</h4>
                    <p className="text-sm text-gray-300">
                      Contributes to rink maintenance and facility upgrades
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button variant="outline" size="lg" className="glass-button text-white">
                Become a Monthly Supporter
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
