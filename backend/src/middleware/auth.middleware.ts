import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// Déclaration pour étendre l'interface Request
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Clé secrète pour les JWT
const JWT_SECRET = process.env.JWT_SECRET || 'givplus_secret_key_dev';

// Middleware pour vérifier l'authentification
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Vérifier si le token est présent dans les en-têtes
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Accès non autorisé. Token manquant' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Vérifier et décoder le token
    jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
        return;
      }

      // Récupérer les informations utilisateur
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        return;
      }

      // Ajouter l'utilisateur à l'objet requête
      req.user = {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      };

      next();
    });
  } catch (error) {
    console.error('Erreur dans le middleware d\'authentification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur d\'authentification' 
    });
  }
};

// Middleware pour vérifier les rôles
export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentification requise' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: 'Accès refusé. Rôle insuffisant' });
      return;
    }

    next();
  };
};
