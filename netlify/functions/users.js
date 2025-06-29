const { client, q } = require('./faunaConfig');
const jwt = require('jsonwebtoken');

// Secret utilisé pour vérifier les tokens JWT (à placer dans les variables d'environnement en production)
const JWT_SECRET = process.env.JWT_SECRET || 'givplus-zaka-secure-secret';

/**
 * Fonction de gestion des utilisateurs
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
  
  try {
    // Vérifier et décoder le token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    // Traiter différentes actions selon la méthode HTTP
    switch (event.httpMethod) {
      case 'GET':
        return await getUser(event, decodedToken);
      case 'PUT':
        return await updateUser(event, decodedToken);
      case 'DELETE':
        return await deleteUser(event, decodedToken);
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
 * Récupération des informations d'un utilisateur
 */
async function getUser(event, decodedToken) {
  try {
    const { queryStringParameters } = event;
    const userId = queryStringParameters?.id || decodedToken.id;
    
    // Vérifier si l'utilisateur demande ses propres informations ou s'il est admin
    if (userId !== decodedToken.id && decodedToken.role !== 'admin') {
      return {
        statusCode: 403,
        body: JSON.stringify({ 
          success: false, 
          message: 'Accès refusé. Vous ne pouvez accéder qu\'à vos propres informations.' 
        })
      };
    }
    
    const user = await client.query(
      q.Get(q.Ref(q.Collection('users'), userId))
    );
    
    // Ne jamais renvoyer le mot de passe
    const { password, ...userData } = user.data;
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        user: {
          id: user.ref.id,
          ...userData
        }
      })
    };
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la récupération de l\'utilisateur' 
      })
    };
  }
}

/**
 * Mise à jour des informations d'un utilisateur
 */
async function updateUser(event, decodedToken) {
  try {
    const data = JSON.parse(event.body);
    const userId = data.id || decodedToken.id;
    
    // Vérifier si l'utilisateur met à jour ses propres informations ou s'il est admin
    if (userId !== decodedToken.id && decodedToken.role !== 'admin') {
      return {
        statusCode: 403,
        body: JSON.stringify({ 
          success: false, 
          message: 'Accès refusé. Vous ne pouvez modifier que vos propres informations.' 
        })
      };
    }
    
    // Ne jamais accepter de modifications de rôle sauf par un administrateur
    if (data.role && decodedToken.role !== 'admin') {
      delete data.role;
    }
    
    // Ne jamais mettre à jour l'email directement, cela nécessiterait un processus de vérification
    if (data.email) {
      delete data.email;
    }
    
    // Mettre à jour l'utilisateur
    const updatedUser = await client.query(
      q.Update(q.Ref(q.Collection('users'), userId), {
        data: {
          ...data,
          updatedAt: q.Now()
        }
      })
    );
    
    // Ne jamais renvoyer le mot de passe
    const { password, ...userData } = updatedUser.data;
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        user: {
          id: updatedUser.ref.id,
          ...userData
        }
      })
    };
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la mise à jour de l\'utilisateur' 
      })
    };
  }
}

/**
 * Suppression d'un utilisateur
 */
async function deleteUser(event, decodedToken) {
  try {
    const { queryStringParameters } = event;
    const userId = queryStringParameters?.id || decodedToken.id;
    
    // Seul l'utilisateur lui-même ou un admin peut supprimer un compte
    if (userId !== decodedToken.id && decodedToken.role !== 'admin') {
      return {
        statusCode: 403,
        body: JSON.stringify({ 
          success: false, 
          message: 'Accès refusé. Vous ne pouvez supprimer que votre propre compte.' 
        })
      };
    }
    
    await client.query(
      q.Delete(q.Ref(q.Collection('users'), userId))
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Compte utilisateur supprimé avec succès'
      })
    };
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la suppression de l\'utilisateur' 
      })
    };
  }
}
