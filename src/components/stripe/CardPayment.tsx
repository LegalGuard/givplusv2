import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Heart } from 'lucide-react';

interface CardPaymentProps {
  amount: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
  isRecurring: boolean;
  donorInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CardPayment: React.FC<CardPaymentProps> = ({ 
  amount, 
  onSuccess, 
  onError, 
  isRecurring, 
  donorInfo 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js n'a pas encore chargé
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Création d'une méthode de paiement avec Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${donorInfo.firstName} ${donorInfo.lastName}`,
          email: donorInfo.email,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      
      if (!paymentMethod || !paymentMethod.id) {
        throw new Error('La création de la méthode de paiement a échoué');
      }

      // En environnement de production, vous enverriez paymentMethod.id à votre serveur
      // pour créer une charge ou un abonnement via l'API Stripe côté serveur
      // Ici, nous utilisons directement l'ID de la méthode de paiement créée
      
      const paymentId = paymentMethod.id;
      console.log('Méthode de paiement créée avec succès:', paymentId);
      
      // Simulation d'un appel à l'API serveur (à implémenter côté serveur dans un environnement réel)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onSuccess(paymentId);
    } catch (error) {
      console.error('Erreur de paiement:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue lors du traitement de votre paiement.');
      onError(error instanceof Error ? error.message : 'Erreur de paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de paiement</h3>
          
          <div className="mb-4">
            <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
              Carte de crédit
            </label>
            <div className="border border-gray-300 rounded-md p-4 bg-white">
              <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
          
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2 flex items-start">
              <svg className="h-5 w-5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9h2v5H9v-5zm0-2a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
              </svg>
              {errorMessage}
            </div>
          )}
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement en cours...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-5 w-5" />
                  {isRecurring 
                    ? `Faire un don mensuel de ${amount}€` 
                    : `Faire un don ponctuel de ${amount}€`}
                </>
              )}
            </button>
          </div>
          
          <div className="mt-4">
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Paiement sécurisé par Stripe
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardPayment;
