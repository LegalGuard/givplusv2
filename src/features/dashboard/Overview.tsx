import React, { useState } from 'react';
import { Medal, Download, Calendar, Bell, Globe } from 'lucide-react';
import { useDonor } from '../../context/DonorContext';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Langues disponibles
type Language = 'fr' | 'en' | 'he';

// Traductions
const translations = {
  fr: {
    greeting: 'Bonjour',
    totalDonations: 'Total des dons',
    donationCount: 'Nombre de dons',
    activeRecurring: 'Dons récurrents actifs',
    recentDonations: 'Dons récents',
    badgeObjectives: 'Objectifs badges',
    progressTowards: 'Progrès vers',
    remaining: 'Il vous reste',
    toReach: 'pour atteindre',
    upcomingEvents: 'Prochains événements',
    taxReceipts: 'Derniers reçus fiscaux',
    download: 'Télécharger',
    switchLanguage: 'Changer de langue',
    campaigns: 'Campagnes recommandées',
    viewAll: 'Voir tout',
  },
  en: {
    greeting: 'Hello',
    totalDonations: 'Total donations',
    donationCount: 'Donation count',
    activeRecurring: 'Active recurring donations',
    recentDonations: 'Recent donations',
    badgeObjectives: 'Badge objectives',
    progressTowards: 'Progress towards',
    remaining: 'You need',
    toReach: 'to reach',
    upcomingEvents: 'Upcoming events',
    taxReceipts: 'Recent tax receipts',
    download: 'Download',
    switchLanguage: 'Switch language',
    campaigns: 'Recommended campaigns',
    viewAll: 'View all',
  },
  he: {
    greeting: 'שלום',
    totalDonations: 'סך התרומות',
    donationCount: 'מספר תרומות',
    activeRecurring: 'תרומות קבועות פעילות',
    recentDonations: 'תרומות אחרונות',
    badgeObjectives: 'יעדי תגים',
    progressTowards: 'התקדמות לקראת',
    remaining: 'נותרו לך',
    toReach: 'להשגת',
    upcomingEvents: 'אירועים קרובים',
    taxReceipts: 'קבלות מס אחרונות',
    download: 'הורדה',
    switchLanguage: 'החלף שפה',
    campaigns: 'קמפיינים מומלצים',
    viewAll: 'צפה בהכל',
  },
};

const Overview: React.FC = () => {
  const { donor, donations, events, taxDocs, recurring } = useDonor();
  const [language, setLanguage] = useState<Language>('fr');
  
  // Accès aux traductions selon la langue sélectionnée
  const t = translations[language];

  // ---------- Dynamic objectives ----------
  const thresholds = { Silver: 5000, Gold: 10000 } as const;
  const currentFloor = donor.badge === 'Gold' ? thresholds.Silver : donor.badge === 'Platinum' ? thresholds.Gold : 0;
  const nextTarget = donor.badge === 'Silver' ? thresholds.Silver : donor.badge === 'Gold' ? thresholds.Gold : null;
  const nextBadge = donor.badge === 'Silver' ? 'Gold' : donor.badge === 'Gold' ? 'Platinum' : null;

  const donatedWithinTier = donor.totalDonated - currentFloor;
  const remaining = nextTarget ? Math.max(nextTarget - donor.totalDonated, 0) : 0;

  // ---------------------------------------

  const barData = {
    labels: donations.slice(0, 6).map((d) => d.date),
    datasets: [
      {
        label: 'Dons (EUR)',
        data: donations.slice(0, 6).map((d) => d.amount),
        backgroundColor: '#6366f1',
      },
    ],
  };

  const outerTarget = 10000; // Platinum threshold
  const globalPct = Math.min((donor.totalDonated / outerTarget) * 100, 100);
  const tierPct = nextTarget ? Math.min((donatedWithinTier / (nextTarget - currentFloor)) * 100, 100) : 0;

  const badgeColor: Record<typeof donor.badge, string> = {
    Silver: 'bg-gray-400',
    Gold: 'bg-yellow-400',
    Platinum: 'bg-indigo-400',
  } as const;

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={donor.avatar} alt="avatar" className="h-16 w-16 rounded-full" />
          <div>
            <h2 className="text-xl font-bold">{t.greeting} {donor.firstName}</h2>
            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full ${badgeColor[donor.badge]}`}> <Medal size={12} />
              {donor.badge}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={20} className="text-indigo-600 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </div>
          <div className="flex border rounded-md overflow-hidden">
            <button 
              onClick={() => setLanguage('fr')} 
              className={`px-2 py-1 text-xs ${language === 'fr' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}
            >
              FR
            </button>
            <button 
              onClick={() => setLanguage('en')} 
              className={`px-2 py-1 text-xs ${language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('he')} 
              className={`px-2 py-1 text-xs ${language === 'he' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}
            >
              HE
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">{t.totalDonations}</p>
          <p className="text-3xl font-bold text-indigo-600">{donor.totalDonated.toLocaleString()} €</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">{t.donationCount}</p>
          <p className="text-3xl font-bold text-indigo-600">{donations.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">{t.activeRecurring}</p>
          <p className="text-3xl font-bold text-indigo-600">{recurring.filter((r) => r.active).length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold mb-2">{t.recentDonations}</h3>
          <Bar data={barData} />
        </div>
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h3 className="font-semibold">{t.badgeObjectives}</h3>
          {/* Barre principale vers Platinum */}
          <div className="space-y-1">
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-4 bg-indigo-600"
                style={{ width: `${globalPct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>0 €</span>
              <span>5 000 € (Gold)</span>
              <span>10 000 € (Platinum)</span>
            </div>
          </div>

          {/* Barre palier courant */}
          {nextTarget && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-600">{t.progressTowards} {nextBadge}</p>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-indigo-400"
                  style={{ width: `${tierPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{t.remaining} {remaining.toLocaleString()} € {t.toReach} {nextBadge}</p>
            </div>
          )}

          </div>
        </div>

      {/* Upcoming events */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t.upcomingEvents}</h3>
          <button className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
            <Calendar size={14} />
            {t.viewAll}
          </button>
        </div>
        <ul className="divide-y text-sm">
          {events.slice(0, 3).map((ev) => (
            <li key={ev.id} className="flex items-center gap-3 bg-indigo-50/30 rounded-lg p-3 hover:shadow transition">
              <img src={ev.banner} alt={ev.title} className="h-10 w-14 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium text-sm truncate">{ev.title}</p>
                <p className="text-xs text-gray-500">{ev.location}</p>
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">{ev.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent tax documents */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t.taxReceipts}</h3>
          <button className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
            <Download size={14} />
            {t.viewAll}
          </button>
        </div>
        <ul className="divide-y text-sm">
          {taxDocs.slice(0, 3).map((d) => (
            <li key={d.id} className="py-2 flex justify-between">
              <span>{d.ref}</span>
              <button className="text-indigo-600 hover:underline flex items-center gap-1">
                <Download size={12} />
                {t.download}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended campaigns - New section */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t.campaigns}</h3>
          <button className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
            <Globe size={14} />
            {t.viewAll}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="h-32 bg-indigo-100 relative">
                <div className="absolute bottom-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                  {Math.floor(Math.random() * 90) + 10}%
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm">Campagne {i}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{Math.floor(Math.random() * 10000) + 1000}€ / {Math.floor(Math.random() * 20000) + 10000}€</span>
                  <button className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded hover:bg-indigo-100">Contribuer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
