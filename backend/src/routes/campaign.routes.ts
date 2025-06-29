import express from 'express';
import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  addCampaignUpdate
} from '../controllers/campaign.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Routes publiques
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);

// Routes protégées nécessitant une authentification
router.post('/', authMiddleware, createCampaign);
router.put('/:id', authMiddleware, updateCampaign);
router.delete('/:id', authMiddleware, deleteCampaign);
router.post('/:id/updates', authMiddleware, addCampaignUpdate);

export default router;
