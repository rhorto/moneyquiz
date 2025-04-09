// Demo data for the Ultimate Affiliate Dashboard
const dashboardDemoData = {
  // User profile data
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "2025-03-15",
    tier: "free",
    avatar: "https://via.placeholder.com/40/4a6cf7/ffffff?text=JD"
  },
  
  // Performance metrics
  metrics: {
    totalClicks: 387,
    conversions: 12,
    revenue: 156.48,
    conversionRate: 3.1,
    epc: 0.40,
    pendingCommissions: 42.75
  },
  
  // Goals
  goals: {
    monthlyClicks: {
      current: 387,
      target: 500
    },
    conversions: {
      current: 12,
      target: 20
    },
    revenue: {
      current: 156.48,
      target: 250
    },
    conversionRate: {
      current: 3.1,
      target: 5
    }
  },
  
  // Recent activity
  recentActivity: [
    {
      date: "2025-03-30",
      time: "09:15 AM",
      type: "Conversion",
      details: "New sale from Amazon Associates - $12.49 commission"
    },
    {
      date: "2025-03-29",
      time: "03:42 PM",
      type: "Click",
      details: "52 clicks from your 'Best Home Fitness Equipment' article"
    },
    {
      date: "2025-03-28",
      time: "11:20 AM",
      type: "Application",
      details: "Application to ShareASale approved"
    },
    {
      date: "2025-03-27",
      time: "02:35 PM",
      type: "Content",
      details: "Published new article: 'Top 10 Sustainable Products for 2025'"
    },
    {
      date: "2025-03-26",
      time: "10:05 AM",
      type: "Conversion",
      details: "New sale from ShareASale - $24.99 commission"
    }
  ],
  
  // Affiliate programs
  affiliatePrograms: [
    {
      name: "Amazon Associates",
      logo: "https://via.placeholder.com/40/ff9900/ffffff?text=AA",
      status: "Active",
      earnings: 78.24,
      clicks: 210,
      conversions: 6,
      conversionRate: 2.9,
      epc: 0.37
    },
    {
      name: "ShareASale",
      logo: "https://via.placeholder.com/40/00b373/ffffff?text=SA",
      status: "Active",
      earnings: 62.49,
      clicks: 145,
      conversions: 5,
      conversionRate: 3.4,
      epc: 0.43
    },
    {
      name: "CJ Affiliate",
      logo: "https://via.placeholder.com/40/0077c8/ffffff?text=CJ",
      status: "Pending",
      earnings: 0,
      clicks: 0,
      conversions: 0,
      conversionRate: 0,
      epc: 0
    }
  ],
  
  // Niche analysis
  nicheAnalysis: {
    currentNiche: "Home Fitness Equipment",
    metrics: {
      demand: "High",
      competition: "Medium",
      profitPotential: "High",
      monthlySearchVolume: 450000,
      averageCommission: "12%",
      averageOrderValue: "$250",
      conversionRate: "2.8%"
    },
    topKeywords: [
      { keyword: "best home treadmill", volume: 22000, competition: "Medium", difficulty: 42 },
      { keyword: "affordable exercise bike", volume: 18000, competition: "Medium", difficulty: 38 },
      { keyword: "home gym equipment", volume: 33000, competition: "High", difficulty: 65 },
      { keyword: "adjustable dumbbells set", volume: 12000, competition: "Low", difficulty: 27 },
      { keyword: "yoga mat", volume: 40000, competition: "Medium", difficulty: 45 }
    ],
    trends: [
      { month: "Jan", searches: 380000 },
      { month: "Feb", searches: 410000 },
      { month: "Mar", searches: 430000 },
      { month: "Apr", searches: 450000 },
      { month: "May", searches: 470000 },
      { month: "Jun", searches: 460000 },
      { month: "Jul", searches: 440000 }
    ]
  },
  
  // Personalized offer recommendations
  offerRecommendations: [
    {
      program: "Rogue Fitness",
      network: "ShareASale",
      commission: "12%",
      epc: "$1.25",
      match: "95%",
      description: "Premium home gym equipment and accessories"
    },
    {
      program: "NordicTrack",
      network: "CJ Affiliate",
      commission: "8%",
      epc: "$1.50",
      match: "92%",
      description: "High-quality treadmills, bikes, and ellipticals"
    },
    {
      program: "Bowflex",
      network: "Amazon Associates",
      commission: "5%",
      epc: "$1.10",
      match: "90%",
      description: "Innovative home fitness equipment solutions"
    },
    {
      program: "Under Armour",
      network: "ShareASale",
      commission: "10%",
      epc: "$0.95",
      match: "85%",
      description: "Athletic apparel, footwear, and accessories"
    },
    {
      program: "MyProtein",
      network: "Awin",
      commission: "15%",
      epc: "$0.85",
      match: "80%",
      description: "Sports nutrition and supplements"
    }
  ],
  
  // Content strategy
  contentStrategy: {
    recommendedTypes: [
      {
        type: "Product Reviews",
        effectiveness: "High",
        description: "In-depth reviews of fitness equipment with pros, cons, and personal experiences"
      },
      {
        type: "Comparison Articles",
        effectiveness: "High",
        description: "Side-by-side comparisons of similar fitness products"
      },
      {
        type: "Buying Guides",
        effectiveness: "Medium",
        description: "Comprehensive guides to help readers choose the right equipment"
      },
      {
        type: "How-To Tutorials",
        effectiveness: "Medium",
        description: "Instructional content showing how to use fitness equipment effectively"
      },
      {
        type: "Workout Plans",
        effectiveness: "Low",
        description: "Exercise routines that incorporate specific fitness equipment"
      }
    ],
    contentCalendar: [
      {
        date: "2025-04-05",
        title: "10 Best Treadmills for Small Spaces",
        type: "Product Reviews",
        keywords: ["compact treadmill", "small space treadmill", "apartment treadmill"],
        status: "Planned"
      },
      {
        date: "2025-04-12",
        title: "Bowflex vs NordicTrack: Which Home Gym is Right for You?",
        type: "Comparison Articles",
        keywords: ["bowflex vs nordictrack", "home gym comparison", "best home gym"],
        status: "Planned"
      },
      {
        date: "2025-04-19",
        title: "How to Choose the Perfect Adjustable Dumbbells",
        type: "Buying Guides",
        keywords: ["best adjustable dumbbells", "adjustable weights guide", "dumbbells for home"],
        status: "Planned"
      }
    ]
  },
  
  // SEO optimization
  seoOptimization: {
    keywordOpportunities: [
      {
        keyword: "adjustable dumbbells set",
        volume: 12000,
        competition: "Low",
        difficulty: 27,
        opportunity: "High"
      },
      {
        keyword: "foldable treadmill for small apartment",
        volume: 5400,
        competition: "Low",
        difficulty: 25,
        opportunity: "High"
      },
      {
        keyword: "affordable exercise bike with screen",
        volume: 7200,
        competition: "Medium",
        difficulty: 35,
        opportunity: "Medium"
      },
      {
        keyword: "best home gym under $500",
        volume: 8500,
        competition: "Medium",
        difficulty: 42,
        opportunity: "Medium"
      },
      {
        keyword: "resistance bands workout set",
        volume: 9800,
        competition: "Low",
        difficulty: 30,
        opportunity: "High"
      }
    ],
    contentOptimizationTips: [
      "Include target keywords in title, headings, and first paragraph",
      "Add product comparison tables with key specifications",
      "Include high-quality images with descriptive alt text",
      "Write detailed pros and cons sections for each product",
      "Add user testimonials or personal experience with products",
      "Include clear call-to-action buttons near product mentions",
      "Optimize meta description with primary keyword and value proposition"
    ]
  },
  
  // Analytics data
  analytics: {
    trafficSources: [
      { source: "Organic Search", percentage: 65, change: 12 },
      { source: "Social Media", percentage: 15, change: 5 },
      { source: "Direct", percentage: 12, change: -2 },
      { source: "Referral", percentage: 8, change: 3 }
    ],
    topPerformingContent: [
      {
        title: "Best Home Treadmills for 2025",
        views: 1250,
        clicks: 87,
        conversions: 4,
        revenue: 49.96
      },
      {
        title: "5 Affordable Exercise Bikes Compared",
        views: 980,
        clicks: 62,
        conversions: 3,
        revenue: 37.47
      },
      {
        title: "Complete Guide to Building a Home Gym",
        views: 850,
        clicks: 45,
        conversions: 2,
        revenue: 24.98
      }
    ],
    performanceTrend: [
      { date: "Mar 24", clicks: 42, conversions: 1, revenue: 12.49 },
      { date: "Mar 25", clicks: 51, conversions: 2, revenue: 24.98 },
      { date: "Mar 26", clicks: 48, conversions: 1, revenue: 12.49 },
      { date: "Mar 27", clicks: 55, conversions: 2, revenue: 24.98 },
      { date: "Mar 28", clicks: 62, conversions: 2, revenue: 24.98 },
      { date: "Mar 29", clicks: 65, conversions: 2, revenue: 24.98 },
      { date: "Mar 30", clicks: 64, conversions: 2, revenue: 31.58 }
    ]
  },
  
  // Fast Track Wizard data
  fastTrackWizard: {
    steps: [
      {
        id: 1,
        name: "Choose Niche",
        description: "Select a profitable niche for your affiliate marketing business",
        completed: false,
        niches: [
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
            isRecommended: true,
            description: "Eco-friendly household items, reusable products, energy-efficient appliances, and sustainable fashion."
          },
          {
            id: "niche4",
            name: "Pet Health Monitoring",
            demand: "Medium",
            competition: "Low",
            profitPotential: "Medium",
            isRecommended: true,
            description: "Pet health trackers, smart feeders, monitoring cameras, and health supplements for pets."
          }
        ]
      },
      {
        id: 2,
        name: "Select Offers",
        description: "Choose the best affiliate programs for your selected niche",
        completed: false,
        offers: [
          {
            id: "offer1",
            name: "Rogue Fitness",
            network: "ShareASale",
            commission: "12%",
            epc: "$1.25",
            match: "95%",
            description: "Premium home gym equipment and accessories"
          },
          {
            id: "offer2",
            name: "NordicTrack",
            network: "CJ Affiliate",
            commission: "8%",
            epc: "$1.50",
            match: "92%",
            description: "High-quality treadmills, bikes, and ellipticals"
          },
          {
            id: "offer3",
            name: "Bowflex",
            network: "Amazon Associates",
            commission: "5%",
            epc: "$1.10",
            match: "90%",
            description: "Innovative home fitness equipment solutions"
          },
          {
            id: "offer4",
            name: "Under Armour",
            network: "ShareASale",
            commission: "10%",
            epc: "$0.95",
            match: "85%",
            description: "Athletic apparel, footwear, and accessories"
          }
        ]
      },
      {
        id: 3,
        name: "Content Strategy",
        description: "Define your content approach and publishing schedule",
        completed: false,
        contentTypes: [
          {
            id: "content1",
            type: "Product Reviews",
            effectiveness: "High",
            description: "In-depth reviews of fitness equipment with pros, cons, and personal experiences"
          },
          {
            id: "content2",
            type: "Comparison Articles",
            effectiveness: "High",
            description: "Side-by-side comparisons of similar fitness products"
          },
          {
            id: "content3",
            type: "Buying Guides",
            effectiveness: "Medium",
            description: "Comprehensive guides to help readers choose the right equipment"
          },
          {
            id: "content4",
            type: "How-To Tutorials",
            effectiveness: "Medium",
            description: "Instructional content showing how to use fitness equipment effectively"
          }
        ],
        frequencies: [
          {
            id: "freq1",
            name: "Starter",
            schedule: "1 article per week",
            description: "Perfect for beginners with limited time"
          },
          {
            id: "freq2",
            name: "Growth",
            schedule: "2-3 articles per week",
            description: "Balanced approach for steady growth"
          },
          {
            id: "freq3",
            name: "Accelerated",
            schedule: "4-5 articles per week",
            description: "Aggressive publishing for faster results"
          }
        ]
      },
      {
        id: 4,
        name: "Action Plan",
        description: "Review your personalized 7-day action plan",
        completed: false,
        actionPlan: [
          {
            day: 1,
            title: "Research & Setup",
            tasks: [
              "Sign up for recommended affiliate programs",
              "Research top-selling products in your niche",
              "Set up tracking links for each product"
            ]
          },
          {
            day: 2,
            title: "Website Preparation",
            tasks: [
              "Set up product comparison tables",
              "Create product review templates",
              "Install necessary affiliate plugins/tools"
            ]
          },
          {
            day: 3,
            title: "First Content Creation",
            tasks: [
              "Write your first product review article",
              "Optimize content with target keywords",
              "Add high-quality product images"
            ]
          },
          {
            day: 4,
            title: "Content Publishing",
            tasks: [
              "Publish your first review article",
              "Set up basic SEO for your content",
              "Create social media sharing graphics"
            ]
          },
          {
            day: 5,
            title: "Promotion Strategy",
            tasks: [
              "Share content on social media platforms",
              "Submit to relevant online communities",
              "Set up email capture for visitors"
            ]
          },
          {
            day: 6,
            title: "Analytics Setup",
            tasks: [
              "Set up Google Analytics tracking",
              "Configure affiliate link tracking",
              "Create performance dashboard"
            ]
          },
          {
            day: 7,
            title: "Planning & Scaling",
            tasks: [
              "Analyze initial performance data",
              "Plan next week's content calendar",
              "Research additional affiliate programs"
            ]
          }
        ]
      },
      {
        id: 5,
        name: "Launch",
        description: "Review your plan and get started with 
(Content truncated due to size limit. Use line ranges to read in chunks)