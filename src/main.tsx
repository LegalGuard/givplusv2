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
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <DonorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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