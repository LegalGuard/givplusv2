import React, { useState } from 'react';
import { Search, Download, Upload, File, Trash2, ExternalLink, Plus } from 'lucide-react';

type Language = 'fr' | 'en' | 'he';

const translations = {
  fr: {
    documents: 'Documents',
    uploadDocument: 'Importer',
    search: 'Rechercher un document...',
    all: 'Tous',
    taxReceipts: 'Reçus fiscaux',
    reports: 'Rapports',
    legal: 'Documents légaux',
    name: 'Nom du document',
    type: 'Type',
    createdAt: 'Date de création',
    size: 'Taille',
    actions: 'Actions',
    download: 'Télécharger',
    delete: 'Supprimer',
    noDocuments: 'Aucun document trouvé',
    uploadFirst: 'Importez votre premier document',
    issuedBy: 'Émis par',
    viewDocument: 'Voir',
    createDocument: 'Créer un document',
    pendingDocs: 'Documents en attente',
    sentDocs: 'Documents envoyés',
    draftDocs: 'Brouillons'
  },
  en: {
    documents: 'Documents',
    uploadDocument: 'Upload',
    search: 'Search document...',
    all: 'All',
    taxReceipts: 'Tax receipts',
    reports: 'Reports',
    legal: 'Legal documents',
    name: 'Document name',
    type: 'Type',
    createdAt: 'Created on',
    size: 'Size',
    actions: 'Actions',
    download: 'Download',
    delete: 'Delete',
    noDocuments: 'No documents found',
    uploadFirst: 'Upload your first document',
    issuedBy: 'Issued by',
    viewDocument: 'View',
    createDocument: 'Create document',
    pendingDocs: 'Pending documents',
    sentDocs: 'Sent documents',
    draftDocs: 'Drafts'
  },
  he: {
    documents: 'מסמכים',
    uploadDocument: 'העלאה',
    search: 'חיפוש מסמך...',
    all: 'הכל',
    taxReceipts: 'קבלות מס',
    reports: 'דוחות',
    legal: 'מסמכים משפטיים',
    name: 'שם המסמך',
    type: 'סוג',
    createdAt: 'נוצר ב',
    size: 'גודל',
    actions: 'פעולות',
    download: 'הורדה',
    delete: 'מחיקה',
    noDocuments: 'לא נמצאו מסמכים',
    uploadFirst: 'העלה את המסמך הראשון שלך',
    issuedBy: 'הונפק על ידי',
    viewDocument: 'צפייה',
    createDocument: 'יצירת מסמך',
    pendingDocs: 'מסמכים בהמתנה',
    sentDocs: 'מסמכים שנשלחו',
    draftDocs: 'טיוטות'
  }
};

// Types pour les documents
type DocumentType = 'tax_receipt' | 'report' | 'legal';

interface Document {
  id: number;
  name: string;
  type: DocumentType;
  createdAt: string;
  size: string;
  status: 'pending' | 'sent' | 'draft';
  issuedBy?: string;
  recipient?: string;
}

const Documents: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  const t = translations[language];

  // Données fictives des documents
  const documents: Document[] = [
    {
      id: 1,
      name: 'Reçu fiscal - Don #45892',
      type: 'tax_receipt',
      createdAt: '23/06/2025',
      size: '245 KB',
      status: 'sent',
      issuedBy: 'Association Solidarité Israel',
      recipient: 'Michel Dupont'
    },
    {
      id: 2,
      name: 'Rapport financier Q2 2025',
      type: 'report',
      createdAt: '15/06/2025',
      size: '1.2 MB',
      status: 'draft'
    },
    {
      id: 3,
      name: 'Attestation de don #12408',
      type: 'tax_receipt',
      createdAt: '10/06/2025',
      size: '180 KB',
      status: 'pending',
      issuedBy: 'Association Solidarité Israel',
      recipient: 'Sarah Cohen'
    },
    {
      id: 4,
      name: 'Statuts de l\'association',
      type: 'legal',
      createdAt: '01/05/2025',
      size: '3.5 MB',
      status: 'sent'
    },
    {
      id: 5,
      name: 'Rapport d\'activité 2024',
      type: 'report',
      createdAt: '10/04/2025',
      size: '4.2 MB',
      status: 'sent'
    },
    {
      id: 6,
      name: 'Reçu fiscal - Don #43561',
      type: 'tax_receipt',
      createdAt: '05/04/2025',
      size: '236 KB',
      status: 'sent',
      issuedBy: 'Association Solidarité Israel',
      recipient: 'David Levy'
    }
  ];

  // Filtrer les documents selon la recherche et le filtre
  const filteredDocuments = documents
    .filter(document => {
      if (filter === 'all') return true;
      if (filter === 'tax_receipt') return document.type === 'tax_receipt';
      if (filter === 'report') return document.type === 'report';
      if (filter === 'legal') return document.type === 'legal';
      if (filter === 'pending') return document.status === 'pending';
      if (filter === 'sent') return document.status === 'sent';
      if (filter === 'draft') return document.status === 'draft';
      return true;
    })
    .filter(document => 
      document.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Fonction pour obtenir la classe de couleur selon le type de document
  const getDocumentTypeClass = (type: DocumentType) => {
    switch (type) {
      case 'tax_receipt':
        return 'bg-blue-100 text-blue-800';
      case 'report':
        return 'bg-green-100 text-green-800';
      case 'legal':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir le libellé du type de document
  const getDocumentTypeLabel = (type: DocumentType) => {
    switch (type) {
      case 'tax_receipt':
        return t.taxReceipts;
      case 'report':
        return t.reports;
      case 'legal':
        return t.legal;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.documents}</h1>
        <div className="flex space-x-2">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Upload size={16} />
            {t.uploadDocument}
          </button>
          <button className="bg-white border border-gray-300 text-indigo-600 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={16} />
            {t.createDocument}
          </button>
        </div>
      </div>

      {/* KPIs des documents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <File size={20} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t.pendingDocs}</p>
            <h3 className="mt-1 text-2xl font-semibold">{documents.filter(d => d.status === 'pending').length}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <File size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t.sentDocs}</p>
            <h3 className="mt-1 text-2xl font-semibold">{documents.filter(d => d.status === 'sent').length}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <File size={20} className="text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t.draftDocs}</p>
            <h3 className="mt-1 text-2xl font-semibold">{documents.filter(d => d.status === 'draft').length}</h3>
          </div>
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

        <div className="flex space-x-2 overflow-x-auto">
          <button onClick={() => setFilter('all')} className={`px-3 py-2 border text-sm rounded-md whitespace-nowrap ${filter === 'all' ? 'bg-indigo-100 border-indigo-300 text-indigo-800' : 'bg-white border-gray-300 text-gray-700'}`}>
            {t.all}
          </button>
          <button onClick={() => setFilter('tax_receipt')} className={`px-3 py-2 border text-sm rounded-md whitespace-nowrap ${filter === 'tax_receipt' ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-white border-gray-300 text-gray-700'}`}>
            {t.taxReceipts}
          </button>
          <button onClick={() => setFilter('report')} className={`px-3 py-2 border text-sm rounded-md whitespace-nowrap ${filter === 'report' ? 'bg-green-100 border-green-300 text-green-800' : 'bg-white border-gray-300 text-gray-700'}`}>
            {t.reports}
          </button>
          <button onClick={() => setFilter('legal')} className={`px-3 py-2 border text-sm rounded-md whitespace-nowrap ${filter === 'legal' ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-gray-300 text-gray-700'}`}>
            {t.legal}
          </button>
          <button onClick={() => setFilter('pending')} className={`px-3 py-2 border text-sm rounded-md whitespace-nowrap ${filter === 'pending' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' : 'bg-white border-gray-300 text-gray-700'}`}>
            <span>⟳</span> {t.pendingDocs}
          </button>
        </div>
      </div>

      {/* Liste des documents */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredDocuments.length > 0 ? (
          <div className="min-w-full divide-y divide-gray-200">
            <div className="bg-gray-50 px-6 py-3 grid grid-cols-12 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-5">{t.name}</div>
              <div className="col-span-2">{t.type}</div>
              <div className="col-span-2">{t.createdAt}</div>
              <div className="col-span-1">{t.size}</div>
              <div className="col-span-2 text-right">{t.actions}</div>
            </div>
            <div className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="px-6 py-4 grid grid-cols-12 gap-4 hover:bg-gray-50">
                  <div className="col-span-5 flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-md ${
                        doc.type === 'tax_receipt'
                          ? 'bg-blue-50 text-blue-600'
                          : doc.type === 'report'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-purple-50 text-purple-600'
                      }`}>
                        <File size={20} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      {doc.issuedBy && (
                        <p className="text-sm text-gray-500">
                          {t.issuedBy}: {doc.issuedBy}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentTypeClass(doc.type)}`}>
                      {getDocumentTypeLabel(doc.type)}
                    </span>
                  </div>
                  <div className="col-span-2 text-sm text-gray-500 flex items-center">
                    {doc.createdAt}
                  </div>
                  <div className="col-span-1 text-sm text-gray-500 flex items-center">
                    {doc.size}
                  </div>
                  <div className="col-span-2 text-right text-sm text-gray-500 flex items-center justify-end space-x-3">
                    <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                      <ExternalLink size={16} className="mr-1" />
                      <span>{t.viewDocument}</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Download size={16} />
                    </button>
                    <button className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 rounded-full p-4 mb-3">
              <File size={24} className="text-gray-500" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-1">{t.noDocuments}</p>
            <p className="text-sm text-gray-500">{t.uploadFirst}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
