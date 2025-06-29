import React, { useState } from 'react';
import { Search, Filter, ArrowUp, Calendar, MapPin, Users, Plus, Edit, Trash2 } from 'lucide-react';

// Types pour les langues disponibles
type Language = 'fr' | 'en' | 'he';

// Traductions simplifiées
const translations = {
  fr: {
    events: 'Événements',
    createEvent: 'Créer un événement',
    search: 'Rechercher un événement...',
    filter: 'Filtrer',
    upcoming: 'À venir',
    past: 'Passés',
    all: 'Tous',
    name: 'Nom',
    date: 'Date',
    location: 'Lieu',
    attendees: 'Participants',
    actions: 'Actions',
    sortBy: 'Trier par',
    sortByName: 'Nom',
    sortByDate: 'Date',
    sortByAttendees: 'Participants',
    noResults: 'Aucun événement ne correspond à vos critères de recherche.',
    viewDetails: 'Voir détails',
    edit: 'Modifier',
    delete: 'Supprimer',
  },
  en: {
    events: 'Events',
    createEvent: 'Create Event',
    search: 'Search for an event...',
    filter: 'Filter',
    upcoming: 'Upcoming',
    past: 'Past',
    all: 'All',
    name: 'Name',
    date: 'Date',
    location: 'Location',
    attendees: 'Attendees',
    actions: 'Actions',
    sortBy: 'Sort by',
    sortByName: 'Name',
    sortByDate: 'Date',
    sortByAttendees: 'Attendees',
    noResults: 'No events match your search criteria.',
    viewDetails: 'View details',
    edit: 'Edit',
    delete: 'Delete',
  },
  he: {
    events: 'אירועים',
    createEvent: 'צור אירוע',
    search: 'חפש אירוע...',
    filter: 'סנן',
    upcoming: 'קרובים',
    past: 'עבר',
    all: 'הכל',
    name: 'שם',
    date: 'תאריך',
    location: 'מיקום',
    attendees: 'משתתפים',
    actions: 'פעולות',
    sortBy: 'מיין לפי',
    sortByName: 'שם',
    sortByDate: 'תאריך',
    sortByAttendees: 'משתתפים',
    noResults: 'אין אירועים התואמים את קריטריוני החיפוש שלך.',
    viewDetails: 'צפה בפרטים',
    edit: 'ערוך',
    delete: 'מחק',
  },
};

// Types pour les événements
type EventStatus = 'upcoming' | 'past';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  attendees: number;
  status: EventStatus;
  image: string;
  description: string;
}

// Données fictives
const mockEvents: Event[] = [
  {
    id: 1,
    name: 'Gala annuel',
    date: '15/07/2025',
    location: 'Hôtel Metropole, Paris',
    attendees: 120,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Gala de charité annuel pour lever des fonds pour nos projets humanitaires.'
  },
  {
    id: 2,
    name: 'Collecte alimentaire',
    date: '22/07/2025',
    location: 'Centre commercial Grand Place',
    attendees: 45,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Collecte de denrées alimentaires pour les familles en difficulté.'
  },
  {
    id: 3,
    name: 'Webinaire donateurs',
    date: '05/08/2025',
    location: 'En ligne',
    attendees: 78,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Présentation des projets en cours et des résultats obtenus.'
  },
  {
    id: 4,
    name: 'Marche solidaire',
    date: '10/05/2025',
    location: 'Parc des Buttes-Chaumont',
    attendees: 95,
    status: 'past',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Marche solidaire pour sensibiliser à notre cause.'
  },
  {
    id: 5,
    name: 'Concert caritatif',
    date: '20/04/2025',
    location: 'Salle Pleyel',
    attendees: 350,
    status: 'past',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Concert au profit de nos actions humanitaires.'
  },
];

const Events: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [filter, setFilter] = useState<EventStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'attendees'>('date');
  
  // Accès aux traductions selon la langue sélectionnée
  const t = translations[language];

  // Filtrer les événements
  const filteredEvents = mockEvents
    .filter(event => filter === 'all' || event.status === filter)
    .filter(event => 
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Trier les événements
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      // Convertir les dates au format JJ/MM/AAAA en objets Date pour le tri
      const aDate = new Date(a.date.split('/').reverse().join('-'));
      const bDate = new Date(b.date.split('/').reverse().join('-'));
      return aDate.getTime() - bDate.getTime();
    } else {
      return b.attendees - a.attendees;
    }
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.events}</h2>
        <div className="flex items-center gap-3">
          <div className="flex border rounded-md overflow-hidden">
            <button onClick={() => setLanguage('fr')} className={`px-2 py-1 text-xs ${language === 'fr' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>FR</button>
            <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs ${language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>EN</button>
            <button onClick={() => setLanguage('he')} className={`px-2 py-1 text-xs ${language === 'he' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}>HE</button>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
            <Plus size={16} />
            {t.createEvent}
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
              onClick={() => setFilter('upcoming')} 
              className={`px-3 py-1 text-xs ${filter === 'upcoming' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              {t.upcoming}
            </button>
            <button 
              onClick={() => setFilter('past')} 
              className={`px-3 py-1 text-xs ${filter === 'past' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'}`}
            >
              {t.past}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUp size={16} className="text-gray-500" />
            <span className="text-sm text-gray-500">{t.sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'attendees')}
              className="border-gray-300 rounded-md text-sm focus:outline-none py-1"
            >
              <option value="name">{t.sortByName}</option>
              <option value="date">{t.sortByDate}</option>
              <option value="attendees">{t.sortByAttendees}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des événements */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-lg">{event.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-indigo-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-indigo-600" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-indigo-600" />
                    <span>{event.attendees} {t.attendees}</span>
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
      ) : (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">{t.noResults}</p>
        </div>
      )}
    </div>
  );
};

export default Events;
