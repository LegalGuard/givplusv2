const { client, q } = require('./faunaConfig');

/**
 * Fonction de gestion des donations
 */
exports.handler = async (event, context) => {
  // Analyser les en-têtes d'autorisation pour vérifier l'authentification
  const authHeader = event.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  // Vérifier si l'utilisateur est authentifié
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: 'Authentification requise' })
    };
  }
  
  // Traiter différentes actions selon la méthode HTTP
  switch (event.httpMethod) {
    case 'POST':
      return await createDonation(event, token);
    case 'GET':
      return await getDonations(event, token);
    default:
      return { 
        statusCode: 405, 
        body: JSON.stringify({ success: false, message: 'Méthode non autorisée' })
      };
  }
};

/**
 * Création d'une nouvelle donation
 */
async function createDonation(event, token) {
  try {
    const data = JSON.parse(event.body);
    const { 
      amount, 
      currency = 'EUR', 
      campaignId,
      paymentMethod, 
      donorId,
      isAnonymous = false,
      message = ''
    } = data;
    
    // Vérifier les champs requis
    if (!amount || !campaignId || !paymentMethod) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Montant, campagne et méthode de paiement requis' 
        })
      };
    }

    // Créer la donation dans FaunaDB
    const donation = await client.query(
      q.Create(q.Collection('donations'), {
        data: {
          amount,
          currency,
          campaignId,
          paymentMethod,
          donorId,
          isAnonymous,
          message,
          status: 'completed',
          createdAt: q.Now()
        }
      })
    );

    // Si l'utilisateur est identifié, mettre à jour son historique de donations
    if (donorId) {
      await client.query(
        q.Update(q.Ref(q.Collection('users'), donorId), {
          data: {
            donations: q.Append([donation.ref], q.Select(['data', 'donations'], q.Get(q.Ref(q.Collection('users'), donorId)), []))
          }
        })
      );
    }

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        donation: {
          id: donation.ref.id,
          ...donation.data
        }
      })
    };
  } catch (err) {
    console.error('Erreur lors de la création de la donation:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la création de la donation' 
      })
    };
  }
}

/**
 * Récupération des donations
 */
async function getDonations(event, token) {
  try {
    const { queryStringParameters } = event;
    const userId = queryStringParameters?.userId;
    const campaignId = queryStringParameters?.campaignId;
    
    let donations;
    
    // Filtrer par utilisateur si spécifié
    if (userId) {
      donations = await client.query(
        q.Map(
          q.Paginate(
            q.Match(q.Index('donations_by_donor'), userId),
            { size: 100 }
          ),
          q.Lambda('donationRef', q.Get(q.Var('donationRef')))
        )
      );
    } 
    // Filtrer par campagne si spécifiée
    else if (campaignId) {
      donations = await client.query(
        q.Map(
          q.Paginate(
            q.Match(q.Index('donations_by_campaign'), campaignId),
            { size: 100 }
          ),
          q.Lambda('donationRef', q.Get(q.Var('donationRef')))
        )
      );
    } 
    // Récupérer toutes les donations sinon
    else {
      donations = await client.query(
        q.Map(
          q.Paginate(
            q.Documents(q.Collection('donations')),
            { size: 100 }
          ),
          q.Lambda('donationRef', q.Get(q.Var('donationRef')))
        )
      );
    }

    // Formater les résultats
    const formattedDonations = donations.data.map(donation => ({
      id: donation.ref.id,
      ...donation.data
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        donations: formattedDonations
      })
    };
    
  } catch (err) {
    console.error('Erreur lors de la récupération des donations:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la récupération des donations' 
      })
    };
  }
}
