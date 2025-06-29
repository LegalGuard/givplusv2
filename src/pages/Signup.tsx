import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { executeReset } from '../db/resetDatabase';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const isSubmitDisabled = !passwordRegex.test(password) || password !== confirmPassword || !terms || isSubmitting;
  
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  
  // Récupérer l'URL de redirection si elle existe
  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifications de base
    if (!passwordRegex.test(password)) {
      setError('Mot de passe trop faible. Il doit contenir au moins 8 caractères dont une majuscule, une minuscule et un chiffre.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!terms) {
      setError('Vous devez accepter les conditions d\'utilisation.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // Préparer les données utilisateur
      const userData = {
        firstName,
        lastName,
        email,
        password,
        role: 'donor' // Par défaut, l'inscription crée un compte donateur
      };
      
      // Notre register retourne maintenant un objet avec des détails
      const response = await register(userData);
      
      if (response && response.success) {
        console.log('Inscription réussie, redirection vers', from);
        navigate(from, { replace: true });
      } else {
        // Afficher le message d'erreur spécifique s'il existe
        setError(response?.message || 'Erreur lors de l\'inscription. Cet email est peut-être déjà utilisé.');
      }
    } catch (err) {
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      console.error('Erreur d\'inscription:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src="/givplus-logo.png" alt="GivPlus" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inscription Donateur</h2>
          
          {error && (
            <div className="mt-4 flex items-center justify-center text-sm text-red-600 bg-red-50 p-2 rounded-md">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="sr-only">Prénom</label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Prénom"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">Nom</label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nom"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">Email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Mot de passe"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="sr-only">Confirmer le mot de passe</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 mt-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirmer le mot de passe"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white ${isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'} `}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Inscription en cours...
              </>
            ) : (
              "S'inscrire"
            )}
          </button>
          <button
            type="button"
            className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            onClick={() => alert('L\'inscription via Google sera disponible prochainement')}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
            Continuer avec Google
          </button>
          <div className="flex items-center mt-4">
            <input 
              type="checkbox" 
              id="terms" 
              checked={terms} 
              onChange={(e) => setTerms(e.target.checked)} 
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" 
              disabled={isSubmitting}
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">J'accepte les <Link className="text-primary-600 underline" to="/terms">conditions d'utilisation</Link></label>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Déjà un compte?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">Se connecter</Link>
        </p>
        <div className="mt-4 text-center">
          <button 
            type="button" 
            className="text-xs text-gray-500 underline" 
            onClick={() => {
              if (window.confirm('Cette action va réinitialiser toutes les données locales. Continuer?')) {
                executeReset();
              }
            }}
          >
            Problème d'inscription? Réinitialiser la base de données locale
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
