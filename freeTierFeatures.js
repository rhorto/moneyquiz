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
          <h5 class="modal-title" id="templateModalLabel">${templateTitle}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="template-content">
            ${templateContent}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary copy-template-btn">Copy Template</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.appendChild(modal);
  
  // Initialize and show the modal
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  // Add event listeners
  const closeButtons = modal.querySelectorAll('.btn-close, .btn-secondary');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      bsModal.hide();
    });
  });
  
  const copyButton = modal.querySelector('.copy-template-btn');
  if (copyButton) {
    copyButton.addEventListener('click', function() {
      // Create a temporary textarea to copy the content
      const textarea = document.createElement('textarea');
      textarea.value = templateContent.replace(/<[^>]*>/g, '');
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      // Change button text temporarily
      this.textContent = 'Copied!';
      setTimeout(() => {
        this.textContent = 'Copy Template';
      }, 2000);
    });
  }
  
  // Remove modal from DOM when hidden
  modal.addEventListener('hidden.bs.modal', function () {
    document.body.removeChild(modal);
  });
}

// Initialize standard analytics for free tier
function initializeStandardAnalytics() {
  const analyticsSection = document.getElementById('analytics-section');
  if (!analyticsSection) return;
  
  // Create basic analytics dashboard
  analyticsSection.innerHTML = `
    <div class="section-header">
      <h2>Analytics</h2>
      <p>Basic traffic and conversion tracking (Free tier)</p>
    </div>
    
    <div class="analytics-container">
      <div class="analytics-card">
        <h3>Traffic Overview</h3>
        <div class="analytics-chart-container">
          <canvas id="traffic-chart"></canvas>
        </div>
        <div class="chart-footer">
          <span class="time-period">Last 7 days</span>
          <span class="upgrade-note">Upgrade for more data history</span>
        </div>
      </div>
      
      <div class="analytics-card">
        <h3>Conversion Tracking</h3>
        <div class="analytics-chart-container">
          <canvas id="conversion-chart"></canvas>
        </div>
        <div class="chart-footer">
          <span class="time-period">Last 7 days</span>
          <span class="upgrade-note">Limited to 10 conversions/month</span>
        </div>
      </div>
      
      <div class="analytics-card locked">
        <h3>Revenue Analysis</h3>
        <div class="locked-overlay">
          <i class="bi bi-lock-fill"></i>
          <p>Upgrade to Basic tier to unlock revenue analysis</p>
          <button class="btn btn-sm btn-free">Upgrade Now</button>
        </div>
      </div>
      
      <div class="analytics-card locked">
        <h3>Traffic Sources</h3>
        <div class="locked-overlay">
          <i class="bi bi-lock-fill"></i>
          <p>Upgrade to Basic tier to unlock traffic source analysis</p>
          <button class="btn btn-sm btn-free">Upgrade Now</button>
        </div>
      </div>
    </div>
    
    <div class="upgrade-message">
      <div class="message-content">
        <h3>Want more analytics features?</h3>
        <p>Upgrade to Basic tier to unlock expanded reporting capabilities, traffic source analysis, and revenue breakdowns.</p>
        <button class="btn btn-free upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  `;
  
  // Initialize charts
  setTimeout(() => {
    initializeTrafficChart();
    initializeConversionChart();
  }, 500);
  
  // Add event listeners
  const upgradeButtons = analyticsSection.querySelectorAll('.upgrade-btn, .locked-overlay .btn');
  upgradeButtons.forEach(button => {
    button.addEventListener('click', function() {
      showUpgradeModal('Basic', 'Access advanced analytics');
    });
  });
  
  // Make locked cards clickable
  const lockedCards = analyticsSection.querySelectorAll('.analytics-card.locked');
  lockedCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.tagName !== 'BUTTON') {
        showUpgradeModal('Basic', 'Access advanced analytics');
      }
    });
  });
}

// Initialize traffic chart
function initializeTrafficChart() {
  const ctx = document.getElementById('traffic-chart');
  if (!ctx) return;
  
  // Sample data for the last 7 days
  const labels = Array.from({length: 7}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });
  
  // Generate some random but realistic data
  const trafficData = [45, 52, 38, 65, 42, 58, 63];
  
  // Create chart
  if (window.trafficChart) {
    window.trafficChart.destroy();
  }
  
  window.trafficChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Page Views',
        data: trafficData,
        borderColor: '#4e73df',
        backgroundColor: 'rgba(78, 115, 223, 0.05)',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Initialize conversion chart
function initializeConversionChart() {
  const ctx = document.getElementById('conversion-chart');
  if (!ctx) return;
  
  // Sample data for the last 7 days
  const labels = Array.from({length: 7}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });
  
  // Generate some random but realistic data
  const conversionData = [2, 1, 0, 3, 1, 2, 3];
  
  // Create chart
  if (window.conversionChart) {
    window.conversionChart.destroy();
  }
  
  window.conversionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Conversions',
        data: conversionData,
        backgroundColor: '#1cc88a',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          },
          grid: {
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Initialize free tier limitations and warnings
function initializeFreeTierLimitations() {
  // Add free tier badge to the dashboard
  const dashboardHeader = document.querySelector('.topbar');
  if (dashboardHeader) {
    const tierBadge = document.createElement('div');
    tierBadge.className = 'tier-badge free';
    tierBadge.innerHTML = `
      <span class="tier-name">Free Tier</span>
      <span class="tier-limit">10 conversions/month</span>
    `;
    dashboardHeader.appendChild(tierBadge);
  }
  
  // Add upgrade banner at the top of the dashboard
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    const upgradeBanner = document.createElement('div');
    upgradeBanner.className = 'upgrade-banner';
    upgradeBanner.innerHTML = `
      <div class="banner-content">
        <div class="banner-text">
          <h4>You're using the Free Tier</h4>
          <p>Upgrade to unlock more features and remove conversion limits</p>
        </div>
        <button class="btn btn-primary upgrade-banner-btn">View Upgrade Options</button>
        <button class="btn btn-link close-banner-btn"><i class="bi bi-x"></i></button>
      </div>
    `;
    mainContent.insertBefore(upgradeBanner, mainContent.firstChild);
    
    // Add event listeners
    const upgradeButton = upgradeBanner.querySelector('.upgrade-banner-btn');
    if (upgradeButton) {
      upgradeButton.addEventListener('click', function() {
        showUpgradeModal('Basic', 'Remove conversion limits');
      });
    }
    
    const closeButton = upgradeBanner.querySelector('.close-banner-btn');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        upgradeBanner.style.display = 'none';
        // Set a cookie to remember the banner was closed
        document.cookie = 'upgradeBannerClosed=true; max-age=86400'; // 24 hours
      });
    }
    
    // Check if banner should be shown
    if (document.cookie.includes('upgradeBannerClosed=true')) {
      upgradeBanner.style.display = 'none';
    }
  }
  
  // Add free tier limitations to each section
  addFreeTierLimitationNotice('niche-analysis-section', 'Niche Analysis tools are available in Basic tier and above');
  addFreeTierLimitationNotice('seo-optimization-section', 'SEO Optimization tools are available in Basic tier and above');
  addFreeTierLimitationNotice('content-calendar-section', 'Content Calendar is available in Basic tier and above');
  addFreeTierLimitationNotice('ai-tools-section', 'AI Tools are available in Medium tier and above');
}

// Add free tier limitation notice to a section
function addFreeTierLimitationNotice(sectionId, message) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  // Check if section already has content
  if (section.children.length > 0) return;
  
  // Add limitation notice
  section.innerHTML = `
    <div class="section-header">
      <h2>${sectionId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace('Section', '')}</h2>
    </div>
    <div class="tier-limitation-notice">
      <div class="limitation-icon">
        <i class="bi bi-lock-fill"></i>
      </div>
      <div class="limitation-message">
        <h3>Feature Not Available</h3>
        <p>${message}</p>
        <button class="btn btn-primary upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  `;
  
  // Add event listener to upgrade button
  const upgradeButton = section.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      showUpgradeModal('Basic', `Access ${sectionId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace('Section', '')}`);
    });
  }
}

// Check conversion limits and show warning if needed
function checkConversionLimits() {
  // Get current conversion count from API or local storage
  const currentConversions = localStorage.getItem('freeConversionCount') || 0;
  const maxConversions = 10;
  
  // Calculate remaining conversions
  const remainingConversions = maxConversions - currentConversions;
  
  // Update conversion limit indicator if it exists
  const limitIndicator = document.querySelector('.tier-badge .tier-limit');
  if (limitIndicator) {
    limitIndicator.textContent = `${remainingConversions} of ${maxConversions} conversions left`;
  }
  
  // Show warning if less than 3 conversions remaining
  if (remainingConversions <= 3 && remainingConversions > 0) {
    showConversionLimitWarning(remainingConversions);
  }
  
  // Show upgrade modal if no conversions remaining
  if (remainingConversions <= 0) {
    showConversionLimitReached();
  }
}

// Show conversion limit warning
function showConversionLimitWarning(remaining) {
  // Create warning element
  const warningElement = document.createElement('div');
  warningElement.className = 'conversion-limit-warning';
  warningElement.innerHTML = `
    <div class="warning-content">
      <div class="warning-icon">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
      <div class="warning-message">
        <h4>Conversion Limit Almost Reached</h4>
        <p>You have ${remaining} conversion${remaining === 1 ? '' : 's'} remaining this month. Upgrade to Basic tier for 50 monthly conversions.</p>
      </div>
      <div class="warning-actions">
        <button class="btn btn-primary upgrade-btn">Upgrade Now</button>
        <button class="btn btn-link dismiss-btn">Dismiss</button>
      </div>
    </div>
  `;
  
  // Add to body
  document.body.appendChild(warningElement);
  
  // Add event listeners
  const upgradeButton = warningElement.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      showUpgradeModal('Basic', 'Increase conversion limit');
      document.body.removeChild(warningElement);
    });
  }
  
  const dismissButton = warningElement.querySelector('.dismiss-btn');
  if (dismissButton) {
    dismissButton.addEventListener('click', function() {
      document.body.removeChild(warningElement);
      // Set a cookie to remember the warning was dismissed
      document.cookie = 'conversionWarningDismissed=true; max-age=86400'; // 24 hours
    });
  }
  
  // Check if warning should be shown
  if (document.cookie.includes('conversionWarningDismissed=true')) {
    document.body.removeChild(warningElement);
  }
  
  // Auto-dismiss after 10 seconds
  setTimeout(() => {
    if (document.body.contains(warningElement)) {
      document.body.removeChild(warningElement);
    }
  }, 10000);
}

// Show conversion limit reached modal
function showConversionLimitReached() {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'conversionLimitModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'conversionLimitModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  
  // Create modal content
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="conversionLimitModalLabel">Monthly Conversion Limit Reached</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="limit-reached-content">
            <div class="limit-icon">
              <i class="bi bi-exclamation-circle"></i>
            </div>
            <p>You've reached your monthly limit of 10 conversions on the Free tier. Upgrade to continue tracking conversions and access more features.</p>
            <div class="limit-options">
              <div class="option-card">
                <h4>Basic Tier</h4>
                <div class="option-price">$49<span>/month</span></div>
                <ul class="option-features">
                  <li>50 monthly conversions</li>
                  <li>Enhanced dashboard metrics</li>
                  <li>Basic niche research tools</li>
                  <li>Program application tracker</li>
                  <li>Enhanced product search</li>
                </ul>
                <button class="btn btn-primary upgrade-basic-btn">Upgrade to Basic</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-link" data-bs-dismiss="modal">Continue with Free Tier</button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.appendChild(modal);
  
  // Initialize and show the modal
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  // Add event listener to upgrade button
  const upgradeButton = modal.querySelector('.upgrade-basic-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      showUpgradeModal('Basic', 'Increase conversion limit');
      bsModal.hide();
    });
  }
  
  // Remove modal from DOM when hidden
  modal.addEventListener('hidden.bs.modal', function () {
    document.body.removeChild(modal);
  });
  
  // Check if modal should be shown
  if (document.cookie.includes('conversionLimitModalShown=true')) {
    bsModal.hide();
  } else {
    // Set a cookie to remember the modal was shown
    document.cookie = 'conversionLimitModalShown=true; max-age=86400'; // 24 hours
  }
}

// Show upgrade modal
function showUpgradeModal(recommendedTier, upgradeReason) {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'upgradeModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'upgradeModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  
  // Determine which tier to highlight
  const highlightBasic = recommendedTier === 'Basic';
  const highlightMedium = recommendedTier === 'Medium';
  const highlightExpert = recommendedTier === 'Expert';
  
  // Create modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="upgradeModalLabel">Upgrade Your Plan</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ${upgradeReason ? `<p class="upgrade-reason">Upgrade to ${upgradeReason}</p>` : ''}
          <div class="pricing-plans">
            <div class="row">
              <div class="col-md-4">
                <div class="pricing-card ${highlightBasic ? 'recommended' : ''}">
                  ${highlightBasic ? '<div class="recommended-badge">Recommended</div>' : ''}
                  <div class="pricing-header">
                    <h3>Basic</h3>
                    <div class="price">$49<span>/month</span></div>
                    <div class="price-annual">$39<span>/month billed annually</span></div>
                  </div>
                  <div class="pricing-features">
                    <ul>
                      <li>Enhanced dashboard metrics</li>
                      <li>Basic niche research tools</li>
                      <li>Program application tracker</li>
                      <li>Enhanced product search</li>
                      <li>Basic content planning tools</li>
                      <li>Keyword research basics</li>
                      <li>Simple editorial calendar</li>
                      <li>Expanded reporting</li>
                      <li>2 user accounts</li>
                      <li>50 monthly conversions tracked</li>
                    </ul>
                  </div>
                  <div class="pricing-action">
                    <button class="btn btn-primary btn-lg w-100">Upgrade to Basic</button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="pricing-card ${highlightMedium ? 'recommended' : ''}">
                  ${highlightMedium ? '<div class="recommended-badge">Recommended</div>' : ''}
                  <div class="pricing-header">
                    <h3>Medium</h3>
                    <div class="price">$129<span>/month</span></div>
                    <div class="price-annual">$99<span>/month billed annually</span></div>
                  </div>
                  <div class="pricing-features">
                    <ul>
                      <li>Everything in Basic tier</li>
                      <li>Advanced performance comparisons</li>
                      <li>High Demand Low Competition Scanner</li>
                      <li>Full program management suite</li>
                      <li>Personalized offer recommendations</li>
                      <li>Conversion optimization tools</li>
                      <li>Complete SEO tools</li>
                      <li>Social media calendar analysis</li>
                      <li>Email content generator</li>
                      <li>Profitability analysis dashboard</li>
                      <li>Ad Cost Estimator</li>
                      <li>5 user accounts</li>
                      <li>200 monthly conversions tracked</li>
                    </ul>
                  </div>
                  <div class="pricing-action">
                    <button class="btn ${highlightMedium ? 'btn-primary' : 'btn-outline-primary'} btn-lg w-100">Upgrade to Medium</button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="pricing-card ${highlightExpert ? 'recommended' : ''}">
                  ${highlightExpert ? '<div class="recommended-badge">Recommended</div>' : ''}
                  <div class="pricing-header">
                    <h3>Expert</h3>
                    <div class="price">$349<span>/month</span></div>
                    <div class="price-annual">$299<span>/month billed annually</span></div>
                  </div>
                  <div class="pricing-features">
                    <ul>
                      <li>Everything in Medium tier</li>
                      <li>Fully customizable dashboard</li>
                      <li>Complete niche analysis suite</li>
                      <li>Enterprise-level program management</li>
                      <li>Advanced audience match analysis</li>
                      <li>Competitive ad intelligence</li>
                      <li>Advanced schema markup and technical SEO</li>
                      <li>Cross-platform content coordination</li>
                      <li>Affiliate website generator</li>
                      <li>Advanced attribution modeling</li>
                      <li>Expert community and mentorship</li>
                      <li>Unlimited user accounts</li>
                      <li>Unlimited conversions tracked</li>
                      <li>Full white labeling</li>
                      <li>API access</li>
                      <li>Dedicated account manager</li>
                    </ul>
                  </div>
                  <div class="pricing-action">
                    <button class="btn ${highlightExpert ? 'btn-primary' : 'btn-outline-primary'} btn-lg w-100">Upgrade to Expert</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-link" data-bs-dismiss="modal">Continue with Free Tier</button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.appendChild(modal);
  
  // Initialize and show the modal
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  // Add event listeners to upgrade buttons
  const upgradeButtons = modal.querySelectorAll('.pricing-action button');
  upgradeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tier = this.textContent.includes('Basic') ? 'Basic' : this.textContent.includes('Medium') ? 'Medium' : 'Expert';
      alert(`This would redirect to the payment page for the ${tier} tier. This is a demo.`);
      bsModal.hide();
    });
  });
  
  // Remove modal from DOM when hidden
  modal.addEventListener('hidden.bs.modal', function () {
    document.body.removeChild(modal);
  });
}

// Add CSS for free tier styling
function addFreeTierStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Free Tier Badge */
    .tier-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      background-color: #f8f9fc;
      border-radius: 0.35rem;
      margin-left: 1rem;
    }
    
    .tier-badge.free .tier-name {
      color: #4e73df;
      font-weight: 700;
      font-size: 0.8rem;
    }
    
    .tier-badge.free .tier-limit {
      font-size: 0.7rem;
      color: #858796;
    }
    
    /* Upgrade Banner */
    .upgrade-banner {
      background: linear-gradient(90deg, #4e73df 0%, #224abe 100%);
      color: white;
      padding: 0.75rem 1rem;
      margin-bottom: 1.5rem;
      border-radius: 0.35rem;
    }
    
    .upgrade-banner .banner-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .upgrade-banner .banner-text h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
    }
    
    .upgrade-banner .banner-text p {
      margin: 0;
      font-size: 0.85rem;
      opacity: 0.9;
    }
    
    .upgrade-banner .close-banner-btn {
      color: white;
      opacity: 0.7;
      padding: 0.25rem;
    }
    
    .upgrade-banner .close-banner-btn:hover {
      opacity: 1;
    }
    
    /* Locked Content */
    .content-tool-card.locked {
      position: relative;
      opacity: 0.7;
      cursor: pointer;
    }
    
    .locked-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      border-radius: 0.35rem;
    }
    
    .locked-overlay i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .locked-overlay span {
      font-weight: 600;
    }
    
    /* Analytics Cards */
    .analytics-card {
      background-color: white;
      border-radius: 0.35rem;
      box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
      margin-bottom: 1.5rem;
      padding: 1.25rem;
    }
    
    .analytics-card h3 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #4e73df;
    }
    
    .analytics-chart-container {
      height: 15rem;
      position: relative;
    }
    
    .chart-footer {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: #858796;
      margin-top: 0.5rem;
    }
    
    .analytics-card.locked {
      position: relative;
      height: 17rem;
      cursor: pointer;
    }
    
    /* Tier Limitation Notice */
    .tier-limitation-notice {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border-radius: 0.35rem;
      box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
      padding: 2rem;
      margin-bottom: 1.5rem;
    }
    
    .limitation-icon {
      font-size: 3rem;
      color: #4e73df;
      margin-right: 2rem;
    }
    
    .limitation-message h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .limitation-message p {
      margin-bottom: 1rem;
      color: #5a5c69;
    }
    
    /* Conversion Limit Warning */
    .conversion-limit-warning {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      width: 25rem;
      background-color: white;
      border-radius: 0.35rem;
      box-shadow: 0 0.5rem 1.5rem 0 rgba(58, 59, 69, 0.3);
      z-index: 1050;
    }
    
    .warning-content {
      display: flex;
      padding: 1rem;
    }
    
    .warning-icon {
      font-size: 2rem;
      color: #f6c23e;
      margin-right: 1rem;
      display: flex;
      align-items: center;
    }
    
    .warning-message h4 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    
    .warning-message p {
      font-size: 0.85rem;
      margin-bottom: 0;
      color: #5a5c69;
    }
    
    .warning-actions {
      display: flex;
      flex-direction: column;
      margin-left: 1rem;
    }
    
    .warning-actions .btn {
      margin-bottom: 0.5rem;
    }
    
    /* Limit Reached Modal */
    .limit-reached-content {
      text-align: center;
    }
    
    .limit-icon {
      font-size: 3rem;
      color: #f6c23e;
      margin-bottom: 1rem;
    }
    
    .limit-options {
      margin-top: 1.5rem;
    }
    
    .option-card {
      border: 1px solid #e3e6f0;
      border-radius: 0.35rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .option-card h4 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #4e73df;
    }
    
    .option-price {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .option-price span {
      font-size: 1rem;
      font-weight: 400;
      color: #858796;
    }
    
    .option-features {
      list-style-type: none;
      padding-left: 0;
      margin-bottom: 1.5rem;
      text-align: left;
    }
    
    .option-features li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #e3e6f0;
    }
    
    .option-features li:last-child {
      border-bottom: none;
    }
    
    /* Upgrade Modal */
    .upgrade-reason {
      text-align: center;
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      color: #4e73df;
      font-weight: 600;
    }
    
    .pricing-card {
      border: 1px solid #e3e6f0;
      border-radius: 0.35rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .pricing-card.recommended {
      border: 2px solid #4e73df;
      box-shadow: 0 0.15rem 1.75rem 0 rgba(78, 115, 223, 0.15);
    }
    
    .recommended-badge {
      position: absolute;
      top: -0.75rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #4e73df;
      color: white;
      padding: 0.25rem 1rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 700;
    }
    
    .pricing-header {
      text-align: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e3e6f0;
    }
    
    .pricing-header h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .price {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    
    .price span {
      font-size: 1rem;
      font-weight: 400;
      color: #858796;
    }
    
    .price-annual {
      font-size: 1rem;
      color: #1cc88a;
      font-weight: 600;
    }
    
    .pricing-features {
      flex-grow: 1;
      margin-bottom: 1.5rem;
    }
    
    .pricing-features ul {
      list-style-type: none;
      padding-left: 0;
      margin-bottom: 0;
    }
    
    .pricing-features li {
      padding: 0.5rem 0;
      font-size: 0.9rem;
      position: relative;
      padding-left: 1.5rem;
    }
    
    .pricing-features li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #1cc88a;
      font-weight: 700;
    }
    
    .current-plan {
      background-color: #1cc88a;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 700;
      display: inline-block;
      margin-top: 0.5rem;
    }
    
    .pricing-action {
      margin-top: auto;
    }
  `;
  
  document.head.appendChild(styleElement);
}

// Initialize free tier styles
document.addEventListener('DOMContentLoaded', function() {
  addFreeTierStyles();
});
