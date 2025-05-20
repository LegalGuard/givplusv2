import React, { useState } from 'react';
import { Heart, Globe, Search, Menu, X } from 'lucide-react';
import './index.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('fr');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setIsMenuOpen(false);
  };

  // Language translations
  const translations: Record<string, Record<string, string>> = {
    fr: {
      home: 'Accueil',
      campaigns: 'Campagnes',
      start: 'Créer une campagne',
      about: 'À propos',
      contact: 'Contact',
      heroTitle: 'Soutenez des causes qui vous tiennent à cœur',
      heroSubtitle: 'Plateforme de dons sécurisée pour soutenir les associations israéliennes et de la communauté juive internationale',
      donate: 'Faire un don',
      create: 'Créer une collecte',
      featured: 'Campagnes à la une',
      viewAll: 'Voir toutes les campagnes',
      howItWorks: 'Comment ça marche',
      step1: 'Choisissez une campagne',
      step2: 'Faites un don sécurisé',
      step3: 'Partagez avec vos proches',
      aboutTitle: 'Notre mission',
      aboutText: 'GivPlus.com est une plateforme de collecte de dons dédiée au soutien des associations israéliennes et de la communauté juive internationale. Notre mission est de faciliter la générosité et de renforcer les liens entre les donateurs et les causes qui leur sont chères.',
      cta: 'Prêt à faire la différence?',
      ctaButton: 'Découvrir les campagnes',
      copyright: 'Tous droits réservés',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation',
    },
    en: {
      home: 'Home',
      campaigns: 'Campaigns',
      start: 'Start a campaign',
      about: 'About',
      contact: 'Contact',
      heroTitle: 'Support causes close to your heart',
      heroSubtitle: 'Secure donation platform to support Israeli associations and the international Jewish community',
      donate: 'Donate now',
      create: 'Create a fundraiser',
      featured: 'Featured campaigns',
      viewAll: 'View all campaigns',
      howItWorks: 'How it works',
      step1: 'Choose a campaign',
      step2: 'Make a secure donation',
      step3: 'Share with your loved ones',
      aboutTitle: 'Our mission',
      aboutText: 'GivPlus.com is a fundraising platform dedicated to supporting Israeli associations and the international Jewish community. Our mission is to facilitate generosity and strengthen the bonds between donors and the causes they care about.',
      cta: 'Ready to make a difference?',
      ctaButton: 'Discover campaigns',
      copyright: 'All rights reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
    },
    he: {
      home: 'דף הבית',
      campaigns: 'קמפיינים',
      start: 'התחל קמפיין',
      about: 'אודות',
      contact: 'צור קשר',
      heroTitle: 'תמכו במטרות הקרובות ללבכם',
      heroSubtitle: 'פלטפורמת תרומות מאובטחת לתמיכה בארגונים ישראליים ובקהילה היהודית הבינלאומית',
      donate: 'תרמו עכשיו',
      create: 'צרו מגבית',
      featured: 'קמפיינים מובילים',
      viewAll: 'צפו בכל הקמפיינים',
      howItWorks: 'איך זה עובד',
      step1: 'בחרו קמפיין',
      step2: 'בצעו תרומה מאובטחת',
      step3: 'שתפו עם יקיריכם',
      aboutTitle: 'המשימה שלנו',
      aboutText: 'GivPlus.com הינה פלטפורמת גיוס תרומות המוקדשת לתמיכה בארגונים ישראליים ובקהילה היהודית הבינלאומית. המשימה שלנו היא להקל על הנדיבות ולחזק את הקשרים בין התורמים לבין המטרות החשובות להם.',
      cta: 'מוכנים לעשות שינוי?',
      ctaButton: 'גלו קמפיינים',
      copyright: 'כל הזכויות שמורות',
      privacy: 'מדיניות פרטיות',
      terms: 'תנאי שימוש',
    }
  };

  const t = translations[language];

  return (
    <div className={`min-h-screen ${language === 'he' ? 'text-right' : 'text-left'}`} dir={language === 'he' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/givplus-logo.png" alt="GivPlus" className="h-12" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              <a href="#" className="text-gray-800 hover:text-blue-500 transition-colors">
                {t.home}
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-500 transition-colors">
                {t.campaigns}
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-500 transition-colors">
                {t.start}
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-500 transition-colors">
                {t.about}
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-500 transition-colors">
                {t.contact}
              </a>
            </nav>

            {/* Language and Search */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <button className="text-gray-600 hover:text-blue-500 flex items-center focus:outline-none">
                  <Globe className="h-5 w-5 mr-1" />
                  <span className="uppercase">{language}</span>
                </button>
                <div className="absolute mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button onClick={() => changeLanguage('fr')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Français
                    </button>
                    <button onClick={() => changeLanguage('en')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      English
                    </button>
                    <button onClick={() => changeLanguage('he')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right">
                      עברית
                    </button>
                  </div>
                </div>
              </div>
              <button className="text-gray-600 hover:text-blue-500">
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50">
                {t.home}
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50">
                {t.campaigns}
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50">
                {t.start}
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50">
                {t.about}
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50">
                {t.contact}
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <Globe className="h-5 w-5 text-gray-500" />
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Languages</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button onClick={() => changeLanguage('fr')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50 w-full text-left">
                  Français
                </button>
                <button onClick={() => changeLanguage('en')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50 w-full text-left">
                  English
                </button>
                <button onClick={() => changeLanguage('he')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50 w-full text-right">
                  עברית
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 py-20">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/45842/clasped-hands-comfort-hands-people-45842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="People helping"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                {t.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl mb-10 opacity-90">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-yellow-400 hover:bg-yellow-500 transition-colors shadow-md">
                  <Heart className="mr-2 h-5 w-5" />
                  {t.donate}
                </a>
                <a href="#" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors border-white shadow-md">
                  {t.create}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Campaigns */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.featured}</h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Campaign 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Educational program" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-indigo-600">Éducation</span>
                    <span className="text-xs font-medium text-gray-500">72% financé</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Séminaire Beth Rivkah 2025</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">Soutenez l'éducation juive pour les jeunes filles en contribuant au développement des programmes pédagogiques innovants.</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">65 320 €</span>
                    <span className="text-sm text-gray-500">Objectif: 90 000 €</span>
                  </div>
                  <a href="#" className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                    {t.donate}
                  </a>
                </div>
              </div>

              {/* Campaign 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src="https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Cultural center" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-indigo-600">Culture</span>
                    <span className="text-xs font-medium text-gray-500">35% financé</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Torah Or 2025</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">Participez à la préservation et transmission des valeurs culturelles à travers le centre communautaire Torah Or.</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">17 500 €</span>
                    <span className="text-sm text-gray-500">Objectif: 50 000 €</span>
                  </div>
                  <a href="#" className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                    {t.donate}
                  </a>
                </div>
              </div>

              {/* Campaign 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Community support" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-indigo-600">Solidarité</span>
                    <span className="text-xs font-medium text-gray-500">85% financé</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Beth Loubavitch 2025</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">Aidez les familles dans le besoin en soutenant les initiatives sociales de Beth Loubavitch pour la communauté.</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">127 500 €</span>
                    <span className="text-sm text-gray-500">Objectif: 150 000 €</span>
                  </div>
                  <a href="#" className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                    {t.donate}
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors border-indigo-600">
                {t.viewAll}
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.howItWorks}</h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.step1}</h3>
                <p className="text-gray-600">
                  Parcourez les campagnes et trouvez une cause qui vous tient à cœur.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.step2}</h3>
                <p className="text-gray-600">
                  Effectuez un don sécurisé en quelques clics avec différentes options de paiement.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.step3}</h3>
                <p className="text-gray-600">
                  Amplifiez l'impact en partageant la campagne avec votre réseau.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.aboutTitle}</h2>
                <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t.aboutText}
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="w-full sm:w-auto text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">150+</div>
                  <div className="text-gray-600">Campagnes actives</div>
                </div>
                <div className="w-full sm:w-auto text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">7M€+</div>
                  <div className="text-gray-600">Fonds collectés</div>
                </div>
                <div className="w-full sm:w-auto text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">50 000+</div>
                  <div className="text-gray-600">Donateurs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-700 via-blue-500 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">{t.cta}</h2>
              <p className="text-lg mb-8 opacity-90">
                Rejoignez des milliers de donateurs et soutenez des projets qui ont un impact réel sur la vie des communautés.
              </p>
              <a href="#" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-yellow-400 hover:bg-yellow-500 transition-colors shadow-md">
                {t.ctaButton}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <img src="/givplus-logo-white.png" alt="GivPlus" className="h-10 mb-6" />
              <p className="text-gray-400 mb-6">
                Plateforme de financement participatif pour soutenir des causes qui comptent pour la communauté.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Campagnes</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Toutes les campagnes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Éducation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Culture</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Solidarité</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Santé</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">À propos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Notre mission</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">L'équipe</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partenaires</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Témoignages</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Aide</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sécurité des paiements</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.privacy}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.terms}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} GivPlus. {t.copyright}.
            </p>
            <div className="mt-4 md:mt-0">
              <button onClick={() => changeLanguage('fr')} className={`px-2 text-sm ${language === 'fr' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>FR</button>
              <span className="text-gray-600">|</span>
              <button onClick={() => changeLanguage('en')} className={`px-2 text-sm ${language === 'en' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>EN</button>
              <span className="text-gray-600">|</span>
              <button onClick={() => changeLanguage('he')} className={`px-2 text-sm ${language === 'he' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>HE</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;