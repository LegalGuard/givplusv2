import React, { useState } from 'react';
import Overview from '../features/dashboard/Overview';
import Profile from '../features/dashboard/Profile';
import Donations from '../features/dashboard/Donations';
import Events from '../features/dashboard/Events';
import Documents from '../features/dashboard/Documents';
import Settings from '../features/dashboard/Settings';

import { Menu, X, Bell } from 'lucide-react';

// Type definition for section keys
export type SectionKey =
  | 'dashboard'
  | 'profile'
  | 'donations'
  | 'events'
  | 'documents'
  | 'settings';

// Translation strings (simplified for brevity)
const translations: Record<string, Record<string, any>> = {
  fr: {
    sections: {
      dashboard: 'Tableau de bord',
      profile: 'Mon profil',
      donations: 'Historique des dons',
      events: 'Mes événements',
      documents: 'Documents fiscaux',
      settings: 'Paramètres',
      logout: 'Déconnexion',
    },
    welcome: (name: string) => `Bonjour ${name}`,
  },
  en: {
    sections: {
      dashboard: 'Dashboard',
      profile: 'My profile',
      donations: 'Giving history',
      events: 'My events',
      documents: 'Tax documents',
      settings: 'Settings',
      logout: 'Logout',
    },
    welcome: (name: string) => `Hello ${name}`,
  },
  he: {
    sections: {
      dashboard: 'לוח בקרה',
      profile: 'הפרופיל שלי',
      donations: 'היסטוריית תרומות',
      events: 'האירועים שלי',
      documents: 'מסמכים פיסקאליים',
      settings: 'הגדרות',
      logout: 'יציאה',
    },
    welcome: (name: string) => `שלום ${name}`,
  },
};

const DonorDashboard: React.FC = () => {
  
  const [language, setLanguage] = useState<'fr' | 'en' | 'he'>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState<SectionKey>('dashboard');

  const t = translations[language];

  const renderContent = () => {
    switch (section) {
      case 'dashboard':
        return <Overview />;
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">{t.welcome('Donateur')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Summary cards */}
              <div className="bg-white shadow rounded-lg p-4">
                <p className="text-sm text-gray-500">Total des dons</p>
                <p className="text-3xl font-bold text-indigo-600">3 200 €</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <p className="text-sm text-gray-500">Nombre de dons</p>
                <p className="text-3xl font-bold text-indigo-600">18</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <p className="text-sm text-gray-500">Dons récurrents actifs</p>
                <p className="text-3xl font-bold text-indigo-600">2</p>
              </div>
            </div>
            {/* Upcoming events */}
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Prochains événements</h3>
              <ul className="divide-y text-sm">
                <li className="py-2 flex justify-between"><span>Dîner caritatif</span><span>24/07/2025</span></li>
                <li className="py-2 flex justify-between"><span>Marathon solidaire</span><span>02/08/2025</span></li>
                <li className="py-2 flex justify-between"><span>Webinaire</span><span>15/09/2025</span></li>
              </ul>
            </div>
          </div>
        );
      case 'profile':
        return <Profile />;
      case 'donations':
        return <Donations />;
      case 'events':
        return <Events />;
      case 'documents':
        return <Documents />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  const SectionButton: React.FC<{ id: SectionKey; label: string }> = ({ id, label }) => (
    <button
      onClick={() => {
        setSection(id);
        setMenuOpen(false);
      }}
      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg hover:bg-indigo-50 focus:outline-none ${
        section === id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className={`flex min-h-screen ${language === 'he' ? 'text-right' : 'text-left'}`} dir={language === 'he' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r transition-transform transform lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <img src="/givplus-logo.png" alt="GivPlus" className="h-10" />
          <button className="lg:hidden" onClick={() => setMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="px-4 py-6 space-y-2">
          <SectionButton id="dashboard" label={t.sections.dashboard} />
          <SectionButton id="profile" label={t.sections.profile} />
          <SectionButton id="donations" label={t.sections.donations} />
          <SectionButton id="events" label={t.sections.events} />
          <SectionButton id="documents" label={t.sections.documents} />
          <SectionButton id="settings" label={t.sections.settings} />
          <hr />
          <button className="w-full px-4 py-2 text-sm text-gray-500 hover:text-red-600 text-left">
            {t.sections.logout}
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {menuOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={() => setMenuOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 w-full">
        <header className="flex items-center justify-between px-4 lg:px-8 py-4 bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <a href="/" className="text-indigo-600 hover:underline hidden md:inline">Accueil</a>
            <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <img src="https://i.pravatar.cc/40" alt="avatar" className="h-8 w-8 rounded-full" />
            {/* Language Switcher */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'fr' | 'en' | 'he')}
              className="border-gray-300 rounded-md text-sm focus:outline-none"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
              <option value="he">HE</option>
            </select>
            {/* Notifications */}
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        <main className="bg-gray-50 min-h-screen">{renderContent()}</main>

        {/* Footer */}
        <footer className="bg-white border-t text-center py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} GivPlus — Tous droits réservés
        </footer>
      </div>
    </div>
  );
};

export default DonorDashboard;
