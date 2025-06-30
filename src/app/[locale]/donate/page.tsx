'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { SocialShare } from '@/presentation/components/features/SocialShare';

export default function DonatePage() {
  const [locale, setLocale] = useState('en');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isValidAmount, setIsValidAmount] = useState<boolean>(false);
  const [step, setStep] = useState<'amount' | 'details' | 'success'>('amount');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale from pathname
    const localeFromPath = pathname.split('/')[1] || 'en';
    setLocale(localeFromPath);
  }, [pathname]);

  // Validate amount whenever selectedAmount or customAmount changes
  useEffect(() => {
    if (selectedAmount && selectedAmount > 0) {
      setIsValidAmount(true);
      setCustomAmount('');
    } else if (customAmount && parseFloat(customAmount) > 0) {
      setIsValidAmount(true);
      setSelectedAmount(null);
    } else {
      setIsValidAmount(false);
    }
  }, [selectedAmount, customAmount]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleDonateClick = () => {
    // Proceed to details page
    setStep('details');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process donation and proceed to success page
    setStep('success');
  };

  const content = {
    en: {
      title: 'Quick Donate',
      subtitle: 'Support EHC Koenigsbrunn with a quick donation',
      backToHome: 'Back to Home',
      donate: 'Donate Now',
      amount: 'Donation Amount',
      customAmount: 'Custom Amount',
      // Details page
      details: 'Your Details',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      continue: 'Continue',
      // Success page
      thankYou: 'Thank you for your support!',
      success: 'Your donation has been successfully processed.',
      receiptSent: 'A confirmation email and receipt have been sent to your email address.',
      whatNext: 'What happens next?',
      steps: [
        'Your donation will be used to support our club activities',
        'You will receive a thank you email with your donation receipt',
        'Your name will be added to our supporters list (if you agreed)',
        'You\'ll receive updates about how your donation is making a difference'
      ],
      shareSuccess: 'Share Your Support',
      shareText: 'Help us reach more supporters by sharing your contribution!'
    },
    de: {
      title: 'Schnell Spenden',
      subtitle: 'Unterstütze EHC Koenigsbrunn mit einer schnellen Spende',
      backToHome: 'Zurück zur Startseite',
      donate: 'Jetzt spenden',
      amount: 'Spendenbetrag',
      customAmount: 'Individueller Betrag',
      // Details page
      details: 'Ihre Angaben',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail-Adresse',
      continue: 'Weiter',
      // Success page
      thankYou: 'Vielen Dank für Ihre Unterstützung!',
      success: 'Ihre Spende wurde erfolgreich verarbeitet.',
      receiptSent: 'Eine Bestätigungs-E-Mail und Quittung wurden an Ihre E-Mail-Adresse gesendet.',
      whatNext: 'Was passiert als nächstes?',
      steps: [
        'Ihre Spende wird zur Unterstützung unserer Vereinsaktivitäten verwendet',
        'Sie erhalten eine Dankesmail mit Ihrer Spendenquittung',
        'Ihr Name wird in unsere Unterstützerliste aufgenommen (falls Sie zugestimmt haben)',
        'Sie erhalten Updates darüber, wie Ihre Spende einen Unterschied macht'
      ],
      shareSuccess: 'Teile deine Unterstützung',
      shareText: 'Hilf uns, mehr Unterstützer zu erreichen, indem du deinen Beitrag teilst!'
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const donationAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">EHC Koenigsbrunn</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/${locale}`)}
              >
                {t.backToHome}
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant={locale === 'en' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => router.push(`/en/donate`)}
                >
                  English
                </Button>
                <Button
                  variant={locale === 'de' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => router.push(`/de/donate`)}
                >
                  Deutsch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Donate Section */}
      <section className="pt-32 py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center mb-16">
            <div className="inline-block mb-6 p-2 bg-gray-800/50 rounded-full">
              <div className="bg-blue-800/50 rounded-full p-2">
                <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Step 1: Amount Selection */}
          {step === 'amount' && (
            <Card className="p-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-2xl shadow-xl glass-card overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/10 rounded-full filter blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-full filter blur-3xl -ml-32 -mb-32"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-3xl font-bold text-black text-center mb-2">
                  {t.amount}
                </CardTitle>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
              </CardHeader>
              
              <CardContent className="space-y-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {donationAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="lg"
                      className={`h-20 text-xl font-semibold transition-all duration-300 ${selectedAmount === amount 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0 shadow-lg scale-105' 
                        : 'bg-gray-800/80 text-gray-200 border-gray-700 hover:bg-gray-700 hover:scale-105'}`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      €{amount}
                    </Button>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-black mb-2">
                    {t.customAmount}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">€</span>
                    <input
                      type="number"
                      placeholder="Amount"
                      className="w-full px-12 py-4 bg-gray-800/80 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 text-xl"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      min="1"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    variant="primary"
                    size="lg"
                    className={`w-full py-6 text-xl font-bold text-black bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${!isValidAmount ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!isValidAmount}
                    onClick={handleDonateClick}
                  >
                    {t.donate}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Details Form */}
          {step === 'details' && (
            <Card className="p-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-2xl shadow-xl glass-card overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/10 rounded-full filter blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-full filter blur-3xl -ml-32 -mb-32"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-3xl font-bold text-black text-center mb-2">
                  {t.details}
                </CardTitle>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-lg font-medium text-black">
                        {t.firstName}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleFormChange}
                        className="w-full px-5 py-4 bg-gray-800/80 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 text-lg"
                        // placeholder="John"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-lg font-medium text-black">
                        {t.lastName}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleFormChange}
                        className="w-full px-5 py-4 bg-gray-800/80 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 text-lg"
                        // placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-lg font-medium text-black">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-5 py-4 bg-gray-800/80 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 text-lg"
                      // placeholder="john.doe@example.com"
                    />
                  </div>

                  <div className="flex justify-between pt-8">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setStep('amount')}
                      className="px-8 py-4 text-lg bg-gray-800/80 text-gray-200 border-gray-700 hover:bg-gray-700 rounded-xl transition-all duration-300"
                    >
                      ← {t.backToHome}
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      {t.continue}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Success Page */}
          {step === 'success' && (
            <Card className="p-10 bg-gradient-to-br from-gray-100/95 to-blue-50/95 border border-blue-200/30 rounded-2xl shadow-xl glass-card overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/10 rounded-full filter blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/10 rounded-full filter blur-3xl -ml-32 -mb-32"></div>
              
              <CardContent className="relative z-10">
                <div className="text-center mb-12">
                  <div className="mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20 animate-pulse">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                      {t.thankYou}
                    </h2>
                    <div className="max-w-lg mx-auto">
                      <p className="text-xl text-gray-700 mb-4">{t.success}</p>
                      <p className="text-lg text-gray-600">{t.receiptSent}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  {/* Next Steps */}
                  <Card className="p-8 bg-gradient-to-br from-white/90 to-blue-50/90 border border-blue-200/30 rounded-xl shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                        {t.whatNext}
                      </CardTitle>
                      <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6 mt-4">
                        {t.steps.map((step: string, index: number) => (
                          <div key={index} className="flex items-start bg-gradient-to-br from-white/80 to-blue-50/80 p-4 rounded-lg border border-blue-200/30 hover:bg-blue-100/50 transition-all duration-300">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 shadow-md">
                              <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <p className="text-gray-700 text-lg">{step}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => router.push(`/${locale}`)}
                      className="px-12 py-5 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      {t.backToHome}
                    </Button>
                  </div>

                  {/* Social Share Section */}
                  <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-white border border-blue-200/30 rounded-xl shadow-lg">
                    <CardContent>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">{t.shareSuccess}</h3>
                      <p className="text-blue-700 mb-4">{t.shareText}</p>
                      <SocialShare 
                        key="donation-success-share"
                        title={`I just donated €${selectedAmount || customAmount} to support EHC Koenigsbrunn!`}
                        description="Join me in supporting our local ice hockey club. Every donation helps them achieve excellence!"
                        variant="button"
                        size="lg"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
