'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';

export default function LocaleHomePage() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    // Extract locale from pathname
    const locale = pathname.split('/')[1] || 'en';
    setCurrentLocale(locale);
  }, [pathname]);

  const handleLocaleChange = (locale: string) => {
    setCurrentLocale(locale);
    router.push(`/${locale}`);
  };

  // Static content for now - we'll add translations later
  const content = {
    en: {
      title: 'Support EHC Königsberg',
      subtitle: 'Help us reach our goals and make a difference in our community. Every contribution matters.',
      explorePackages: 'Explore Packages',
      quickDonate: 'Quick Donate',
      packagesTitle: 'Sponsorship Packages',
      packagesSubtitle: 'Choose the perfect sponsorship package to support EHC Königsberg and gain valuable exposure for your business.',
      selectPackage: 'Select Package',
      ticketBenefits: '🎫 Ticket Benefits',
      businessBenefits: '🏢 Business Benefits',
      team: 'Team'
    },
    de: {
      title: 'Unterstütze EHC Königsberg',
      subtitle: 'Hilf uns dabei, unsere Ziele zu erreichen und einen Unterschied in unserer Gemeinschaft zu machen. Jeder Beitrag zählt.',
      explorePackages: 'Pakete entdecken',
      quickDonate: 'Schnell spenden',
      packagesTitle: 'Sponsoring-Pakete',
      packagesSubtitle: 'Wähle das perfekte Sponsoring-Paket zur Unterstützung des EHC Königsberg und gewinne wertvolle Präsenz für dein Unternehmen.',
      selectPackage: 'Paket auswählen',
      ticketBenefits: '🎫 Ticket-Vorteile',
      businessBenefits: '🏢 Business-Vorteile',
      team: 'Team'
    }
  };

  const t = content[currentLocale as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen">
      {/* Language Switcher */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">EHC Königsberg</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Button
                  variant={currentLocale === 'en' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleLocaleChange('en')}
                >
                  English
                </Button>
                <Button
                  variant={currentLocale === 'de' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleLocaleChange('de')}
                >
                  Deutsch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 pt-32">
        <div className="absolute inset-0">
          <Image
            src="/images/club_hero_banner.webp"
            alt="Club Hero Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 gradient-text text-shadow">
            {t.title}
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto text-shadow">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => router.push(`/${currentLocale}/packages`)}
            >
              {t.explorePackages}
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => router.push(`/${currentLocale}/donate`)}
            >
              {t.quickDonate}
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              {t.packagesTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.packagesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="packages">
            {/* Classic Package */}
            <Card className="p-6 relative overflow-hidden card-classic">
              <CardContent className="space-y-6 text-center">
                <div>
                  <h3 className="text-2xl font-bold gradient-text-blue mb-2">
                    CLASSIC
                  </h3>
                  <p className="text-lg font-semibold text-gray-800">
                    Starting from €229 + VAT
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">🎫 6 Standing Day Tickets</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => router.push(`/${currentLocale}/package/classic`)}
                >
                  {t.selectPackage}
                </Button>
              </CardContent>
            </Card>

            {/* Bronze Package */}
            <Card className="p-6 relative overflow-hidden card-bronze">
              <CardContent className="space-y-6 text-center">
                <div>
                  <h3 className="text-2xl font-bold gradient-text-purple mb-2">
                    BRONZE
                  </h3>
                  <p className="text-lg font-semibold text-gray-800">
                    Contact for pricing
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">🎫 30 Standing Day Tickets</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => router.push(`/${currentLocale}/package/bronze`)}
                >
                  {t.selectPackage}
                </Button>
              </CardContent>
            </Card>

            {/* Silver Package */}
            <Card className="p-6 relative overflow-hidden card-silver">
              <CardContent className="space-y-6 text-center">
                <div>
                  <h3 className="text-2xl font-bold gradient-text-blue mb-2">
                    SILBER
                  </h3>
                  <p className="text-lg font-semibold text-gray-800">
                    Contact for pricing
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">🎫 2 Standing Season Tickets</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => router.push(`/${currentLocale}/package/silver`)}
                >
                  {t.selectPackage}
                </Button>
              </CardContent>
            </Card>

            {/* Gold Package */}
            <Card className="p-6 relative overflow-hidden card-gold">
              <CardContent className="space-y-6 text-center">
                <div>
                  <h3 className="text-2xl font-bold gradient-text-purple mb-2">
                    GOLD
                  </h3>
                  <p className="text-lg font-semibold text-gray-800">
                    Contact for pricing
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">🎫 2 Seated Season Tickets</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => router.push(`/${currentLocale}/package/gold`)}
                >
                  {t.selectPackage}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Terms and Benefits */}
          <div className="mt-16 space-y-8">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  📝 Key Terms & Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Common Benefits for All Packages:
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
                    Important Notes:
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
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 text-center">
            <Image
              src="/images/club_team.webp"
              alt="Club Team"
              width={800}
              height={400}
              className="rounded-lg mx-auto mb-6"
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t.team}
            </h2>
            <p className="text-gray-600 text-lg">
              Meet our dedicated team of players and staff who make EHC Königsberg a championship club.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
