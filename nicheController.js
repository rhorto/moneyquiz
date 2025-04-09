const nicheAnalysisService = require('../services/nicheAnalysisService');

// Controller for Niche Analysis functionality
const nicheController = {
  // Get trending niches
  getTrendingNiches: (req, res) => {
    try {
      const trendingNiches = nicheAnalysisService.getTrendingNiches();
      res.status(200).json({
        success: true,
        data: trendingNiches
      });
    } catch (error) {
      console.error('Error fetching trending niches:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch trending niches',
        error: error.message
      });
    }
  },

  // Search niches by keyword
  searchNiches: (req, res) => {
    try {
      const { keyword } = req.query;
      const searchResults = nicheAnalysisService.searchNiches(keyword);
      res.status(200).json({
        success: true,
        data: searchResults
      });
    } catch (error) {
      console.error('Error searching niches:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search niches',
        error: error.message
      });
    }
  },

  // Get niche competition analysis
  getNicheCompetition: (req, res) => {
    try {
      const { nicheId } = req.params;
      const competitionAnalysis = nicheAnalysisService.getNicheCompetition(nicheId);
      
      if (!competitionAnalysis) {
        return res.status(404).json({
          success: false,
          message: 'Niche not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: competitionAnalysis
      });
    } catch (error) {
      console.error('Error fetching niche competition:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch niche competition',
        error: error.message
      });
    }
  },

  // Get niche profitability analysis
  getNicheProfitability: (req, res) => {
    try {
      const { nicheId } = req.params;
      const profitabilityAnalysis = nicheAnalysisService.getNicheProfitability(nicheId);
      
      if (!profitabilityAnalysis) {
        return res.status(404).json({
          success: false,
          message: 'Niche not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: profitabilityAnalysis
      });
    } catch (error) {
      console.error('Error fetching niche profitability:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch niche profitability',
        error: error.message
      });
    }
  },

  // Get detailed niche information
  getNicheDetails: (req, res) => {
    try {
      const { nicheId } = req.params;
      const nicheDetails = nicheAnalysisService.getNicheDetails(nicheId);
      
      if (!nicheDetails) {
        return res.status(404).json({
          success: false,
          message: 'Niche not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: nicheDetails
      });
    } catch (error) {
      console.error('Error fetching niche details:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch niche details',
        error: error.message
      });
    }
  },

  // Get high demand low competition niches
  getHighDemandLowCompetition: (req, res) => {
    try {
      const hdlcNiches = nicheAnalysisService.getHighDemandLowCompetition();
      res.status(200).json({
        success: true,
        data: hdlcNiches
      });
    } catch (error) {
      console.error('Error fetching HDLC niches:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch high demand low competition niches',
        error: error.message
      });
    }
  },

  // Get niche keywords
  getNicheKeywords: (req, res) => {
    try {
      const { nicheId } = req.params;
      const keywords = nicheAnalysisService.getNicheKeywords(nicheId);
      
      if (!keywords) {
        return res.status(404).json({
          success: false,
          message: 'Niche not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: keywords
      });
    } catch (error) {
      console.error('Error fetching niche keywords:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch niche keywords',
        error: error.message
      });
    }
  },

  // Get niche market trends
  getNicheMarketTrends: (req, res) => {
    try {
      const { nicheId } = req.params;
      const marketTrends = nicheAnalysisService.getNicheMarketTrends(nicheId);
      
      if (!marketTrends) {
        return res.status(404).json({
          success: false,
          message: 'Niche not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: marketTrends
      });
    } catch (error) {
      console.error('Error fetching niche market trends:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch niche market trends',
        error: error.message
      });
    }
  }
};

module.exports = nicheController;
