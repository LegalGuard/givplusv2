import React, { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Clé publique Stripe en mode production
const stripePromise = loadStripe('pk_live_51RNNSs07Bycrd0iJX7QvWm2SscBwZmxHtrc2zkuX2ETYHULPJm8xLbumW95SpFttBfFBrkj92pqvOfaKXpmaffhe00ir7lOGfm');

interface StripeContainerProps {
  children: ReactNode;
}

const StripeContainer: React.FC<StripeContainerProps> = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeContainer;
