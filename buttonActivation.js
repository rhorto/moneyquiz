// Button Activation and Navigation for All Dashboard Tiers
document.addEventListener('DOMContentLoaded', function() {
  // Determine current tier from URL
  const currentPath = window.location.pathname;
  let currentTier = 'free';
  
  if (currentPath.includes('/basic/')) {
    currentTier = 'basic';
  } else if (currentPath.includes('/medium/')) {
    currentTier = 'medium';
  } else if (currentPath.includes('/expert/')) {
    currentTier = 'expert';
  }
  
  // Initialize all buttons and navigation elements
  initializeNavigation(currentTier);
  initializeDashboardButtons(currentTier);
  initializeActionButtons(currentTier);
  
  // Load demo data for the current page
  loadDemoDataForCurrentPage(currentTier);
});

// Initialize sidebar and top navigation
function initializeNavigation(tier) {
  // Sidebar navigation links
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section from the link's href or data attribute
      const targetSection = this.getAttribute('data-section') || this.getAttribute('href').replace('#', '');
      
      // Handle navigation based on the tier and target section
      navigateToSection(tier, targetSection);
      
      // Update active state in sidebar
      sidebarLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Top navigation elements (if any)
  const topNavLinks = document.querySelectorAll('.top-nav a');
  topNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section from the link's href or data attribute
      const targetSection = this.getAttribute('data-section') || this.getAttribute('href').replace('#', '');
      
      // Handle navigation based on the tier and target section
      navigateToSection(tier, targetSection);
    });
  });
  
  // User profile dropdown (if exists)
  const userProfileBtn = document.getElementById('user-profile-btn');
  if (userProfileBtn) {
    const userDropdown = document.getElementById('user-dropdown');
    userProfileBtn.addEventListener('click', function() {
      if (userDropdown) {
        userDropdown.classList.toggle('show');
      }
    });
  }
}

// Navigate to a specific section based on tier and section name
function navigateToSection(tier, section) {
  // In a real implementation, this would navigate to the actual page
  // For demo purposes, we'll simulate by showing/hiding sections or alerting
  
  console.log(`Navigating to ${section} in ${tier} tier`);
  
  // Map of section names to their corresponding pages or actions
  const sectionMap = {
    'dashboard': `/${tier}/`,
    'analytics': `/${tier}/analytics.html`,
    'niche-scanner': `/${tier}/niche-scanner.html`,
    'niche-analysis': `/${tier}/niche-analysis.html`,
    'affiliate-programs': `/${tier}/affiliate-programs.html`,
    'offer-recommendations': `/${tier}/offer-recommendations.html`,
    'content-planner': `/${tier}/content-planner.html`,
    'content-strategy': `/${tier}/content-strategy.html`,
    'social-calendar': `/${tier}/social-calendar.html`,
    'email-generator': `/${tier}/email-generator.html`,
    'website-generator': `/${tier}/website-generator.html`,
    'keywords': `/${tier}/keywords.html`,
    'seo-optimization': `/${tier}/seo-optimization.html`,
    'profitability': `/${tier}/profitability.html`,
    'attribution': `/${tier}/attribution.html`,
    'white-labeling': `/${tier}/white-labeling.html`,
    'settings': `/${tier}/settings.html`,
    'help': `/${tier}/help.html`,
    'fast-track': `/fast-track-wizard.html?tier=${tier}`
  };
  
  // Check if the section exists in our map
  if (sectionMap[section]) {
    // For demo purposes, we'll just show an alert instead of actual navigation
    // In a real implementation, this would be: window.location.href = sectionMap[section];
    alert(`Navigating to: ${sectionMap[section]}`);
    
    // Simulate section visibility for demo purposes
    simulateSectionVisibility(section);
  } else {
    console.error(`Unknown section: ${section}`);
  }
}

// Simulate showing/hiding sections for demo purposes
function simulateSectionVisibility(activeSection) {
  // Get all main content sections
  const sections = document.querySelectorAll('.dashboard-section');
  
  // Hide all sections
  sections.forEach(section => {
    section.style.display = 'none';
  });
  
  // Show the active section
  const activeElement = document.getElementById(`${activeSection}-section`);
  if (activeElement) {
    activeElement.style.display = 'block';
  }
}

// Initialize dashboard action buttons
function initializeDashboardButtons(tier) {
  // Fast Track Wizard start button
  const fastTrackBtn = document.getElementById('fast-track-start-btn');
  if (fastTrackBtn) {
    fastTrackBtn.addEventListener('click', function() {
      navigateToSection(tier, 'fast-track');
    });
  }
  
  // Time period selector buttons
  const timeButtons = document.querySelectorAll('.time-period-btn');
  timeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all time buttons
      timeButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get the selected time period
      const timePeriod = this.getAttribute('data-period');
      
      // Update dashboard data based on selected time period
      updateDashboardForTimePeriod(tier, timePeriod);
    });
  });
  
  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Toggle active state
      this.classList.toggle('active');
      
      // Get the filter type
      const filterType = this.getAttribute('data-filter');
      
      // Apply the filter
      applyFilter(filterType, this.classList.contains('active'));
    });
  });
}

// Update dashboard data based on selected time period
function updateDashboardForTimePeriod(tier, period) {
  console.log(`Updating ${tier} dashboard for time period: ${period}`);
  
  // In a real implementation, this would fetch data for the selected period
  // For demo purposes, we'll simulate with random data changes
  
  // Get current metrics
  const currentClicks = parseInt(document.getElementById('total-clicks')?.textContent || '0');
  const currentConversions = parseInt(document.getElementById('conversions')?.textContent || '0');
  const currentRevenue = parseFloat(document.getElementById('revenue')?.textContent?.replace('$', '') || '0');
  
  // Generate random variations based on time period
  let multiplier = 1;
  switch(period) {
    case 'today':
      multiplier = 0.1;
      break;
    case 'week':
      multiplier = 0.5;
      break;
    case 'month':
      multiplier = 1;
      break;
    case 'quarter':
      multiplier = 3;
      break;
    case 'year':
      multiplier = 12;
      break;
  }
  
  // Update metrics with simulated data
  updateMetricDisplay('total-clicks', Math.round(currentClicks * multiplier));
  updateMetricDisplay('conversions', Math.round(currentConversions * multiplier));
  updateMetricDisplay('revenue', `$${(currentRevenue * multiplier).toFixed(2)}`);
  updateMetricDisplay('conversion-rate', `${(Math.round(currentConversions * multiplier) / Math.round(currentClicks * multiplier) * 100).toFixed(1)}%`);
  
  // Update charts if they exist
  updateChartsForTimePeriod(period);
}

// Update charts based on selected time period
function updateChartsForTimePeriod(period) {
  // This would update any charts on the dashboard
  // For demo purposes, we'll just log the action
  console.log(`Updating charts for period: ${period}`);
}

// Apply filter to dashboard data
function applyFilter(filterType, isActive) {
  console.log(`${isActive ? 'Applying' : 'Removing'} filter: ${filterType}`);
  
  // In a real implementation, this would filter the dashboard data
  // For demo purposes, we'll just log the action
}

// Initialize action buttons throughout the dashboard
function initializeActionButtons(tier) {
  // Initialize all action buttons based on their data-action attribute
  const actionButtons = document.querySelectorAll('[data-action]');
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      const target = this.getAttribute('data-target');
      
      // Handle the action
      handleButtonAction(action, target, tier);
    });
  });
  
  // Initialize specific buttons by ID
  initializeSpecificButtons(tier);
}

// Handle button actions
function handleButtonAction(action, target, tier) {
  console.log(`Handling action: ${action}, target: ${target}, tier: ${tier}`);
  
  // Map of actions to their handlers
  const actionHandlers = {
    'view': handleViewAction,
    'edit': handleEditAction,
    'delete': handleDeleteAction,
    'create': handleCreateAction,
    'generate': handleGenerateAction,
    'analyze': handleAnalyzeAction,
    'export': handleExportAction,
    'import': handleImportAction,
    'save': handleSaveAction,
    'cancel': handleCancelAction,
    'apply': handleApplyAction,
    'refresh': handleRefreshAction
  };
  
  // Check if we have a handler for this action
  if (actionHandlers[action]) {
    actionHandlers[action](target, tier);
  } else {
    console.error(`Unknown action: ${action}`);
  }
}

// Action handler functions
function handleViewAction(target, tier) {
  alert(`Viewing ${target} in ${tier} tier`);
}

function handleEditAction(target, tier) {
  alert(`Editing ${target} in ${tier} tier`);
}

function handleDeleteAction(target, tier) {
  alert(`Deleting ${target} in ${tier} tier`);
}

function handleCreateAction(target, tier) {
  alert(`Creating new ${target} in ${tier} tier`);
}

function handleGenerateAction(target, tier) {
  alert(`Generating ${target} in ${tier} tier`);
}

function handleAnalyzeAction(target, tier) {
  alert(`Analyzing ${target} in ${tier} tier`);
}

function handleExportAction(target, tier) {
  alert(`Exporting ${target} in ${tier} tier`);
}

function handleImportAction(target, tier) {
  alert(`Importing ${target} in ${tier} tier`);
}

function handleSaveAction(target, tier) {
  alert(`Saving ${target} in ${tier} tier`);
}

function handleCancelAction(target, tier) {
  alert(`Canceling ${target} in ${tier} tier`);
}

function handleApplyAction(target, tier) {
  alert(`Applying ${target} in ${tier} tier`);
}

function handleRefreshAction(target, tier) {
  alert(`Refreshing ${target} in ${tier} tier`);
}

// Initialize specific buttons by ID
function initializeSpecificButtons(tier) {
  // Fast Track Wizard buttons
  initializeFastTrackButtons(tier);
  
  // Niche Analysis buttons
  if (['basic', 'medium', 'expert'].includes(tier)) {
    initializeNicheAnalysisButtons(tier);
  }
  
  // Content Strategy buttons
  if (['basic', 'medium', 'expert'].includes(tier)) {
    initializeContentStrategyButtons(tier);
  }
  
  // Tier-specific buttons
  if (tier === 'medium' || tier === 'expert') {
    initializeMediumTierButtons(tier);
  }
  
  if (tier === 'expert') {
    initializeExpertTierButtons(tier);
  }
}

// Initialize Fast Track Wizard buttons
function initializeFastTrackButtons(tier) {
  // Start button (already handled in initializeDashboardButtons)
  
  // Step navigation buttons
  const nextStepBtn = document.getElementById('next-step-btn');
  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', function() {
      // Get current step
      const currentStep = parseInt(this.getAttribute('data-current-step') || '1');
      const nextStep = currentStep + 1;
      
      // Navigate to next step
      navigateToWizardStep(nextStep, tier);
    });
  }
  
  const prevStepBtn = document.getElementById('prev-step-btn');
  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', function() {
      // Get current step
      const currentStep = parseInt(this.getAttribute('data-current-step') || '2');
      const prevStep = currentStep - 1;
      
      // Navigate to previous step
      navigateToWizardStep(prevStep, tier);
    });
  }
  
  // Complete wizard button
  const completeWizardBtn = document.getElementById('complete-wizard-btn');
  if (completeWizardBtn) {
    completeWizardBtn.addEventListener('click', function() {
      alert('Wizard completed! Redirecting to dashboard...');
      navigateToSection(tier, 'dashboard');
    });
  }
}

// Navigate to a specific wizard step
function navigateToWizardStep(step, tier) {
  alert(`Navigating to step ${step} of the Fast Track Wizard (${tier} tier)`);
}

// Initialize Niche Analysis buttons
function initializeNicheAnalysisButtons(tier) {
  // Niche selection buttons
  const nicheButtons = document.querySelectorAll('.niche-select-btn');
  nicheButtons.forEach(button => {
    button.addEventListener('click', function() {
      const nicheId = this.getAttribute('data-niche-id');
      
      // Clear active state from all niche buttons
      nicheButtons.forEach(btn => btn.classList.remove('active'));
      
      // Set active state for clicked button
      this.classList.add('active');
      
      // Update niche details
      updateNicheDetails(nicheId, tier);
    });
  });
  
  // Niche analysis button
  const analyzeNicheBtn = document.getElementById('analyze-niche-btn');
  if (analyzeNicheBtn) {
    analyzeNicheBtn.addEventListener('click', function() {
      const nicheId = document.querySelector('.niche-select-btn.active')?.getAttribute('data-niche-id');
      
      if (nicheId) {
        alert(`Analyzing niche ${nicheId} in ${tier} tier`);
      } else {
        alert('Please select a niche first');
      }
    });
  }
}

// Update niche details based on selection
function updateNicheDetails(nicheId, tier) {
  alert(`Updating details for niche ${nicheId} in ${tier} tier`);
}

// Initialize Content Strategy buttons
function initializeContentStrategyButtons(tier) {
  // Content type selection buttons
  const contentTypeButtons = document.querySelectorAll('.content-type-btn');
  contentTypeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const contentType = this.getAttribute('data-content-type');
      
      // Toggle active state
      this.classList.toggle('active');
      
      // Update content strategy based on selection
      updateContentStrategy(contentType, this.classList.contains('active'), tier);
    });
  });
  
  // Generate content plan button
  const generatePlanBtn = document.getElementById('generate-content-plan-btn');
  if (generatePlanBtn) {
    generatePlanBtn.addEventListener('click', function() {
      alert(`Generating content plan for ${tier} tier`);
    });
  }
}

// Update content strategy based on selection
function updateContentStrategy(contentType, isSelected, tier) {
  console.log(`${isSelected ? 'Adding' : 'Removing'} content type ${contentType} in ${tier} tier`);
}

// Initialize Medium Tier specific buttons
function initializeMediumTierButtons(tier) {
  // Niche Scanner buttons
  const scanNicheBtn = document.getElementById('scan-niche-btn');
  if (scanNicheBtn) {
    scanNicheBtn.addEventListener('click', function() {
      alert(`Scanning for high-demand, low-competition niches in ${tier} tier`);
    });
  }
  
  // Offer Recommendation buttons
  const getOffersBtn = document.getElementById('get-offers-btn');
  if (getOffersBtn) {
    getOffersBtn.addEventListener('click', function() {
      alert(`Getting personalized offer recommendations in ${tier} tier`);
    });
  }
  
  // Social Calendar buttons
  const scheduleSocialBtn = document.getElementById('schedule-social-btn');
  if (scheduleSocialBtn) {
    scheduleSocialBtn.addEventListener('click', function() {
      ale
(Content truncated due to size limit. Use line ranges to read in chunks)