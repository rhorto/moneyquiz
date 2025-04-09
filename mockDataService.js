// Mock data for niches
const niches = [
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
  },
  {
    id: "niche5",
    name: "Digital Marketing Tools",
    demand: "High",
    competition: "Medium",
    profitPotential: "High",
    isRecommended: true,
    description: "Email marketing software, SEO tools, social media management platforms, and analytics solutions."
  },
  {
    id: "niche6",
    name: "Online Education Courses",
    demand: "Very High",
    competition: "High",
    profitPotential: "High",
    isRecommended: false,
    description: "Online courses for professional skills, languages, hobbies, and academic subjects."
  }
];

// Mock data for affiliate offers by niche
const affiliateOffers = {
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
    },
    {
      id: "offer3",
      name: "FitLife",
      description: "Fitness Subscription Service",
      commission: "30%",
      epc: "$0.95",
      cookieDuration: "30 days",
      logo: "https://via.placeholder.com/50",
      matchScore: 85
    },
    {
      id: "offer4",
      name: "Amazon Associates",
      description: "General Marketplace",
      commission: "3-5%",
      epc: "$0.85",
      cookieDuration: "24 hours",
      logo: "https://via.placeholder.com/50",
      matchScore: 80
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
  ],
  "niche3": [
    {
      id: "offer7",
      name: "EcoLiving",
      description: "Sustainable Home Products",
      commission: "15%",
      epc: "$1.05",
      cookieDuration: "45 days",
      logo: "https://via.placeholder.com/50",
      matchScore: 96
    },
    {
      id: "offer8",
      name: "GreenChoice",
      description: "Eco-Friendly Marketplace",
      commission: "12%",
      epc: "$0.95",
      cookieDuration: "30 days",
      logo: "https://via.placeholder.com/50",
      matchScore: 88
    }
  ],
  "niche4": [
    {
      id: "offer9",
      name: "PetHealth Plus",
      description: "Pet Health Monitoring Devices",
      commission: "18%",
      epc: "$1.35",
      cookieDuration: "60 days",
      logo: "https://via.placeholder.com/50",
      matchScore: 97
    },
    {
      id: "offer10",
      name: "PetTracker Pro",
      description: "GPS Pet Trackers",
      commission: "20%",
      epc: "$1.25",
      cookieDuration: "45 days",
      logo: "https://via.placeholder.com/50",
      matchScore: 93
    }
  ],
  "niche5": [
    {
      id: "offer11",
      name: "MarketingPro",
      description: "All-in-One Marketing Platform",
      commission: "30%",
      epc: "$2.15",
      cookieDuration: "90 days",
      logo: "https://via.placeholder.com/50",
      matchScore: 98
    },
    {
      id: "offer12",
      name: "SEO Master",
      description: "SEO Tools Suite",
      commission: "25%",
      epc: "$1.85",
      cookieDuration: "60 days",
      logo: "https://via.placeholder.com/50",
      matchScore: 95
    }
  ],
  "niche6": [
    {
      id: "offer13",
      name: "SkillShare Pro",
      description: "Professional Skills Courses",
      commission: "40%",
      epc: "$2.45",
      cookieDuration: "60 days",
      logo: "https://via.placeholder.com/50",
      matchScore: 96
    },
    {
      id: "offer14",
      name: "LearnOnline",
      description: "Online Education Platform",
      commission: "35%",
      epc: "$2.25",
      cookieDuration: "45 days",
      logo: "https://via.placeholder.com/50",
      matchScore: 94
    }
  ]
};

// Mock data for content types
const contentTypes = [
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
  },
  {
    id: "content5",
    name: "Buyer's Guides",
    description: "Comprehensive guides that help readers understand what to look for when buying products.",
    icon: "shopping-cart"
  },
  {
    id: "content6",
    name: "Product News",
    description: "Updates on new product releases, features, and industry news.",
    icon: "newspaper"
  }
];

// Mock data for action plan templates
const actionPlanTemplates = {
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
  "Smart Home Devices": {
    day1: {
      title: "Complete Your Profile & Apply to Programs",
      description: "We'll automatically apply to SmartHome Hub and ConnectLife programs for you. While waiting for approval, research the top-selling smart home devices."
    },
    day2_3: {
      title: "Create Your First Review & Comparison",
      description: "Using our templates, create a detailed review of a popular smart speaker and a comparison of top smart security systems. We'll provide keyword suggestions and content outlines."
    },
    day4: {
      title: "Share Your Content",
      description: "Publish your content and share it on social media. We'll provide you with a social media schedule and post templates."
    },
    day5_6: {
      title: "Create Additional Content Pieces",
      description: "Create 2 more content pieces focusing on different smart home categories. We'll help you identify low-competition keywords to target."
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

module.exports = {
  getNiches: () => {
    return niches;
  },
  getOffersByNiche: (nicheId) => {
    return affiliateOffers[nicheId] || [];
  },
  getContentTypes: () => {
    return contentTypes;
  },
  getActionPlanTemplate: (nicheName) => {
    return actionPlanTemplates[nicheName] || actionPlanTemplates.default;
  }
};
