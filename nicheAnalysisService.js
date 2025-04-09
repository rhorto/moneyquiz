// Niche Analysis API service
const apiConfig = require('../config/apiConfig');

class NicheAnalysisService {
  constructor() {
    this.apiBaseUrl = apiConfig.apiBaseUrl;
    this.endpoints = apiConfig.endpoints.niches;
  }

  // Get trending niches
  async getTrendingNiches() {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.trending}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch trending niches: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching trending niches:', error);
      // For development, return mock data if API fails
      return this.getMockTrendingNiches();
    }
  }

  // Search niches by keyword
  async searchNiches(keyword) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.search}?keyword=${encodeURIComponent(keyword)}`);
      if (!response.ok) {
        throw new Error(`Failed to search niches: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error searching niches:', error);
      // For development, return mock data if API fails
      return this.getMockSearchResults(keyword);
    }
  }

  // Get high demand low competition niches
  async getHighDemandLowCompetition() {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.hdlc}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch HDLC niches: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching HDLC niches:', error);
      // For development, return mock data if API fails
      return this.getMockHDLCNiches();
    }
  }

  // Get niche competition analysis
  async getNicheCompetition(nicheId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.competition}/${nicheId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch niche competition: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching niche competition:', error);
      // For development, return mock data if API fails
      return this.getMockCompetitionAnalysis(nicheId);
    }
  }

  // Get niche profitability analysis
  async getNicheProfitability(nicheId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.profitability}/${nicheId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch niche profitability: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching niche profitability:', error);
      // For development, return mock data if API fails
      return this.getMockProfitabilityAnalysis(nicheId);
    }
  }

  // Get detailed niche information
  async getNicheDetails(nicheId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.details}/${nicheId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch niche details: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching niche details:', error);
      // For development, return mock data if API fails
      return this.getMockNicheDetails(nicheId);
    }
  }

  // Get niche keywords
  async getNicheKeywords(nicheId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.keywords}/${nicheId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch niche keywords: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching niche keywords:', error);
      // For development, return mock data if API fails
      return this.getMockNicheKeywords(nicheId);
    }
  }

  // Get niche market trends
  async getNicheMarketTrends(nicheId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.trends}/${nicheId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch niche market trends: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching niche market trends:', error);
      // For development, return mock data if API fails
      return this.getMockNicheMarketTrends(nicheId);
    }
  }

  // Mock data methods for development/fallback
  getMockTrendingNiches() {
    return [
      {
        id: "niche5",
        name: "Digital Marketing Tools",
        demand: "High",
        competition: "Medium",
        profitPotential: "High",
        monthlySearchVolume: 520000,
        growthRate: 3.8,
        isRecommended: true
      },
      {
        id: "niche8",
        name: "Remote Work Tools",
        demand: "High",
        competition: "Medium",
        profitPotential: "Medium",
        monthlySearchVolume: 480000,
        growthRate: 3.2,
        isRecommended: true
      },
      {
        id: "niche1",
        name: "Home Fitness Equipment",
        demand: "High",
        competition: "Medium",
        profitPotential: "High",
        monthlySearchVolume: 450000,
        growthRate: 2.9,
        isRecommended: true
      },
      {
        id: "niche7",
        name: "Plant-Based Diet Products",
        demand: "Medium",
        competition: "Low",
        profitPotential: "Medium",
        monthlySearchVolume: 310000,
        growthRate: 2.5,
        isRecommended: true
      },
      {
        id: "niche3",
        name: "Sustainable Living Products",
        demand: "Medium",
        competition: "Low",
        profitPotential: "Medium",
        monthlySearchVolume: 320000,
        growthRate: 2.1,
        isRecommended: true
      }
    ];
  }

  getMockSearchResults(keyword) {
    if (!keyword) return [];
    
    const mockNiches = [
      {
        id: "niche1",
        name: "Home Fitness Equipment",
        demand: "High",
        competition: "Medium",
        profitPotential: "High",
        description: "Home workout equipment including treadmills, exercise bikes, weights, and fitness accessories.",
        monthlySearchVolume: 450000,
        isRecommended: true
      },
      {
        id: "niche2",
        name: "Smart Home Devices",
        demand: "High",
        competition: "High",
        profitPotential: "Medium",
        description: "Smart speakers, security systems, lighting, thermostats, and other connected home devices.",
        monthlySearchVolume: 680000,
        isRecommended: false
      },
      {
        id: "niche3",
        name: "Sustainable Living Products",
        demand: "Medium",
        competition: "Low",
        profitPotential: "Medium",
        description: "Eco-friendly household items, reusable products, energy-efficient appliances, and sustainable fashion.",
        monthlySearchVolume: 320000,
        isRecommended: true
      },
      {
        id: "niche4",
        name: "Pet Health Monitoring",
        demand: "Medium",
        competition: "Low",
        profitPotential: "Medium",
        description: "Pet health trackers, smart feeders, monitoring cameras, and health supplements for pets.",
        monthlySearchVolume: 280000,
        isRecommended: true
      },
      {
        id: "niche5",
        name: "Digital Marketing Tools",
        demand: "High",
        competition: "Medium",
        profitPotential: "High",
        description: "Email marketing software, SEO tools, social media management platforms, and analytics solutions.",
        monthlySearchVolume: 520000,
        isRecommended: true
      }
    ];
    
    const lowercaseKeyword = keyword.toLowerCase();
    return mockNiches.filter(niche => 
      niche.name.toLowerCase().includes(lowercaseKeyword) || 
      niche.description.toLowerCase().includes(lowercaseKeyword)
    );
  }

  getMockHDLCNiches() {
    return [
      {
        id: "niche3",
        name: "Sustainable Living Products",
        demand: "Medium",
        competition: "Low",
        profitPotential: "Medium",
        description: "Eco-friendly household items, reusable products, energy-efficient appliances, and sustainable fashion.",
        monthlySearchVolume: 320000,
        hdlcScore: 82,
        isRecommended: true
      },
      {
        id: "niche4",
        name: "Pet Health Monitoring",
        demand: "Medium",
        competition: "Low",
        profitPotential: "Medium",
        description: "Pet health trackers, smart feeders, monitoring cameras, and health supplements for pets.",
        monthlySearchVolume: 280000,
        hdlcScore: 80,
        isRecommended: true
      },
      {
        id: "niche7",
        name: "Plant-Based Diet Products",
        demand: "Medium",
        competition: "Low",
        profitPotential: "Medium",
        description: "Vegan food products, plant-based protein supplements, meal kits, and cookbooks.",
        monthlySearchVolume: 310000,
        hdlcScore: 78,
        isRecommended: true
      },
      {
        id: "niche1",
        name: "Home Fitness Equipment",
        demand: "High",
        competition: "Medium",
        profitPotential: "High",
        description: "Home workout equipment including treadmills, exercise bikes, weights, and fitness accessories.",
        monthlySearchVolume: 450000,
        hdlcScore: 76,
        isRecommended: true
      },
      {
        id: "niche5",
        name: "Digital Marketing Tools",
        demand: "High",
        competition: "Medium",
        profitPotential: "High",
        description: "Email marketing software, SEO tools, social media management platforms, and analytics solutions.",
        monthlySearchVolume: 520000,
        hdlcScore: 74,
        isRecommended: true
      }
    ];
  }

  getMockCompetitionAnalysis(nicheId) {
    const mockCompetitionData = {
      "niche1": {
        id: "niche1",
        name: "Home Fitness Equipment",
        competitionLevel: "Medium",
        competitorCount: 245,
        topCompetitors: [
          { name: "FitnessGear.com", domainAuthority: 78, monthlyTraffic: 1200000 },
          { name: "HomeGymReviews.com", domainAuthority: 65, monthlyTraffic: 850000 },
          { name: "WorkoutFromHome.net", domainAuthority: 52, monthlyTraffic: 420000 }
        ],
        difficultyScore: 50,
        competitionInsights: [
          {
            factor: "Market Saturation",
            score: 5,
            description: "The Home Fitness Equipment niche has medium market saturation with 245 significant competitors."
          },
          {
            factor: "Content Competition",
            score: 5,
            description: "Content creation in this niche is mediumly competitive, requiring good quality to stand out."
          },
          {
            factor: "Keyword Difficulty",
            score: 6,
            description: "Keywords in this niche have medium competition levels, with an average difficulty score of 45-65."
          },
          {
            factor: "Barrier to Entry",
            score: 6,
            description: "The barrier to entry for new affiliates is medium, requiring moderate resources and expertise."
          }
        ]
      },
      "niche3": {
        id: "niche3",
        name: "Sustainable Living Products",
        competitionLevel: "Low",
        competitorCount: 165,
        topCompetitors: [
          { name: "EcoLifeGuide.com", domainAuthority: 62, monthlyTraffic: 580000 },
          { name: "SustainableLiving.org", domainAuthority: 58, monthlyTraffic: 420000 },
          { name: "GreenChoices.net", domainAuthority: 45, monthlyTraffic: 280000 }
        ],
        difficultyScore: 25,
        competitionInsights: [
          {
            factor: "Market Saturation",
            score: 3,
            description: "The Sustainable Living Products niche has low market saturation with 165 significant competitors."
          },
          {
            factor: "Content Competition",
            score: 2,
            description: "Content creation in this niche is lowly competitive, requiring basic quality to stand out."
          },
          {
            factor: "Keyword Difficulty",
            score: 3,
            description: "Keywords in this niche have low competition levels, with an average difficulty score of below 45."
          },
          {
            factor: "Barrier to Entry",
            score: 3,
            description: "The barrier to entry for new affiliates is low, requiring minimal resources and expertise."
          }
        ]
      }
    };
    
    return mockCompetitionData[nicheId] || mockCompetitionData["niche1"];
  }

  getMockProfitabilityAnalysis(nicheId) {
    const mockProfitabilityData = {
      "niche1": {
        id: "niche1",
        name: "Home Fitness Equipment",
        profitPotential: "High",
        averageCommission: "12%",
        averageOrderValue: "$250",
        conversionRate: "2.8%",
        earningsPerClick: "$0.84",
        potentialMonthlyEarnings: {
          visitors1k: "$840.00",
          visitors5k: "$4200.00",
          visitors10k: "$8400.00",
          visitors50k: "$42000.00"
        },
        profitabilityFactors: [
          {
            factor: "Commission Rates",
            score: 8,
            description: "The average commission rate in this niche is 12%, which is excellent compared to other niches."
          },
          {
            factor: "Product Pricing",
            score: 8,
            description: "The average order value of $250 is high, affecting overall commission amounts."
          },
          {
            factor: "Conversion Rates",
            score: 6,
            description: "The average conversion rate of 2.8% is good for affiliate marketing."
          },
          {
            factor: "Recurring Commissions",
            score: 4,
            description: "This niche has limited recurring commission opportunities."
          }
        ]
      },
      "niche5": {
        id: "niche5",
        name: "Digital Marketing Tools",
        profitPotential: "High",
        averageCommission: "30%",
        averageOrderValue: "$150",
        conversionRate: "3.5%",
        earningsPerClick: "$1.58",
        potentialMonthlyEarnings: {
          visitors1k: "$1575.00",
          visitors5k: "$7875.00",
          visitors10k: "$15750.00",
          visitors50k: "$78750.00"
        },
        profitabilityFactors: [
          {
            factor: "Commission Rates",
            score: 8,
            description: "The average commission rate in this niche is 30%, which is excellent compared to other niches."
          },
          {
            factor: "Product Pricing",
            score: 6,
            description: "The average order value of $150 is moderate, affecting overall commission amounts."
          },
          {
            factor: "Conversion Rates",
            score: 8,
            description: "The average conversion rate of 3.5% is excellent for affiliate marketing."
          },
          {
            factor: "Recurring Commissions",
            score: 9,
            description: "This niche offers excellent recurring commission opportunities."
          }
        ]
      }
    };
    
    return mockProfitabilityData[nicheId] || mockProfitabilityData["niche1"];
  }

  getMockNicheDetails(nicheId) {
    const mockNicheDetails = {
      "niche1": {
        id: "niche1",
        name: "Home Fitness Equipment",
        description: "Home workout equipment including treadmills, exercise bikes, weights, and fitness accessories.",
        demand: "High",
        competition: "Medium",
        prof
(Content truncated due to size limit. Use line ranges to read in chunks)