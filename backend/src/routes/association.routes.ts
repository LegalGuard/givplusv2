import express from 'express';
import {
  getAllAssociations,
  getAssociationById,
  createAssociation,
  updateAssociation,
  deleteAssociation,
  getAssociationDashboard,
  addAdmin
} from '../controllers/association.controller';
import { authMiddleware, checkRole } from '../middleware/auth.middleware';

const router = express.Router();

// Routes publiques
router.get('/', getAllAssociations);
router.get('/:id', getAssociationById);

// Routes protégées qui nécessitent une authentification
router.post('/', authMiddleware, createAssociation);
router.put('/:id', authMiddleware, updateAssociation);
router.delete('/:id', authMiddleware, deleteAssociation);

// Dashboard de l'association (nécessite l'authentification)
router.get('/:id/dashboard', authMiddleware, getAssociationDashboard);

// Routes pour la gestion des administrateurs (réservé aux admins existants)
router.post('/:id/admins', authMiddleware, addAdmin);

export default router;
