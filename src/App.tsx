import { useState } from 'react';
import { Heart } from 'lucide-react';
import AccessBar from './components/AccessBar';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  // Utiliser useState pour gérer la langue actuelle
  // Note: Le setter est actuellement inutilisé car le changement de langue
  // est maintenant géré par le composant Navbar
  const [language] = useState('fr');

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
      {/* Access Bar with donor and association spaces */}
      <AccessBar language={language} />
      {/* Navbar avec authentification */}
      <Navbar />

      <main>
        {/* Hero Section - avec style restauré selon le design original */}
        <section className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                {t.heroTitle}
              </h1>
              <p className="text-lg text-white opacity-90 mb-10">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/zaka-donation" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-yellow-400 hover:bg-yellow-500 text-indigo-700 transition-colors shadow-md">
                  <Heart className="mr-2 h-5 w-5" />
                  {t.donate}
                </a>
                <a href="#" className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/20 transition-colors">
                  {t.create}
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section des campagnes - style restauré */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">{t.featured}</h2>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  {t.viewAll}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>

              {/* Cartes de campagnes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Campagne ZAKA Urgence Israël */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto">
                  <a href="/zaka-donation">
                    <img 
                      src="/5.jpg"
                      alt="Urgence Israël - ZAKA" 
                      className="w-full h-48 object-contain bg-black"
                    />
                  </a>
                  <div className="p-4">
                    <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-md mb-2">
                      URGENCE
                    </span>
                    <p className="text-gray-500 text-xs">Campagne en cours</p>
                    <h3 className="text-lg font-semibold mb-1">
                      <a href="/zaka-donation" className="text-gray-800 hover:text-blue-600">
                        ZAKA - Urgence Israël
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Équipez nos bénévoles sur le terrain et sauvez des vies en Israël
                    </p>
                    <a 
                      href="/zaka-donation" 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-block w-full text-center"
                    >
                      Faire un don
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Comment ça marche - style restauré */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{t.howItWorks}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-indigo-600 text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t.step1}</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-indigo-600 text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t.step2}</h3>
                  <p className="text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-indigo-600 text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t.step3}</h3>
                  <p className="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* À propos - style restauré avec positionnement d'image corrigé */}
        <section className="relative bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 py-20">
          {/* Image de fond avec positionnement amélioré */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <img
              src="https://images.pexels.com/photos/45842/clasped-hands-comfort-hands-people-45842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="People helping"
              className="w-full h-full object-cover object-center opacity-20"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                {t.aboutTitle}
              </h2>
              <p className="text-xl mb-10 opacity-90">
                {t.aboutText}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <a href="/zaka-donation" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-yellow-400 hover:bg-yellow-500 transition-colors shadow-md">
                  <Heart className="mr-2 h-5 w-5" />
                  {t.donate}
                </a>
              </div>
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
            {/* Sélecteur de langue déplacé dans le Navbar */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;