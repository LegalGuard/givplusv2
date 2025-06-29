import React, { useState } from 'react';
import { Search, Download, Filter, ChevronDown, Eye } from 'lucide-react';

type Language = 'fr' | 'en' | 'he';

const translations = {
  fr: {
    donations: 'Dons reçus',
    exportData: 'Exporter',
    search: 'Rechercher un don...',
    all: 'Tous',
    filter: 'Filtrer',
    donor: 'Donateur',
    campaign: 'Campagne',
    amount: 'Montant',
    date: 'Date',
    status: 'Statut',
    type: 'Type',
    actions: 'Actions',
    viewDetails: 'Voir détails',
    noDonations: 'Aucun don trouvé',
    oneTime: 'Ponctuel',
    recurring: 'Récurrent',
    completed: 'Complété',
    pending: 'En attente',
    totalDonations: 'Total des dons',
    averageDonation: 'Don moyen',
    recurringDonors: 'Donateurs récurrents',
    downloadReport: 'Télécharger le rapport'
  },
  en: {
    donations: 'Donations',
    exportData: 'Export',
    search: 'Search for a donation...',
    all: 'All',
    filter: 'Filter',
    donor: 'Donor',
    campaign: 'Campaign',
    amount: 'Amount',
    date: 'Date',
    status: 'Status',
    type: 'Type',
    actions: 'Actions',
    viewDetails: 'View details',
    noDonations: 'No donations found',
    oneTime: 'One-time',
    recurring: 'Recurring',
    completed: 'Completed',
    pending: 'Pending',
    totalDonations: 'Total donations',
    averageDonation: 'Average donation',
    recurringDonors: 'Recurring donors',
    downloadReport: 'Download report'
  },
  he: {
    donations: 'תרומות',
    exportData: 'ייצוא',
    search: 'חיפוש תרומה...',
    all: 'הכל',
    filter: 'סינון',
    donor: 'תורם',
    campaign: 'קמפיין',
    amount: 'סכום',
    date: 'תאריך',
    status: 'סטטוס',
    type: 'סוג',
    actions: 'פעולות',
    viewDetails: 'צפה בפרטים',
    noDonations: 'לא נמצאו תרומות',
    oneTime: 'חד פעמי',
    recurring: 'חוזר',
    completed: 'הושלם',
    pending: 'בהמתנה',
    totalDonations: 'סך כל התרומות',
    averageDonation: 'תרומה ממוצעת',
    recurringDonors: 'תורמים קבועים',
    downloadReport: 'הורד דו"ח'
  }
};

// Types pour les dons
interface Donation {
  id: number;
  donor: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  campaign: {
    id: number;
    name: string;
  };
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  type: 'one-time' | 'recurring';
}

const Donations: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  const t = translations[language];

  // Données fictives des dons
  const donations: Donation[] = [
    {
      id: 1,
      donor: {
        id: 101,
        name: 'Michel Dupont',
        email: 'michel@example.com',
        avatar: 'https://via.placeholder.com/40'
      },
      campaign: {
        id: 1,
        name: 'Aide aux familles victimes du Sud'
      },
      amount: 250,
      date: '23/06/2025',
      status: 'completed',
      type: 'one-time'
    },
    {
      id: 2,
      donor: {
        id: 102,
        name: 'Sarah Cohen',
        email: 'sarah@example.com',
        avatar: 'https://via.placeholder.com/40'
      },
      campaign: {
        id: 1,
        name: 'Aide aux familles victimes du Sud'
      },
      amount: 500,
      date: '22/06/2025',
      status: 'completed',
      type: 'recurring'
    },
    {
      id: 3,
      donor: {
        id: 103,
        name: 'David Levy',
        email: 'david@example.com',
        avatar: 'https://via.placeholder.com/40'
      },
      campaign: {
        id: 2,
        name: 'Rénovation du centre communautaire'
      },
      amount: 100,
      date: '20/06/2025',
      status: 'completed',
      type: 'one-time'
    },
    {
      id: 4,
      donor: {
        id: 104,
        name: 'Anna Martin',
        email: 'anna@example.com',
      },
      campaign: {
        id: 2,
        name: 'Rénovation du centre communautaire'
      },
      amount: 75,
      date: '19/06/2025',
      status: 'pending',
      type: 'one-time'
    },
    {
      id: 5,
      donor: {
        id: 105,
        name: 'Jonathan Klein',
        email: 'jonathan@example.com',
        avatar: 'https://via.placeholder.com/40'
      },
      campaign: {
        id: 1,
        name: 'Aide aux familles victimes du Sud'
      },
      amount: 150,
      date: '18/06/2025',
      status: 'completed',
      type: 'recurring'
    },
    {
      id: 6,
      donor: {
        id: 106,
        name: 'Élodie Bernard',
        email: 'elodie@example.com',
      },
      campaign: {
        id: 3,
        name: 'Distribution de repas de Shabbat'
      },
      amount: 50,
      date: '15/06/2025',
      status: 'completed',
      type: 'one-time'
    }
  ];

  // Filtrer les dons selon la recherche et le filtre
  const filteredDonations = donations
    .filter(donation => {
      if (filter === 'all') return true;
      if (filter === 'one-time') return donation.type === 'one-time';
      if (filter === 'recurring') return donation.type === 'recurring';
      if (filter === 'completed') return donation.status === 'completed';
      if (filter === 'pending') return donation.status === 'pending';
      return true;
    })
    .filter(donation => 
      donation.donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Statistiques
  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const averageDonation = totalAmount / donations.length || 0;
  const recurringDonors = new Set(
    donations
      .filter(donation => donation.type === 'recurring')
      .map(donation => donation.donor.id)
  ).size;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.donations}</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Download size={16} />
          {t.exportData}
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">{t.totalDonations}</p>
          <h3 className="mt-1 text-2xl font-semibold">{totalAmount.toLocaleString()} €</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">{t.averageDonation}</p>
          <h3 className="mt-1 text-2xl font-semibold">{Math.round(averageDonation).toLocaleString()} €</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">{t.recurringDonors}</p>
          <h3 className="mt-1 text-2xl font-semibold">{recurringDonors}</h3>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex space-x-2">
          <div className="relative">
            <button className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white text-sm">
              <Filter size={16} className="mr-2 text-gray-500" />
              <span>{t.filter}</span>
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </button>
            {/* Menu déroulant pour les filtres - dans une implémentation réelle */}
          </div>
          
          <button onClick={() => setFilter('all')} className={`px-3 py-2 border text-sm rounded-md ${filter === 'all' ? 'bg-indigo-100 border-indigo-300 text-indigo-800' : 'bg-white border-gray-300 text-gray-700'}`}>
            {t.all}
          </button>
          <button onClick={() => setFilter('recurring')} className={`px-3 py-2 border text-sm rounded-md ${filter === 'recurring' ? 'bg-indigo-100 border-indigo-300 text-indigo-800' : 'bg-white border-gray-300 text-gray-700'}`}>
            {t.recurring}
          </button>
          <button onClick={() => setFilter('pending')} className={`px-3 py-2 border text-sm rounded-md ${filter === 'pending' ? 'bg-indigo-100 border-indigo-300 text-indigo-800' : 'bg-white border-gray-300 text-gray-700'}`}>
            {t.pending}
          </button>
        </div>
      </div>

      {/* Tableau des dons */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {filteredDonations.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.donor}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.campaign}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.amount}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.date}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.status}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.type}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {donation.donor.avatar ? (
                            <img src={donation.donor.avatar} alt={donation.donor.name} className="h-8 w-8" />
                          ) : (
                            <span className="font-medium text-gray-600">{donation.donor.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{donation.donor.name}</div>
                          <div className="text-sm text-gray-500">{donation.donor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.campaign.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {donation.amount.toLocaleString()} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        donation.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {donation.status === 'completed' ? t.completed : t.pending}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.type === 'recurring' ? t.recurring : t.oneTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end">
                        <Eye size={16} className="mr-1" />
                        <span>{t.viewDetails}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">{t.noDonations}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donations;
