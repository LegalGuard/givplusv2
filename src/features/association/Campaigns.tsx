import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Heart, Calendar, Users, ArrowUp } from 'lucide-react';

// Types pour les langues disponibles
type Language = 'fr' | 'en' | 'he';

// Traductions
const translations = {
  fr: {
    campaigns: 'Campagnes',
    createCampaign: 'Créer une campagne',
    search: 'Rechercher une campagne...',
    filter: 'Filtrer',
    active: 'Actives',
    completed: 'Terminées',
    upcoming: 'À venir',
    all: 'Toutes',
    name: 'Nom',
    goal: 'Objectif',
    raised: 'Collecté',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    status: 'Statut',
    actions: 'Actions',
    edit: 'Modifier',
    delete: 'Supprimer',
    statusActive: 'Active',
    statusCompleted: 'Terminée',
    statusUpcoming: 'À venir',
    donorsCount: 'Donateurs',
    viewDetails: 'Voir les détails',
    sortBy: 'Trier par',
    sortByName: 'Nom',
    sortByDate: 'Date',
    sortByAmount: 'Montant collecté',
  },
  en: {
    campaigns: 'Campaigns',
    createCampaign: 'Create Campaign',
    search: 'Search campaigns...',
    filter: 'Filter',
    active: 'Active',
    completed: 'Completed',
    upcoming: 'Upcoming',
    all: 'All',
    name: 'Name',
    goal: 'Goal',
    raised: 'Raised',
    startDate: 'Start Date',
    endDate: 'End Date',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    statusActive: 'Active',
    statusCompleted: 'Completed',
    statusUpcoming: 'Upcoming',
    donorsCount: 'Donors',
    viewDetails: 'View Details',
    sortBy: 'Sort by',
    sortByName: 'Name',
    sortByDate: 'Date',
    sortByAmount: 'Amount raised',
  },
  he: {
    campaigns: 'מבצעים',
    createCampaign: 'צור קמפיין',
    search: 'חפש קמפיינים...',
    filter: 'סנן',
    active: 'פעילים',
    completed: 'הושלמו',
    upcoming: 'קרובים',
    all: 'הכל',
    name: 'שם',
    goal: 'יעד',
    raised: 'גויס',
    startDate: 'תאריך התחלה',
    endDate: 'תאריך סיום',
    status: 'סטטוס',
    actions: 'פעולות',
    edit: 'ערוך',
    delete: 'מחק',
    statusActive: 'פעיל',
    statusCompleted: 'הושלם',
    statusUpcoming: 'קרוב',
    donorsCount: 'תורמים',
    viewDetails: 'צפה בפרטים',
    sortBy: 'מיין לפי',
    sortByName: 'שם',
    sortByDate: 'תאריך',
    sortByAmount: 'סכום שגויס',
  },
};

// Types pour les campagnes
type CampaignStatus = 'active' | 'completed' | 'upcoming';

interface Campaign {
  id: number;
  name: string;
  description: string;
  goal: string;
  raised: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  donorsCount: number;
  image: string;
}

// Données fictives
const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Aide d'urgence",
    description: "Campagne d'aide d'urgence pour les sinistrés des inondations",
    goal: "10 000 €",
    raised: "7 500 €",
    progress: 75,
    startDate: "01/05/2025",
    endDate: "31/07/2025",
    status: "active",
    donorsCount: 85,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Construction école",
    description: "Financement pour la construction d'une école primaire",
    goal: "50 000 €",
    raised: "22 500 €",
    progress: 45,
    startDate: "15/03/2025",
    endDate: "15/09/2025",
    status: "active",
    donorsCount: 120,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Programme alimentaire",
    description: "Distribution de repas pour les familles en difficulté",
    goal: "5 000 €",
    raised: "4 500 €",
    progress: 90,
    startDate: "01/06/2025",
    endDate: "31/08/2025",
    status: "active",
    donorsCount: 65,
    image: "https://images.unsplash.com/photo-1488330890490-36e0ea80d6eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    name: "Soutien médical",
    description: "Achat de matériel médical pour un dispensaire",
    goal: "15 000 €",
    raised: "4 500 €",
    progress: 30,
    startDate: "01/04/2025",
    endDate: "30/09/2025",
    status: "active",
    donorsCount: 42,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 5,
    name: "Rénovation centre d'accueil",
    description: "Travaux de rénovation pour un centre d'accueil",
    goal: "25 000 €",
    raised: "25 000 €",
    progress: 100,
    startDate: "01/01/2025",
    endDate: "31/03/2025",
    status: "completed",
    donorsCount: 130,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 6,
    name: "Festival solidaire",
    description: "Organisation d'un festival de musique solidaire",
    goal: "8 000 €",
    raised: "0 €",
    progress: 0,
    startDate: "01/09/2025",
    endDate: "30/11/2025",
    status: "upcoming",
    donorsCount: 0,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
];

const Campaigns: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [filter, setFilter] = useState<CampaignStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'amount'>('date');
  
  // Accès aux traductions selon la langue sélectionnée
  const t = translations[language];

  // Filtrer les campagnes
  const filteredCampaigns = mockCampaigns
    .filter(campaign => filter === 'all' || campaign.status === filter)
    .filter(campaign => campaign.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Trier les campagnes
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      return new Date(a.startDate.split('/').reverse().join('-')).getTime() - 
             new Date(b.startDate.split('/').reverse().join('-')).getTime();
    } else {
      // Convertir les montants en nombres pour le tri
      const aAmount = parseFloat(a.raised.replace(/[^0-9]/g, ''));
      const bAmount = parseFloat(b.raised.replace(/[^0-9]/g, ''));
      return bAmount - aAmount;
    }
  });

  // Obtenir la couleur de statut
  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Obtenir le texte de statut traduit
  const getStatusText = (status: CampaignStatus) => {
    switch (status) {
      case 'active':
        return t.statusActive;
      case 'completed':
        return t.statusCompleted;
      case 'upcoming':
        return t.statusUpcoming;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.campaigns}</h2>
        <div className="flex items-center gap-3">
          <div className="flex border rounded-md overflow-hidden">
            <button onClick={() => setLanguage('fr')} className={`px-2 py-1 text-xs ${language === 'fr' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>FR</button>
            <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs ${language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>EN</button>
            <button onClick={() => setLanguage('he')} className={`px-2 py-1 text-xs ${language === 'he' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>HE</button>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
            <Plus size={16} />
            {t.createCampaign}
          </button>
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
              onClick={() => setFilter('active')} 
              className={`px-3 py-1 text-xs ${filter === 'active' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              {t.active}
            </button>
            <button 
              onClick={() => setFilter('completed')} 
              className={`px-3 py-1 text-xs ${filter === 'completed' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              {t.completed}
            </button>
            <button 
              onClick={() => setFilter('upcoming')} 
              className={`px-3 py-1 text-xs ${filter === 'upcoming' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              {t.upcoming}
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

      {/* Liste des campagnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCampaigns.map(campaign => (
          <div key={campaign.id} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="h-40 overflow-hidden">
              <img 
                src={campaign.image} 
                alt={campaign.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{campaign.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                  {getStatusText(campaign.status)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{campaign.raised} / {campaign.goal}</span>
                  <span>{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{campaign.startDate} - {campaign.endDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{campaign.donorsCount} {t.donorsCount}</span>
                </div>
              </div>
              
              <div className="flex justify-between pt-2">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  {t.viewDetails}
                </button>
                <div className="flex gap-2">
                  <button className="text-gray-500 hover:text-indigo-600">
                    <Edit size={16} />
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCampaigns.length === 0 && (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Aucune campagne ne correspond à vos critères de recherche.</p>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
