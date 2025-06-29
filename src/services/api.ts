/**
 * Service API principal pour GivPlus
 * Contient les fonctions pour communiquer avec l'API backend
 */

// URL de base de l'API
const API_URL = import.meta.env?.PROD
  ? 'https://api.givplus.org/api'
  : 'http://localhost:5000/api';

// Fonction helper pour gérer les erreurs de requête
const handleError = (error: any): never => {
  if (error.response) {
    throw new Error(error.response.data.message || 'Une erreur est survenue');
  }
  throw new Error('Erreur de connexion au serveur');
};

// Fonction pour obtenir les headers avec token d'authentification
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

/**
 * Services d'authentification
 */
export const authService = {
  // Inscription d'un nouvel utilisateur
  register: async (userData: any) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de l\'inscription');
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Connexion utilisateur (MODE DEMO - Sans backend)
  login: async (email: string, password: string) => {
    try {
      // En mode démo, on accepte n'importe quelle connexion
      console.log('Connexion en mode DEMO');
      
      // Créer un utilisateur fictif pour la démo
      const demoUser = {
        id: '123456',
        email: email,
        firstName: 'Utilisateur',
        lastName: 'Demo',
        role: 'donor'
      };
      
      // Simuler un token JWT
      const demoToken = 'demo_token_' + Math.random().toString(36).substring(2);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      return { success: true, user: demoUser, token: demoToken };
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },
  
  // Vérifier si l'utilisateur est connecté
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },
  
  // Obtenir l'utilisateur actuellement connecté
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Vérifier la validité du token
  verifyToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      const response = await fetch(`${API_URL}/auth/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      
      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }
      
      const data = await response.json();
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data.success;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  }
};

/**
 * Services pour le profil utilisateur
 */
export const userService = {
  // Obtenir le profil utilisateur
  getProfile: async () => {
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) throw new Error('Erreur lors de la récupération du profil');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Mettre à jour le profil
  updateProfile: async (profileData: any) => {
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du profil');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Changer le mot de passe
  changePassword: async (currentPassword: string, newPassword: string) => {
    try {
      const response = await fetch(`${API_URL}/users/change-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
      
      if (!response.ok) throw new Error('Erreur lors du changement de mot de passe');
      
      const data = await response.json();
      return data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Obtenir l'historique des dons
  getDonationHistory: async () => {
    try {
      const response = await fetch(`${API_URL}/users/donations`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) throw new Error('Erreur lors de la récupération de l\'historique des dons');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  }
};

/**
 * Services pour les associations
 */
export const associationService = {
  // Obtenir toutes les associations
  getAllAssociations: async (search: string = '') => {
    try {
      const url = new URL(`${API_URL}/associations`);
      if (search) url.searchParams.append('search', search);
      
      const response = await fetch(url.toString());
      
      if (!response.ok) throw new Error('Erreur lors de la récupération des associations');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Obtenir une association par ID
  getAssociationById: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/associations/${id}`);
      
      if (!response.ok) throw new Error('Erreur lors de la récupération de l\'association');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Créer une nouvelle association (nécessite authentification)
  createAssociation: async (associationData: any) => {
    try {
      const response = await fetch(`${API_URL}/associations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(associationData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de la création de l\'association');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Mettre à jour une association (nécessite authentification)
  updateAssociation: async (id: string, associationData: any) => {
    try {
      const response = await fetch(`${API_URL}/associations/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(associationData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de l\'association');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Obtenir le tableau de bord d'une association (nécessite authentification)
  getAssociationDashboard: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/associations/${id}/dashboard`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) throw new Error('Erreur lors de la récupération du tableau de bord');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  }
};

/**
 * Services pour les campagnes
 */
export const campaignService = {
  // Obtenir toutes les campagnes
  getAllCampaigns: async (filters: any = {}) => {
    try {
      const url = new URL(`${API_URL}/campaigns`);
      
      // Ajouter les filtres à l'URL
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
      
      const response = await fetch(url.toString());
      
      if (!response.ok) throw new Error('Erreur lors de la récupération des campagnes');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Obtenir une campagne par ID
  getCampaignById: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/campaigns/${id}`);
      
      if (!response.ok) throw new Error('Erreur lors de la récupération de la campagne');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Créer une nouvelle campagne (nécessite authentification)
  createCampaign: async (campaignData: any) => {
    try {
      const response = await fetch(`${API_URL}/campaigns`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(campaignData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de la création de la campagne');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Mettre à jour une campagne (nécessite authentification)
  updateCampaign: async (id: string, campaignData: any) => {
    try {
      const response = await fetch(`${API_URL}/campaigns/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(campaignData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de la campagne');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Ajouter une mise à jour à une campagne (nécessite authentification)
  addCampaignUpdate: async (id: string, updateData: any) => {
    try {
      const response = await fetch(`${API_URL}/campaigns/${id}/updates`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de l\'ajout de la mise à jour');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  }
};

/**
 * Services pour les dons
 */
export const donationService = {
  // Faire un don (nécessite authentification)
  makeDonation: async (donationData: any) => {
    try {
      const response = await fetch(`${API_URL}/donations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(donationData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de la création du don');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Obtenir les statistiques de dons de l'utilisateur (nécessite authentification)
  getUserDonationStats: async () => {
    try {
      const response = await fetch(`${API_URL}/donations/stats`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) throw new Error('Erreur lors de la récupération des statistiques');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Obtenir les détails d'un don spécifique (nécessite authentification)
  getDonationById: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/donations/${id}`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) throw new Error('Erreur lors de la récupération du don');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Générer un reçu fiscal pour un don (nécessite authentification)
  generateTaxReceipt: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/donations/${id}/tax-receipt`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) throw new Error('Erreur lors de la génération du reçu fiscal');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  }
};

/**
 * Services pour les documents
 */
export const documentService = {
  // Obtenir tous les documents (avec filtres optionnels)
  getAllDocuments: async (filters: any = {}) => {
    try {
      const url = new URL(`${API_URL}/documents`);
      
      // Ajouter les filtres à l'URL
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
      
      const response = await fetch(url.toString(), {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) throw new Error('Erreur lors de la récupération des documents');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Obtenir un document par ID
  getDocumentById: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/documents/${id}`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) throw new Error('Erreur lors de la récupération du document');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Créer un nouveau document (nécessite authentification)
  createDocument: async (documentData: any) => {
    try {
      const response = await fetch(`${API_URL}/documents`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(documentData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de la création du document');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Mettre à jour un document (nécessite authentification)
  updateDocument: async (id: string, documentData: any) => {
    try {
      const response = await fetch(`${API_URL}/documents/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(documentData)
      });
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du document');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Mettre à jour le statut d'un document (nécessite authentification)
  updateDocumentStatus: async (id: string, status: string) => {
    try {
      const response = await fetch(`${API_URL}/documents/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return handleError(error);
    }
  }
};

export default {
  authService,
  userService,
  associationService,
  campaignService,
  donationService,
  documentService
};
