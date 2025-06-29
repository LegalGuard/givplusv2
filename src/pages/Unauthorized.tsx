import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle } from 'lucide-react';

const Unauthorized: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-4">Accès non autorisé</h1>
        
        <p className="text-gray-600 text-center mb-6">
          Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
        </p>
        
        <div className="flex flex-col gap-4">
          {user ? (
            <Link 
              to={user.role === 'admin' ? '/association' : '/dashboard'} 
              className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-center"
            >
              Retour au tableau de bord
            </Link>
          ) : (
            <Link 
              to="/" 
              className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-center"
            >
              Retour à l'accueil
            </Link>
          )}
          
          <Link 
            to="/" 
            className="border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-md text-center"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
