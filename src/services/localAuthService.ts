import { db, UserData } from '../db/database';

// Service d'authentification local qui utilise notre base de données Dexie
export const localAuthService = {
  // Générer un token JWT (simulé)
  generateToken: (user: any): string => {
    // Pour une démo, nous générons un token simple
    // En production, utilisez une bibliothèque JWT pour une véritable implémentation sécurisée
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 jours d'expiration
    };
    
    return `demo_${btoa(JSON.stringify(payload))}_${Math.random().toString(36).substring(2)}`;
  },

  // Enregistrement d'un nouvel utilisateur
  register: async function(userData: Omit<UserData, 'id' | 'createdAt'>): Promise<any> {
    try {
      console.log('Tentative d\'inscription avec email:', userData.email);
      
      // Vérifier si l'email existe déjà
      let existingUser = null;
      try {
        existingUser = await db.users.where('email').equals(userData.email).first();
      } catch (err) {
        console.log('Erreur lors de la vérification d\'email:', err);
        // Si l'erreur est due à l'absence de la base de données, on continue
      }
      
      if (existingUser) {
        console.log('Email déjà utilisé:', userData.email);
        return {
          success: false,
          message: 'Un utilisateur avec cet email existe déjà'
        };
      }
      
      console.log('Ajout de l\'utilisateur à la base de données');
      
      // Ajouter l'utilisateur à la base de données
      const id = await db.users.add({
        ...userData,
        createdAt: new Date()
      });
      
      // Récupérer l'utilisateur créé
      const newUser = await db.users.get(id);
      
      if (!newUser) {
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }
      
      console.log('Utilisateur créé avec succès');
      
      // Générer un token d'authentification
      const token = localAuthService.generateToken(newUser);
      
      // Ne pas renvoyer le mot de passe
      const { password, ...userWithoutPassword } = newUser;
      
      // Stocker dans localStorage pour la session
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur lors de l\'inscription'
      };
    }
  },

  // Connexion utilisateur
  login: async (email: string, password: string): Promise<any> => {
    try {
      // Rechercher l'utilisateur par email
      const user = await db.users.where('email').equals(email).first();
      
      if (!user) {
        return {
          success: false,
          message: 'Email ou mot de passe incorrect'
        };
      }
      
      // Vérifier le mot de passe (en production, utiliser bcrypt ou argon2)
      if (user.password !== password) {
        return {
          success: false,
          message: 'Email ou mot de passe incorrect'
        };
      }
      
      // Générer un token
      const token = this.generateToken(user);
      
      // Ne pas renvoyer le mot de passe
      const { password: _, ...userWithoutPassword } = user;
      
      // Stocker dans localStorage pour la session
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return {
        success: false,
        message: 'Erreur lors de la connexion'
      };
    }
  },

  // Déconnexion
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Vérifier si l'utilisateur est connecté
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Vérifier la validité du token
  verifyToken: async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      const userJson = localStorage.getItem('user');
      
      if (!token || !userJson) {
        return false;
      }
      
      // Pour cette démo, nous considérons simplement que la présence du token est suffisante
      // En production, vous voudrez vérifier la signature et l'expiration du token
      
      const user = JSON.parse(userJson);
      
      // Vérifier si l'utilisateur existe toujours en base
      const dbUser = await db.users.get(user.id);
      
      if (!dbUser) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: (): any => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
};
