import React, { useState } from 'react';
import { Lock, Mail, Bell, Save, Globe, BuildingCommunity } from 'lucide-react';
import { Switch } from '@headlessui/react';

type Language = 'fr' | 'en' | 'he';

// Traductions simplifiées
const translations = {
  fr: {
    settings: 'Paramètres',
    profileSettings: 'Paramètres du profil',
    associationName: 'Nom de l\'association',
    description: 'Description',
    logo: 'Logo',
    website: 'Site web',
    address: 'Adresse',
    save: 'Enregistrer',
    
    communicationSettings: 'Paramètres de communication',
    emailSettings: 'Paramètres email',
    emailNotifications: 'Notifications par email',
    emailNewsletter: 'Newsletter mensuelle',
    emailTemplate: 'Modèle d\'email',
    
    donationSettings: 'Paramètres de don',
    defaultCurrency: 'Devise par défaut',
    minDonationAmount: 'Montant minimum de don',
    suggestedAmounts: 'Montants suggérés',
    enableRecurring: 'Activer les dons récurrents',
    
    securitySettings: 'Paramètres de sécurité',
    changePassword: 'Changer le mot de passe',
    enable2FA: 'Activer l\'authentification à deux facteurs',
    dataPrivacy: 'Confidentialité des données',
    deleteAccount: 'Supprimer le compte',
  },
  en: {
    settings: 'Settings',
    profileSettings: 'Profile Settings',
    associationName: 'Association Name',
    description: 'Description',
    logo: 'Logo',
    website: 'Website',
    address: 'Address',
    save: 'Save',
    
    communicationSettings: 'Communication Settings',
    emailSettings: 'Email Settings',
    emailNotifications: 'Email notifications',
    emailNewsletter: 'Monthly newsletter',
    emailTemplate: 'Email template',
    
    donationSettings: 'Donation Settings',
    defaultCurrency: 'Default currency',
    minDonationAmount: 'Minimum donation amount',
    suggestedAmounts: 'Suggested amounts',
    enableRecurring: 'Enable recurring donations',
    
    securitySettings: 'Security Settings',
    changePassword: 'Change password',
    enable2FA: 'Enable two-factor authentication',
    dataPrivacy: 'Data privacy',
    deleteAccount: 'Delete account',
  },
  he: {
    settings: 'הגדרות',
    profileSettings: 'הגדרות פרופיל',
    associationName: 'שם העמותה',
    description: 'תיאור',
    logo: 'לוגו',
    website: 'אתר אינטרנט',
    address: 'כתובת',
    save: 'שמור',
    
    communicationSettings: 'הגדרות תקשורת',
    emailSettings: 'הגדרות אימייל',
    emailNotifications: 'התראות באימייל',
    emailNewsletter: 'ניוזלטר חודשי',
    emailTemplate: 'תבנית אימייל',
    
    donationSettings: 'הגדרות תרומה',
    defaultCurrency: 'מטבע ברירת מחדל',
    minDonationAmount: 'סכום תרומה מינימלי',
    suggestedAmounts: 'סכומים מוצעים',
    enableRecurring: 'אפשר תרומות חוזרות',
    
    securitySettings: 'הגדרות אבטחה',
    changePassword: 'שינוי סיסמה',
    enable2FA: 'אימות דו-שלבי',
    dataPrivacy: 'פרטיות נתונים',
    deleteAccount: 'מחק חשבון',
  },
};

// Données fictives de l'association
const mockAssociation = {
  name: 'Association Solidarité',
  description: 'Association d\'aide aux personnes en difficulté depuis 2010.',
  logo: '/givplus-logo.png',
  website: 'www.association-solidarite.org',
  address: '15 rue de la Paix, 75001 Paris',
};

const Settings: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [enableRecurring, setEnableRecurring] = useState(true);
  
  const t = translations[language];

  // Simuler la sauvegarde des paramètres
  const handleSave = () => {
    console.log('Paramètres sauvegardés');
    // Dans un cas réel, on enverrait les données au backend ici
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t.settings}</h2>
        <div className="flex border rounded-md overflow-hidden">
          <button onClick={() => setLanguage('fr')} className={`px-2 py-1 text-xs ${language === 'fr' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>FR</button>
          <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs ${language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>EN</button>
          <button onClick={() => setLanguage('he')} className={`px-2 py-1 text-xs ${language === 'he' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>HE</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paramètres du profil */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <BuildingCommunity className="text-indigo-600" size={24} />
            <h3 className="text-lg font-semibold">{t.profileSettings}</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.associationName}</label>
              <input 
                type="text" 
                value={mockAssociation.name}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
              <textarea 
                value={mockAssociation.description}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.website}</label>
              <div className="flex items-center">
                <Globe size={16} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  value={mockAssociation.website}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.address}</label>
              <input 
                type="text" 
                value={mockAssociation.address}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button 
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 mt-2"
            >
              <Save size={16} />
              {t.save}
            </button>
          </div>
        </div>

        {/* Paramètres de communication */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-indigo-600" size={24} />
            <h3 className="text-lg font-semibold">{t.communicationSettings}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">{t.emailNotifications}</span>
              <Switch
                checked={emailNotifications}
                onChange={setEmailNotifications}
                className={`${
                  emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">{t.emailNewsletter}</span>
              <Switch
                checked={newsletter}
                onChange={setNewsletter}
                className={`${
                  newsletter ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable newsletter</span>
                <span
                  className={`${
                    newsletter ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.emailTemplate}</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Standard</option>
                <option>Minimaliste</option>
                <option>Coloré</option>
              </select>
            </div>
          </div>
        </div>

        {/* Paramètres de don */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-indigo-600" size={24} />
            <h3 className="text-lg font-semibold">{t.donationSettings}</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.defaultCurrency}</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>EUR (€)</option>
                <option>USD ($)</option>
                <option>ILS (₪)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.minDonationAmount}</label>
              <input 
                type="number" 
                defaultValue="5" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.suggestedAmounts}</label>
              <input 
                type="text" 
                defaultValue="10, 25, 50, 100, 250" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">{t.enableRecurring}</span>
              <Switch
                checked={enableRecurring}
                onChange={setEnableRecurring}
                className={`${
                  enableRecurring ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable recurring donations</span>
                <span
                  className={`${
                    enableRecurring ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        </div>
        
        {/* Paramètres de sécurité */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-indigo-600" size={24} />
            <h3 className="text-lg font-semibold">{t.securitySettings}</h3>
          </div>
          <div className="space-y-4">
            <button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              {t.changePassword}
            </button>
            <button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              {t.enable2FA}
            </button>
            <button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              {t.dataPrivacy}
            </button>
            <button className="w-full border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              {t.deleteAccount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
