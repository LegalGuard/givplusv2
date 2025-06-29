/**
 * Fonction pour réinitialiser complètement la base de données
 * À utiliser en cas de problème avec IndexedDB
 */

// Fonction pour supprimer la base de données
export const resetDatabase = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Supprimer les données de session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Supprimer la base de données IndexedDB
      const request = indexedDB.deleteDatabase('GivPlusDB');
      
      request.onsuccess = () => {
        console.log('Base de données supprimée avec succès');
        resolve(true);
      };
      
      request.onerror = () => {
        console.error('Erreur lors de la suppression de la base de données');
        resolve(false);
      };
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      resolve(false);
    }
  });
};

// Exporter une fonction qui exécute la réinitialisation
export const executeReset = async () => {
  console.log('Tentative de réinitialisation de la base de données...');
  const result = await resetDatabase();
  if (result) {
    console.log('Réinitialisation terminée. Veuillez rafraîchir la page.');
    // Recharger la page après suppression
    window.location.reload();
  } else {
    console.log('Échec de la réinitialisation.');
  }
};
