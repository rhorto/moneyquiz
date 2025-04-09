const mockDataService = require('../services/mockDataService');
const FastTrackPlan = require('../models/FastTrackPlan');

// Controller for Fast Track Wizard functionality
const fastTrackController = {
  // Get all niches for Fast Track Wizard
  getNiches: (req, res) => {
    try {
      const niches = mockDataService.getNiches();
      res.status(200).json({
        success: true,
        data: niches
      });
    } catch (error) {
      console.error('Error fetching niches:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch niches',
        error: error.message
      });
    }
  },

  // Get affiliate offers based on niche
  getOffersByNiche: (req, res) => {
    try {
      const { nicheId } = req.params;
      const offers = mockDataService.getOffersByNiche(nicheId);
      res.status(200).json({
        success: true,
        data: offers
      });
    } catch (error) {
      console.error('Error fetching offers:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch offers',
        error: error.message
      });
    }
  },

  // Get content types
  getContentTypes: (req, res) => {
    try {
      const contentTypes = mockDataService.getContentTypes();
      res.status(200).json({
        success: true,
        data: contentTypes
      });
    } catch (error) {
      console.error('Error fetching content types:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch content types',
        error: error.message
      });
    }
  },

  // Generate action plan based on user selections
  generateActionPlan: (req, res) => {
    try {
      const { nicheName } = req.body;
      const actionPlan = mockDataService.getActionPlanTemplate(nicheName);
      
      res.status(200).json({
        success: true,
        data: actionPlan
      });
    } catch (error) {
      console.error('Error generating action plan:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate action plan',
        error: error.message
      });
    }
  },

  // Save user selections and create fast track plan
  savePlan: async (req, res) => {
    try {
      const { 
        userId, 
        selectedNiche, 
        selectedOffers, 
        selectedContentTypes, 
        contentFrequency,
        preferences 
      } = req.body;

      // Generate action plan based on niche
      const actionPlan = mockDataService.getActionPlanTemplate(selectedNiche.name);

      // Create new fast track plan
      const newPlan = new FastTrackPlan({
        userId,
        selectedNiche,
        selectedOffers,
        selectedContentTypes,
        contentFrequency,
        actionPlan,
        preferences
      });

      // For mock implementation, we'll just return the plan without saving to DB
      // In a real implementation, we would save to MongoDB: await newPlan.save();
      
      res.status(201).json({
        success: true,
        message: 'Fast Track Plan created successfully',
        data: newPlan
      });
    } catch (error) {
      console.error('Error saving plan:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save plan',
        error: error.message
      });
    }
  },

  // Get user's fast track plan
  getUserPlan: async (req, res) => {
    try {
      const { userId } = req.params;
      
      // For mock implementation, we'll create a sample plan
      // In a real implementation, we would query MongoDB: const plan = await FastTrackPlan.findOne({ userId });
      
      const sampleNiche = mockDataService.getNiches()[0];
      const sampleOffers = mockDataService.getOffersByNiche(sampleNiche.id).slice(0, 2);
      const sampleContentTypes = mockDataService.getContentTypes().slice(0, 2);
      const sampleActionPlan = mockDataService.getActionPlanTemplate(sampleNiche.name);
      
      const plan = {
        _id: 'mock-plan-id',
        userId,
        selectedNiche: sampleNiche,
        selectedOffers: sampleOffers,
        selectedContentTypes: sampleContentTypes,
        contentFrequency: '2-3 pieces per week',
        actionPlan: sampleActionPlan,
        preferences: {
          emailReminders: true,
          contentTemplates: true
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: 25,
        status: 'active'
      };
      
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: 'No plan found for this user'
        });
      }
      
      res.status(200).json({
        success: true,
        data: plan
      });
    } catch (error) {
      console.error('Error fetching user plan:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user plan',
        error: error.message
      });
    }
  },

  // Update plan progress
  updatePlanProgress: async (req, res) => {
    try {
      const { planId } = req.params;
      const { progress, completedSteps } = req.body;
      
      // For mock implementation, we'll just return success
      // In a real implementation, we would update in MongoDB:
      // const plan = await FastTrackPlan.findByIdAndUpdate(
      //   planId,
      //   { 
      //     progress,
      //     $set: completedSteps,
      //     updatedAt: new Date()
      //   },
      //   { new: true }
      // );
      
      res.status(200).json({
        success: true,
        message: 'Plan progress updated successfully',
        data: {
          planId,
          progress,
          completedSteps
        }
      });
    } catch (error) {
      console.error('Error updating plan progress:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update plan progress',
        error: error.message
      });
    }
  }
};

module.exports = fastTrackController;
