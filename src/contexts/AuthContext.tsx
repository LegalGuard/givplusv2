import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { initDatabase } from '../db/database';

// S'assurer que la base de données est initialisée
initDatabase();

// Types pour les données utilisateur et le contexte
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  register: (userData: any) => Promise<any>;
}

// Création du contexte
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Provider du contexte d'authentification
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Vérifier si un token est stocké dans localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Vérifier la validité du token
        const isValid = await authService.verifyToken();
        
        if (isValid) {
          // Récupérer les informations utilisateur
          const userData = authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token invalide ou expiré, nettoyer
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      // En mode démo, nous vérifions simplement que la réponse est reçue
      if (response && (response.token || response.success)) {
        // Récupérer les données utilisateur (soit de la réponse, soit du localStorage)
        const userData = response.user || JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
        setIsAuthenticated(true);
        console.log('Connexion réussie en mode démo', userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (userData: any): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await authService.register(userData);
      
      if (response.success && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Valeur du contexte
  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
