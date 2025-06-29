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
      title: 'Support EHC Koenigsbrunn',
      subtitle: 'Help us reach our goals and make a difference in our community. Every contribution matters.',
      explorePackages: 'Explore Packages',
      quickDonate: 'Quick Donate',
      packagesTitle: 'Sponsorship Packages',
      packagesSubtitle: 'Choose the perfect sponsorship package to support EHC Koenigsbrunn and gain valuable exposure for your business.',
      selectPackage: 'Select Package',
      ticketBenefits: '🎫 Ticket Benefits',
      businessBenefits: '🏢 Business Benefits',
      team: 'Team'
    },
    de: {
      title: 'Unterstütze EHC Koenigsbrunn',
      subtitle: 'Hilf uns dabei, unsere Ziele zu erreichen und einen Unterschied in unserer Gemeinschaft zu machen. Jeder Beitrag zählt.',
      explorePackages: 'Pakete entdecken',
      quickDonate: 'Schnell spenden',
      packagesTitle: 'Sponsoring-Pakete',
      packagesSubtitle: 'Wähle das perfekte Sponsoring-Paket zur Unterstützung des EHC Koenigsbrunn und gewinne wertvolle Präsenz für dein Unternehmen.',
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
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-black">EHC Koenigsbrunn</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Button
                  variant={currentLocale === 'en' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleLocaleChange('en')}
                  className={currentLocale === 'en' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-black' : 'text-black hover:text-black'}
                >
                  English
                </Button>
                <Button
                  variant={currentLocale === 'de' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleLocaleChange('de')}
                  className={currentLocale === 'de' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-black' : 'text-black hover:text-black'}
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
            src="/images/club_hero_banner.jpg"
            alt="Club Hero Banner"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-blue-900/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            {t.title}
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => router.push(`/${currentLocale}/packages`)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {t.explorePackages}
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => router.push(`/${currentLocale}/donate`)}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {t.quickDonate}
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%230ea5e9\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700/10 rounded-full filter blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl -ml-48 -mb-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              {t.packagesTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.packagesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="packages">
            {/* Classic Package */}
            <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-xl shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700/10 rounded-full filter blur-2xl -mr-16 -mt-16"></div>
              <CardContent className="space-y-6 text-center relative z-10 bg-[#0a2540] p-6 rounded-xl">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 inline-block text-transparent bg-clip-text mb-2">
                    CLASSIC
                  </h3>
                  <p className="text-lg font-semibold text-white">
                    Starting from €229 + VAT
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">🎫 6 Standing Day Tickets</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                  onClick={() => router.push(`/${currentLocale}/package/classic`)}
                >
                  {t.selectPackage}
                </Button>
              </CardContent>
            </Card>

            {/* Bronze Package */}
            <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-xl shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700/10 rounded-full filter blur-2xl -mr-16 -mt-16"></div>
              <CardContent className="space-y-6 text-center relative z-10 bg-[#0a2540] p-6 rounded-xl">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 inline-block text-transparent bg-clip-text mb-2">
                    BRONZE
                  </h3>
                  <p className="text-lg font-semibold text-white">
                    Contact for pricing
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">🎫 30 Standing Day Tickets</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                  onClick={() => router.push(`/${currentLocale}/package/bronze`)}
                >
                  {t.selectPackage}
                </Button>
              </CardContent>
            </Card>

            {/* Silver Package */}
            <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-xl shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700/10 rounded-full filter blur-2xl -mr-16 -mt-16"></div>
              <CardContent className="space-y-6 text-center relative z-10 bg-[#0a2540] p-6 rounded-xl">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 inline-block text-transparent bg-clip-text mb-2">
                    SILVER
                  </h3>
                  <p className="text-lg font-semibold text-white">
                    Contact for pricing
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">🎫 2 Standing Season Tickets</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                  onClick={() => router.push(`/${currentLocale}/package/silver`)}
                >
                  {t.selectPackage}
                </Button>
              </CardContent>
            </Card>

            {/* Gold Package */}
            <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-xl shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700/10 rounded-full filter blur-2xl -mr-16 -mt-16"></div>
              <CardContent className="space-y-6 text-center relative z-10 bg-[#0a2540] p-6 rounded-xl">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 inline-block text-transparent bg-clip-text mb-2">
                    GOLD
                  </h3>
                  <p className="text-lg font-semibold text-white">
                    Contact for pricing
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">🎫 2 Seated Season Tickets</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                  onClick={() => router.push(`/${currentLocale}/package/gold`)}
                >
                  {t.selectPackage}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Terms and Benefits */}
          <div className="mt-16 space-y-8">
            <Card className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-xl shadow-xl">
              <CardContent className="space-y-6 relative z-10 bg-[#0a2540] p-6 rounded-xl">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 inline-block text-transparent bg-clip-text mb-2">
                    📝 Key Terms & Benefits
                  </h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mt-2 mb-4 mx-auto"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Common Benefits for All Packages:
                  </h4>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Access to entrepreneur network events
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Supporterclub logo usage rights
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Partner card for business networking
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Access to sport-business network (spobunet.de)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Newsletter updates and member offers
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      At least one free Supporterclub meeting invitation
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Important Notes:
                  </h4>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      All day tickets subject to availability
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Only for regular season home games (no playoffs)
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Upgrade to higher package possible during season
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Prices exclude 19% VAT
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Automatic renewal for next season (8-week cancellation notice required)
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-sky-100 z-0"></div>
        <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: "url('/images/A.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-card p-8 text-center">
            <Image
              src="/images/club_team.jpg"
              alt="Club Team"
              width={800}
              height={400}
              className="rounded-lg mx-auto mb-6"
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t.team}
            </h2>
            <p className="text-gray-600 text-lg">
              Meet our dedicated team of players and staff who make EHC Koenigsbrunn a championship club.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
