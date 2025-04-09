// Test script for dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Starting dashboard functionality tests...');
  
  // Test suite for free tier features
  testFreeTierFeatures();
  
  // Test suite for basic tier features
  testBasicTierFeatures();
  
  // Test tier switching functionality
  testTierSwitching();
  
  console.log('All tests completed.');
});

// Test free tier features
function testFreeTierFeatures() {
  console.log('Testing Free Tier Features...');
  
  // Test dashboard metrics
  testDashboardMetrics('free');
  
  // Test affiliate finder
  testAffiliateFinder('free');
  
  // Test content tools
  testContentTools('free');
  
  // Test analytics
  testAnalytics('free');
  
  // Test conversion limits
  testConversionLimits();
  
  console.log('Free Tier Features tests completed.');
}

// Test basic tier features
function testBasicTierFeatures() {
  console.log('Testing Basic Tier Features...');
  
  // Test dashboard metrics
  testDashboardMetrics('basic');
  
  // Test niche analysis
  testNicheAnalysis();
  
  // Test affiliate platform manager
  testAffiliatePlatformManager();
  
  // Test affiliate finder
  testAffiliateFinder('basic');
  
  // Test content strategy
  testContentStrategy();
  
  // Test SEO tools
  testSeoTools();
  
  // Test content calendar
  testContentCalendar();
  
  // Test analytics
  testAnalytics('basic');
  
  console.log('Basic Tier Features tests completed.');
}

// Test dashboard metrics
function testDashboardMetrics(tier) {
  console.log(`Testing ${tier} tier dashboard metrics...`);
  
  // Mock data for testing
  const mockData = {
    free: {
      metrics: {
        totalClicks: 387,
        conversions: 12,
        revenue: 156.48,
        conversionRate: 3.1,
        epc: 0.40,
        pendingCommissions: 42.75
      }
    },
    basic: {
      metrics: {
        totalClicks: 1245,
        conversions: 42,
        revenue: 587.94,
        conversionRate: 3.4,
        epc: 0.47,
        pendingCommissions: 156.75,
        avgOrderValue: 45.23,
        topReferrer: 'Google',
        conversionByDevice: {
          desktop: 65,
          mobile: 35
        }
      }
    }
  };
  
  // Test updating metrics
  try {
    updateDashboardMetrics(mockData[tier].metrics);
    console.log('✓ Dashboard metrics update successful');
  } catch (error) {
    console.error('✗ Dashboard metrics update failed:', error);
  }
  
  // Test goals progress
  try {
    const mockGoals = {
      monthlyClicks: { current: tier === 'free' ? 387 : 1245, target: tier === 'free' ? 500 : 2000 },
      conversions: { current: tier === 'free' ? 12 : 42, target: tier === 'free' ? 20 : 100 },
      revenue: { current: tier === 'free' ? 156.48 : 587.94, target: tier === 'free' ? 250 : 1000 },
      conversionRate: { current: tier === 'free' ? 3.1 : 3.4, target: 5 }
    };
    
    updateGoalsProgress(mockGoals);
    console.log('✓ Goals progress update successful');
  } catch (error) {
    console.error('✗ Goals progress update failed:', error);
  }
  
  // Test recent activity
  try {
    const mockActivities = [
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
    ];
    
    updateRecentActivity(mockActivities);
    console.log('✓ Recent activity update successful');
  } catch (error) {
    console.error('✗ Recent activity update failed:', error);
  }
  
  console.log(`${tier} tier dashboard metrics tests completed.`);
}

// Test affiliate finder
function testAffiliateFinder(tier) {
  console.log(`Testing ${tier} tier affiliate finder...`);
  
  // Test rendering affiliate programs
  try {
    const mockPrograms = [
      {
        name: "Amazon Associates",
        category: "General",
        commission: "1-10%",
        cookieDuration: "24 hours",
        paymentThreshold: "$10",
        description: "Amazon's affiliate program offering commissions on all products."
      },
      {
        name: "ClickBank",
        category: "Digital Products",
        commission: "50-75%",
        cookieDuration: "60 days",
        paymentThreshold: "$10",
        description: "Marketplace for digital products with high commission rates."
      },
      {
        name: "ShareASale",
        category: "Various",
        commission: "Varies",
        cookieDuration: "30 days",
        paymentThreshold: "$50",
        description: "Affiliate network with thousands of merchant programs."
      }
    ];
    
    if (tier === 'free') {
      renderAffiliateFinderFree(mockPrograms);
      console.log('✓ Free tier affiliate finder rendering successful');
    } else {
      // For basic tier, we would test the enhanced affiliate finder
      const affiliateFinderSection = document.getElementById('affiliate-finder-section');
      if (affiliateFinderSection) {
        // Check if search filters are present (basic tier feature)
        const searchFilters = affiliateFinderSection.querySelector('.search-filters');
        if (searchFilters) {
          console.log('✓ Basic tier affiliate finder search filters present');
        } else {
          console.error('✗ Basic tier affiliate finder search filters missing');
        }
      }
    }
  } catch (error) {
    console.error(`✗ ${tier} tier affiliate finder rendering failed:`, error);
  }
  
  console.log(`${tier} tier affiliate finder tests completed.`);
}

// Test content tools
function testContentTools(tier) {
  console.log(`Testing ${tier} tier content tools...`);
  
  // Test template modal
  try {
    showTemplateModal('article');
    
    // Check if modal was created
    const modal = document.getElementById('templateModal');
    if (modal) {
      console.log('✓ Template modal created successfully');
      
      // Test copy functionality
      const copyButton = modal.querySelector('.copy-template-btn');
      if (copyButton) {
        copyButton.click();
        console.log('✓ Template copy button clicked');
      }
      
      // Close modal
      const closeButton = modal.querySelector('.btn-close');
      if (closeButton) {
        closeButton.click();
        console.log('✓ Template modal closed successfully');
      }
    } else {
      console.error('✗ Template modal creation failed');
    }
  } catch (error) {
    console.error(`✗ ${tier} tier template modal test failed:`, error);
  }
  
  console.log(`${tier} tier content tools tests completed.`);
}

// Test analytics
function testAnalytics(tier) {
  console.log(`Testing ${tier} tier analytics...`);
  
  // Test chart initialization
  try {
    if (tier === 'free') {
      initializeTrafficChart();
      initializeConversionChart();
      console.log('✓ Free tier charts initialized successfully');
    } else {
      // For basic tier, test more advanced charts
      initializePerformanceChart();
      initializeTrafficSourcesChart();
      initializeDeviceChart();
      console.log('✓ Basic tier charts initialized successfully');
    }
  } catch (error) {
    console.error(`✗ ${tier} tier chart initialization failed:`, error);
  }
  
  console.log(`${tier} tier analytics tests completed.`);
}

// Test conversion limits
function testConversionLimits() {
  console.log('Testing conversion limits functionality...');
  
  // Test with different conversion counts
  try {
    // Test with 7 conversions (3 remaining)
    localStorage.setItem('freeConversionCount', 7);
    checkConversionLimits();
    console.log('✓ Conversion warning test with 3 remaining successful');
    
    // Test with 10 conversions (0 remaining)
    localStorage.setItem('freeConversionCount', 10);
    checkConversionLimits();
    console.log('✓ Conversion limit reached test successful');
    
    // Reset for other tests
    localStorage.setItem('freeConversionCount', 0);
  } catch (error) {
    console.error('✗ Conversion limits test failed:', error);
  }
  
  console.log('Conversion limits tests completed.');
}

// Test niche analysis
function testNicheAnalysis() {
  console.log('Testing niche analysis functionality...');
  
  // Test rendering niche analysis
  try {
    const mockData = {
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
        }
      ],
      topKeywords: [
        { keyword: "best home treadmill", volume: 22000, competition: "Medium", difficulty: 42 },
        { keyword: "affordable exercise bike", volume: 18000, competition: "Medium", difficulty: 38 },
        { keyword: "home gym equipment", volume: 33000, competition: "High", difficulty: 65 }
      ]
    };
    
    renderNicheAnalysisBasic(mockData);
    console.log('✓ Niche analysis rendering successful');
  } catch (error) {
    console.error('✗ Niche analysis rendering failed:', error);
  }
  
  console.log('Niche analysis tests completed.');
}

// Test affiliate platform manager
function testAffiliatePlatformManager() {
  console.log('Testing affiliate platform manager functionality...');
  
  // Test initialization
  try {
    initializeAffiliatePlatformManager();
    
    // Check if section was initialized
    const section = document.getElementById('affiliate-platform-section');
    if (section) {
      // Check if application tracker is present
      const applicationTracker = section.querySelector('.card-header:contains("Application Tracker")');
      if (applicationTracker) {
        console.log('✓ Application tracker initialized successfully');
      } else {
        console.error('✗ Application tracker initialization failed');
      }
      
      // Check if program directory is present
      const programDirectory = section.querySelector('.card-header:contains("Program Directory")');
      if (programDirectory) {
        console.log('✓ Program directory initialized successfully');
      } else {
        console.error('✗ Program directory initialization failed');
      }
    } else {
      console.error('✗ Affiliate platform manager section not found');
    }
  } catch (error) {
    console.error('✗ Affiliate platform manager initialization failed:', error);
  }
  
  console.log('Affiliate platform manager tests completed.');
}

// Test content strategy
function testContentStrategy() {
  console.log('Testing content strategy functionality...');
  
  // Test initialization
  try {
    initializeContentStrategyBasic();
    
    // Check if section was initialized
    const section = document.getElementById('content-strategy-section');
    if (section) {
      // Check if content templates are present
      const templates = section.querySelector('.content-templates');
      if (templates) {
        console.log('✓ Content templates initialized successfully');
      } else {
        console.error('✗ Content templates initialization failed');
      }
      
      // Check if content types effectiveness is present
      const contentTypes = section.querySelector('.content-types');
      if (contentTypes) {
        console.log('✓ Content types effectiveness initialized successfully');
      } else {
        console.error('✗ Content types effectiveness initialization failed');
      }
    } else {
      console.error('✗ Content strategy section not found');
    }
  } catch (error) {
    console.error('✗ Content strategy initialization failed:', error);
  }
  
  console.log('Content strategy tests completed.');
}

// Test SEO tools
function testSeoTools() {
  console.log('Testing SEO tools functionality...');
  
  // Test initialization
  try {
    initializeSeoToolsBasic();
    
    // Check if section was initialized
    const section = document.getElementById('seo-optimization-section');
    if (section) {
      // Check if keyword opportunities are present
      const keywordOpportunities = section.querySelector('.card-header:contains("Keyword Opportunities")');
      if (keywordOpportunities) {
        console.log('✓ Keyword opportunities initialized successfully');
      } else {
        console.error('✗ Keyword opportunities initialization failed');
      }
      
      // Check if SEO checklist is present
      const seoChecklist = section.querySelector('.card-header:contains("On-Page SEO Checklist")');
      if (seoChecklist) {
        console.log('✓ SEO checklist initialized successfully');
      } else {
        console.error('✗ SEO checklist initialization failed');
      }
      
      // Check if content optimizer is present
      const contentOptimizer = section.querySelector('.card-header:contains("Content Optimizer")');
      if (contentOptimizer) {
        console.log('✓ Content optimizer initialized successfully');
      } else {
        console.error('✗ Content optimizer initialization failed');
      }
    } else {
      console.error('✗ SEO optimization section not found');
    }
  } catch (error) {
    console.error('✗ SEO tools initialization failed:', error);
  }
  
  console.log('SEO tools tests completed.');
}

// Test content calendar
function testContentCalendar() {
  console.log('Testing content calendar functionality...');
  
  // Test initialization
  try {
    initializeContentCalendarBasic();
    
    // Check if section was initialized
    const section = document.getElementById('content-calendar-section');
    if (section) {
      // Check if calendar is present
      const calendar = section.querySelector('.content-calendar');
      if (calendar) {
        console.log('✓ Content calendar initialized successfully');
      } else {
        console.error('✗ Content calendar initialization failed');
      }
      
      // Check if upcoming content is present
      const upcomingContent = section.querySelector('.card-header:contains("Upcoming Content")');
      if (upcomingContent) {
        console.log('✓ Upcoming content initialized successfully');
      } else {
        console.error('✗ Upcoming content initialization failed');
      }
      
      // Test add content modal
      try {
        showAddContentModal();
        
        // Check if modal was created
        const modal = document.getElementById('addContentModal');
        if (modal) {
          console.log('✓ Add content modal created successfully');
          
          // Close modal
          const closeButton = modal.querySelector('.btn-close');
          if (closeButton) {
            closeButton.click();
            console.log('✓ Add content modal closed successfully');
          }
        } else {
          console.error('✗ Add content modal creation failed');
        }
      } catch (error) {
        console.error('✗ Add content modal test failed:', error);
      }
    } else {
      console.error('✗ Content calendar section not found');
    }
  } catch (error) {
    console.error('✗ Content calendar initialization failed:', error);
  }
  
  console.log('Content calendar tests completed.');
}

// Test tier switching
function testTierSwitching() {
  console.log('Testing tier switching functionality...');
  
  // Test upgrade modal
  try {
    show
(Content truncated due to size limit. Use line ranges to read in chunks)