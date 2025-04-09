// Demo data for all tiers of the Ultimate Affiliate Dashboard
const dashboardDemoData = {
  // Common data across all tiers
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "2025-03-15",
    avatar: "https://via.placeholder.com/40/4a6cf7/ffffff?text=JD"
  },
  
  // FREE TIER DATA
  free: {
    tier: "free",
    metrics: {
      totalClicks: 387,
      conversions: 12,
      revenue: 156.48,
      conversionRate: 3.1,
      epc: 0.40,
      pendingCommissions: 42.75
    },
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
      }
    ],
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
      }
    ],
    offerRecommendations: [
      {
        program: "Rogue Fitness",
        network: "ShareASale",
        commission: "12%",
        epc: "$1.25",
        match: "95%"
      },
      {
        program: "NordicTrack",
        network: "CJ Affiliate",
        commission: "8%",
        epc: "$1.50",
        match: "92%"
      },
      {
        program: "Bowflex",
        network: "Amazon Associates",
        commission: "5%",
        epc: "$1.10",
        match: "90%"
      }
    ],
    fastTrackWizard: {
      steps: [
        {
          id: 1,
          name: "Choose Niche",
          description: "Select a profitable niche for your affiliate marketing business",
          completed: false
        },
        {
          id: 2,
          name: "Select Offers",
          description: "Choose the best affiliate programs for your selected niche",
          completed: false
        },
        {
          id: 3,
          name: "Content Strategy",
          description: "Define your content approach and publishing schedule",
          completed: false
        },
        {
          id: 4,
          name: "Action Plan",
          description: "Review your personalized 7-day action plan",
          completed: false
        }
      ]
    }
  },
  
  // BASIC TIER DATA
  basic: {
    tier: "basic",
    metrics: {
      totalClicks: 1245,
      conversions: 42,
      revenue: 587.94,
      conversionRate: 3.4,
      epc: 0.47,
      pendingCommissions: 156.75
    },
    goals: {
      monthlyClicks: {
        current: 1245,
        target: 2000
      },
      conversions: {
        current: 42,
        target: 100
      },
      revenue: {
        current: 587.94,
        target: 1000
      },
      conversionRate: {
        current: 3.4,
        target: 5
      }
    },
    recentActivity: [
      {
        date: "2025-03-30",
        time: "10:45 AM",
        type: "Conversion",
        details: "New sale from Rogue Fitness - $24.99 commission"
      },
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
        date: "2025-03-29",
        time: "01:20 PM",
        type: "Content",
        details: "Published new article: 'Top 5 Treadmills for Small Spaces'"
      },
      {
        date: "2025-03-28",
        time: "11:20 AM",
        type: "Application",
        details: "Application to CJ Affiliate approved"
      }
    ],
    affiliatePrograms: [
      {
        name: "Amazon Associates",
        logo: "https://via.placeholder.com/40/ff9900/ffffff?text=AA",
        status: "Active",
        earnings: 178.24,
        clicks: 510,
        conversions: 16,
        conversionRate: 3.1,
        epc: 0.35
      },
      {
        name: "ShareASale",
        logo: "https://via.placeholder.com/40/00b373/ffffff?text=SA",
        status: "Active",
        earnings: 262.49,
        clicks: 445,
        conversions: 15,
        conversionRate: 3.4,
        epc: 0.59
      },
      {
        name: "CJ Affiliate",
        logo: "https://via.placeholder.com/40/0077c8/ffffff?text=CJ",
        status: "Active",
        earnings: 147.21,
        clicks: 290,
        conversions: 11,
        conversionRate: 3.8,
        epc: 0.51
      }
    ],
    nicheResearch: {
      niches: [
        {
          name: "Home Fitness Equipment",
          demand: "High",
          competition: "Medium",
          profitPotential: "High",
          isSelected: true,
          metrics: {
            monthlySearchVolume: 450000,
            averageCommission: "12%",
            averageOrderValue: "$250",
            conversionRate: "2.8%"
          }
        },
        {
          name: "Smart Home Devices",
          demand: "High",
          competition: "High",
          profitPotential: "Medium",
          isSelected: false,
          metrics: {
            monthlySearchVolume: 620000,
            averageCommission: "8%",
            averageOrderValue: "$180",
            conversionRate: "2.2%"
          }
        },
        {
          name: "Sustainable Living Products",
          demand: "Medium",
          competition: "Low",
          profitPotential: "Medium",
          isSelected: false,
          metrics: {
            monthlySearchVolume: 280000,
            averageCommission: "15%",
            averageOrderValue: "$85",
            conversionRate: "3.1%"
          }
        }
      ],
      topKeywords: [
        { keyword: "best home treadmill", volume: 22000, competition: "Medium", difficulty: 42 },
        { keyword: "affordable exercise bike", volume: 18000, competition: "Medium", difficulty: 38 },
        { keyword: "home gym equipment", volume: 33000, competition: "High", difficulty: 65 },
        { keyword: "adjustable dumbbells set", volume: 12000, competition: "Low", difficulty: 27 },
        { keyword: "yoga mat", volume: 40000, competition: "Medium", difficulty: 45 }
      ]
    },
    contentPlanner: {
      contentCalendar: [
        {
          title: "Top 10 Home Fitness Equipment Review",
          dueDate: "2025-04-15",
          type: "Blog Post",
          status: "Planned",
          keywords: ["best home fitness equipment", "home gym review", "fitness equipment comparison"]
        },
        {
          title: "Beginner's Guide to Home Workouts",
          dueDate: "2025-04-20",
          type: "Blog Post",
          status: "Planned",
          keywords: ["home workout for beginners", "start home fitness", "no equipment workout"]
        },
        {
          title: "Best Budget Fitness Equipment Comparison",
          dueDate: "2025-04-25",
          type: "Blog Post",
          status: "Planned",
          keywords: ["affordable fitness equipment", "budget home gym", "cheap workout gear"]
        },
        {
          title: "How to Choose the Right Treadmill",
          dueDate: "2025-04-30",
          type: "Blog Post",
          status: "Planned",
          keywords: ["treadmill buying guide", "best treadmill features", "treadmill comparison"]
        }
      ],
      contentTypes: [
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
        }
      ]
    },
    keywords: {
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
                "Set up p
(Content truncated due to size limit. Use line ranges to read in chunks)