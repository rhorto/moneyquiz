const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliateController');

// Get trending affiliate programs
router.get('/trending', affiliateController.getTrendingPrograms);

// Search affiliate programs by keyword
router.get('/search', affiliateController.searchPrograms);

// Get affiliate programs by niche
router.get('/by-niche/:nicheId', affiliateController.getProgramsByNiche);

// Get personalized program recommendations
router.get('/recommendations', affiliateController.getPersonalizedRecommendations);

// Get detailed program information
router.get('/details/:programId', affiliateController.getProgramDetails);

// Get program reviews
router.get('/reviews/:programId', affiliateController.getProgramReviews);

// Get program earnings data
router.get('/earnings/:programId', affiliateController.getProgramEarnings);

// Get program comparison
router.get('/compare', affiliateController.comparePrograms);

// Get application status
router.get('/application-status/:programId', affiliateController.getApplicationStatus);

// Submit program application
router.post('/apply/:programId', affiliateController.submitApplication);

module.exports = router;
