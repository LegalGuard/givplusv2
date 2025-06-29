import { CorsOptions } from 'cors';

// Options pour la configuration CORS
const corsOptions: CorsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://givplus.org', 'https://www.givplus.org']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 heures en secondes
};

export default corsOptions;
