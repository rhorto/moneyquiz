// Fast Track Wizard API service
const apiConfig = require('../config/apiConfig');

class FastTrackService {
  constructor() {
    this.apiBaseUrl = apiConfig.apiBaseUrl;
    this.endpoints = apiConfig.endpoints.fastTrack;
  }

  // Fetch all available niches for the Fast Track Wizard
  async getNiches() {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.niches}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch niches: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching niches:', error);
      // For development, return mock data if API fails
      return this.getMockNiches();
    }
  }

  // Fetch affiliate offers based on selected niche
  async getOffersByNiche(nicheId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.offers}/${nicheId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch offers: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching offers:', error);
      // For development, return mock data if API fails
      return this.getMockOffers(nicheId);
    }
  }

  // Fetch content types for the Fast Track Wizard
  async getContentTypes() {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.contentTypes}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch content types: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching content types:', error);
      // For development, return mock data if API fails
      return this.getMockContentTypes();
    }
  }

  // Generate action plan based on user selections
  async generateActionPlan(nicheName) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.generatePlan}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nicheName }),
      });
      if (!response.ok) {
        throw new Error(`Failed to generate action plan: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error generating action plan:', error);
      // For development, return mock data if API fails
      return this.getMockActionPlan(nicheName);
    }
  }

  // Save user's Fast Track plan
  async savePlan(planData) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.savePlan}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });
      if (!response.ok) {
        throw new Error(`Failed to save plan: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error saving plan:', error);
      // For development, return mock success if API fails
      return {
        _id: 'mock-plan-id',
        ...planData,
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: 0,
        status: 'active'
      };
    }
  }

  // Get user's Fast Track plan
  async getUserPlan(userId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.getUserPlan}/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user plan: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching user plan:', error);
      // For development, return mock data if API fails
      return this.getMockUserPlan(userId);
    }
  }

  // Update plan progress
  async updatePlanProgress(planId, progress, completedSteps) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${this.endpoints.updateProgress}/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress, completedSteps }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update plan progress: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error updating plan progress:', error);
      // For development, return mock success if API fails
      return {
        planId,
        progress,
        completedSteps,
        updatedAt: new Date()
      };
    }
  }

  // Mock data methods for development/fallback
  getMockNiches() {
    return [
      {
        id: "niche1",
        name: "Home Fitness Equipment",
        demand: "High",
        competition: "Medium",
        profitPotential: "High",
        isRecommended: true,
        description: "Home workout equipment including treadmills, exercise bikes, weights, and fitness accessories."
      },
      {
        id: "niche2",
        name: "Smart Home Devices",
        demand: "High",
        competition: "High",
        profitPotential: "Medium",
        isRecommended: false,
        description: "Smart speakers, security systems, lighting, thermostats, and other connected home devices."
      },
      {
        id: "niche3",
        name: "Sustainable Living Products",
        demand: "Medium",
        competition: "Low",
        profitPotential: "Medium",
        isRecommended: false,
        description: "Eco-friendly household items, reusable products, energy-efficient appliances, and sustainable fashion."
      },
      {
        id: "niche4",
        name: "Pet Health Monitoring",
        demand: "Medium",
        competition: "Low",
        profitPotential: "Medium",
        isRecommended: false,
        description: "Pet health trackers, smart feeders, monitoring cameras, and health supplements for pets."
      }
    ];
  }

  getMockOffers(nicheId) {
    const offersByNiche = {
      "niche1": [
        {
          id: "offer1",
          name: "FitnessPro",
          description: "Home Fitness Equipment",
          commission: "12%",
          epc: "$1.45",
          cookieDuration: "30 days",
          logo: "https://via.placeholder.com/50",
          matchScore: 95
        },
        {
          id: "offer2",
          name: "GymGear",
          description: "Premium Fitness Equipment",
          commission: "15%",
          epc: "$1.20",
          cookieDuration: "45 days",
          logo: "https://via.placeholder.com/50",
          matchScore: 92
        }
      ],
      "niche2": [
        {
          id: "offer5",
          name: "SmartHome Hub",
          description: "Smart Home Devices",
          commission: "8%",
          epc: "$1.25",
          cookieDuration: "30 days",
          logo: "https://via.placeholder.com/50",
          matchScore: 94
        },
        {
          id: "offer6",
          name: "ConnectLife",
          description: "Smart Home Ecosystem",
          commission: "10%",
          epc: "$1.15",
          cookieDuration: "30 days",
          logo: "https://via.placeholder.com/50",
          matchScore: 90
        }
      ]
    };
    
    return offersByNiche[nicheId] || [];
  }

  getMockContentTypes() {
    return [
      {
        id: "content1",
        name: "Product Reviews",
        description: "In-depth reviews of individual products with pros, cons, and your recommendations.",
        icon: "star"
      },
      {
        id: "content2",
        name: "Top 10 Lists",
        description: "Curated lists of the best products in specific categories (e.g., \"Top 10 Treadmills for Small Spaces\").",
        icon: "list"
      },
      {
        id: "content3",
        name: "Product Comparisons",
        description: "Side-by-side comparisons of similar products to help readers make decisions.",
        icon: "balance-scale"
      },
      {
        id: "content4",
        name: "How-To Guides",
        description: "Educational content that solves problems while naturally recommending affiliate products.",
        icon: "book"
      }
    ];
  }

  getMockActionPlan(nicheName) {
    const plans = {
      "Home Fitness Equipment": {
        day1: {
          title: "Complete Your Profile & Apply to Programs",
          description: "We'll automatically apply to FitnessPro and GymGear programs for you. While waiting for approval, research the top-selling fitness equipment products."
        },
        day2_3: {
          title: "Create Your First Review & Comparison",
          description: "Using our templates, create a detailed review of a popular treadmill and a comparison of top exercise bikes. We'll provide keyword suggestions and content outlines."
        },
        day4: {
          title: "Share Your Content",
          description: "Publish your content and share it on social media. We'll provide you with a social media schedule and post templates."
        },
        day5_6: {
          title: "Create Additional Content Pieces",
          description: "Create 2 more content pieces focusing on different products. We'll help you identify low-competition keywords to target."
        },
        day7: {
          title: "Review Performance & Plan Next Steps",
          description: "Analyze which content and products are performing best. We'll help you create a plan to scale what's working."
        }
      },
      "default": {
        day1: {
          title: "Complete Your Profile & Apply to Programs",
          description: "We'll automatically apply to the top programs in your niche. While waiting for approval, research the best-selling products in your category."
        },
        day2_3: {
          title: "Create Your First Content Pieces",
          description: "Using our templates, create your first content pieces based on your selected content types. We'll provide keyword suggestions and content outlines."
        },
        day4: {
          title: "Share Your Content",
          description: "Publish your content and share it on social media. We'll provide you with a social media schedule and post templates."
        },
        day5_6: {
          title: "Create Additional Content",
          description: "Create additional content pieces focusing on different products or topics. We'll help you identify low-competition keywords to target."
        },
        day7: {
          title: "Review Performance & Plan Next Steps",
          description: "Analyze which content and products are performing best. We'll help you create a plan to scale what's working."
        }
      }
    };
    
    return plans[nicheName] || plans.default;
  }

  getMockUserPlan(userId) {
    const sampleNiche = this.getMockNiches()[0];
    const sampleOffers = this.getMockOffers(sampleNiche.id);
    const sampleContentTypes = this.getMockContentTypes().slice(0, 2);
    const sampleActionPlan = this.getMockActionPlan(sampleNiche.name);
    
    return {
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
  }
}

// Export singleton instance
const fastTrackService = new FastTrackService();
export default fastTrackService;
