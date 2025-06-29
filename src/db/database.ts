import Dexie from 'dexie';

// Définition des interfaces pour les données
export interface UserData {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
}

export interface DonationData {
  id?: number;
  amount: number;
  currency: string;
  campaignId: number;
  campaignTitle?: string;
  donorId: number;
  donorName?: string;
  paymentMethod: string;
  status: string;
  message?: string;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface CampaignData {
  id?: number;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  associationId: number;
  imageUrl?: string;
  startDate: Date;
  endDate?: Date | null;
  isActive: boolean;
  donationCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Variable pour suivre l'état d'initialisation
let isInitialized = false;

// Définition de notre base de données avec Dexie
class GivPlusDatabase extends Dexie {
  // Définition des tables
  users: Dexie.Table<UserData, number>;
  donations: Dexie.Table<DonationData, number>;
  campaigns: Dexie.Table<CampaignData, number>;

  constructor() {
    super('GivPlusDB');
    
    console.log('Initialisation de la structure de la base de données GivPlusDB...');
    
    // Définition du schéma
    this.version(1).stores({
      users: '++id, email, role, createdAt',
      donations: '++id, campaignId, donorId, amount, createdAt',
      campaigns: '++id, title, associationId, isActive, startDate'
    });

    // Typage des tables
    this.users = this.table('users');
    this.donations = this.table('donations');
    this.campaigns = this.table('campaigns');
    
    console.log('Schéma de base de données défini avec succès');
  }

  // Vérifier si la base de données est vide
  async isDbEmpty(): Promise<boolean> {
    try {
      const userCount = await this.users.count();
      console.log('Nombre d\'utilisateurs trouvés:', userCount);
      return userCount === 0;
    } catch (error) {
      console.error('Erreur lors de la vérification de la base de données:', error);
      return true; // En cas d'erreur, on considère la base comme vide pour la réinitialiser
    }
  }

  // Initialiser avec des données de démonstration
  async initDemoData(): Promise<boolean> {
    try {
      console.log('Vérification et initialisation de la base de données...');
      
      // Vérifier si la base est vide
      const isEmpty = await this.isDbEmpty();
      
      if (isEmpty) {
        console.log('Création des données de démonstration...');
        
        // Créer un utilisateur administrateur
        const adminId = await this.users.add({
          firstName: 'Admin',
          lastName: 'System',
          email: 'admin@givplus.com',
          password: 'Admin123',
          role: 'admin',
          createdAt: new Date()
        });
        console.log('✅ Admin créé avec ID:', adminId);
        
        // Créer une association (ZAKA)
        const associationId = await this.users.add({
          firstName: 'ZAKA',
          lastName: 'Association',
          email: 'contact@zaka.org',
          password: 'Zaka2023',
          role: 'association',
          createdAt: new Date()
        });
        console.log('✅ Association ZAKA créée avec ID:', associationId);
        
        // Créer une campagne
        const campaignId = await this.campaigns.add({
          title: 'ZAKA - Aide aux victimes',
          description: 'Campagne de soutien aux victimes de catastrophes naturelles',
          targetAmount: 10000,
          currentAmount: 0,
          associationId: associationId,
          imageUrl: 'https://picsum.photos/800/400',
          startDate: new Date(),
          endDate: null,
          isActive: true,
          donationCount: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log('✅ Campagne créée avec ID:', campaignId);
        
        console.log('✅ Base de données initialisée avec succès!');
        return true;
      }
      
      console.log('✅ La base de données contient déjà des données.');
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation des données:', error);
      return false;
    }
  }
}

// Instance unique de notre base de données
export const db = new GivPlusDatabase();

// Fonction d'initialisation à appeler au démarrage de l'application
export const initDatabase = async (): Promise<boolean> => {
  if (isInitialized) {
    console.log('La base de données a déjà été initialisée.');
    return true;
  }
  
  try {
    console.log('Ouverture de la connexion à la base de données...');
    await db.open();
    console.log('Connexion à la base de données établie.');
    
    const success = await db.initDemoData();
    isInitialized = success;
    return success;
  } catch (error) {
    console.error('Erreur fatale lors de l\'initialisation de la base de données:', error);
    return false;
  }
};

// Fonction pour vérifier l'existence d'un utilisateur par email
export const checkUserExistsByEmail = async (email: string): Promise<boolean> => {
  try {
    const user = await db.users.where('email').equals(email).first();
    return !!user;
  } catch (error) {
    console.error('Erreur lors de la vérification d\'email:', error);
    return false;
  }
};

