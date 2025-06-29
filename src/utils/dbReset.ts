/**
 * Utilitaire pour réinitialiser complètement la base de données IndexedDB
 * Utiliser en cas de problème persistant avec la base de données
 */

export const resetIndexedDB = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      console.log('🔄 Tentative de réinitialisation de la base de données...');
      
      // 1. Suppression des données de session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('✅ Données de session supprimées');
      
      // 2. Suppression de la base de données IndexedDB
      const request = indexedDB.deleteDatabase('GivPlusDB');
      
      request.onsuccess = () => {
        console.log('✅ Base de données supprimée avec succès');
        alert('Base de données réinitialisée avec succès. La page va être rechargée.');
        resolve(true);
        // Recharger la page après un court délai pour permettre à l'alerte d'être vue
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      };
      
      request.onerror = (event) => {
        console.error('❌ Erreur lors de la suppression de la base de données', event);
        alert('Erreur lors de la réinitialisation de la base de données.');
        resolve(false);
      };
      
      request.onblocked = () => {
        console.warn('⚠️ La suppression de la base de données est bloquée');
        alert('La base de données est actuellement utilisée par une autre page. Veuillez fermer toutes les autres onglets de cette application et réessayer.');
        resolve(false);
      };
    } catch (error) {
      console.error('❌ Erreur lors de la réinitialisation:', error);
      alert('Erreur inattendue lors de la réinitialisation.');
      resolve(false);
    }
  });
};
