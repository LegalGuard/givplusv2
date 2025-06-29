import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DonorDashboard from './pages/DonorDashboard';
import AssociationDashboard from './pages/AssociationDashboard';
import Unauthorized from './pages/Unauthorized';
import ZakaCampaign from './pages/ZakaCampaign';
import ZakaDonation from './pages/ZakaDonation';
import ProtectedRoute from './components/ProtectedRoute';
import App from './App.tsx';
import { DonorProvider } from './context/DonorContext';
import { AuthProvider } from './contexts/AuthContext';
import { initDatabase } from './db/database';
import DbReset from './pages/DbReset';
import './index.css';

// Initialiser la base de données locale au démarrage de l'application
initDatabase().then(() => {
  console.log('Base de données locale initialisée avec succès');
}).catch(error => {
  console.error('Erreur d\'initialisation de la base de données:', error);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <DonorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/db-reset" element={<DbReset />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <DonorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/association/*" element={
              <ProtectedRoute requiredRole="admin">
                <AssociationDashboard />
              </ProtectedRoute>
            } />
            <Route path="/zaka-campaign" element={<ZakaCampaign />} />
            <Route path="/zaka-donation" element={<ZakaDonation />} />
          </Routes>
        </BrowserRouter>
      </DonorProvider>
    </AuthProvider>
  </React.StrictMode>,
)