import React, { useState } from 'react';
import { BarChart as ChartIcon, TrendingUp, Users, FileText, Globe, Download, ExternalLink } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Language = 'fr' | 'en' | 'he';

const translations = {
  fr: {
    totalCollected: 'Total collecté',
    activeCampaigns: 'Campagnes actives',
    donorsCount: 'Nombre de donateurs',
    pendingDocs: 'Documents en attente',
    monthlySummary: 'Résumé mensuel',
    recentDonations: 'Dons récents',
    viewAll: 'Voir tout',
    documentsPending: 'Documents en attente',
    publish: 'Publier',
    downloadReport: 'Télécharger le rapport',
    activeProjects: 'Projets actifs',
    donors: 'Donateurs',
    amount: 'Montant',
    date: 'Date',
    viewDonor: 'Voir le profil',
    expiresOn: 'Expire le',
    status: 'Statut',
    started: 'Démarré le',
    edit: 'Modifier',
    manage: 'Gérer',
    statsAndInsights: 'Statistiques et analyses',
    donorEngagement: 'Engagement des donateurs',
    recurring: 'Récurrents',
    oneTime: 'Uniques',
    targetedGoal: 'Objectif ciblé',
    publishMore: 'Ajoutez plus de contenu pour améliorer votre visibilité',
    revenueByChannel: 'Revenus par canal',
    direct: 'Direct',
    social: 'Réseaux sociaux',
    partnerships: 'Partenaires'
  },
  en: {
    totalCollected: 'Total collected',
    activeCampaigns: 'Active campaigns',
    donorsCount: 'Number of donors',
    pendingDocs: 'Pending documents',
    monthlySummary: 'Monthly summary',
    recentDonations: 'Recent donations',
    viewAll: 'View all',
    documentsPending: 'Pending documents',
    publish: 'Publish',
    downloadReport: 'Download report',
    activeProjects: 'Active projects',
    donors: 'Donors',
    amount: 'Amount',
    date: 'Date',
    viewDonor: 'View profile',
    expiresOn: 'Expires on',
    status: 'Status',
    started: 'Started on',
    edit: 'Edit',
    manage: 'Manage',
    statsAndInsights: 'Stats & Insights',
    donorEngagement: 'Donor engagement',
    recurring: 'Recurring',
    oneTime: 'One-time',
    targetedGoal: 'Targeted goal',
    publishMore: 'Add more content to improve your visibility',
    revenueByChannel: 'Revenue by channel',
    direct: 'Direct',
    social: 'Social media',
    partnerships: 'Partnerships'
  },
  he: {
    totalCollected: 'סה״כ נאסף',
    activeCampaigns: 'קמפיינים פעילים',
    donorsCount: 'מספר תורמים',
    pendingDocs: 'מסמכים בהמתנה',
    monthlySummary: 'סיכום חודשי',
    recentDonations: 'תרומות אחרונות',
    viewAll: 'צפה בהכל',
    documentsPending: 'מסמכים בהמתנה',
    publish: 'פרסם',
    downloadReport: 'הורד דו״ח',
    activeProjects: 'פרויקטים פעילים',
    donors: 'תורמים',
    amount: 'סכום',
    date: 'תאריך',
    viewDonor: 'צפה בפרופיל',
    expiresOn: 'פג תוקף ב',
    status: 'סטטוס',
    started: 'התחיל ב',
    edit: 'ערוך',
    manage: 'ניהול',
    statsAndInsights: 'סטטיסטיקות ותובנות',
    donorEngagement: 'מעורבות תורמים',
    recurring: 'חוזרים',
    oneTime: 'חד פעמיים',
    targetedGoal: 'יעד',
    publishMore: 'הוסף תוכן נוסף כדי לשפר את הנראות שלך',
    revenueByChannel: 'הכנסות לפי ערוץ',
    direct: 'ישיר',
    social: 'רשתות חברתיות',
    partnerships: 'שותפויות'
  }
};

const Overview: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const t = translations[language];

  // Données fictives de l'association
  const associationData = {
    totalCollected: 68450,
    activeCampaigns: 3,
    donorsCount: 287,
    pendingDocs: 5,
    recentDonations: [
      { id: 1, donor: 'Michel Dupont', amount: 250, date: '23/06/2025' },
      { id: 2, donor: 'Sarah Cohen', amount: 500, date: '22/06/2025' },
      { id: 3, donor: 'David Levy', amount: 100, date: '20/06/2025' },
      { id: 4, donor: 'Anna Martin', amount: 75, date: '19/06/2025' },
    ],
    pendingDocuments: [
      { id: 1, name: 'Reçu fiscal #45892', expiresOn: '30/06/2025' },
      { id: 2, name: 'Attestation don #12408', expiresOn: '05/07/2025' },
      { id: 3, name: 'Rapport financier Mai', expiresOn: '15/07/2025' },
    ],
    activeProjects: [
      { id: 1, name: 'Aide aux victimes du Sud', status: 'En cours', started: '01/05/2025', progress: 65 },
      { id: 2, name: 'Rénovation centre communautaire', status: 'En cours', started: '15/04/2025', progress: 40 },
      { id: 3, name: 'Distribution repas Shabbat', status: 'En cours', started: '01/06/2025', progress: 25 },
    ]
  };

  // Données du graphique de dons mensuels
  const monthlyDonationsData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: t.totalCollected,
        data: [8200, 7500, 10400, 12300, 15600, 14450],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: '#6366f1',
        borderWidth: 1,
      }
    ]
  };

  // Données du graphique d'engagement des donateurs
  const donorEngagementData = {
    labels: [t.recurring, t.oneTime],
    datasets: [
      {
        data: [35, 65],
        backgroundColor: ['#6366f1', '#cbd5e1'],
        borderWidth: 0,
      }
    ]
  };

  // Données du graphique des revenus par canal
  const revenueByChannelData = {
    labels: [t.direct, t.social, t.partnerships],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#6366f1', '#f59e0b', '#10b981'],
        borderWidth: 0,
      }
    ]
  };

  // Options de graphique
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.totalCollected}</p>
              <h3 className="mt-1 text-2xl font-semibold">{associationData.totalCollected.toLocaleString()} €</h3>
            </div>
            <div className="p-2 bg-indigo-100 rounded">
              <TrendingUp size={20} className="text-indigo-600" />
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">85% de l'objectif annuel</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.activeCampaigns}</p>
              <h3 className="mt-1 text-2xl font-semibold">{associationData.activeCampaigns}</h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded">
              <ChartIcon size={20} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <span className="text-green-600">+1</span>
            <span className="ml-1 text-gray-500">depuis le mois dernier</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.donorsCount}</p>
              <h3 className="mt-1 text-2xl font-semibold">{associationData.donorsCount}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <span className="text-green-600">+15</span>
            <span className="ml-1 text-gray-500">depuis le mois dernier</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.pendingDocs}</p>
              <h3 className="mt-1 text-2xl font-semibold">{associationData.pendingDocs}</h3>
            </div>
            <div className="p-2 bg-red-100 rounded">
              <FileText size={20} className="text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <button className="text-indigo-600 font-medium">Voir les documents</button>
          </div>
        </div>
      </div>

      {/* Graphique résumé mensuel et dons récents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{t.monthlySummary}</h3>
            <button className="text-indigo-600 text-sm flex items-center">
              <Download size={14} className="mr-1" />
              {t.downloadReport}
            </button>
          </div>
          <div className="h-64">
            <Bar data={monthlyDonationsData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{t.recentDonations}</h3>
            <button className="text-indigo-600 text-sm">{t.viewAll}</button>
          </div>
          <div className="space-y-3">
            {associationData.recentDonations.map(donation => (
              <div key={donation.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{donation.donor}</p>
                  <p className="text-xs text-gray-500">{donation.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{donation.amount}€</p>
                  <button className="text-xs text-indigo-600 flex items-center">
                    <Users size={12} className="mr-1" />
                    {t.viewDonor}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents en attente et projets actifs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{t.documentsPending}</h3>
            <button className="text-indigo-600 text-sm">{t.viewAll}</button>
          </div>
          <div className="space-y-3">
            {associationData.pendingDocuments.map(doc => (
              <div key={doc.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-500 mr-1">{t.expiresOn}:</p>
                    <p className="text-xs text-red-500">{doc.expiresOn}</p>
                  </div>
                </div>
                <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded">
                  {t.publish}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{t.activeProjects}</h3>
            <button className="text-indigo-600 text-sm">{t.viewAll}</button>
          </div>
          <div className="space-y-4">
            {associationData.activeProjects.map(project => (
              <div key={project.id} className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{project.name}</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1 mb-3">
                  <span className="mr-2">{t.started}:</span>
                  <span>{project.started}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-3">
                  <p className="text-sm">{project.progress}% {t.targetedGoal}</p>
                  <div className="flex space-x-2">
                    <button className="text-xs flex items-center text-indigo-600">
                      <ExternalLink size={12} className="mr-1" />
                      {t.edit}
                    </button>
                    <button className="text-xs text-indigo-600">
                      {t.manage}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques et analyses */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4">{t.statsAndInsights}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">{t.donorEngagement}</h4>
            <div className="h-48">
              <Bar data={donorEngagementData} options={chartOptions} />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">{t.publishMore}</p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">{t.revenueByChannel}</h4>
            <div className="h-48">
              <Bar data={revenueByChannelData} options={chartOptions} />
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-blue-50">
            <h4 className="text-sm font-medium mb-2">Impact & Visibilité</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Engagement sur les réseaux</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Visites du profil</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Taux de conversion</span>
                  <span className="font-medium">23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t">
              <h5 className="text-xs font-medium mb-2">Conseils d'amélioration</h5>
              <ul className="text-xs space-y-1">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                  <span>Ajoutez des photos de vos actions récentes</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                  <span>Mettez à jour votre description</span>
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                  <span>Publiez plus de témoignages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
