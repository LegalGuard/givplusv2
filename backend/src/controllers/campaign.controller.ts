import { Request, Response } from 'express';
import Campaign from '../models/campaign.model';
import Association from '../models/association.model';
import mongoose from 'mongoose';

// Récupérer toutes les campagnes
export const getAllCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, association, active, sort = 'createdAt', order = 'desc' } = req.query;
    const filters: any = {};

    // Filtres optionnels
    if (category) filters.category = category;
    if (association) filters.association = association;
    if (active === 'true') filters.isActive = true;
    if (active === 'false') filters.isActive = false;
    
    // Recherche dans le titre ou la description
    if (search) {
      filters.$text = { $search: search as string };
    }

    // Tri des résultats
    const sortOptions: any = {};
    sortOptions[sort as string] = order === 'asc' ? 1 : -1;

    const campaigns = await Campaign.find(filters)
      .sort(sortOptions)
      .populate('association', 'name logo');

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des campagnes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des campagnes'
    });
  }
};

// Récupérer une campagne par ID
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de campagne invalide'
      });
      return;
    }

    const campaign = await Campaign.findById(id)
      .populate('association', 'name description logo email website');

    if (!campaign) {
      res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la campagne:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la campagne'
    });
  }
};

// Créer une nouvelle campagne
export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, association: associationId, goal, startDate, endDate, category, image, tags } = req.body;

    // Vérifier si l'association existe
    const association = await Association.findById(associationId);
    if (!association) {
      res.status(404).json({
        success: false,
        message: 'Association non trouvée'
      });
      return;
    }
    
    // Créer la campagne
    const campaign = new Campaign({
      title,
      description,
      association: associationId,
      goal,
      startDate: startDate || new Date(),
      endDate,
      category,
      image,
      tags,
      isActive: true,
      currentAmount: 0,
      donorCount: 0
    });

    await campaign.save();

    res.status(201).json({
      success: true,
      message: 'Campagne créée avec succès',
      data: campaign
    });
  } catch (error) {
    console.error('Erreur lors de la création de la campagne:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la campagne'
    });
  }
};

// Mettre à jour une campagne
export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de campagne invalide'
      });
      return;
    }

    // Trouver et mettre à jour la campagne
    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!campaign) {
      res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Campagne mise à jour avec succès',
      data: campaign
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la campagne:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la campagne'
    });
  }
};

// Supprimer une campagne
export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de campagne invalide'
      });
      return;
    }

    const campaign = await Campaign.findByIdAndDelete(id);

    if (!campaign) {
      res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Campagne supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la campagne:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la campagne'
    });
  }
};

// Ajouter une mise à jour à une campagne
export const addCampaignUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de campagne invalide'
      });
      return;
    }

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
      return;
    }

    // Ajouter la mise à jour
    campaign.updates = [...(campaign.updates || []), {
      date: new Date(),
      title,
      content
    }];

    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Mise à jour ajoutée avec succès',
      data: campaign
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la mise à jour:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout de la mise à jour'
    });
  }
};
