import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetIndexedDB } from '../utils/dbReset';

/**
 * Page de diagnostic et de réinitialisation de la base de données
 * Pour résoudre les problèmes d'inscription et de connexion
 */
const DbReset: React.FC = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [dbInfo, setDbInfo] = useState<any>(null);
  
  const handleReset = async () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser la base de données ? Toutes les données locales seront effacées.')) {
      setIsResetting(true);
      setResult(null);
      
      try {
        const success = await resetIndexedDB();
        if (success) {
          setResult('Base de données réinitialisée avec succès. La page va être rechargée.');
        } else {
          setResult('Erreur lors de la réinitialisation de la base de données.');
        }
      } catch (error) {
        console.error('Erreur:', error);
        setResult(`Erreur lors de la réinitialisation: ${error}`);
      } finally {
        setIsResetting(false);
      }
    }
  };
  
  // Vérifier l'état de la base de données
  const checkDatabase = async () => {
    try {
      const databases = await window.indexedDB.databases();
      const hasGivPlusDB = databases.some(db => db.name === 'GivPlusDB');
      
      // Vérifier également les données dans localStorage
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      setDbInfo({
        hasGivPlusDB,
        localStorage: {
          hasToken: !!token,
          hasUser: !!user,
          user: user ? JSON.parse(user) : null
        },
        allDatabases: databases
      });
    } catch (error) {
      console.error('Erreur lors de la vérification de la base de données:', error);
      setDbInfo({ error: `${error}` });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Diagnostic et Réinitialisation</h1>
          <p className="text-gray-600 mt-2">Résolution des problèmes d'inscription et de connexion</p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <h2 className="text-lg font-medium text-blue-800 mb-2">Diagnostic de la base de données</h2>
            <button
              onClick={checkDatabase}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Vérifier l'état de la base de données
            </button>
            
            {dbInfo && (
              <div className="mt-4 p-3 bg-gray-50 rounded text-sm font-mono overflow-x-auto">
                <pre>{JSON.stringify(dbInfo, null, 2)}</pre>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-red-50 rounded-md">
            <h2 className="text-lg font-medium text-red-800 mb-2">Réinitialisation complète</h2>
            <p className="text-sm text-red-700 mb-3">
              Cette action va effacer toutes les données locales et réinitialiser l'application.
              Utilisez-la uniquement si vous rencontrez des problèmes d'inscription ou de connexion.
            </p>
            <button
              onClick={handleReset}
              disabled={isResetting}
              className={`w-full py-2 px-4 ${isResetting ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
            >
              {isResetting ? 'Réinitialisation en cours...' : 'Réinitialiser la base de données'}
            </button>
            
            {result && (
              <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-sm rounded">
                {result}
              </div>
            )}
          </div>
          
          <div className="flex justify-between mt-6">
            <Link 
              to="/login" 
              className="text-blue-600 hover:text-blue-800"
            >
              Retour à la connexion
            </Link>
            <Link 
              to="/signup" 
              className="text-blue-600 hover:text-blue-800"
            >
              Retour à l'inscription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DbReset;
