import React, { useState } from 'react';
import { Camera, Save, CheckCircle, AlertCircle } from 'lucide-react';

type Language = 'fr' | 'en' | 'he';

const translations = {
  fr: {
    profile: 'Profil de l\'association',
    generalInfo: 'Informations générales',
    name: 'Nom de l\'association',
    email: 'Email',
    phone: 'Téléphone',
    website: 'Site web',
    address: 'Adresse',
    city: 'Ville',
    postalCode: 'Code postal',
    country: 'Pays',
    about: 'À propos',
    description: 'Description de l\'association',
    descPlaceholder: 'Décrivez votre association, sa mission et ses objectifs...',
    legalInfo: 'Informations légales',
    legalStatus: 'Statut juridique',
    registrationNumber: 'Numéro d\'enregistrement',
    taxId: 'Numéro fiscal',
    foundationDate: 'Date de création',
    uploadLogo: 'Télécharger le logo',
    changeLogo: 'Modifier le logo',
    bankInfo: 'Informations bancaires',
    bankName: 'Nom de la banque',
    accountHolder: 'Titulaire du compte',
    accountNumber: 'Numéro de compte',
    iban: 'IBAN',
    bic: 'BIC/SWIFT',
    saveChanges: 'Enregistrer les modifications',
    changes: 'Modifications enregistrées avec succès',
    identity: 'Identité de l\'association',
    contact: 'Coordonnées',
    settings: 'Paramètres',
    required: 'Champ requis'
  },
  en: {
    profile: 'Association Profile',
    generalInfo: 'General Information',
    name: 'Association name',
    email: 'Email',
    phone: 'Phone',
    website: 'Website',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal code',
    country: 'Country',
    about: 'About',
    description: 'Association description',
    descPlaceholder: 'Describe your association, its mission and objectives...',
    legalInfo: 'Legal Information',
    legalStatus: 'Legal status',
    registrationNumber: 'Registration number',
    taxId: 'Tax ID',
    foundationDate: 'Foundation date',
    uploadLogo: 'Upload logo',
    changeLogo: 'Change logo',
    bankInfo: 'Banking Information',
    bankName: 'Bank name',
    accountHolder: 'Account holder',
    accountNumber: 'Account number',
    iban: 'IBAN',
    bic: 'BIC/SWIFT',
    saveChanges: 'Save changes',
    changes: 'Changes saved successfully',
    identity: 'Association identity',
    contact: 'Contact details',
    settings: 'Settings',
    required: 'Required field'
  },
  he: {
    profile: 'פרופיל העמותה',
    generalInfo: 'מידע כללי',
    name: 'שם העמותה',
    email: 'אימייל',
    phone: 'טלפון',
    website: 'אתר אינטרנט',
    address: 'כתובת',
    city: 'עיר',
    postalCode: 'מיקוד',
    country: 'מדינה',
    about: 'אודות',
    description: 'תיאור העמותה',
    descPlaceholder: 'תאר את העמותה שלך, המשימה והמטרות שלה...',
    legalInfo: 'מידע משפטי',
    legalStatus: 'סטטוס משפטי',
    registrationNumber: 'מספר רישום',
    taxId: 'מספר מס',
    foundationDate: 'תאריך ייסוד',
    uploadLogo: 'העלה לוגו',
    changeLogo: 'שנה לוגו',
    bankInfo: 'פרטי חשבון בנק',
    bankName: 'שם הבנק',
    accountHolder: 'בעל החשבון',
    accountNumber: 'מספר חשבון',
    iban: 'IBAN',
    bic: 'BIC/SWIFT',
    saveChanges: 'שמור שינויים',
    changes: 'השינויים נשמרו בהצלחה',
    identity: 'זהות העמותה',
    contact: 'פרטי קשר',
    settings: 'הגדרות',
    required: 'שדה חובה'
  }
};

const Profile: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [success, setSuccess] = useState(false);
  const t = translations[language];

  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    name: 'Association Solidarité Israel',
    email: 'contact@solidarite-israel.org',
    phone: '+33 1 23 45 67 89',
    website: 'https://solidarite-israel.org',
    address: '25 Rue de la Paix',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
    description: 'Notre association soutient les populations civiles touchées par les conflits au Moyen-Orient, avec une priorité pour les familles israéliennes victimes du terrorisme. Nous organisons des collectes de fonds, des distributions de repas, et des soutiens psychologiques pour les familles touchées.',
    legalStatus: 'Association loi 1901',
    registrationNumber: 'W123456789',
    taxId: 'FR 12 345 678 901',
    foundationDate: '2005-03-15',
    logoUrl: 'https://via.placeholder.com/150',
    bankName: 'Banque Nationale',
    accountHolder: 'Association Solidarité Israel',
    accountNumber: '12345678901',
    iban: 'FR76 1234 5678 9012 3456 7890 123',
    bic: 'NATXFRPP'
  });

  // Gestion des changements d'input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        <h1 className="text-2xl font-bold">{t.profile}</h1>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center" role="alert">
          <CheckCircle size={16} className="mr-2" />
          <span>{t.changes}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Identité de l'association */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">{t.identity}</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex items-start space-x-4">
              <div className="relative">
                <img 
                  src={formData.logoUrl} 
                  alt="Logo" 
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="text-white flex flex-col items-center">
                    <Camera size={20} />
                    <span className="text-xs mt-1">{t.changeLogo}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t.name} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    {t.description}
                  </label>
                  <textarea 
                    name="description" 
                    id="description" 
                    rows={3} 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder={t.descPlaceholder}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="legalStatus" className="block text-sm font-medium text-gray-700">
                {t.legalStatus} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="legalStatus" 
                id="legalStatus" 
                value={formData.legalStatus} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="foundationDate" className="block text-sm font-medium text-gray-700">
                {t.foundationDate}
              </label>
              <input 
                type="date" 
                name="foundationDate" 
                id="foundationDate" 
                value={formData.foundationDate} 
                onChange={handleChange} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                {t.registrationNumber} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="registrationNumber" 
                id="registrationNumber" 
                value={formData.registrationNumber} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                {t.taxId} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="taxId" 
                id="taxId" 
                value={formData.taxId} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Coordonnées */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">{t.contact}</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.email} <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {t.phone}
              </label>
              <input 
                type="tel" 
                name="phone" 
                id="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                {t.website}
              </label>
              <input 
                type="url" 
                name="website" 
                id="website" 
                value={formData.website} 
                onChange={handleChange} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                {t.address} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="address" 
                id="address" 
                value={formData.address} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                {t.city} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="city" 
                id="city" 
                value={formData.city} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                {t.postalCode} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="postalCode" 
                id="postalCode" 
                value={formData.postalCode} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                {t.country} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="country" 
                id="country" 
                value={formData.country} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Informations bancaires */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">{t.bankInfo}</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                {t.bankName} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="bankName" 
                id="bankName" 
                value={formData.bankName} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700">
                {t.accountHolder} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="accountHolder" 
                id="accountHolder" 
                value={formData.accountHolder} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                {t.accountNumber} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="accountNumber" 
                id="accountNumber" 
                value={formData.accountNumber} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="iban" className="block text-sm font-medium text-gray-700">
                {t.iban} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="iban" 
                id="iban" 
                value={formData.iban} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="bic" className="block text-sm font-medium text-gray-700">
                {t.bic} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="bic" 
                id="bic" 
                value={formData.bic} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save size={18} className="mr-2" />
            {t.saveChanges}
          </button>
        </div>
      </form>

    </div>
  );
};

export default Profile;
