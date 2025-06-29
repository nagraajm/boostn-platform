'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';

export default function PurchaseFormPage() {
  const [locale, setLocale] = useState('en');
  const [packageId, setPackageId] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    companyRegistration: '',
    paymentMethod: 'credit-card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale and packageId from pathname
    const pathParts = pathname.split('/');
    const localeFromPath = pathParts[1] || 'en';
    const packageIdFromPath = pathParts[3] || '';
    
    setLocale(localeFromPath);
    setPackageId(packageIdFromPath);
  }, [pathname]);

  const content = {
    en: {
      title: 'Purchase Package',
      backToPackage: 'Back to Package',
      businessInfo: 'Business Information',
      businessName: 'Business Name *',
      contactPerson: 'Contact Person *',
      email: 'Email Address *',
      phone: 'Phone Number',
      companyRegistration: 'Company Registration Number',
      paymentInfo: 'Payment Information',
      paymentMethod: 'Payment Method',
      creditCard: 'Credit Card',
      bankTransfer: 'Bank Transfer',
      paypal: 'PayPal',
      completePurchase: 'Complete Purchase',
      processing: 'Processing...',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      success: 'Purchase completed successfully!',
      thankYou: 'Thank you for your support!',
      receiptSent: 'A receipt has been sent to your email address.',
      backToHome: 'Back to Home'
    },
    de: {
      title: 'Paket kaufen',
      backToPackage: 'Zurück zum Paket',
      businessInfo: 'Firmeninformationen',
      businessName: 'Firmenname *',
      contactPerson: 'Ansprechpartner *',
      email: 'E-Mail-Adresse *',
      phone: 'Telefonnummer',
      companyRegistration: 'Firmenregistrierungsnummer',
      paymentInfo: 'Zahlungsinformationen',
      paymentMethod: 'Zahlungsmethode',
      creditCard: 'Kreditkarte',
      bankTransfer: 'Überweisung',
      paypal: 'PayPal',
      completePurchase: 'Kauf abschließen',
      processing: 'Wird verarbeitet...',
      required: 'Dieses Feld ist erforderlich',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      success: 'Kauf erfolgreich abgeschlossen!',
      thankYou: 'Vielen Dank für Ihre Unterstützung!',
      receiptSent: 'Eine Quittung wurde an Ihre E-Mail-Adresse gesendet.',
      backToHome: 'Zurück zur Startseite'
    }
  };

  const packages = {
    classic: { name: 'CLASSIC', price: '€229' },
    bronze: { name: 'BRONZE', price: 'Contact for pricing' },
    silver: { name: 'SILVER', price: 'Contact for pricing' },
    gold: { name: 'GOLD', price: 'Contact for pricing' }
  };

  const t = content[locale as keyof typeof content] || content.en;
  const pkg = packages[packageId as keyof typeof packages];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.businessName || !formData.contactPerson || !formData.email) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to success page
    router.push(`/${locale}/package/${packageId}/success`);
  };

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle>Package Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push(`/${locale}`)}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                onClick={() => router.push(`/${locale}/packages`)}
              >
                {t.backToPackage}
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant={locale === 'en' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => router.push(`/en/package/${packageId}/purchase`)}
                >
                  English
                </Button>
                <Button
                  variant={locale === 'de' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => router.push(`/de/package/${packageId}/purchase`)}
                >
                  Deutsch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Purchase Form */}
      <section className="pt-32 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 gradient-text">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600">
              {pkg.name} Package - {pkg.price}
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Business Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">{t.businessInfo}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.businessName}
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contactPerson}
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter contact person name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.companyRegistration}
                    </label>
                    <input
                      type="text"
                      name="companyRegistration"
                      value={formData.companyRegistration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter company registration number"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">{t.paymentInfo}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.paymentMethod}
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="credit-card">{t.creditCard}</option>
                    <option value="bank-transfer">{t.bankTransfer}</option>
                    <option value="paypal">{t.paypal}</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting || !validateForm()}
                  className="px-12 py-4 text-lg"
                >
                  {isSubmitting ? t.processing : t.completePurchase}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
