const { client, q } = require('./faunaConfig');
const jwt = require('jsonwebtoken');

// Secret utilisé pour signer les tokens JWT (à placer dans les variables d'environnement en production)
const JWT_SECRET = process.env.JWT_SECRET || 'givplus-zaka-secure-secret';

/**
 * Fonction d'inscription utilisateur
 */
exports.handler = async (event, context) => {
  // N'autoriser que les requêtes POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Récupérer les données du corps de la requête
    const data = JSON.parse(event.body);
    const { action, email, password, firstName, lastName, role = 'donor' } = data;

    // Vérification des champs requis
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email et mot de passe requis' 
        })
      };
    }

    // Traiter selon l'action demandée
    if (action === 'login') {
      // Rechercher l'utilisateur par email
      try {
        const user = await client.query(
          q.Let(
            {
              userRef: q.Match(q.Index('users_by_email'), email)
            },
            q.If(
              q.Exists(q.Var('userRef')),
              q.Get(q.Var('userRef')),
              null
            )
          )
        );

        // Vérifier si l'utilisateur existe
        if (!user) {
          return {
            statusCode: 401,
            body: JSON.stringify({ 
              success: false, 
              message: 'Email ou mot de passe incorrect' 
            })
          };
        }

        // Vérifier le mot de passe (en production, utilisez bcrypt pour comparer)
        if (user.data.password !== password) {
          return {
            statusCode: 401,
            body: JSON.stringify({ 
              success: false, 
              message: 'Email ou mot de passe incorrect' 
            })
          };
        }

        // Créer le token JWT
        const token = jwt.sign(
          { 
            id: user.ref.id, 
            email: user.data.email, 
            role: user.data.role 
          },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        // Retourner le token et les infos utilisateur
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            user: {
              id: user.ref.id,
              email: user.data.email,
              firstName: user.data.firstName,
              lastName: user.data.lastName,
              role: user.data.role,
            },
            token
          })
        };

      } catch (err) {
        console.error('Erreur de connexion:', err);
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            success: false, 
            message: 'Erreur lors de la connexion' 
          })
        };
      }
    } else if (action === 'signup') {
      // Vérifier si l'utilisateur existe déjà
      try {
        const existingUser = await client.query(
          q.Exists(q.Match(q.Index('users_by_email'), email))
        );

        if (existingUser) {
          return {
            statusCode: 409,
            body: JSON.stringify({ 
              success: false, 
              message: 'Un utilisateur avec cet email existe déjà' 
            })
          };
        }

        // Créer le nouvel utilisateur
        const result = await client.query(
          q.Create(q.Collection('users'), {
            data: {
              email,
              password, // En production, hashez le mot de passe avec bcrypt
              firstName,
              lastName,
              role,
              createdAt: q.Now()
            }
          })
        );

        // Créer le token JWT
        const token = jwt.sign(
          { 
            id: result.ref.id, 
            email: result.data.email, 
            role: result.data.role 
          },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        // Retourner le token et les infos utilisateur
        return {
          statusCode: 201,
          body: JSON.stringify({
            success: true,
            user: {
              id: result.ref.id,
              email: result.data.email,
              firstName: result.data.firstName,
              lastName: result.data.lastName,
              role: result.data.role,
            },
            token
          })
        };
      } catch (err) {
        console.error('Erreur d\'inscription:', err);
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            success: false, 
            message: 'Erreur lors de l\'inscription' 
          })
        };
      }
    }

    // Action non reconnue
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        success: false, 
        message: 'Action non reconnue' 
      })
    };

  } catch (err) {
    console.error('Erreur générale:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur serveur' 
      })
    };
  }
};
