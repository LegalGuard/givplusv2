import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, CreditCard, Check, AlertCircle } from 'lucide-react';
import StripeContainer from '../components/stripe/StripeContainer';
import CardPayment from '../components/stripe/CardPayment';

const ZakaDonation = () => {
  
  // États du formulaire
  const [amount, setAmount] = useState('36');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    taxReceipt: true
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [donationReference, setDonationReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  // État pour suivre la réussite ou l'échec du paiement
  const [paymentError, setPaymentError] = useState('');
  const [paymentId, setPaymentId] = useState('');

  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Si le paiement est déjà en cours de traitement, on sort
    if (isLoading) return;
    
    // Si c'est l'étape 1, on passe directement à l'étape 2
    if (step === 1) {
      setStep(2);
      return;
    }
    
    // Si nous sommes à l'étape 2 et que le paiement est par carte, 
    // le composant CardPayment gèrera le processus
    if (step === 2 && paymentMethod === 'card') {
      // Le traitement est délégué au composant CardPayment
      return;
    }
    
    // Pour les autres méthodes de paiement (virement bancaire, etc.)
    setIsLoading(true);
    
    // Simuler un processus de paiement
    setTimeout(() => {
      // Générer une référence de don
      const reference = `DON-ZK-${Math.floor(Math.random() * 1000000)}`;
      setDonationReference(reference);
      
      // Passer à l'étape de confirmation
      setStep(3);
      setIsLoading(false);
    }, 1500);
  };
  
  // Fonction appelée lorsque le paiement Stripe est réussi
  const handlePaymentSuccess = (paymentId: string) => {
    console.log('Paiement réussi:', paymentId);
    setPaymentId(paymentId);
    setStep(3);
  };
  
  // Fonction appelée en cas d'erreur de paiement Stripe
  const handlePaymentError = (error: string) => {
    console.error('Erreur de paiement:', error);
    // Affichage d'une notification d'erreur si nécessaire
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const effectiveAmount = amount === 'custom' ? customAmount : amount;

  // Étape 1: Sélection du montant
  const renderStepOne = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Choisissez votre montant</h2>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[18, 36, 54, 108, 180, 360].map((amt) => (
          <button
            key={amt}
            type="button"
            className={`py-3 px-4 rounded-md transition-colors ${
              amount === amt.toString()
                ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-700 font-bold shadow-md'
                : 'bg-white border border-gray-300 hover:border-yellow-400 text-gray-800 hover:bg-yellow-50'
            }`}
            onClick={() => handleAmountSelect(amt.toString())}
          >
            {amt}€
          </button>
        ))}
      </div>
      
      <div className="mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Montant personnalisé</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              min="1"
              step="1"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Autre montant"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            id="recurrent"
            type="checkbox"
            checked={isRecurring}
            onChange={() => setIsRecurring(!isRecurring)}
            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="recurrent" className="ml-2 block text-sm text-gray-700 cursor-pointer">
            Faire un don mensuel récurrent
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="anonymous"
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700 cursor-pointer">
            Faire un don anonyme
          </label>
        </div>
      </div>
      {(amount || customAmount) ? (
        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={isLoading || (amount === 'custom' ? !customAmount : !amount)}
            className={`w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-md ${
              isLoading || (amount === 'custom' ? !customAmount : !amount) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              'Chargement...'
            ) : (
              <>
                <Heart className="mr-2" size={18} />
                Continuer
              </>
            )}
          </button>
          {/* Galerie d'images ZAKA */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Les équipes ZAKA en action</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg overflow-hidden shadow-md bg-white h-48 flex items-center justify-center">
                <img
                  src="/3.jpg"
                  alt="ZAKA Logo Officiel"
                  className="h-full object-contain"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md h-48 flex items-center justify-center">
                <img
                  src="/1.jpg"
                  alt="Équipes de secours ZAKA"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md h-48 flex items-center justify-center">
                <img
                  src="/2.jpg"
                  alt="Volontaires ZAKA"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-amber-600 flex items-center justify-center mt-4">
          <AlertCircle size={18} className="mr-2" />
          <span>Veuillez sélectionner ou saisir un montant</span>
        </div>
      )}
    </div>
  );

  // Étape 2: Informations du donateur et paiement
  const renderStepTwo = () => (
    <div className="space-y-6">
      {paymentMethod !== 'card' && (
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handlePreviousStep}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Retour
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Traitement en cours...' : 'Confirmer le don'}
          </button>
        </div>
      )}
      {paymentMethod === 'card' && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handlePreviousStep}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Retour
          </button>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              value={donorInfo.firstName}
              onChange={handleInputChange}
              className="block w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required={!isAnonymous}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              value={donorInfo.lastName}
              onChange={handleInputChange}
              className="block w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required={!isAnonymous}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={donorInfo.email}
            onChange={handleInputChange}
            className="block w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Nécessaire pour recevoir votre reçu fiscal
          </p>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Adresse
          </label>
          <input
            type="text"
            name="address"
            value={donorInfo.address}
            onChange={handleInputChange}
            className="block w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Ville
            </label>
            <input
              type="text"
              name="city"
              value={donorInfo.city}
              onChange={handleInputChange}
              className="block w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Code postal
            </label>
            <input
              type="text"
              name="postalCode"
              value={donorInfo.postalCode}
              onChange={handleInputChange}
              className="block w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Pays
          </label>
          <select
            name="country"
            value={donorInfo.country}
            onChange={handleInputChange}
            className="block w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            required
          >
            <option value="France">France</option>
            <option value="Belgique">Belgique</option>
            <option value="Suisse">Suisse</option>
            <option value="Canada">Canada</option>
            <option value="Israel">Israël</option>
            <option value="other">Autre</option>
          </select>
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <CreditCard className="mr-2" size={20} />
          Information de paiement
        </h3>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Méthode de paiement</label>
          
          <div className="space-y-3">
            <label className="block p-3 border border-gray-300 rounded-md hover:border-yellow-500 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700 inline-flex items-center">
                <CreditCard size={18} className="mr-1.5" /> Paiement par carte bancaire
              </span>
            </label>
            
            <label className="block p-3 border border-gray-300 rounded-md hover:border-yellow-500 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700 inline-flex items-center">
                <CreditCard size={18} className="mr-1.5" /> Virement bancaire
              </span>
            </label>
          </div>
        </div>
        
        {paymentMethod === 'card' ? (
          <>
            <StripeContainer>
              <CardPayment
                amount={effectiveAmount}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                isRecurring={isRecurring}
                donorInfo={{
                  firstName: donorInfo.firstName,
                  lastName: donorInfo.lastName,
                  email: donorInfo.email
                }}
              />
            </StripeContainer>
            
            <div className="text-sm text-gray-600 mt-4">
              <p className="mb-2 flex items-start">
                <Check size={16} className="mr-2 mt-0.5 text-primary-600" />
                Votre transaction est sécurisée par un cryptage SSL 256-bits
              </p>
              <p className="flex items-start">
                <Check size={16} className="mr-2 mt-0.5 text-primary-600" />
                66% de votre don est déductible de vos impôts
              </p>
            </div>
          </>
        ) : (
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-md font-medium flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                Traitement en cours...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-5 w-5" />
                Finaliser le don
              </>
            )}
          </button>
        )}
        
        {paymentError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{paymentError}</span>
          </div>
        )}
      </div>
    </div>
  );

  // Étape 3: Confirmation du don
  const renderStepThree = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={32} className="text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Merci pour votre don!</h2>
      <p className="text-gray-600 mb-6">
        Votre don de {effectiveAmount}€ à ZAKA a été traité avec succès.
      </p>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-md inline-block mx-auto">
        <p className="font-medium">Récapitulatif de votre don:</p>
        <p>Montant: <strong>{effectiveAmount}€</strong></p>
        {paymentId ? (
          <p>Identifiant de paiement: <span className="font-mono text-sm bg-gray-100 p-1 rounded">{paymentId}</span></p>
        ) : (
          <p>Référence: <strong>{donationReference || "N/A"}</strong></p>
        )}
        {isRecurring && <p className="text-indigo-600 font-medium">Don mensuel récurrent</p>}
      </div>
      
      <p className="mb-4">
        Un reçu fiscal vous sera envoyé à l'adresse email: <strong>{donorInfo.email}</strong>
      </p>
      
      <div className="mt-6 space-y-4">
        <Link
          to="/"
          className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-md font-medium inline-block"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );

  // Réinitialiser les erreurs de paiement lors du changement d'étape
  useEffect(() => {
    setPaymentError('');
  }, [step]);
  

  
  return (
    <div className="bg-white">
      {/* En-tête avec dégradé de couleur GivPlus */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
            <img src="/givplus-logo-white.png" alt="GivPlus Logo" className="h-14 md:h-16" />
          </div>
          <Link
            to="/"
            className="text-white hover:text-yellow-400 transition-colors"
          >
            Retour à l'accueil
          </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="flex items-center mb-6">
                            <div className="flex flex-col md:flex-row items-center md:space-x-6">
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <img
                    src="/Zaka_Logo.png"
                    alt="ZAKA Logo Officiel"
                    className="h-24 w-auto bg-white rounded-md shadow-md"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-indigo-800">Faire un don à ZAKA</h1>
                  <p className="text-gray-600 mt-1">Soutenez les équipes de secours d'urgence</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Organisation de secours reconnue en Israël et à l'international</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Étapes du processus de don */}
            <div className="mb-10">
              <div className="flex items-center justify-center">
                <div className={`h-1 w-1/3 ${step >= 1 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                <div className={`h-1 w-1/3 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                <div className={`h-1 w-1/3 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-8">
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <img src="/givplus-logo.png" alt="GivPlus Logo" className="h-8 w-auto mr-2" />
                  <span className="text-sm text-gray-500">Plateforme sécurisée de dons</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  <div className={`h-0.5 w-8 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  <div className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  <div className={`h-0.5 w-8 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  <div className={`h-2 w-2 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                </div>
              </div>
              
              {step === 1 && (
                <form onSubmit={handleSubmit}>
                  {renderStepOne()}
                </form>
              )}
              {step === 2 && (paymentMethod === 'card' ? renderStepTwo() : (
                <form onSubmit={handleSubmit}>
                  {renderStepTwo()}
                </form>
              ))}
              {step === 3 && renderStepThree()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakaDonation;
