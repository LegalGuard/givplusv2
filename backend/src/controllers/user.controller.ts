import { Request, Response } from 'express';
import User from '../models/user.model';
import Donation from '../models/donation.model';
import mongoose from 'mongoose';

// Récupérer le profil de l'utilisateur connecté
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil'
    });
  }
};

// Mettre à jour le profil de l'utilisateur
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      phoneNumber,
      address
    } = req.body;

    // Ne pas permettre de modifier l'email ou le rôle directement
    const updateData: any = {
      firstName,
      lastName,
      phoneNumber,
      address
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: user
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil'
    });
  }
};

// Changer le mot de passe
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Valider les entrées
    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Les mots de passe actuels et nouveaux sont requis'
      });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({
        success: false,
        message: 'Le nouveau mot de passe doit contenir au moins 8 caractères'
      });
      return;
    }

    // Trouver l'utilisateur
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
      return;
    }

    // Vérifier le mot de passe actuel
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      });
      return;
    }

    // Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du changement de mot de passe'
    });
  }
};

// Récupérer l'historique des dons de l'utilisateur
export const getDonationHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    
    const donations = await Donation.find({ donor: userId })
      .sort({ createdAt: -1 })
      .populate('campaign', 'title')
      .populate('association', 'name logo');

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des dons:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'historique des dons'
    });
  }
};

// Admin: Récupérer tous les utilisateurs (réservé aux admins)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Vérifier que l'utilisateur est un admin
    if (req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Accès refusé. Droits admin requis'
      });
      return;
    }

    const { role, search } = req.query;
    const filter: any = {};
    
    // Filtres optionnels
    if (role) filter.role = role;
    
    // Recherche par nom ou email
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter).select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des utilisateurs'
    });
  }
};

// Admin: Récupérer un utilisateur par ID (réservé aux admins)
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Vérifier que l'utilisateur est un admin
    if (req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Accès refusé. Droits admin requis'
      });
      return;
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID utilisateur invalide'
      });
      return;
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'utilisateur'
    });
  }
};

// Admin: Modifier le rôle d'un utilisateur (réservé aux admins)
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    // Vérifier que l'utilisateur est un admin
    if (req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Accès refusé. Droits admin requis'
      });
      return;
    }

    const { id } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'ID utilisateur invalide'
      });
      return;
    }

    if (!['donor', 'admin'].includes(role)) {
      res.status(400).json({
        success: false,
        message: 'Rôle invalide'
      });
      return;
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Rôle utilisateur mis à jour avec succès',
      data: user
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du rôle'
    });
  }
};
