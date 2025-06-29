import express from 'express';
import {
  getProfile,
  updateProfile,
  changePassword,
  getDonationHistory,
  getAllUsers,
  getUserById,
  updateUserRole
} from '../controllers/user.controller';
import { authMiddleware, checkRole } from '../middleware/auth.middleware';

const router = express.Router();

// Toutes les routes d'utilisateurs nécessitent l'authentification
router.use(authMiddleware);

// Routes pour le profil utilisateur
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/change-password', changePassword);
router.get('/donations', getDonationHistory);

// Routes admin (réservées aux administrateurs)
router.get('/', checkRole(['admin']), getAllUsers);
router.get('/:id', checkRole(['admin']), getUserById);
router.patch('/:id/role', checkRole(['admin']), updateUserRole);

export default router;
