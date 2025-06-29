'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';

export default function DonatePage() {
  const [locale, setLocale] = useState('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale from pathname
    const localeFromPath = pathname.split('/')[1] || 'en';
    setLocale(localeFromPath);
  }, [pathname]);

  const content = {
    en: {
      title: 'Quick Donate',
      subtitle: 'Support EHC Königsberg with a quick donation',
      backToHome: 'Back to Home',
      donate: 'Donate Now',
      amount: 'Donation Amount',
      customAmount: 'Custom Amount'
    },
    de: {
      title: 'Schnell Spenden',
      subtitle: 'Unterstütze EHC Königsberg mit einer schnellen Spende',
      backToHome: 'Zurück zur Startseite',
      donate: 'Jetzt spenden',
      amount: 'Spendenbetrag',
      customAmount: 'Individueller Betrag'
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
              <h1 className="text-xl font-bold text-gray-800">EHC Königsberg</h1>
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
      <section className="pt-32 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 gradient-text">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.subtitle}
            </p>
          </div>

          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 text-center">
                {t.amount}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {donationAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="lg"
                    className="h-16 text-lg font-semibold"
                  >
                    €{amount}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {t.customAmount}
                </label>
                <input
                  type="number"
                  placeholder="€"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="text-center pt-6">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-12 py-4 text-lg"
                >
                  {t.donate}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
