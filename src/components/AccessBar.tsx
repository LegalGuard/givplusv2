import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LogIn, HelpCircle, FileText, Building } from 'lucide-react';

interface AccessBarProps {
  language: string;
}

const AccessBar: React.FC<AccessBarProps> = ({ language }) => {
  const [donorMenuOpen, setDonorMenuOpen] = useState(false);
  const [associationMenuOpen, setAssociationMenuOpen] = useState(false);
  
  const donorMenuRef = useRef<HTMLDivElement>(null);
  const associationMenuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (donorMenuRef.current && !donorMenuRef.current.contains(event.target as Node)) {
        setDonorMenuOpen(false);
      }
      if (associationMenuRef.current && !associationMenuRef.current.contains(event.target as Node)) {
        setAssociationMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle donor menu
  const toggleDonorMenu = () => {
    setDonorMenuOpen(!donorMenuOpen);
    if (associationMenuOpen) setAssociationMenuOpen(false);
  };

  // Toggle association menu
  const toggleAssociationMenu = () => {
    setAssociationMenuOpen(!associationMenuOpen);
    if (donorMenuOpen) setDonorMenuOpen(false);
  };

  // Translations for the menu items
  const translations = {
    fr: {
      donorSpace: 'Espace donateur',
      associationSpace: 'Espace association',
      accessAccount: 'Accéder à mon compte',
      howItWorks: 'Comment ça marche',
      taxReceipts: 'Reçus fiscaux',
      registerAssociation: 'Inscrire mon association',
    },
    en: {
      donorSpace: 'Donor space',
      associationSpace: 'Association space',
      accessAccount: 'Access my account',
      howItWorks: 'How it works',
      taxReceipts: 'Tax receipts',
      registerAssociation: 'Register my association',
    },
    he: {
      donorSpace: 'אזור תורמים',
      associationSpace: 'אזור עמותות',
      accessAccount: 'גישה לחשבון שלי',
      howItWorks: 'איך זה עובד',
      taxReceipts: 'קבלות מס',
      registerAssociation: 'רישום העמותה שלי',
    }
  };

  const t = translations[language as keyof typeof translations] || translations.fr;

  return (
    <div className="bg-gray-50 py-3 flex justify-center items-center space-x-4">
      <div className="relative" ref={donorMenuRef}>
        <button 
          onClick={toggleDonorMenu}
          className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <span>{t.donorSpace}</span>
          <ChevronDown size={16} className={`transition-transform ${donorMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {donorMenuOpen && (
          <div className="absolute z-10 mt-1 w-60 bg-white rounded-md shadow-lg">
            <div className="py-1">
              <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <LogIn size={16} />
                {t.accessAccount}
              </Link>
              <a href="#how-it-works" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <HelpCircle size={16} />
                {t.howItWorks}
              </a>
              <Link to="/dashboard/documents" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FileText size={16} />
                {t.taxReceipts}
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <div className="relative" ref={associationMenuRef}>
        <button 
          onClick={toggleAssociationMenu}
          className="bg-yellow-400 text-indigo-700 hover:bg-yellow-500 px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <span>{t.associationSpace}</span>
          <ChevronDown size={16} className={`transition-transform ${associationMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {associationMenuOpen && (
          <div className="absolute z-10 mt-1 w-60 bg-white rounded-md shadow-lg">
            <div className="py-1">
              <Link to="/association/login" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <LogIn size={16} />
                {t.accessAccount}
              </Link>
              <a href="#how-it-works-association" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <HelpCircle size={16} />
                {t.howItWorks}
              </a>
              <Link to="/association/signup" className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100">
                <Building size={16} />
                {t.registerAssociation}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessBar;
