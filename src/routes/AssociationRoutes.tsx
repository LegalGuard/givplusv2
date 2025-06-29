import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AssociationLayout from '../features/association-dashboard/AssociationLayout';
import Overview from '../features/association-dashboard/Overview';
import Campaigns from '../features/association-dashboard/Campaigns';
import Donations from '../features/association-dashboard/Donations';
import Documents from '../features/association-dashboard/Documents';
import Profile from '../features/association-dashboard/Profile';
import Settings from '../features/association-dashboard/Settings';

/**
 * Composant qui gère toutes les routes du dashboard association
 * avec le layout partagé AssociationLayout
 */
const AssociationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AssociationLayout />}>
        <Route index element={<Overview />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="donations" element={<Donations />} />
        <Route path="documents" element={<Documents />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<div className="p-6">Page non trouvée</div>} />
      </Route>
    </Routes>
  );
};

export default AssociationRoutes;
