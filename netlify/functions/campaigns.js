const { client, q } = require('./faunaConfig');
const jwt = require('jsonwebtoken');

// Secret utilisé pour vérifier les tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || 'givplus-zaka-secure-secret';

/**
 * Fonction de gestion des campagnes
 */
exports.handler = async (event, context) => {
  // Pour les requêtes GET publiques, pas besoin d'authentification
  if (event.httpMethod === 'GET' && !event.path.includes('/api/campaigns/admin')) {
    return await getCampaigns(event);
  }
  
  // Pour toutes les autres requêtes, vérifier l'authentification
  const authHeader = event.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: 'Authentification requise' })
    };
  }
  
  try {
    // Vérifier et décoder le token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    // Traiter différentes actions selon la méthode HTTP
    switch (event.httpMethod) {
      case 'GET':
        return await getCampaigns(event, decodedToken);
      case 'POST':
        return await createCampaign(event, decodedToken);
      case 'PUT':
        return await updateCampaign(event, decodedToken);
      case 'DELETE':
        return await deleteCampaign(event, decodedToken);
      default:
        return { 
          statusCode: 405, 
          body: JSON.stringify({ success: false, message: 'Méthode non autorisée' })
        };
    }
  } catch (err) {
    console.error('Erreur d\'authentification:', err);
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: 'Token invalide ou expiré' })
    };
  }
};

/**
 * Récupération des campagnes
 */
async function getCampaigns(event, decodedToken = null) {
  try {
    const { queryStringParameters } = event;
    const campaignId = queryStringParameters?.id;
    const associationId = queryStringParameters?.associationId;
    const isAdmin = decodedToken?.role === 'admin' || decodedToken?.role === 'association';
    
    // Récupérer une campagne spécifique
    if (campaignId) {
      const campaign = await client.query(
        q.Get(q.Ref(q.Collection('campaigns'), campaignId))
      );
      
      // Si la campagne n'est pas active, vérifier les permissions
      if (!campaign.data.isActive && !isAdmin) {
        return {
          statusCode: 403,
          body: JSON.stringify({ 
            success: false, 
            message: 'Accès refusé. Cette campagne n\'est pas active.' 
          })
        };
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          campaign: {
            id: campaign.ref.id,
            ...campaign.data
          }
        })
      };
    }
    
    // Filtrer par association
    let campaigns;
    if (associationId) {
      campaigns = await client.query(
        q.Map(
          q.Paginate(
            q.Match(q.Index('campaigns_by_association'), associationId),
            { size: 100 }
          ),
          q.Lambda('campaignRef', q.Get(q.Var('campaignRef')))
        )
      );
    } 
    // Récupérer toutes les campagnes
    else {
      campaigns = await client.query(
        q.Map(
          q.Paginate(
            // Si admin, montrer toutes les campagnes, sinon uniquement les campagnes actives
            isAdmin 
              ? q.Documents(q.Collection('campaigns'))
              : q.Match(q.Index('active_campaigns'), true),
            { size: 100 }
          ),
          q.Lambda('campaignRef', q.Get(q.Var('campaignRef')))
        )
      );
    }
    
    // Formater les résultats
    const formattedCampaigns = campaigns.data.map(campaign => ({
      id: campaign.ref.id,
      ...campaign.data
    }));
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        campaigns: formattedCampaigns
      })
    };
  } catch (err) {
    console.error('Erreur lors de la récupération des campagnes:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la récupération des campagnes' 
      })
    };
  }
}

/**
 * Création d'une nouvelle campagne
 */
async function createCampaign(event, decodedToken) {
  // Vérifier si l'utilisateur a les droits d'admin ou d'association
  if (decodedToken.role !== 'admin' && decodedToken.role !== 'association') {
    return {
      statusCode: 403,
      body: JSON.stringify({ 
        success: false, 
        message: 'Accès refusé. Vous n\'avez pas les droits nécessaires.' 
      })
    };
  }
  
  try {
    const data = JSON.parse(event.body);
    const { 
      title, 
      description, 
      targetAmount,
      associationId,
      imageUrl,
      startDate,
      endDate = null,
      isActive = true
    } = data;
    
    // Vérifier les champs requis
    if (!title || !description || !targetAmount || !associationId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Titre, description, montant cible et ID de l\'association requis' 
        })
      };
    }
    
    // Si l'utilisateur est une association, vérifier qu'il crée pour sa propre association
    if (decodedToken.role === 'association' && decodedToken.associationId !== associationId) {
      return {
        statusCode: 403,
        body: JSON.stringify({ 
          success: false, 
          message: 'Vous ne pouvez créer des campagnes que pour votre propre association.' 
        })
      };
    }
    
    // Créer la campagne dans FaunaDB
    const campaign = await client.query(
      q.Create(q.Collection('campaigns'), {
        data: {
          title,
          description,
          targetAmount,
          currentAmount: 0,
          associationId,
          imageUrl,
          startDate: startDate || q.Now(),
          endDate,
          isActive,
          donationCount: 0,
          createdAt: q.Now(),
          updatedAt: q.Now()
        }
      })
    );
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        campaign: {
          id: campaign.ref.id,
          ...campaign.data
        }
      })
    };
  } catch (err) {
    console.error('Erreur lors de la création de la campagne:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la création de la campagne' 
      })
    };
  }
}

/**
 * Mise à jour d'une campagne existante
 */
async function updateCampaign(event, decodedToken) {
  // Vérifier si l'utilisateur a les droits d'admin ou d'association
  if (decodedToken.role !== 'admin' && decodedToken.role !== 'association') {
    return {
      statusCode: 403,
      body: JSON.stringify({ 
        success: false, 
        message: 'Accès refusé. Vous n\'avez pas les droits nécessaires.' 
      })
    };
  }
  
  try {
    const data = JSON.parse(event.body);
    const { id, ...updateData } = data;
    
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'ID de campagne requis' 
        })
      };
    }
    
    // Récupérer la campagne existante pour vérifier les permissions
    const existingCampaign = await client.query(
      q.Get(q.Ref(q.Collection('campaigns'), id))
    );
    
    // Si l'utilisateur est une association, vérifier qu'il modifie sa propre campagne
    if (decodedToken.role === 'association' && 
        existingCampaign.data.associationId !== decodedToken.associationId) {
      return {
        statusCode: 403,
        body: JSON.stringify({ 
          success: false, 
          message: 'Vous ne pouvez modifier que les campagnes de votre propre association.' 
        })
      };
    }
    
    // Ne jamais permettre la modification de l'associationId ou du montant collecté
    delete updateData.associationId;
    delete updateData.currentAmount;
    delete updateData.donationCount;
    
    // Mettre à jour la campagne
    const updatedCampaign = await client.query(
      q.Update(q.Ref(q.Collection('campaigns'), id), {
        data: {
          ...updateData,
          updatedAt: q.Now()
        }
      })
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        campaign: {
          id: updatedCampaign.ref.id,
          ...updatedCampaign.data
        }
      })
    };
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la campagne:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la mise à jour de la campagne' 
      })
    };
  }
}

/**
 * Suppression d'une campagne
 */
async function deleteCampaign(event, decodedToken) {
  // Seul un admin peut supprimer une campagne
  if (decodedToken.role !== 'admin') {
    return {
      statusCode: 403,
      body: JSON.stringify({ 
        success: false, 
        message: 'Accès refusé. Seul un administrateur peut supprimer une campagne.' 
      })
    };
  }
  
  try {
    const { queryStringParameters } = event;
    const campaignId = queryStringParameters?.id;
    
    if (!campaignId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'ID de campagne requis' 
        })
      };
    }
    
    await client.query(
      q.Delete(q.Ref(q.Collection('campaigns'), campaignId))
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Campagne supprimée avec succès'
      })
    };
  } catch (err) {
    console.error('Erreur lors de la suppression de la campagne:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la suppression de la campagne' 
      })
    };
  }
}
