import { Request, Response } from 'express';
import Donation from '../models/donation.model';
import Campaign from '../models/campaign.model';
import mongoose from 'mongoose';

// Créer un nouveau don
export const createDonation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { campaignId, amount, paymentMethod, isAnonymous, message } = req.body;
    
    // Vérifier que la campagne existe
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
      return;
    }

    // Créer le don
    const donation = new Donation({
      donor: req.user.id,
      campaign: campaignId,
      association: campaign.association,
      amount,
      currency: 'EUR',
      paymentMethod,
      isAnonymous: isAnonymous || false,
      message,
      status: 'pending',
      taxReceipt: {
        issued: false
      }
    });

    await donation.save();

    // Simuler le traitement du paiement (dans un vrai système, on utiliserait un service de paiement)
    setTimeout(async () => {
      donation.status = 'completed';
      donation.transactionId = `TR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      await donation.save();
      
      // Mettre à jour les statistiques de la campagne
      await Campaign.findByIdAndUpdate(campaignId, {
        $inc: {
          currentAmount: amount,
          donorCount: 1
        }
      });
    }, 1000);

    res.status(201).json({
      success: true,
      message: 'Don initié avec succès',
      data: donation
    });
  } catch (error) {
    console.error('Erreur lors de la création du don:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du don'
    });
  }
};

// Récupérer tous les dons
export const getAllDonations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { campaign, association, status, donor } = req.query;
    const filter: any = {};

    // Filtres optionnels
    if (campaign) filter.campaign = campaign;
    if (association) filter.association = association;
    if (status) filter.status = status;
    if (donor) filter.donor = donor;

    // Si l'utilisateur n'est pas admin, limiter aux dons de l'utilisateur
    if (req.user && req.user.role !== 'admin') {
      filter.donor = req.user.id;
    }

    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 })
      .populate('donor', 'firstName lastName')
      .populate('campaign', 'title')
      .populate('association', 'name');

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des dons:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des dons'
    });
  }
};

// Récupérer un don par ID
export const getDonationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de don invalide'
      });
      return;
    }

    const donation = await Donation.findById(id)
      .populate('donor', 'firstName lastName email')
      .populate('campaign', 'title')
      .populate('association', 'name');

    if (!donation) {
      res.status(404).json({
        success: false,
        message: 'Don non trouvé'
      });
      return;
    }

    // Vérifier que l'utilisateur est autorisé à voir ce don
    if (
      req.user && 
      (req.user.id === donation.donor._id.toString() || 
       req.user.role === 'admin')
    ) {
      res.status(200).json({
        success: true,
        data: donation
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Non autorisé à accéder à ce don'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du don:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du don'
    });
  }
};

// Générer un reçu fiscal
export const generateTaxReceipt = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de don invalide'
      });
      return;
    }

    const donation = await Donation.findById(id);

    if (!donation) {
      res.status(404).json({
        success: false,
        message: 'Don non trouvé'
      });
      return;
    }

    // Vérifier si le don est complété
    if (donation.status !== 'completed') {
      res.status(400).json({
        success: false,
        message: 'Impossible de générer un reçu pour un don non complété'
      });
      return;
    }

    // Vérifier si un reçu a déjà été émis
    if (donation.taxReceipt && donation.taxReceipt.issued) {
      res.status(400).json({
        success: false,
        message: 'Un reçu fiscal a déjà été émis pour ce don'
      });
      return;
    }

    // Simuler la génération d'un reçu fiscal
    const receiptNumber = `RECEIPT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    donation.taxReceipt = {
      issued: true,
      date: new Date(),
      number: receiptNumber,
      document: `/receipts/${receiptNumber}.pdf`
    };

    await donation.save();

    res.status(200).json({
      success: true,
      message: 'Reçu fiscal généré avec succès',
      data: donation.taxReceipt
    });
  } catch (error) {
    console.error('Erreur lors de la génération du reçu fiscal:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la génération du reçu fiscal'
    });
  }
};

// Récupérer les statistiques des dons pour un utilisateur
export const getUserDonationStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;

    // Total des dons
    const totalDonations = await Donation.aggregate([
      { $match: { donor: new mongoose.Types.ObjectId(userId), status: 'completed' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Nombre de dons
    const donationCount = await Donation.countDocuments({
      donor: userId,
      status: 'completed'
    });

    // Nombre d'associations soutenues
    const supportedAssociations = await Donation.aggregate([
      { $match: { donor: new mongoose.Types.ObjectId(userId), status: 'completed' } },
      { $group: { _id: "$association" } },
      { $count: "total" }
    ]);

    // Dons par mois (dernière année)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const donationsByMonth = await Donation.aggregate([
      { 
        $match: { 
          donor: new mongoose.Types.ObjectId(userId), 
          status: 'completed',
          createdAt: { $gte: oneYearAgo }
        } 
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalAmount: totalDonations.length ? totalDonations[0].total : 0,
        donationCount,
        supportedAssociations: supportedAssociations.length ? supportedAssociations[0].total : 0,
        donationsByMonth
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
};
