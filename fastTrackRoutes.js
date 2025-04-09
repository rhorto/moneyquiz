const express = require('express');
const router = express.Router();
const fastTrackController = require('../controllers/fastTrackController');

// Get all niches for Fast Track Wizard
router.get('/niches', fastTrackController.getNiches);

// Get affiliate offers based on niche
router.get('/offers/:nicheId', fastTrackController.getOffersByNiche);

// Get content types
router.get('/content-types', fastTrackController.getContentTypes);

// Generate action plan
router.post('/generate-plan', fastTrackController.generateActionPlan);

// Save user selections and create fast track plan
router.post('/save-plan', fastTrackController.savePlan);

// Get user's fast track plan
router.get('/plan/:userId', fastTrackController.getUserPlan);

// Update plan progress
router.put('/plan/:planId/progress', fastTrackController.updatePlanProgress);

module.exports = router;
