const express = require('express');
const router = express.Router();
const nicheController = require('../controllers/nicheController');

// Get trending niches
router.get('/trending', nicheController.getTrendingNiches);

// Search niches by keyword
router.get('/search', nicheController.searchNiches);

// Get niche competition analysis
router.get('/competition/:nicheId', nicheController.getNicheCompetition);

// Get niche profitability analysis
router.get('/profitability/:nicheId', nicheController.getNicheProfitability);

// Get detailed niche information
router.get('/details/:nicheId', nicheController.getNicheDetails);

// Get high demand low competition niches
router.get('/hdlc', nicheController.getHighDemandLowCompetition);

// Get niche keywords
router.get('/keywords/:nicheId', nicheController.getNicheKeywords);

// Get niche market trends
router.get('/trends/:nicheId', nicheController.getNicheMarketTrends);

module.exports = router;
