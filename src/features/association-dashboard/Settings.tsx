import React, { useState } from 'react';
import { Save, Bell, Globe, Lock, Shield, CheckCircle } from 'lucide-react';

type Language = 'fr' | 'en' | 'he';

const translations = {
  fr: {
    settings: 'Paramètres',
    general: 'Général',
    notifications: 'Notifications',
    security: 'Sécurité',
    language: 'Langue',
    privacy: 'Confidentialité',
    saveChanges: 'Enregistrer',
    changes: 'Modifications enregistrées avec succès',
    chooseLanguage: 'Choisir la langue',
    french: 'Français',
    english: 'Anglais',
    hebrew: 'Hébreu',
    emailNotifications: 'Notifications par email',
    pushNotifications: 'Notifications push',
    newDonation: 'Nouveau don reçu',
    documentReady: 'Document prêt',
    campaignEnd: 'Fin de campagne',
    weeklyReport: 'Rapport hebdomadaire',
    darkMode: 'Mode sombre',
    twoFactor: 'Authentification à deux facteurs',
    dataSharing: 'Partage de données',
    cookieSettings: 'Paramètres des cookies'
  },
  en: {
    settings: 'Settings',
    general: 'General',
    notifications: 'Notifications',
    security: 'Security',
    language: 'Language',
    privacy: 'Privacy',
    saveChanges: 'Save changes',
    changes: 'Changes saved successfully',
    chooseLanguage: 'Choose language',
    french: 'French',
    english: 'English',
    hebrew: 'Hebrew',
    emailNotifications: 'Email notifications',
    pushNotifications: 'Push notifications',
    newDonation: 'New donation received',
    documentReady: 'Document ready',
    campaignEnd: 'Campaign end',
    weeklyReport: 'Weekly report',
    darkMode: 'Dark mode',
    twoFactor: 'Two-factor authentication',
    dataSharing: 'Data sharing',
    cookieSettings: 'Cookie settings'
  },
  he: {
    settings: 'הגדרות',
    general: 'כללי',
    notifications: 'התראות',
    security: 'אבטחה',
    language: 'שפה',
    privacy: 'פרטיות',
    saveChanges: 'שמור שינויים',
    changes: 'השינויים נשמרו בהצלחה',
    chooseLanguage: 'בחר שפה',
    french: 'צרפתית',
    english: 'אנגלית',
    hebrew: 'עברית',
    emailNotifications: 'התראות דוא"ל',
    pushNotifications: 'התראות דחיפה',
    newDonation: 'תרומה חדשה התקבלה',
    documentReady: 'מסמך מוכן',
    campaignEnd: 'סוף הקמפיין',
    weeklyReport: 'דוח שבועי',
    darkMode: 'מצב כהה',
    twoFactor: 'אימות דו-שלבי',
    dataSharing: 'שיתוף נתונים',
    cookieSettings: 'הגדרות קובצי cookie'
  }
};

const Settings: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const t = translations[language];
  
  // Paramètres simulés
  const [settings, setSettings] = useState({
    language: 'fr',
    emailNotifications: true,
    pushNotifications: false,
    newDonationAlert: true,
    documentReadyAlert: true,
    campaignEndAlert: true,
    weeklyReportAlert: false,
    darkMode: false,
    twoFactor: false,
    dataSharing: true,
    cookieSettings: 'essential'
  });
  
  // Gestion des changements
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler l'enregistrement des données
    setTimeout(() => {
      setSuccess(true);
      
      // Cacher le message après 3 secondes
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.settings}</h1>
      </div>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center" role="alert">
          <CheckCircle size={16} className="mr-2" />
          <span>{t.changes}</span>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Onglets de navigation */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'general' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
            >
              <Globe size={20} />
              <span>{t.general}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
            >
              <Bell size={20} />
              <span>{t.notifications}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'security' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
            >
              <Lock size={20} />
              <span>{t.security}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'privacy' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
            >
              <Shield size={20} />
              <span>{t.privacy}</span>
            </button>
          </nav>
        </div>
        
        {/* Contenu des onglets */}
        <div className="flex-1 bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {/* Onglet Général */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">{t.general}</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.language}
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={settings.language}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="fr">{t.french}</option>
                        <option value="en">{t.english}</option>
                        <option value="he">{t.hebrew}</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="darkMode"
                        name="darkMode"
                        type="checkbox"
                        checked={settings.darkMode}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-900">
                        {t.darkMode}
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Onglet Notifications */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">{t.notifications}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{t.emailNotifications}</span>
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input
                          id="emailNotifications"
                          name="emailNotifications"
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{t.pushNotifications}</span>
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input
                          id="pushNotifications"
                          name="pushNotifications"
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Événements</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            id="newDonationAlert"
                            name="newDonationAlert"
                            type="checkbox"
                            checked={settings.newDonationAlert}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor="newDonationAlert" className="ml-2 block text-sm text-gray-900">
                            {t.newDonation}
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="documentReadyAlert"
                            name="documentReadyAlert"
                            type="checkbox"
                            checked={settings.documentReadyAlert}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor="documentReadyAlert" className="ml-2 block text-sm text-gray-900">
                            {t.documentReady}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Onglet Sécurité */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">{t.security}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="twoFactor"
                        name="twoFactor"
                        type="checkbox"
                        checked={settings.twoFactor}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-900">
                        {t.twoFactor}
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Onglet Confidentialité */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">{t.privacy}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="dataSharing"
                        name="dataSharing"
                        type="checkbox"
                        checked={settings.dataSharing}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="dataSharing" className="ml-2 block text-sm text-gray-900">
                        {t.dataSharing}
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
            
            <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save size={16} className="mr-2" />
                {t.saveChanges}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
