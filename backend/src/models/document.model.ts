import mongoose, { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  association: mongoose.Types.ObjectId;
  category: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  isPublic: boolean;
  uploadedBy: mongoose.Types.ObjectId;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      required: [true, 'Le titre du document est requis'],
      trim: true
    },
    description: String,
    fileUrl: {
      type: String,
      required: [true, "L'URL du fichier est requise"]
    },
    fileType: {
      type: String,
      required: [true, 'Le type de fichier est requis']
    },
    fileSize: {
      type: Number,
      required: [true, 'La taille du fichier est requise']
    },
    association: {
      type: Schema.Types.ObjectId,
      ref: 'Association',
      required: [true, "L'association liée au document est requise"]
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
      enum: ['rapport', 'financier', 'administratif', 'juridique', 'projet', 'autre']
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected'],
      default: 'draft'
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "L'utilisateur ayant téléchargé le document est requis"]
    },
    tags: [String]
  },
  {
    timestamps: true
  }
);

// Index pour la recherche de documents
documentSchema.index({ title: 'text', description: 'text', category: 1, tags: 1 });

const Document = mongoose.model<IDocument>('Document', documentSchema);

export default Document;
