import mongoose, { Document, Schema } from 'mongoose';

export interface IAssociation extends Document {
  name: string;
  description: string;
  logo?: string;
  email: string;
  phoneNumber: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  legalStatus: string;
  registrationNumber: string;
  taxExemptStatus?: boolean;
  founders?: string[];
  mission: string;
  vision?: string;
  createdAt: Date;
  updatedAt: Date;
  admins: mongoose.Types.ObjectId[];
}

const associationSchema = new Schema<IAssociation>(
  {
    name: {
      type: String,
      required: [true, "Le nom de l'association est requis"],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: [true, "La description de l'association est requise"]
    },
    logo: String,
    email: {
      type: String,
      required: [true, "L'adresse email est requise"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Veuillez fournir une adresse email valide']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Le numéro de téléphone est requis']
    },
    website: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String
    },
    address: {
      street: {
        type: String,
        required: [true, "L'adresse est requise"]
      },
      city: {
        type: String,
        required: [true, "La ville est requise"]
      },
      postalCode: {
        type: String,
        required: [true, "Le code postal est requis"]
      },
      country: {
        type: String,
        required: [true, "Le pays est requis"]
      }
    },
    legalStatus: {
      type: String,
      required: [true, "Le statut juridique est requis"]
    },
    registrationNumber: {
      type: String,
      required: [true, "Le numéro d'enregistrement est requis"],
      unique: true
    },
    taxExemptStatus: Boolean,
    founders: [String],
    mission: {
      type: String,
      required: [true, "La mission de l'association est requise"]
    },
    vision: String,
    admins: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
);

const Association = mongoose.model<IAssociation>('Association', associationSchema);

export default Association;
