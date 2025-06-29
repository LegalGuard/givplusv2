import React, { useState } from 'react';
import { useDonor } from '../../context/DonorContext';


const Documents: React.FC = () => {
  const { taxDocs } = useDonor();
  const [year, setYear] = useState('Toutes');
  const years = Array.from(new Set(taxDocs.map((d) => d.date.split('-')[0])));

  const filtered = year === 'Toutes' ? taxDocs : taxDocs.filter((d) => d.date.startsWith(year));

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Documents fiscaux</h2>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="border rounded px-3 py-2 w-full md:w-auto">
          <option>Toutes</option>
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Référence</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Montant (€)</th>
              <th className="px-4 py-3 text-left">Association</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((doc) => (
              <tr key={doc.id}>
                <td className="px-4 py-2">{doc.ref}</td>
                <td className="px-4 py-2">{doc.date}</td>
                <td className="px-4 py-2">{doc.amount}</td>
                <td className="px-4 py-2">{doc.association}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-indigo-600 hover:underline mr-2">Télécharger</button>
                  <button className="text-indigo-600 hover:underline mr-2">Envoyer</button>
                  <button className="text-indigo-600 hover:underline">Visualiser</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
