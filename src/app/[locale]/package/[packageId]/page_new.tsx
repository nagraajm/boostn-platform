'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';

export default function PackageDetailsPage() {
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
      title: 'Package Details',
      backToPackages: 'Back to Packages',
      selectPackage: 'Select This Package',
      ticketBenefits: '🎫 Ticket Benefits',
      businessBenefits: '🏢 Business Benefits',
      terms: '📝 Key Terms & Benefits',
      commonBenefits: 'Common Benefits for All Packages:',
      importantNotes: 'Important Notes:'
    },
    de: {
      title: 'Paket-Details',
      backToPackages: 'Zurück zu Paketen',
      selectPackage: 'Dieses Paket auswählen',
      ticketBenefits: '🎫 Ticket-Vorteile',
      businessBenefits: '🏢 Business-Vorteile',
      terms: '📝 Wichtige Bedingungen & Vorteile',
      commonBenefits: 'Gemeinsame Vorteile für alle Pakete:',
      importantNotes: 'Wichtige Hinweise:'
    }
  };

  const packages = {
    classic: {
      name: 'CLASSIC',
      price: 'Starting from €229 + VAT',
      priceDE: 'Ab €229 + MwSt.',
      tickets: '6 Standing Day Tickets',
      ticketsDE: '6 Stehplatz-Tageskarten',
      cardClass: 'card-classic',
      titleClass: 'gradient-text-blue',
      benefits: {
        companyMention: false,
        network: true,
        logo: true,
        partnerCard: true,
        spobunetLogo: true,
        spobunetPresentation: false
      }
    },
    bronze: {
      name: 'BRONZE',
      price: 'Contact for pricing',
      priceDE: 'Preis auf Anfrage',
      tickets: '30 Standing Day Tickets',
      ticketsDE: '30 Stehplatz-Tageskarten',
      cardClass: 'card-bronze',
      titleClass: 'gradient-text-purple',
      benefits: {
        companyMention: true,
        network: true,
        logo: true,
        partnerCard: true,
        spobunetLogo: true,
        spobunetPresentation: false
      }
    },
    silver: {
      name: 'SILBER',
      price: 'Contact for pricing',
      priceDE: 'Preis auf Anfrage',
      tickets: '2 Standing Season Tickets',
      ticketsDE: '2 Stehplatz-Saisonkarten',
      cardClass: 'card-silver',
      titleClass: 'gradient-text-blue',
      benefits: {
        companyMention: true,
        network: true,
        logo: true,
        partnerCard: true,
        spobunetLogo: false,
        spobunetPresentation: true
      }
    },
    gold: {
      name: 'GOLD',
      price: 'Contact for pricing',
      priceDE: 'Preis auf Anfrage',
      tickets: '2 Seated Season Tickets',
      ticketsDE: '2 Sitzplatz-Saisonkarten',
      cardClass: 'card-gold',
      titleClass: 'gradient-text-purple',
      benefits: {
        companyMention: true,
        network: true,
        logo: true,
        partnerCard: true,
        spobunetLogo: false,
        spobunetPresentation: true
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;
  const pkg = packages[packageId as keyof typeof packages];

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle className="text-gray-800">Package Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push(`/${locale}/packages`)}>
              {t.backToPackages}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSelectPackage = () => {
    router.push(`/${locale}/package/${packageId}/purchase`);
  };

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
                onClick={() => router.push(`/${locale}/packages`)}
              >
                {t.backToPackages}
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant={locale === 'en' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => router.push(`/en/package/${packageId}`)}
                >
                  English
                </Button>
                <Button
                  variant={locale === 'de' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => router.push(`/de/package/${packageId}`)}
                >
                  Deutsch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Package Details */}
      <section className="pt-32 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 gradient-text">
              {pkg.name} {t.title}
            </h1>
          </div>

          <Card className={`p-8 mb-8 ${pkg.cardClass}`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-3xl font-bold mb-2 ${pkg.titleClass}`}>
                {pkg.name}
              </CardTitle>
              <p className="text-2xl text-gray-700 font-semibold">
                {locale === 'de' ? pkg.priceDE : pkg.price}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ticket Benefits */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{t.ticketBenefits}</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-medium">
                      {locale === 'de' ? pkg.ticketsDE : pkg.tickets}
                    </p>
                    <p className="text-sm text-gray-500">
                      Subject to availability • Regular season only
                    </p>
                  </div>
                </div>

                {/* Business Benefits */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{t.businessBenefits}</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className={pkg.benefits.companyMention ? 'text-green-500' : 'text-red-500'}>
                        {pkg.benefits.companyMention ? '✅' : '❌'}
                      </span>
                      <span className="ml-2">Company Name Mention</span>
                    </li>
                    <li className="flex items-center">
                      <span className={pkg.benefits.network ? 'text-green-500' : 'text-red-500'}>
                        {pkg.benefits.network ? '✅' : '❌'}
                      </span>
                      <span className="ml-2">Entrepreneur Network</span>
                    </li>
                    <li className="flex items-center">
                      <span className={pkg.benefits.logo ? 'text-green-500' : 'text-red-500'}>
                        {pkg.benefits.logo ? '✅' : '❌'}
                      </span>
                      <span className="ml-2">Supporterclub Logo</span>
                    </li>
                    <li className="flex items-center">
                      <span className={pkg.benefits.partnerCard ? 'text-green-500' : 'text-red-500'}>
                        {pkg.benefits.partnerCard ? '✅' : '❌'}
                      </span>
                      <span className="ml-2">Partner Card (1 card)</span>
                    </li>
                    <li className="flex items-center">
                      <span className={pkg.benefits.spobunetLogo ? 'text-green-500' : 'text-red-500'}>
                        {pkg.benefits.spobunetLogo ? '✅' : '❌'}
                      </span>
                      <span className="ml-2">spobunet Logo Presentation</span>
                    </li>
                    {pkg.benefits.spobunetPresentation && (
                      <li className="flex items-center">
                        <span className="text-green-500">✅</span>
                        <span className="ml-2">spobunet Company Presentation + Logo</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center pt-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSelectPackage}
                  className="px-12 py-4 text-lg"
                >
                  {t.selectPackage}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Terms & Benefits */}
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {t.terms}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  {t.commonBenefits}
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Access to entrepreneur network events
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Supporterclub logo usage rights
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Partner card for business networking
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Access to sport-business network (spobunet.de)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Newsletter updates and member offers
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    At least one free Supporterclub meeting invitation
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  {t.importantNotes}
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    All day tickets subject to availability
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Only for regular season home games (no playoffs)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Upgrade to higher package possible during season
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Prices exclude 19% VAT
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Automatic renewal for next season (8-week cancellation notice required)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    No advertising with Augsburger Panther name/logo without permission
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
