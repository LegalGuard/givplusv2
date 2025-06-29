import React, { useState } from 'react';
import { useDonor } from '../../context/DonorContext';
import { Search, FileDown } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const Donations: React.FC = () => {
  const { donations } = useDonor();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = donations.filter((d) =>
    [d.date, d.association, d.campaign, d.status]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageData = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const exportCSV = () => {
    const header = 'Date,Association,Campagne,Montant (€),Statut';
    const rows = filtered.map((d) => `${d.date},${d.association},${d.campaign},${d.amount},${d.status}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'donations.csv';
    link.click();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Historique des dons</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
              placeholder="Recherche…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <FileDown size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Association</th>
              <th className="px-4 py-3">Campagne</th>
              <th className="px-4 py-3">Montant (€)</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-center">Reçu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageData.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap">{d.date}</td>
                <td className="px-4 py-2 whitespace-nowrap">{d.association}</td>
                <td className="px-4 py-2 whitespace-nowrap">{d.campaign}</td>
                <td className="px-4 py-2 whitespace-nowrap">{d.amount.toLocaleString()}</td>
                <td className="px-4 py-2 whitespace-nowrap">{d.status}</td>
                <td className="px-4 py-2 text-center">
                  {d.receiptUrl ? (
                    <a href={d.receiptUrl} className="text-indigo-600 hover:underline" target="_blank" rel="noreferrer">
                      PDF
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <button
          className="px-3 py-1 border rounded"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Préc.
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Suiv.
        </button>
      </div>
    </div>
  );
};

export default Donations;
