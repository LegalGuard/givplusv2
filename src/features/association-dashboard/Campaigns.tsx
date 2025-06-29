import React, { useState } from 'react';
import { Plus, Edit, Trash2, MoreHorizontal, Clock, Users, TrendingUp, ExternalLink, Search } from 'lucide-react';

type Language = 'fr' | 'en' | 'he';

const translations = {
  fr: {
    campaigns: 'Campagnes',
    createCampaign: 'Créer une campagne',
    allCampaigns: 'Toutes les campagnes',
    active: 'Actives',
    draft: 'Brouillons',
    completed: 'Complétées',
    search: 'Rechercher une campagne...',
    campaignName: 'Nom de la campagne',
    status: 'Statut',
    raised: 'Collecté',
    goal: 'Objectif',
    remaining: 'Restant',
    donors: 'Donateurs',
    actions: 'Actions',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    noCampaigns: 'Aucune campagne trouvée',
    createFirst: 'Créez votre première campagne',
    of: 'sur',
    days: 'jours restants',
    publish: 'Publier',
    statistics: 'Statistiques',
    draftDesc: 'Ce brouillon n\'est pas visible par le public'
  },
  en: {
    campaigns: 'Campaigns',
    createCampaign: 'Create campaign',
    allCampaigns: 'All campaigns',
    active: 'Active',
    draft: 'Drafts',
    completed: 'Completed',
    search: 'Search for a campaign...',
    campaignName: 'Campaign name',
    status: 'Status',
    raised: 'Raised',
    goal: 'Goal',
    remaining: 'Remaining',
    donors: 'Donors',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    noCampaigns: 'No campaigns found',
    createFirst: 'Create your first campaign',
    of: 'of',
    days: 'days left',
    publish: 'Publish',
    statistics: 'Statistics',
    draftDesc: 'This draft is not visible to the public'
  },
  he: {
    campaigns: 'קמפיינים',
    createCampaign: 'צור קמפיין',
    allCampaigns: 'כל הקמפיינים',
    active: 'פעילים',
    draft: 'טיוטות',
    completed: 'הושלמו',
    search: 'חפש קמפיין...',
    campaignName: 'שם הקמפיין',
    status: 'סטטוס',
    raised: 'נאסף',
    goal: 'יעד',
    remaining: 'נותר',
    donors: 'תורמים',
    actions: 'פעולות',
    edit: 'ערוך',
    delete: 'מחק',
    view: 'צפה',
    noCampaigns: 'לא נמצאו קמפיינים',
    createFirst: 'צור את הקמפיין הראשון שלך',
    of: 'מתוך',
    days: 'ימים נותרו',
    publish: 'פרסם',
    statistics: 'סטטיסטיקות',
    draftDesc: 'טיוטה זו אינה גלויה לציבור'
  }
};

// Types pour les données des campagnes
type CampaignStatus = 'active' | 'draft' | 'completed';

interface Campaign {
  id: number;
  name: string;
  status: CampaignStatus;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number | null;
  image: string;
  createdAt: string;
}

const Campaigns: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [activeTab, setActiveTab] = useState<'all' | CampaignStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const t = translations[language];

  // Données fictives des campagnes
  const campaigns: Campaign[] = [
    {
      id: 1,
      name: 'Aide aux familles victimes du Sud',
      status: 'active',
      raised: 34500,
      goal: 50000,
      donors: 187,
      daysLeft: 15,
      image: 'https://via.placeholder.com/100',
      createdAt: '01/05/2025'
    },
    {
      id: 2,
      name: 'Rénovation du centre communautaire',
      status: 'active',
      raised: 12800,
      goal: 30000,
      donors: 64,
      daysLeft: 28,
      image: 'https://via.placeholder.com/100',
      createdAt: '15/05/2025'
    },
    {
      id: 3,
      name: 'Distribution de repas de Shabbat',
      status: 'completed',
      raised: 5000,
      goal: 5000,
      donors: 35,
      daysLeft: null,
      image: 'https://via.placeholder.com/100',
      createdAt: '01/04/2025'
    },
    {
      id: 4,
      name: 'Soutien psychologique post-traumatique',
      status: 'draft',
      raised: 0,
      goal: 20000,
      donors: 0,
      daysLeft: null,
      image: 'https://via.placeholder.com/100',
      createdAt: '10/06/2025'
    }
  ];

  // Filtrer les campagnes selon l'onglet actif et la recherche
  const filteredCampaigns = campaigns
    .filter(campaign => activeTab === 'all' || campaign.status === activeTab)
    .filter(campaign => 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Calculer le pourcentage de progression
  const calculateProgress = (raised: number, goal: number) => {
    return Math.min(Math.round((raised / goal) * 100), 100);
  };

  // Formater un montant en euros
  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()} €`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.campaigns}</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={16} />
          {t.createCampaign}
        </button>
      </div>

      {/* Onglets de filtrage */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t.allCampaigns}
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t.active}
          </button>
          <button
            onClick={() => setActiveTab('draft')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'draft'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t.draft}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t.completed}
          </button>
        </nav>
      </div>

      {/* Barre de recherche */}
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

      {/* Liste des campagnes */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 p-6">
            {filteredCampaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className="border border-gray-200 rounded-lg hover:shadow-md transition p-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  {/* Informations de la campagne */}
                  <div className="flex items-center space-x-3">
                    <img 
                      src={campaign.image} 
                      alt={campaign.name}
                      className="w-12 h-12 rounded-md object-cover" 
                    />
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <div className="flex items-center text-sm space-x-2">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            campaign.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : campaign.status === 'draft'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {campaign.status === 'active'
                            ? t.active
                            : campaign.status === 'draft'
                            ? t.draft
                            : t.completed}
                        </span>
                        {campaign.status === 'draft' && (
                          <span className="text-xs text-gray-500">{t.draftDesc}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progression et statistiques */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">{t.raised}</p>
                      <p className="font-semibold">{formatAmount(campaign.raised)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">{t.goal}</p>
                      <p className="font-semibold">{formatAmount(campaign.goal)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">{t.donors}</p>
                      <p className="font-semibold">{campaign.donors}</p>
                    </div>
                    <div className="text-center">
                      {campaign.daysLeft !== null ? (
                        <>
                          <p className="text-xs text-gray-500">{t.remaining}</p>
                          <p className="font-semibold">{campaign.daysLeft} {t.days}</p>
                        </>
                      ) : campaign.status === 'draft' ? (
                        <button 
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-1 rounded"
                        >
                          {t.publish}
                        </button>
                      ) : (
                        <button 
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {t.statistics}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-500 hover:text-indigo-600 p-1"
                      title={t.view}
                    >
                      <ExternalLink size={18} />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-indigo-600 p-1"
                      title={t.edit}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-red-600 p-1"
                      title={t.delete}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                {/* Barre de progression */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${campaign.status === 'completed' ? 'bg-blue-600' : 'bg-indigo-600'}`}
                      style={{ width: `${calculateProgress(campaign.raised, campaign.goal)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span>
                      {calculateProgress(campaign.raised, campaign.goal)}%
                    </span>
                    <span>
                      {formatAmount(campaign.raised)} {t.of} {formatAmount(campaign.goal)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="bg-gray-100 rounded-full p-4 mb-3">
              <Plus size={24} className="text-gray-500" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-1">{t.noCampaigns}</p>
            <p className="text-sm text-gray-500">{t.createFirst}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
