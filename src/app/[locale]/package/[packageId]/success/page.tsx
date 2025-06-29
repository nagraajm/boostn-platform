'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';

export default function SuccessPage() {
  const [locale, setLocale] = useState('en');
  const [packageId, setPackageId] = useState('');
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
      title: 'Purchase Successful!',
      thankYou: 'Thank you for your support!',
      success: 'Your sponsorship package has been successfully purchased.',
      receiptSent: 'A confirmation email and receipt have been sent to your email address.',
      whatNext: 'What happens next?',
      steps: [
        'You will receive a welcome package within 2-3 business days',
        'Our partnership team will contact you to arrange logo placement and materials',
        'Your tickets will be available for pickup at the club office',
        'You\'ll receive invitations to exclusive supporter events'
      ],
      backToHome: 'Back to Home Page',
      downloadReceipt: 'Download Receipt',
      contactUs: 'Contact Us'
    },
    de: {
      title: 'Kauf erfolgreich!',
      thankYou: 'Vielen Dank für Ihre Unterstützung!',
      success: 'Ihr Sponsoring-Paket wurde erfolgreich erworben.',
      receiptSent: 'Eine Bestätigungs-E-Mail und Quittung wurden an Ihre E-Mail-Adresse gesendet.',
      whatNext: 'Was passiert als nächstes?',
      steps: [
        'Sie erhalten ein Willkommenspaket innerhalb von 2-3 Werktagen',
        'Unser Partnership-Team wird Sie kontaktieren, um Logo-Platzierung und Materialien zu arrangieren',
        'Ihre Tickets können im Vereinsbüro abgeholt werden',
        'Sie erhalten Einladungen zu exklusiven Supporter-Events'
      ],
      backToHome: 'Zurück zur Startseite',
      downloadReceipt: 'Quittung herunterladen',
      contactUs: 'Kontakt aufnehmen'
    }
  };

  const packages = {
    classic: { name: 'CLASSIC' },
    bronze: { name: 'BRONZE' },
    silver: { name: 'SILBER' },
    gold: { name: 'GOLD' }
  };

  const t = content[locale as keyof typeof content] || content.en;
  const pkg = packages[packageId as keyof typeof packages];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">EHC Königsberg</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Button
                  variant={locale === 'en' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => router.push(`/en/package/${packageId}/success`)}
                >
                  English
                </Button>
                <Button
                  variant={locale === 'de' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => router.push(`/de/package/${packageId}/success`)}
                >
                  Deutsch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Success Content */}
      <section className="pt-32 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4 gradient-text">
                {t.title}
              </h1>
              <p className="text-xl text-gray-300">
                {pkg?.name} Package
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Success Message */}
            <Card className="p-8 text-center">
              <CardContent>
                <h2 className="text-2xl font-bold text-white mb-4">{t.thankYou}</h2>
                <p className="text-gray-300 mb-4">{t.success}</p>
                <p className="text-gray-400">{t.receiptSent}</p>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">{t.whatNext}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {t.steps.map((step: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-300">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push(`/${locale}`)}
              >
                {t.backToHome}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  // Simulate receipt download
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = `receipt-${packageId}-${Date.now()}.pdf`;
                  link.click();
                }}
              >
                {t.downloadReceipt}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  // Open contact form or navigate to contact page
                  window.location.href = 'mailto:info@ehc-koenigsberg.de';
                }}
              >
                {t.contactUs}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
