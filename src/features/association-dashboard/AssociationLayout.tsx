import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Building,
  BellRing
} from 'lucide-react';

type Language = 'fr' | 'en' | 'he';

const translations = {
  fr: {
    dashboard: 'Tableau de bord',
    campaigns: 'Campagnes',
    donations: 'Dons reçus',
    documents: 'Documents',
    profile: 'Profil',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    welcome: 'Bienvenue',
    notifications: 'Notifications',
    associationName: 'Association',
    viewAll: 'Voir tout'
  },
  en: {
    dashboard: 'Dashboard',
    campaigns: 'Campaigns',
    donations: 'Donations',
    documents: 'Documents',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    welcome: 'Welcome',
    notifications: 'Notifications',
    associationName: 'Association',
    viewAll: 'View all'
  },
  he: {
    dashboard: 'לוח בקרה',
    campaigns: 'קמפיינים',
    donations: 'תרומות',
    documents: 'מסמכים',
    profile: 'פרופיל',
    settings: 'הגדרות',
    logout: 'התנתק',
    welcome: 'ברוך הבא',
    notifications: 'התראות',
    associationName: 'ארגון',
    viewAll: 'צפה בהכל'
  }
};

const AssociationLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  
  // Mock association data
  const association = {
    name: "Association Solidarité Israel",
    logo: "https://via.placeholder.com/40",
    notificationsCount: 3
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const t = translations[language];

  const menuItems = [
    { path: '', icon: <Home size={20} />, label: t.dashboard },
    { path: 'campaigns', icon: <BarChart size={20} />, label: t.campaigns },
    { path: 'donations', icon: <Users size={20} />, label: t.donations },
    { path: 'documents', icon: <FileText size={20} />, label: t.documents },
    { path: 'profile', icon: <Building size={20} />, label: t.profile },
    { path: 'settings', icon: <Settings size={20} />, label: t.settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r text-gray-700">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <img 
              src="/givplus-logo.png" 
              alt="GivPlus" 
              className="h-10"
            />
          </div>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              end={item.path === '/association/dashboard'}
              className={({ isActive }) => 
                `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                  isActive 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-700 hover:bg-indigo-50'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          
          <hr className="border-gray-200 my-4" />
          
          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md transition-colors">
            <LogOut size={20} className="mr-3" />
            {t.logout}
          </button>
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setLanguage('fr')} 
              className={`px-2 py-1 text-xs rounded ${language === 'fr' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-indigo-50 text-gray-700'}`}
            >
              FR
            </button>
            <button 
              onClick={() => setLanguage('en')} 
              className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-indigo-50 text-gray-700'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('he')} 
              className={`px-2 py-1 text-xs rounded ${language === 'he' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-indigo-50 text-gray-700'}`}
            >
              HE
            </button>
          </div>
        </div>
      </aside>
      
      {/* Sidebar mobile */}
      <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
        style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
        onClick={toggleMobileMenu}
      ></div>
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-gray-700 transform transition-transform duration-300 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/givplus-logo.png" 
              alt="GivPlus" 
              className="h-10"
            />
          </div>
          <button onClick={toggleMobileMenu} className="text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              end={item.path === ''}
              className={({ isActive }) => 
                `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                  isActive 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-700 hover:bg-indigo-50'
                }`
              }
              onClick={toggleMobileMenu}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          
          <hr className="border-gray-200 my-4" />
          
          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md transition-colors">
            <LogOut size={20} className="mr-3" />
            {t.logout}
          </button>
        </nav>
      </aside>
      
      {/* Contenu principal */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center">
              <button onClick={toggleMobileMenu} className="mr-4 text-gray-500 md:hidden">
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-medium text-gray-800">{t.welcome}, {association.name}</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center text-gray-500 hover:text-indigo-700">
                  <BellRing size={20} />
                  {association.notificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {association.notificationsCount}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <Building size={16} className="text-indigo-700" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Contenu de la page */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AssociationLayout;
