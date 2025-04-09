// Free Tier Features Implementation - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
  // Initialize free tier specific features
  initializeFreeTierDashboard();
  initializeAffiliateFinderFree();
  initializeBasicContentTools();
  initializeStandardAnalytics();
  initializeFreeTierLimitations();
  
  // Show conversion limit warning when appropriate
  checkConversionLimits();
});

// Initialize the main dashboard with basic metrics
function initializeFreeTierDashboard() {
  // Load demo data for the free tier
  fetch('/api/dashboard/free')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update dashboard metrics with free tier data
      updateDashboardMetrics(data.metrics);
      
      // Update recent activity
      updateRecentActivity(data.recentActivity);
      
      // Update goals progress
      updateGoalsProgress(data.goals);
    })
    .catch(error => {
      console.error('Error loading free tier data:', error);
      // Fallback to using demo data if API fails
      const demoData = window.dashboardDemoData ? window.dashboardDemoData.free : null;
      
      if (demoData) {
        updateDashboardMetrics(demoData.metrics);
        updateRecentActivity(demoData.recentActivity);
        updateGoalsProgress(demoData.goals);
      } else {
        // Fallback to hardcoded data if demo data is not available
        const fallbackData = {
          metrics: {
            totalClicks: 387,
            conversions: 12,
            revenue: 156.48,
            conversionRate: 3.1,
            epc: 0.40,
            pendingCommissions: 42.75
          },
          goals: {
            monthlyClicks: { current: 387, target: 500 },
            conversions: { current: 12, target: 20 },
            revenue: { current: 156.48, target: 250 },
            conversionRate: { current: 3.1, target: 5 }
          }
        };
        
        updateDashboardMetrics(fallbackData.metrics);
        updateGoalsProgress(fallbackData.goals);
      }
    });
}

// Update dashboard metrics with data
function updateDashboardMetrics(metrics) {
  // Update main metrics
  document.getElementById('total-clicks')?.textContent = metrics.totalClicks.toLocaleString();
  document.getElementById('conversions')?.textContent = metrics.conversions.toLocaleString();
  document.getElementById('revenue')?.textContent = `$${metrics.revenue.toFixed(2)}`;
  document.getElementById('conversion-rate')?.textContent = `${metrics.conversionRate}%`;
  document.getElementById('epc')?.textContent = `$${metrics.epc.toFixed(2)}`;
  document.getElementById('pending-commissions')?.textContent = `$${metrics.pendingCommissions.toFixed(2)}`;
}

// Update recent activity section
function updateRecentActivity(activities) {
  const activityContainer = document.getElementById('recent-activity-container');
  if (!activityContainer) return;
  
  // Clear existing content
  activityContainer.innerHTML = '';
  
  // Add activity items (limit to 5 for free tier)
  const limitedActivities = activities ? activities.slice(0, 3) : [];
  
  if (limitedActivities.length === 0) {
    activityContainer.innerHTML = '<div class="no-activity">No recent activity to display</div>';
    return;
  }
  
  limitedActivities.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    // Determine icon based on activity type
    let iconClass = 'bi-info-circle';
    if (activity.type === 'Conversion') iconClass = 'bi-cash-coin';
    if (activity.type === 'Click') iconClass = 'bi-mouse';
    if (activity.type === 'Signup') iconClass = 'bi-person-plus';
    
    activityItem.innerHTML = `
      <div class="activity-icon">
        <i class="bi ${iconClass}"></i>
      </div>
      <div class="activity-details">
        <div class="activity-time">${activity.date} ${activity.time}</div>
        <div class="activity-description">
          <span class="activity-type">${activity.type}:</span> ${activity.details}
        </div>
      </div>
    `;
    
    activityContainer.appendChild(activityItem);
  });
  
  // Add "View more" link (disabled in free tier)
  const viewMoreLink = document.createElement('div');
  viewMoreLink.className = 'view-more-link disabled';
  viewMoreLink.innerHTML = '<span>View more activities (upgrade required)</span>';
  viewMoreLink.addEventListener('click', function() {
    showUpgradeModal('Basic', 'View full activity history');
  });
  activityContainer.appendChild(viewMoreLink);
}

// Update goals progress
function updateGoalsProgress(goals) {
  if (!goals) return;
  
  // Update clicks goal
  updateGoalProgress('clicks-goal-progress', goals.monthlyClicks.current, goals.monthlyClicks.target);
  
  // Update conversions goal
  updateGoalProgress('conversions-goal-progress', goals.conversions.current, goals.conversions.target);
  
  // Update revenue goal
  updateGoalProgress('revenue-goal-progress', goals.revenue.current, goals.revenue.target);
  
  // Update conversion rate goal
  updateGoalProgress('conversion-rate-goal-progress', goals.conversionRate.current, goals.conversionRate.target);
}

// Update individual goal progress
function updateGoalProgress(elementId, current, target) {
  const progressElement = document.getElementById(elementId);
  if (!progressElement) return;
  
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  progressElement.style.width = `${percentage}%`;
  progressElement.setAttribute('aria-valuenow', percentage);
  
  // Update the label if it exists
  const labelElement = document.getElementById(`${elementId}-label`);
  if (labelElement) {
    labelElement.textContent = `${current} / ${target} (${percentage}%)`;
  }
}

// Initialize the limited affiliate finder for free tier
function initializeAffiliateFinderFree() {
  const affiliateFinderSection = document.getElementById('affiliate-finder-section');
  if (!affiliateFinderSection) return;
  
  // Load basic affiliate programs for free tier
  fetch('/api/affiliates/free')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      renderAffiliateFinderFree(data.programs);
    })
    .catch(error => {
      console.error('Error loading free tier affiliate programs:', error);
      // Fallback to basic affiliate programs
      const basicAffiliatePrograms = [
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
      
      renderAffiliateFinderFree(basicAffiliatePrograms);
    });
}

// Render affiliate finder for free tier
function renderAffiliateFinderFree(programs) {
  const affiliateFinderSection = document.getElementById('affiliate-finder-section');
  if (!affiliateFinderSection) return;
  
  // Create affiliate program cards
  const programsContainer = document.createElement('div');
  programsContainer.className = 'affiliate-programs-container';
  
  programs.forEach(program => {
    const programCard = document.createElement('div');
    programCard.className = 'affiliate-program-card';
    
    programCard.innerHTML = `
      <h3 class="program-name">${program.name}</h3>
      <div class="program-category">${program.category}</div>
      <div class="program-details">
        <div class="detail-item">
          <span class="detail-label">Commission:</span>
          <span class="detail-value">${program.commission}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Cookie:</span>
          <span class="detail-value">${program.cookieDuration}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Min. Payout:</span>
          <span class="detail-value">${program.paymentThreshold}</span>
        </div>
      </div>
      <p class="program-description">${program.description}</p>
      <button class="btn btn-free apply-btn">Apply Now</button>
    `;
    
    programsContainer.appendChild(programCard);
  });
  
  // Add upgrade message for more programs
  const upgradeMessage = document.createElement('div');
  upgradeMessage.className = 'upgrade-message';
  upgradeMessage.innerHTML = `
    <div class="message-content">
      <h3>Want access to more affiliate programs?</h3>
      <p>Upgrade to Basic tier to unlock 100+ affiliate programs with detailed metrics and filtering options.</p>
      <button class="btn btn-free upgrade-btn">Upgrade Now</button>
    </div>
  `;
  
  // Clear and append content
  affiliateFinderSection.innerHTML = `
    <div class="section-header">
      <h2>Affiliate Finder</h2>
      <p>Discover affiliate programs to promote (Free tier: limited to 3 basic programs)</p>
    </div>
  `;
  
  affiliateFinderSection.appendChild(programsContainer);
  affiliateFinderSection.appendChild(upgradeMessage);
  
  // Add event listeners to buttons
  const applyButtons = affiliateFinderSection.querySelectorAll('.apply-btn');
  applyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const programName = this.closest('.affiliate-program-card').querySelector('.program-name').textContent;
      alert(`Application process for ${programName} would start here. This is a demo.`);
    });
  });
  
  const upgradeButton = affiliateFinderSection.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      showUpgradeModal('Basic', 'Access 100+ affiliate programs');
    });
  }
}

// Initialize basic content tools for free tier
function initializeBasicContentTools() {
  const contentStrategySection = document.getElementById('content-strategy-section');
  if (!contentStrategySection) return;
  
  // Create basic content planning templates
  contentStrategySection.innerHTML = `
    <div class="section-header">
      <h2>Content Strategy</h2>
      <p>Basic content planning tools (Free tier)</p>
    </div>
    
    <div class="content-tools-container">
      <div class="content-tool-card">
        <div class="tool-icon">
          <i class="bi bi-file-text"></i>
        </div>
        <h3>Basic Article Template</h3>
        <p>Simple template for creating product review articles</p>
        <button class="btn btn-free template-btn" data-template="article">Use Template</button>
      </div>
      
      <div class="content-tool-card">
        <div class="tool-icon">
          <i class="bi bi-bar-chart"></i>
        </div>
        <h3>Comparison Post Template</h3>
        <p>Template for creating product comparison content</p>
        <button class="btn btn-free template-btn" data-template="comparison">Use Template</button>
      </div>
      
      <div class="content-tool-card locked">
        <div class="tool-icon">
          <i class="bi bi-cart"></i>
        </div>
        <h3>Buying Guide Template</h3>
        <p>Comprehensive template for creating buying guides</p>
        <div class="locked-overlay">
          <i class="bi bi-lock-fill"></i>
          <span>Upgrade to Basic</span>
        </div>
      </div>
    </div>
    
    <div class="upgrade-message">
      <div class="message-content">
        <h3>Need more content tools?</h3>
        <p>Upgrade to Basic tier to unlock additional templates, content planning tools, and basic SEO features.</p>
        <button class="btn btn-free upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  `;
  
  // Add event listeners to template buttons
  const templateButtons = contentStrategySection.querySelectorAll('.template-btn');
  templateButtons.forEach(button => {
    button.addEventListener('click', function() {
      const templateType = this.getAttribute('data-template');
      showTemplateModal(templateType);
    });
  });
  
  // Add event listener to upgrade button
  const upgradeButton = contentStrategySection.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      showUpgradeModal('Basic', 'Access advanced content tools');
    });
  }
  
  // Add event listener to locked card
  const lockedCard = contentStrategySection.querySelector('.content-tool-card.locked');
  if (lockedCard) {
    lockedCard.addEventListener('click', function() {
      showUpgradeModal('Basic', 'Access buying guide template');
    });
  }
}

// Show template modal
function showTemplateModal(templateType) {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'templateModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'templateModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  
  let templateTitle = '';
  let templateContent = '';
  
  // Set template content based on type
  if (templateType === 'article') {
    templateTitle = 'Product Review Article Template';
    templateContent = `
      <h2>[Product Name] Review: [Main Benefit/Feature]</h2>
      
      <p><strong>Introduction</strong> - Brief overview of the product and why it matters to your audience.</p>
      
      <p><strong>Quick Verdict</strong> - Summary of your review for those who don't want to read the entire article.</p>
      
      <p><strong>Key Features</strong> - List and explain the main features of the product.</p>
      
      <p><strong>Pros and Cons</strong> - Balanced assessment of advantages and disadvantages.</p>
      
      <p><strong>Who Is This For?</strong> - Describe the ideal customer for this product.</p>
      
      <p><strong>Alternatives</strong> - Mention 2-3 alternative products for comparison.</p>
      
      <p><strong>Conclusion</strong> - Final thoughts and recommendation.</p>
      
      <p><strong>Call to Action</strong> - Clear direction on what the reader should do next.</p>
    `;
  } else if (templateType === 'comparison') {
    templateTitle = 'Product Comparison Template';
    templateContent = `
      <h2>[Product A] vs [Product B]: Which Is Better for [Specific Use Case]?</h2>
      
      <p><strong>Introduction</strong> - Explain why these products are being compared and who would be interested.</p>
      
      <p><strong>Quick Comparison Table</strong> - Side-by-side comparison of key specifications.</p>
      
      <p><strong>Key Differences</strong> - Highlight the most important differences between the products.</p>
      
      <p><strong>Product A Overview</strong> - Detailed look at the first product.</p>
      
      <p><strong>Product B Overview</strong> - Detailed look at the second product.</p>
      
      <p><strong>Head-to-Head Comparisons</strong> - Compare specific aspects (price, features, performance, etc.).</p>
      
      <p><strong>Which One Should You Choose?</strong> - Recommendations for different types of users.</p>
      
      <p><strong>Conclusion</strong> - Summary and final verdict.</p>
    `;
  }
  
  // Create modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="templateModalLabel">${template
(Content truncated due to size limit. Use line ranges to read in chunks)