import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Rediriger vers la page de connexion si non authentifié
  if (!isAuthenticated) {
    // Sauvegarder la page que l'utilisateur essayait d'atteindre
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Mode démo - Accepter tout accès avec authentification
  console.log('Protected route - User role:', user?.role);
  
  // Vérifier si l'utilisateur a le rôle requis (seulement si non-démo)
  const isDemoMode = process.env.NODE_ENV === 'development' || window.location.hostname.includes('windsurf.build');
  
  if (requiredRole && user && !isDemoMode) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si tout va bien, afficher le contenu protégé
  return <>{children}</>;
};

export default ProtectedRoute;
