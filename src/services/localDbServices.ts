/**
 * Services pour la base de données locale (campagnes, dons, etc.)
 * Ce fichier implémente les fonctions CRUD pour notre base de données Dexie
 */

import { db, CampaignData, DonationData } from '../db/database';

// Services pour les campagnes
export const campaignService = {
  // Obtenir toutes les campagnes actives
  getAllActiveCampaigns: async (): Promise<CampaignData[]> => {
    try {
      return await db.campaigns.where('isActive').equals(1).toArray();
    } catch (error) {
      console.error('Erreur lors de la récupération des campagnes:', error);
      return [];
    }
  },
  
  // Obtenir une campagne par ID
  getCampaignById: async (id: number): Promise<CampaignData | null> => {
    try {
      const campaign = await db.campaigns.get(id);
      return campaign || null;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la campagne ${id}:`, error);
      return null;
    }
  },
  
  // Obtenir les campagnes d'une association
  getCampaignsByAssociation: async (associationId: number): Promise<CampaignData[]> => {
    try {
      return await db.campaigns.where('associationId').equals(associationId).toArray();
    } catch (error) {
      console.error('Erreur lors de la récupération des campagnes par association:', error);
      return [];
    }
  },
  
  // Créer une nouvelle campagne
  createCampaign: async (campaignData: Omit<CampaignData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CampaignData | null> => {
    try {
      const now = new Date();
      const newCampaign = {
        ...campaignData,
        currentAmount: 0,
        donationCount: 0,
        createdAt: now,
        updatedAt: now
      };
      
      const id = await db.campaigns.add(newCampaign);
      return await db.campaigns.get(id) || null;
    } catch (error) {
      console.error('Erreur lors de la création de la campagne:', error);
      return null;
    }
  },
  
  // Mettre à jour une campagne
  updateCampaign: async (id: number, campaignData: Partial<CampaignData>): Promise<boolean> => {
    try {
      const campaign = await db.campaigns.get(id);
      if (!campaign) return false;
      
      await db.campaigns.update(id, {
        ...campaignData,
        updatedAt: new Date()
      });
      
      return true;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la campagne ${id}:`, error);
      return false;
    }
  }
};

// Services pour les donations
export const donationService = {
  // Créer un nouveau don
  createDonation: async (donationData: Omit<DonationData, 'id' | 'createdAt'>): Promise<DonationData | null> => {
    try {
      // Vérifier que la campagne existe
      const campaign = await db.campaigns.get(donationData.campaignId);
      if (!campaign) {
        throw new Error('La campagne spécifiée n\'existe pas');
      }
      
      // Créer le don
      const newDonation = {
        ...donationData,
        createdAt: new Date()
      };
      
      // Ajouter à la base de données
      const id = await db.donations.add(newDonation);
      
      // Mettre à jour les statistiques de la campagne
      await db.campaigns.update(donationData.campaignId, {
        currentAmount: campaign.currentAmount + donationData.amount,
        donationCount: campaign.donationCount + 1,
        updatedAt: new Date()
      });
      
      return await db.donations.get(id) || null;
    } catch (error) {
      console.error('Erreur lors de la création du don:', error);
      return null;
    }
  },
  
  // Obtenir les dons d'un donateur
  getDonationsByDonor: async (donorId: number): Promise<DonationData[]> => {
    try {
      return await db.donations.where('donorId').equals(donorId).toArray();
    } catch (error) {
      console.error('Erreur lors de la récupération des dons par donateur:', error);
      return [];
    }
  },
  
  // Obtenir les dons d'une campagne
  getDonationsByCampaign: async (campaignId: number): Promise<DonationData[]> => {
    try {
      return await db.donations.where('campaignId').equals(campaignId).toArray();
    } catch (error) {
      console.error('Erreur lors de la récupération des dons par campagne:', error);
      return [];
    }
  }
};

// Service pour les utilisateurs (fonctions supplémentaires)
export const userService = {
  // Obtenir un utilisateur par ID
  getUserById: async (id: number) => {
    try {
      const user = await db.users.get(id);
      if (!user) return null;
      
      // Ne pas renvoyer le mot de passe
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
      return null;
    }
  },
  
  // Mettre à jour un utilisateur
  updateUser: async (id: number, userData: Partial<Omit<any, 'id' | 'createdAt' | 'password'>>) => {
    try {
      const user = await db.users.get(id);
      if (!user) return false;
      
      await db.users.update(id, userData);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
      return false;
    }
  },
  
  // Obtenir tous les utilisateurs (pour l'admin)
  getAllUsers: async () => {
    try {
      const users = await db.users.toArray();
      // Ne pas renvoyer les mots de passe
      return users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return [];
    }
  },
  
  // Obtenir tous les utilisateurs par rôle (donateurs, associations)
  getUsersByRole: async (role: string) => {
    try {
      const users = await db.users.where('role').equals(role).toArray();
      // Ne pas renvoyer les mots de passe
      return users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      console.error(`Erreur lors de la récupération des utilisateurs de rôle ${role}:`, error);
      return [];
    }
  }
};
