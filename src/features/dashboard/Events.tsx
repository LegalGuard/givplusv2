import React from 'react';
import { useDonor } from '../../context/DonorContext';
import { Calendar } from 'lucide-react';

const Events: React.FC = () => {
  const { events } = useDonor();
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Mes événements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
            <img src={ev.banner} alt={ev.title} className="h-40 object-cover w-full" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">{ev.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar size={14} /> {ev.date} • {ev.location}
                </p>
                <p className="mt-2 text-sm">Billets : {ev.tickets}</p>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2">
                <button className="bg-indigo-600 text-white rounded px-4 py-2 text-sm hover:bg-indigo-700 transition">Télécharger e-ticket</button>
                <button className="bg-indigo-50 text-indigo-700 rounded px-4 py-2 text-sm hover:bg-indigo-100 transition">Ajouter au calendrier</button>
                <button className="bg-red-50 text-red-600 rounded px-4 py-2 text-sm hover:bg-red-100 transition">Annuler</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
