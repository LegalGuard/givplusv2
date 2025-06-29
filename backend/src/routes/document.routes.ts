import express from 'express';
import {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  updateDocumentStatus,
  deleteDocument
} from '../controllers/document.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Toutes les routes de documents nécessitent l'authentification
router.use(authMiddleware);

// Routes pour les documents
router.post('/', createDocument);
router.get('/', getAllDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.patch('/:id/status', updateDocumentStatus);
router.delete('/:id', deleteDocument);

export default router;
