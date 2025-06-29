import React, { useState } from 'react';
import { Search, Filter, ArrowUp, Mail, Download, Eye, Star, MessageCircle } from 'lucide-react';

// Types pour les langues disponibles
type Language = 'fr' | 'en' | 'he';

// Traductions
const translations = {
  fr: {
    donors: 'Donateurs',
    search: 'Rechercher un donateur...',
    filter: 'Filtrer',
    all: 'Tous',
    regular: 'Réguliers',
    oneTime: 'Ponctuels',
    vip: 'VIP',
    sortBy: 'Trier par',
    sortByName: 'Nom',
    sortByDate: 'Date',
    sortByAmount: 'Montant',
    exportData: 'Exporter',
    contactAll: 'Contacter tous',
    name: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    totalDonated: 'Total donné',
    lastDonation: 'Dernier don',
    donationType: 'Type',
    actions: 'Actions',
    viewProfile: 'Voir profil',
    contact: 'Contacter',
    markAsVIP: 'Marquer comme VIP',
    regular: 'Régulier',
    oneTime: 'Ponctuel',
    resultsCount: 'résultats',
    noResults: 'Aucun donateur ne correspond à vos critères de recherche.',
  },
  en: {
    donors: 'Donors',
    search: 'Search for a donor...',
    filter: 'Filter',
    all: 'All',
    regular: 'Regular',
    oneTime: 'One-time',
    vip: 'VIP',
    sortBy: 'Sort by',
    sortByName: 'Name',
    sortByDate: 'Date',
    sortByAmount: 'Amount',
    exportData: 'Export',
    contactAll: 'Contact all',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    totalDonated: 'Total donated',
    lastDonation: 'Last donation',
    donationType: 'Type',
    actions: 'Actions',
    viewProfile: 'View profile',
    contact: 'Contact',
    markAsVIP: 'Mark as VIP',
    regular: 'Regular',
    oneTime: 'One-time',
    resultsCount: 'results',
    noResults: 'No donors match your search criteria.',
  },
  he: {
    donors: 'תורמים',
    search: 'חפש תורם...',
    filter: 'סנן',
    all: 'הכל',
    regular: 'קבועים',
    oneTime: 'חד פעמי',
    vip: 'VIP',
    sortBy: 'מיין לפי',
    sortByName: 'שם',
    sortByDate: 'תאריך',
    sortByAmount: 'סכום',
    exportData: 'ייצוא',
    contactAll: 'צור קשר עם כולם',
    name: 'שם',
    email: 'אימייל',
    phone: 'טלפון',
    totalDonated: 'סך התרומות',
    lastDonation: 'תרומה אחרונה',
    donationType: 'סוג',
    actions: 'פעולות',
    viewProfile: 'צפה בפרופיל',
    contact: 'צור קשר',
    markAsVIP: 'סמן כ-VIP',
    regular: 'קבוע',
    oneTime: 'חד פעמי',
    resultsCount: 'תוצאות',
    noResults: 'אין תורמים התואמים את קריטריוני החיפוש שלך.',
  },
};

// Types pour les donateurs
type DonorType = 'regular' | 'one-time';

interface Donor {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalDonated: string;
  lastDonation: string;
  donationType: DonorType;
  isVIP: boolean;
  avatar: string;
}

// Données fictives
const mockDonors: Donor[] = [
  {
    id: 1,
    name: 'Marie Dupont',
    email: 'marie.dupont@example.com',
    phone: '06 12 34 56 78',
    totalDonated: '1 250 €',
    lastDonation: '20/06/2025',
    donationType: 'regular',
    isVIP: true,
    avatar: 'https://i.pravatar.cc/40?img=1'
  },
  {
    id: 2,
    name: 'Jean Martin',
    email: 'jean.martin@example.com',
    phone: '06 23 45 67 89',
    totalDonated: '450 €',
    lastDonation: '19/06/2025',
    donationType: 'one-time',
    isVIP: false,
    avatar: 'https://i.pravatar.cc/40?img=2'
  },
  {
    id: 3,
    name: 'Sophie Lefebvre',
    email: 'sophie.lefebvre@example.com',
    phone: '06 34 56 78 90',
    totalDonated: '2 500 €',
    lastDonation: '18/06/2025',
    donationType: 'regular',
    isVIP: true,
    avatar: 'https://i.pravatar.cc/40?img=3'
  },
  {
    id: 4,
    name: 'Thomas Bernard',
    email: 'thomas.bernard@example.com',
    phone: '06 45 67 89 01',
    totalDonated: '75 €',
    lastDonation: '17/06/2025',
    donationType: 'one-time',
    isVIP: false,
    avatar: 'https://i.pravatar.cc/40?img=4'
  },
  {
    id: 5,
    name: 'Émilie Petit',
    email: 'emilie.petit@example.com',
    phone: '06 56 78 90 12',
    totalDonated: '3 200 €',
    lastDonation: '15/06/2025',
    donationType: 'regular',
    isVIP: true,
    avatar: 'https://i.pravatar.cc/40?img=5'
  },
  {
    id: 6,
    name: 'Pierre Dubois',
    email: 'pierre.dubois@example.com',
    phone: '06 67 89 01 23',
    totalDonated: '150 €',
    lastDonation: '10/06/2025',
    donationType: 'one-time',
    isVIP: false,
    avatar: 'https://i.pravatar.cc/40?img=6'
  },
  {
    id: 7,
    name: 'Julie Moreau',
    email: 'julie.moreau@example.com',
    phone: '06 78 90 12 34',
    totalDonated: '850 €',
    lastDonation: '05/06/2025',
    donationType: 'regular',
    isVIP: false,
    avatar: 'https://i.pravatar.cc/40?img=7'
  },
  {
    id: 8,
    name: 'Nicolas Leroy',
    email: 'nicolas.leroy@example.com',
    phone: '06 89 01 23 45',
    totalDonated: '300 €',
    lastDonation: '01/06/2025',
    donationType: 'one-time',
    isVIP: false,
    avatar: 'https://i.pravatar.cc/40?img=8'
  },
];

const Donors: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [filter, setFilter] = useState<DonorType | 'all' | 'vip'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'amount'>('date');
  
  // Accès aux traductions selon la langue sélectionnée
  const t = translations[language];

  // Filtrer les donateurs
  const filteredDonors = mockDonors
    .filter(donor => {
      if (filter === 'all') return true;
      if (filter === 'vip') return donor.isVIP;
      return donor.donationType === filter;
    })
    .filter(donor => 
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Trier les donateurs
  const sortedDonors = [...filteredDonors].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      // Convertir les dates au format JJ/MM/AAAA en objets Date pour le tri
      const aDate = new Date(a.lastDonation.split('/').reverse().join('-'));
      const bDate = new Date(b.lastDonation.split('/').reverse().join('-'));
      return bDate.getTime() - aDate.getTime();
    } else {
      // Convertir les montants en nombres pour le tri
      const aAmount = parseFloat(a.totalDonated.replace(/[^0-9]/g, ''));
      const bAmount = parseFloat(b.totalDonated.replace(/[^0-9]/g, ''));
      return bAmount - aAmount;
    }
  });

  // Obtenir le texte du type de donateur
  const getDonorTypeText = (type: DonorType) => {
    return type === 'regular' ? t.regular : t.oneTime;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.donors}</h2>
        <div className="flex items-center gap-3">
          <div className="flex border rounded-md overflow-hidden">
            <button onClick={() => setLanguage('fr')} className={`px-2 py-1 text-xs ${language === 'fr' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>FR</button>
            <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs ${language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>EN</button>
            <button onClick={() => setLanguage('he')} className={`px-2 py-1 text-xs ${language === 'he' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>HE</button>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm text-gray-500">{t.filter}:</span>
          </div>
          <div className="flex border rounded-md overflow-hidden">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-3 py-1 text-xs ${filter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              {t.all}
            </button>
            <button 
              onClick={() => setFilter('regular')} 
              className={`px-3 py-1 text-xs ${filter === 'regular' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              {t.regular}
            </button>
            <button 
              onClick={() => setFilter('one-time')} 
              className={`px-3 py-1 text-xs ${filter === 'one-time' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              {t.oneTime}
            </button>
            <button 
              onClick={() => setFilter('vip')} 
              className={`px-3 py-1 text-xs ${filter === 'vip' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              {t.vip}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUp size={16} className="text-gray-500" />
            <span className="text-sm text-gray-500">{t.sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'amount')}
              className="border-gray-300 rounded-md text-sm focus:outline-none py-1"
            >
              <option value="name">{t.sortByName}</option>
              <option value="date">{t.sortByDate}</option>
              <option value="amount">{t.sortByAmount}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {filteredDonors.length} {t.resultsCount}
        </p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-md text-sm">
            <Mail size={16} />
            {t.contactAll}
          </button>
          <button className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-md text-sm">
            <Download size={16} />
            {t.exportData}
          </button>
        </div>
      </div>

      {/* Liste des donateurs */}
      {filteredDonors.length > 0 ? (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.name}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.email}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.totalDonated}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.lastDonation}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.donationType}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedDonors.map((donor) => (
                  <tr key={donor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <img className="h-10 w-10 rounded-full" src={donor.avatar} alt="" />
                          {donor.isVIP && (
                            <span className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                              <Star size={10} className="text-white" />
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                          <div className="text-sm text-gray-500">{donor.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{donor.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">{donor.totalDonated}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{donor.lastDonation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        donor.donationType === 'regular' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {getDonorTypeText(donor.donationType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button className="text-indigo-600 hover:text-indigo-900" title={t.viewProfile}>
                          <Eye size={18} />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900" title={t.contact}>
                          <MessageCircle size={18} />
                        </button>
                        <button 
                          className={`${donor.isVIP ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`} 
                          title={t.markAsVIP}
                        >
                          <Star size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">{t.noResults}</p>
        </div>
      )}
    </div>
  );
};

export default Donors;
