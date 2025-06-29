import express from 'express';
import {
  createDonation,
  getAllDonations,
  getDonationById,
  generateTaxReceipt,
  getUserDonationStats
} from '../controllers/donation.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Toutes les routes de dons nécessitent l'authentification
router.use(authMiddleware);

// Routes pour les dons
router.post('/', createDonation);
router.get('/', getAllDonations);
router.get('/stats', getUserDonationStats);
router.get('/:id', getDonationById);
router.post('/:id/tax-receipt', generateTaxReceipt);

export default router;
