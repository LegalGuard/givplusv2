import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  donor: mongoose.Types.ObjectId;
  campaign: mongoose.Types.ObjectId;
  association: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  isAnonymous: boolean;
  message?: string;
  taxReceipt?: {
    issued: boolean;
    date?: Date;
    number?: string;
    document?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    donor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Le donateur est requis']
    },
    campaign: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: [true, 'La campagne est requise']
    },
    association: {
      type: Schema.Types.ObjectId,
      ref: 'Association',
      required: [true, "L'association est requise"]
    },
    amount: {
      type: Number,
      required: [true, 'Le montant du don est requis'],
      min: [1, 'Le montant minimum est de 1']
    },
    currency: {
      type: String,
      default: 'EUR',
      enum: ['EUR', 'USD', 'GBP', 'CAD']
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      required: [true, 'La méthode de paiement est requise'],
      enum: ['card', 'paypal', 'bank_transfer', 'other']
    },
    transactionId: String,
    isAnonymous: {
      type: Boolean,
      default: false
    },
    message: String,
    taxReceipt: {
      issued: {
        type: Boolean,
        default: false
      },
      date: Date,
      number: String,
      document: String
    }
  },
  {
    timestamps: true
  }
);

// Middleware pour mise à jour des statistiques de la campagne après un don
donationSchema.post('save', async function(doc) {
  if (doc.status === 'completed') {
    const Campaign = mongoose.model('Campaign');
    await Campaign.findByIdAndUpdate(doc.campaign, {
      $inc: {
        currentAmount: doc.amount,
        donorCount: 1
      }
    });
  }
});

const Donation = mongoose.model<IDonation>('Donation', donationSchema);

export default Donation;
