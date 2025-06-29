import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Donation = {
  id: string;
  date: string;
  association: string;
  campaign: string;
  amount: number;
  status: 'Succès' | 'En attente' | 'Échoué';
  receiptUrl?: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  tickets: number;
  banner: string;
};

export type TaxDoc = {
  id: string;
  ref: string;
  date: string;
  amount: number;
  association: string;
  url: string;
};

export type RecurringDonation = {
  id: string;
  amount: number;
  nextDate: string;
  active: boolean;
};

export type CommunicationPrefs = {
  email: boolean;
  sms: boolean;
  phone: boolean;
};

export type Donor = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  commPrefs: CommunicationPrefs;
  totalDonated: number;
  badge: 'Silver' | 'Gold' | 'Platinum';
};

type DonorState = {
  donor: Donor;
  donations: Donation[];
  events: EventItem[];
  taxDocs: TaxDoc[];
  recurring: RecurringDonation[];
};

const initialState: DonorState = {
  donor: {
    firstName: 'Sarah',
    lastName: 'Benito',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/100',
    phone: '+33 6 12 34 56 78',
    address: '12 rue des Fleurs, 75010 Paris',
    commPrefs: { email: true, sms: false, phone: false },
    totalDonated: 3200,
    badge: 'Silver',
  },
  donations: [
    { id: 'd1', date: '2025-05-02', association: 'Torah Or', campaign: 'Éducation', amount: 180, status: 'Succès', receiptUrl: '#' },
    { id: 'd2', date: '2025-04-10', association: 'Beth Rivkah', campaign: 'Séminaire', amount: 1000, status: 'Succès' },
  ],
  events: [
    { id: 'e1', title: 'Dîner caritatif', date: '2025-07-24', location: 'Paris', tickets: 2, banner: 'https://picsum.photos/seed/event1/400/200' },
    { id: 'e2', title: 'Marathon solidaire', date: '2025-08-02', location: 'Lyon', tickets: 4, banner: 'https://picsum.photos/seed/event2/400/200' },
    { id: 'e3', title: 'Webinaire', date: '2025-09-15', location: 'En ligne', tickets: 1, banner: 'https://picsum.photos/seed/event3/400/200' },
  ],
  taxDocs: [
    { id: 't1', ref: 'CERFA-2025-001', date: '2025-05-03', amount: 180, association: 'Torah Or', url: '#' },
  ],
  recurring: [
    { id: 'r1', amount: 50, nextDate: '2025-07-01', active: true },
  ],
};

const DonorContext = createContext<DonorState>(initialState);
export const useDonor = () => useContext(DonorContext);

export const DonorProvider = ({ children }: { children: ReactNode }) => {
  const [state] = useState(initialState);
  return <DonorContext.Provider value={state}>{children}</DonorContext.Provider>;
};
