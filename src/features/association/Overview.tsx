import React, { useState } from 'react';
import { TrendingUp, Users, Heart, Calendar, ArrowUp, ArrowDown, Bell } from 'lucide-react';

// Types pour les langues disponibles
type Language = 'fr' | 'en' | 'he';

// Traductions
const translations = {
  fr: {
    greeting: 'Bonjour',
    overview: 'Aperçu',
    totalDonations: 'Total des dons',
    monthlyChange: 'Évolution mensuelle',
    donorsCount: 'Nombre de donateurs',
    activeCampaigns: 'Campagnes actives',
    upcomingEvents: 'Événements à venir',
    recentDonations: 'Dons récents',
    campaignProgress: 'Progression des campagnes',
    viewAll: 'Voir tout',
    topDonors: 'Meilleurs donateurs',
    donorName: 'Nom',
    donationAmount: 'Montant',
    donationDate: 'Date',
    eventName: 'Événement',
    eventDate: 'Date',
    attendees: 'Participants',
    campaignName: 'Campagne',
    goal: 'Objectif',
    raised: 'Collecté',
    progress: 'Progression',
    notifications: 'Notifications',
  },
  en: {
    greeting: 'Hello',
    overview: 'Overview',
    totalDonations: 'Total donations',
    monthlyChange: 'Monthly change',
    donorsCount: 'Donors count',
    activeCampaigns: 'Active campaigns',
    upcomingEvents: 'Upcoming events',
    recentDonations: 'Recent donations',
    campaignProgress: 'Campaign progress',
    viewAll: 'View all',
    topDonors: 'Top donors',
    donorName: 'Name',
    donationAmount: 'Amount',
    donationDate: 'Date',
    eventName: 'Event',
    eventDate: 'Date',
    attendees: 'Attendees',
    campaignName: 'Campaign',
    goal: 'Goal',
    raised: 'Raised',
    progress: 'Progress',
    notifications: 'Notifications',
  },
  he: {
    greeting: 'שלום',
    overview: 'סקירה כללית',
    totalDonations: 'סך כל התרומות',
    monthlyChange: 'שינוי חודשי',
    donorsCount: 'מספר תורמים',
    activeCampaigns: 'קמפיינים פעילים',
    upcomingEvents: 'אירועים קרובים',
    recentDonations: 'תרומות אחרונות',
    campaignProgress: 'התקדמות קמפיין',
    viewAll: 'צפה בהכל',
    topDonors: 'תורמים מובילים',
    donorName: 'שם',
    donationAmount: 'סכום',
    donationDate: 'תאריך',
    eventName: 'אירוע',
    eventDate: 'תאריך',
    attendees: 'משתתפים',
    campaignName: 'קמפיין',
    goal: 'יעד',
    raised: 'גויס',
    progress: 'התקדמות',
    notifications: 'התראות',
  },
};

// Données fictives
const mockAssociation = {
  name: 'Association Solidarité',
  logo: '/givplus-logo.png',
};

const mockStats = {
  totalDonations: '45 600 €',
  monthlyChange: '+12.5%',
  donorsCount: '328',
  donorsChange: '+5.2%',
  activeCampaigns: '4',
  campaignsChange: '0%',
};

const mockEvents = [
  { id: 1, name: 'Gala annuel', date: '15/07/2025', attendees: 120 },
  { id: 2, name: 'Collecte alimentaire', date: '22/07/2025', attendees: 45 },
  { id: 3, name: 'Webinaire donateurs', date: '05/08/2025', attendees: 78 },
];

const mockDonors = [
  { id: 1, name: 'Marie Dupont', amount: '250 €', date: '20/06/2025', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Jean Martin', amount: '120 €', date: '19/06/2025', avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: 3, name: 'Sophie Lefebvre', amount: '500 €', date: '18/06/2025', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 4, name: 'Thomas Bernard', amount: '75 €', date: '17/06/2025', avatar: 'https://i.pravatar.cc/40?img=4' },
];

const mockCampaigns = [
  { id: 1, name: 'Aide d\'urgence', progress: 75, goal: '10 000 €', current: '7 500 €' },
  { id: 2, name: 'Construction école', progress: 45, goal: '50 000 €', current: '22 500 €' },
  { id: 3, name: 'Programme alimentaire', progress: 90, goal: '5 000 €', current: '4 500 €' },
  { id: 4, name: 'Soutien médical', progress: 30, goal: '15 000 €', current: '4 500 €' },
];

const Overview: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  
  // Accès aux traductions selon la langue sélectionnée
  const t = translations[language];

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={mockAssociation.logo} alt="logo" className="h-16 w-16 rounded-full bg-white p-2 shadow" />
          <div>
            <h2 className="text-xl font-bold">{t.greeting}, {mockAssociation.name}</h2>
            <span className="text-gray-500">{t.overview}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={20} className="text-indigo-600 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </div>
          <div className="flex border rounded-md overflow-hidden">
            <button onClick={() => setLanguage('fr')} className={`px-2 py-1 text-xs ${language === 'fr' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>FR</button>
            <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs ${language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>EN</button>
            <button onClick={() => setLanguage('he')} className={`px-2 py-1 text-xs ${language === 'he' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>HE</button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-full">
                <TrendingUp size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t.totalDonations}</p>
                <p className="text-2xl font-bold">{mockStats.totalDonations}</p>
              </div>
            </div>
            <div className={`flex items-center ${mockStats.monthlyChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {mockStats.monthlyChange.startsWith('+') ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span className="text-sm font-medium">{mockStats.monthlyChange}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{t.monthlyChange}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Users size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t.donorsCount}</p>
                <p className="text-2xl font-bold">{mockStats.donorsCount}</p>
              </div>
            </div>
            <div className={`flex items-center ${mockStats.donorsChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {mockStats.donorsChange.startsWith('+') ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span className="text-sm font-medium">{mockStats.donorsChange}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{t.monthlyChange}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Heart size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t.activeCampaigns}</p>
                <p className="text-2xl font-bold">{mockStats.activeCampaigns}</p>
              </div>
            </div>
            <div className={`flex items-center ${mockStats.campaignsChange.startsWith('+') ? 'text-green-500' : mockStats.campaignsChange === '0%' ? 'text-gray-500' : 'text-red-500'}`}>
              {mockStats.campaignsChange.startsWith('+') ? <ArrowUp size={16} /> : mockStats.campaignsChange === '0%' ? null : <ArrowDown size={16} />}
              <span className="text-sm font-medium">{mockStats.campaignsChange}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{t.monthlyChange}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Progress */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t.campaignProgress}</h3>
            <button className="text-indigo-600 text-sm hover:underline">{t.viewAll}</button>
          </div>
          <div className="space-y-4">
            {mockCampaigns.map(campaign => (
              <div key={campaign.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{campaign.name}</span>
                  <span>{campaign.current} / {campaign.goal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Donations */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t.recentDonations}</h3>
            <button className="text-indigo-600 text-sm hover:underline">{t.viewAll}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.donorName}</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.donationAmount}</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.donationDate}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockDonors.map(donor => (
                  <tr key={donor.id}>
                    <td className="px-2 py-3">
                      <div className="flex items-center">
                        <img src={donor.avatar} alt={donor.name} className="h-8 w-8 rounded-full mr-3" />
                        <span>{donor.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 font-medium text-indigo-600">{donor.amount}</td>
                    <td className="px-2 py-3 text-gray-500">{donor.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{t.upcomingEvents}</h3>
          <button className="text-indigo-600 text-sm hover:underline">{t.viewAll}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.eventName}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.eventDate}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.attendees}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockEvents.map(event => (
                <tr key={event.id}>
                  <td className="px-4 py-3 font-medium">{event.name}</td>
                  <td className="px-4 py-3 text-gray-500">{event.date}</td>
                  <td className="px-4 py-3">{event.attendees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
