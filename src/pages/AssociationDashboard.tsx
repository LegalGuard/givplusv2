import React from 'react';
import AssociationRoutes from '../routes/AssociationRoutes';

/**
 * Point d'entrée principal du dashboard association
 * Ce composant délègue toute la gestion des routes à AssociationRoutes
 */
const AssociationDashboard: React.FC = () => {
  return (
    <AssociationRoutes />
  );
};

export default AssociationDashboard;
