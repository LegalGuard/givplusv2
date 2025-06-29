import express from 'express';
import { register, login, verifyToken } from '../controllers/auth.controller';

const router = express.Router();

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);

// Route de vérification du token
router.post('/verify-token', verifyToken);

export default router;
