import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  title: string;
  description: string;
  association: mongoose.Types.ObjectId;
  goal: number;
  currentAmount: number;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  category: string;
  image?: string;
  tags?: string[];
  donorCount: number;
  updates?: Array<{
    date: Date;
    title: string;
    content: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    title: {
      type: String,
      required: [true, 'Le titre de la campagne est requis'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'La description de la campagne est requise']
    },
    association: {
      type: Schema.Types.ObjectId,
      ref: 'Association',
      required: [true, "L'association liée à la campagne est requise"]
    },
    goal: {
      type: Number,
      required: [true, 'Le montant objectif est requis'],
      min: [0, "L'objectif de collecte ne peut pas être négatif"]
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: [0, "Le montant collecté ne peut pas être négatif"]
    },
    startDate: {
      type: Date,
      required: [true, 'La date de début est requise'],
      default: Date.now
    },
    endDate: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
      enum: ['education', 'santé', 'environnement', 'humanitaire', 'culture', 'social', 'autre']
    },
    image: String,
    tags: [String],
    donorCount: {
      type: Number,
      default: 0
    },
    updates: [
      {
        date: {
          type: Date,
          default: Date.now
        },
        title: {
          type: String,
          required: true
        },
        content: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Index pour les recherches de campagnes
campaignSchema.index({ title: 'text', description: 'text', category: 1, tags: 1 });

// Méthode virtuelle pour calculer le pourcentage atteint
campaignSchema.virtual('percentComplete').get(function(this: ICampaign) {
  return this.goal > 0 ? Math.min(Math.round((this.currentAmount / this.goal) * 100), 100) : 0;
});

// Méthode virtuelle pour déterminer si la campagne est terminée
campaignSchema.virtual('isCompleted').get(function(this: ICampaign) {
  return this.currentAmount >= this.goal;
});

// Méthode virtuelle pour calculer les jours restants
campaignSchema.virtual('daysLeft').get(function(this: ICampaign) {
  if (!this.endDate) return null;
  const now = new Date();
  const diffTime = this.endDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema);

export default Campaign;
