import express from 'express';
import cors from 'cors';
import corsOptions from './config/cors.config';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// Import des routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import donationRoutes from './routes/donation.routes';
import campaignRoutes from './routes/campaign.routes';
import documentRoutes from './routes/document.routes';
import associationRoutes from './routes/association.routes';

// S'assurer que les exportations par défaut sont disponibles
const auth = authRoutes;
const user = userRoutes;
const donation = donationRoutes;
const campaign = campaignRoutes;
const document = documentRoutes;
const association = associationRoutes;

// Initialisation de dotenv pour accéder aux variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();

// Configuration du port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Connection à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/givplus')
  .then(() => console.log('Connexion à MongoDB établie avec succès'))
  .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

// Définition des routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/associations', associationRoutes);

// Servir les fichiers statiques en production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });
}

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;
