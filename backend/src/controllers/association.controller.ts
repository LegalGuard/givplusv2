import { Request, Response } from 'express';
import Association from '../models/association.model';
import Campaign from '../models/campaign.model';
import Donation from '../models/donation.model';
import Document from '../models/document.model';
import mongoose from 'mongoose';

// Récupérer toutes les associations
export const getAllAssociations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.query;
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const associations = await Association.find(filter).select('name description logo');

    res.status(200).json({
      success: true,
      count: associations.length,
      data: associations
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des associations:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des associations'
    });
  }
};

// Récupérer une association par ID
export const getAssociationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID d\'association invalide'
      });
      return;
    }

    const association = await Association.findById(id);

    if (!association) {
      res.status(404).json({
        success: false,
        message: 'Association non trouvée'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: association
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'association:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'association'
    });
  }
};

// Créer une nouvelle association
export const createAssociation = async (req: Request, res: Response): Promise<void> => {
  try {
    const associationData = req.body;
    
    // Ajouter l'utilisateur actuel comme admin
    if (req.user) {
      associationData.admins = [req.user.id];
    }
    
    const association = new Association(associationData);

    await association.save();

    res.status(201).json({
      success: true,
      message: 'Association créée avec succès',
      data: association
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'association:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'association',
      error: (error as Error).message
    });
  }
};

// Mettre à jour une association
export const updateAssociation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID d\'association invalide'
      });
      return;
    }

    // Vérifier que l'utilisateur est admin de l'association
    const association = await Association.findById(id);
    if (!association) {
      res.status(404).json({
        success: false,
        message: 'Association non trouvée'
      });
      return;
    }

    // Vérifier si l'utilisateur est autorisé à modifier
    if (req.user && association.admins.includes(req.user.id) || req.user.role === 'admin') {
      const updatedAssociation = await Association.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        message: 'Association mise à jour avec succès',
        data: updatedAssociation
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Non autorisé à modifier cette association'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'association:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'association'
    });
  }
};

// Supprimer une association
export const deleteAssociation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID d\'association invalide'
      });
      return;
    }

    // Vérifier que l'utilisateur est admin de l'association ou super admin
    const association = await Association.findById(id);
    if (!association) {
      res.status(404).json({
        success: false,
        message: 'Association non trouvée'
      });
      return;
    }

    if (req.user && (association.admins.includes(req.user.id) || req.user.role === 'admin')) {
      await Association.findByIdAndDelete(id);
      
      // Supprimer également les campagnes associées
      await Campaign.deleteMany({ association: id });
      
      res.status(200).json({
        success: true,
        message: 'Association supprimée avec succès'
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Non autorisé à supprimer cette association'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'association:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'association'
    });
  }
};

// Récupérer le tableau de bord d'une association
export const getAssociationDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID d\'association invalide'
      });
      return;
    }

    // Vérifier que l'association existe
    const association = await Association.findById(id);
    if (!association) {
      res.status(404).json({
        success: false,
        message: 'Association non trouvée'
      });
      return;
    }

    // Récupérer les campagnes de l'association
    const campaigns = await Campaign.find({ association: id }).select('title currentAmount goal startDate endDate isActive');

    // Récupérer les dons récents
    const recentDonations = await Donation.find({ association: id, status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('donor', 'firstName lastName')
      .populate('campaign', 'title');

    // Récupérer les documents en attente
    const pendingDocuments = await Document.find({ 
      association: id, 
      status: 'pending' 
    }).limit(5);

    // Calculer les statistiques
    const totalDonations = await Donation.aggregate([
      { $match: { association: new mongoose.Types.ObjectId(id), status: 'completed' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalDonors = await Donation.aggregate([
      { $match: { association: new mongoose.Types.ObjectId(id), status: 'completed' } },
      { $group: { _id: "$donor" } },
      { $count: "total" }
    ]);

    const activeCampaignsCount = campaigns.filter(c => c.isActive).length;

    // Préparer les données du dashboard
    const dashboardData = {
      association: {
        name: association.name,
        logo: association.logo
      },
      stats: {
        totalDonations: totalDonations.length ? totalDonations[0].total : 0,
        totalDonors: totalDonors.length ? totalDonors[0].total : 0,
        activeCampaigns: activeCampaignsCount,
        campaigns: campaigns.length
      },
      campaigns,
      recentDonations,
      pendingDocuments
    };

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du tableau de bord:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du tableau de bord'
    });
  }
};

// Ajouter un administrateur à l'association
export const addAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({
        success: false,
        message: 'ID invalide'
      });
      return;
    }

    const association = await Association.findById(id);
    if (!association) {
      res.status(404).json({
        success: false,
        message: 'Association non trouvée'
      });
      return;
    }

    // Vérifier si l'utilisateur est déjà admin
    if (association.admins.includes(userId)) {
      res.status(400).json({
        success: false,
        message: 'Cet utilisateur est déjà administrateur'
      });
      return;
    }

    // Ajouter l'utilisateur aux administrateurs
    association.admins.push(userId);
    await association.save();

    res.status(200).json({
      success: true,
      message: 'Administrateur ajouté avec succès',
      data: association
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un administrateur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout d\'un administrateur'
    });
  }
};
