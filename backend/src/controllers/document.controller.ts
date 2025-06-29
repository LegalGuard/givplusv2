import { Request, Response } from 'express';
import Document from '../models/document.model';
import Association from '../models/association.model';
import mongoose from 'mongoose';

// Créer un nouveau document
export const createDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      fileUrl,
      fileType,
      fileSize,
      association: associationId,
      category,
      isPublic,
      tags
    } = req.body;

    // Vérifier si l'association existe
    const association = await Association.findById(associationId);
    if (!association) {
      res.status(404).json({
        success: false,
        message: 'Association non trouvée'
      });
      return;
    }

    // Vérifier si l'utilisateur est autorisé à ajouter un document à cette association
    if (
      !association.admins.includes(req.user.id) &&
      req.user.role !== 'admin'
    ) {
      res.status(403).json({
        success: false,
        message: 'Non autorisé à ajouter des documents pour cette association'
      });
      return;
    }

    // Créer le document
    const document = new Document({
      title,
      description,
      fileUrl,
      fileType,
      fileSize,
      association: associationId,
      category,
      status: 'draft',
      isPublic: isPublic || false,
      uploadedBy: req.user.id,
      tags
    });

    await document.save();

    res.status(201).json({
      success: true,
      message: 'Document créé avec succès',
      data: document
    });
  } catch (error) {
    console.error('Erreur lors de la création du document:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du document',
      error: (error as Error).message
    });
  }
};

// Récupérer tous les documents
export const getAllDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { association, category, status, isPublic } = req.query;
    const filter: any = {};

    // Filtres optionnels
    if (association) filter.association = association;
    if (category) filter.category = category;
    if (status) filter.status = status;
    
    // Filtrer par visibilité publique
    if (isPublic === 'true') {
      filter.isPublic = true;
    } else if (isPublic === 'false') {
      filter.isPublic = false;
      
      // Si l'utilisateur n'est pas un admin ou un membre de l'association, 
      // il ne peut voir que ses propres documents non publics
      if (req.user && req.user.role !== 'admin') {
        // Récupérer les associations dont l'utilisateur est admin
        const userAssociations = await Association.find({ 
          admins: { $in: [req.user.id] } 
        }).select('_id');
        
        const userAssociationIds = userAssociations.map(a => a._id);
        
        filter.$or = [
          { uploadedBy: req.user.id },
          { association: { $in: userAssociationIds } }
        ];
      }
    }

    const documents = await Document.find(filter)
      .sort({ createdAt: -1 })
      .populate('association', 'name')
      .populate('uploadedBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des documents:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des documents'
    });
  }
};

// Récupérer un document par ID
export const getDocumentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de document invalide'
      });
      return;
    }

    const document = await Document.findById(id)
      .populate('association', 'name')
      .populate('uploadedBy', 'firstName lastName');

    if (!document) {
      res.status(404).json({
        success: false,
        message: 'Document non trouvé'
      });
      return;
    }

    // Vérifier si l'utilisateur est autorisé à voir ce document
    if (
      document.isPublic ||
      req.user.id === document.uploadedBy._id.toString() ||
      req.user.role === 'admin'
    ) {
      res.status(200).json({
        success: true,
        data: document
      });
    } else {
      // Vérifier si l'utilisateur est membre de l'association
      const association = await Association.findById(document.association);
      if (association && association.admins.includes(req.user.id)) {
        res.status(200).json({
          success: true,
          data: document
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Non autorisé à accéder à ce document'
        });
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du document:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du document'
    });
  }
};

// Mettre à jour un document
export const updateDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de document invalide'
      });
      return;
    }

    // Vérifier que le document existe
    const document = await Document.findById(id);
    if (!document) {
      res.status(404).json({
        success: false,
        message: 'Document non trouvé'
      });
      return;
    }

    // Vérifier si l'utilisateur est autorisé à modifier le document
    if (
      req.user.id === document.uploadedBy.toString() ||
      req.user.role === 'admin'
    ) {
      const updatedDocument = await Document.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        message: 'Document mis à jour avec succès',
        data: updatedDocument
      });
    } else {
      // Vérifier si l'utilisateur est admin de l'association
      const association = await Association.findById(document.association);
      if (association && association.admins.includes(req.user.id)) {
        const updatedDocument = await Document.findByIdAndUpdate(
          id,
          { $set: updateData },
          { new: true, runValidators: true }
        );

        res.status(200).json({
          success: true,
          message: 'Document mis à jour avec succès',
          data: updatedDocument
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Non autorisé à modifier ce document'
        });
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du document:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du document'
    });
  }
};

// Changer le statut d'un document
export const updateDocumentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de document invalide'
      });
      return;
    }

    // Vérifier que le statut est valide
    if (!['draft', 'pending', 'approved', 'rejected'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Statut invalide'
      });
      return;
    }

    // Vérifier que le document existe
    const document = await Document.findById(id);
    if (!document) {
      res.status(404).json({
        success: false,
        message: 'Document non trouvé'
      });
      return;
    }

    // Vérifier si l'utilisateur est autorisé à changer le statut
    if (
      req.user.id === document.uploadedBy.toString() ||
      req.user.role === 'admin'
    ) {
      document.status = status;
      await document.save();

      res.status(200).json({
        success: true,
        message: 'Statut du document mis à jour avec succès',
        data: document
      });
    } else {
      // Vérifier si l'utilisateur est admin de l'association
      const association = await Association.findById(document.association);
      if (association && association.admins.includes(req.user.id)) {
        document.status = status;
        await document.save();

        res.status(200).json({
          success: true,
          message: 'Statut du document mis à jour avec succès',
          data: document
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Non autorisé à changer le statut de ce document'
        });
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du statut'
    });
  }
};

// Supprimer un document
export const deleteDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de document invalide'
      });
      return;
    }

    // Vérifier que le document existe
    const document = await Document.findById(id);
    if (!document) {
      res.status(404).json({
        success: false,
        message: 'Document non trouvé'
      });
      return;
    }

    // Vérifier si l'utilisateur est autorisé à supprimer le document
    if (
      req.user.id === document.uploadedBy.toString() ||
      req.user.role === 'admin'
    ) {
      await Document.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: 'Document supprimé avec succès'
      });
    } else {
      // Vérifier si l'utilisateur est admin de l'association
      const association = await Association.findById(document.association);
      if (association && association.admins.includes(req.user.id)) {
        await Document.findByIdAndDelete(id);

        res.status(200).json({
          success: true,
          message: 'Document supprimé avec succès'
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Non autorisé à supprimer ce document'
        });
      }
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du document:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du document'
    });
  }
};
