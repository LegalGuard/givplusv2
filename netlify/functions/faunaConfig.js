// FaunaDB Configuration
const faunadb = require('faunadb');
const q = faunadb.query;

// Initialisation du client FaunaDB
// Dans l'environnement de production, cette clé sera définie via les variables d'environnement Netlify
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY || 'fnAFJ5gB_CAAUePQyAhq7kBUcbhNyf-kT80dZ4e-'
});

module.exports = {
  client,
  q
};
