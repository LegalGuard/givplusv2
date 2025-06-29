const { client, q } = require('./faunaConfig');

/**
 * Fonction d'initialisation de la base de données FaunaDB
 * Cette fonction crée les collections et index nécessaires pour le fonctionnement de l'application
 */
exports.handler = async (event, context) => {
  // N'autoriser que les requêtes POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  try {
    // Créer les collections si elles n'existent pas déjà
    await createCollectionsIfNotExist();
    
    // Créer les index si ils n'existent pas déjà
    await createIndexesIfNotExist();
    
    // Créer un compte admin par défaut si aucun n'existe
    await createDefaultAdmin();
    
    // Créer une campagne ZAKA par défaut si aucune n'existe
    await createDefaultCampaign();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Base de données initialisée avec succès' 
      })
    };
  } catch (err) {
    console.error('Erreur lors de l\'initialisation de la base de données:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de l\'initialisation de la base de données',
        error: err.message
      })
    };
  }
};

/**
 * Crée les collections nécessaires si elles n'existent pas
 */
async function createCollectionsIfNotExist() {
  const collections = ['users', 'donations', 'campaigns', 'associations'];
  
  for (const collection of collections) {
    try {
      await client.query(
        q.If(
          q.Exists(q.Collection(collection)),
          true,
          q.CreateCollection({ name: collection })
        )
      );
      console.log(`Collection '${collection}' vérifiée ou créée`);
    } catch (err) {
      console.error(`Erreur lors de la création de la collection '${collection}':`, err);
      throw err;
    }
  }
}

/**
 * Crée les index nécessaires si ils n'existent pas
 */
async function createIndexesIfNotExist() {
  const indexes = [
    {
      name: 'users_by_email',
      collection: 'users',
      terms: [{ field: ['data', 'email'] }],
      unique: true
    },
    {
      name: 'donations_by_donor',
      collection: 'donations',
      terms: [{ field: ['data', 'donorId'] }]
    },
    {
      name: 'donations_by_campaign',
      collection: 'donations',
      terms: [{ field: ['data', 'campaignId'] }]
    },
    {
      name: 'campaigns_by_association',
      collection: 'campaigns',
      terms: [{ field: ['data', 'associationId'] }]
    },
    {
      name: 'active_campaigns',
      collection: 'campaigns',
      terms: [{ field: ['data', 'isActive'] }]
    }
  ];
  
  for (const index of indexes) {
    try {
      await client.query(
        q.If(
          q.Exists(q.Index(index.name)),
          true,
          q.CreateIndex({
            name: index.name,
            source: q.Collection(index.collection),
            terms: index.terms,
            unique: index.unique || false
          })
        )
      );
      console.log(`Index '${index.name}' vérifié ou créé`);
    } catch (err) {
      console.error(`Erreur lors de la création de l'index '${index.name}':`, err);
      throw err;
    }
  }
}

/**
 * Crée un compte administrateur par défaut si aucun n'existe
 */
async function createDefaultAdmin() {
  try {
    const adminExists = await client.query(
      q.Exists(q.Match(q.Index('users_by_email'), 'admin@givplus.org'))
    );
    
    if (!adminExists) {
      await client.query(
        q.Create(q.Collection('users'), {
          data: {
            email: 'admin@givplus.org',
            password: 'admin123', // À changer après la première connexion
            firstName: 'Admin',
            lastName: 'GivPlus',
            role: 'admin',
            createdAt: q.Now()
          }
        })
      );
      console.log('Compte administrateur par défaut créé');
    }
  } catch (err) {
    console.error('Erreur lors de la création du compte administrateur:', err);
    throw err;
  }
}

/**
 * Crée une association ZAKA par défaut et sa campagne si aucune n'existe
 */
async function createDefaultCampaign() {
  try {
    // Vérifier si l'association ZAKA existe
    let zakaAssociationId;
    try {
      const zakaAssociationExists = await client.query(
        q.Exists(q.Match(q.Index('users_by_email'), 'contact@zaka.org'))
      );
      
      if (!zakaAssociationExists) {
        const zakaAssociation = await client.query(
          q.Create(q.Collection('users'), {
            data: {
              email: 'contact@zaka.org',
              password: 'zaka123', // À changer après la première connexion
              firstName: 'ZAKA',
              lastName: 'Fondation',
              role: 'association',
              description: 'ZAKA est une fondation humanitaire qui vient en aide aux victimes de catastrophes naturelles et humaines.',
              logo: '/assets/zaka_logo.png',
              createdAt: q.Now()
            }
          })
        );
        zakaAssociationId = zakaAssociation.ref.id;
      } else {
        const zakaAssociation = await client.query(
          q.Get(q.Match(q.Index('users_by_email'), 'contact@zaka.org'))
        );
        zakaAssociationId = zakaAssociation.ref.id;
      }
    } catch (err) {
      console.error('Erreur lors de la vérification de l\'association ZAKA:', err);
      throw err;
    }
    
    // Vérifier si une campagne ZAKA existe déjà
    const zakaCampaignExists = await client.query(
      q.Exists(
        q.Match(q.Index('campaigns_by_association'), zakaAssociationId)
      )
    );
    
    if (!zakaCampaignExists) {
      await client.query(
        q.Create(q.Collection('campaigns'), {
          data: {
            title: 'Urgence Humanitaire - ZAKA',
            description: 'Soutenez les équipes de ZAKA dans leur mission d\'assistance aux victimes des récentes catastrophes. Votre don permettra de fournir des secours d\'urgence et d\'aider à la reconstruction.',
            targetAmount: 100000,
            currentAmount: 0,
            associationId: zakaAssociationId,
            imageUrl: '/assets/zaka-campaign.png',
            startDate: q.Now(),
            endDate: null,
            isActive: true,
            donationCount: 0,
            createdAt: q.Now(),
            updatedAt: q.Now()
          }
        })
      );
      console.log('Campagne ZAKA par défaut créée');
    }
  } catch (err) {
    console.error('Erreur lors de la création de la campagne ZAKA:', err);
    throw err;
  }
}
