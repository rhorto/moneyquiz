// Basic Tier Features Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Initialize basic tier specific features
  initializeBasicTierDashboard();
  initializeNicheAnalysisBasic();
  initializeAffiliatePlatformManager();
  initializeAffiliateFinderBasic();
  initializeContentStrategyBasic();
  initializeSeoToolsBasic();
  initializeContentCalendarBasic();
  initializeAnalyticsBasic();
  
  // Show upgrade prompts for medium/expert features
  setupUpgradePrompts();
});

// Initialize the main dashboard with enhanced metrics for basic tier
function initializeBasicTierDashboard() {
  // Load demo data for the basic tier
  fetch('/api/dashboard/basic')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update dashboard metrics with basic tier data
      updateDashboardMetrics(data.metrics);
      
      // Update recent activity with more entries than free tier
      updateRecentActivity(data.recentActivity);
      
      // Update goals progress with enhanced tracking
      updateGoalsProgress(data.goals);
      
      // Update affiliate programs section with more detailed metrics
      updateAffiliatePrograms(data.affiliatePrograms);
    })
    .catch(error => {
      console.error('Error loading basic tier data:', error);
      // Fallback to using demo data if API fails
      const demoData = window.dashboardDemoData ? window.dashboardDemoData.basic : null;
      
      if (demoData) {
        updateDashboardMetrics(demoData.metrics);
        updateRecentActivity(demoData.recentActivity);
        updateGoalsProgress(demoData.goals);
        updateAffiliatePrograms(demoData.affiliatePrograms);
      } else {
        console.error('Demo data not available');
      }
    });
}

// Update dashboard metrics with enhanced data for basic tier
function updateDashboardMetrics(metrics) {
  // Update main metrics
  document.getElementById('total-clicks')?.textContent = metrics.totalClicks.toLocaleString();
  document.getElementById('conversions')?.textContent = metrics.conversions.toLocaleString();
  document.getElementById('revenue')?.textContent = `$${metrics.revenue.toFixed(2)}`;
  document.getElementById('conversion-rate')?.textContent = `${metrics.conversionRate}%`;
  document.getElementById('epc')?.textContent = `$${metrics.epc.toFixed(2)}`;
  document.getElementById('pending-commissions')?.textContent = `$${metrics.pendingCommissions.toFixed(2)}`;
  
  // Add additional metrics for basic tier
  document.getElementById('avg-order-value')?.textContent = metrics.avgOrderValue ? `$${metrics.avgOrderValue.toFixed(2)}` : 'N/A';
  document.getElementById('top-referrer')?.textContent = metrics.topReferrer || 'N/A';
  document.getElementById('conversion-by-device')?.textContent = metrics.conversionByDevice ? `${metrics.conversionByDevice.desktop}% Desktop / ${metrics.conversionByDevice.mobile}% Mobile` : 'N/A';
}

// Update recent activity section with more entries for basic tier
function updateRecentActivity(activities) {
  const activityContainer = document.getElementById('recent-activity-container');
  if (!activityContainer) return;
  
  // Clear existing content
  activityContainer.innerHTML = '';
  
  // Add activity items (up to 10 for basic tier)
  const limitedActivities = activities.slice(0, 10);
  
  limitedActivities.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    // Determine icon based on activity type
    let iconClass = 'bi-info-circle';
    if (activity.type === 'Conversion') iconClass = 'bi-cash-coin';
    if (activity.type === 'Click') iconClass = 'bi-mouse';
    if (activity.type === 'Signup') iconClass = 'bi-person-plus';
    if (activity.type === 'Content') iconClass = 'bi-file-text';
    if (activity.type === 'Application') iconClass = 'bi-check-circle';
    
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
  
  // Add "View more" link (enabled in basic tier)
  const viewMoreLink = document.createElement('div');
  viewMoreLink.className = 'view-more-link';
  viewMoreLink.innerHTML = '<span>View all activities</span>';
  viewMoreLink.addEventListener('click', () => {
    // Show activity history modal or navigate to activity history page
    showActivityHistoryModal(activities);
  });
  activityContainer.appendChild(viewMoreLink);
}

// Show activity history modal
function showActivityHistoryModal(activities) {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'activityHistoryModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'activityHistoryModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  
  // Create modal content
  let activitiesHtml = '';
  activities.forEach(activity => {
    // Determine icon based on activity type
    let iconClass = 'bi-info-circle';
    if (activity.type === 'Conversion') iconClass = 'bi-cash-coin';
    if (activity.type === 'Click') iconClass = 'bi-mouse';
    if (activity.type === 'Signup') iconClass = 'bi-person-plus';
    if (activity.type === 'Content') iconClass = 'bi-file-text';
    if (activity.type === 'Application') iconClass = 'bi-check-circle';
    
    activitiesHtml += `
      <div class="activity-item">
        <div class="activity-icon">
          <i class="bi ${iconClass}"></i>
        </div>
        <div class="activity-details">
          <div class="activity-time">${activity.date} ${activity.time}</div>
          <div class="activity-description">
            <span class="activity-type">${activity.type}:</span> ${activity.details}
          </div>
        </div>
      </div>
    `;
  });
  
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="activityHistoryModalLabel">Activity History</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="activity-history-container">
            ${activitiesHtml}
          </div>
        </div>
        <div class="modal-footer">
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
  
  // Remove modal from DOM when hidden
  modal.addEventListener('hidden.bs.modal', function () {
    document.body.removeChild(modal);
  });
}

// Update affiliate programs section with more detailed metrics
function updateAffiliatePrograms(programs) {
  const programsContainer = document.getElementById('affiliate-programs-container');
  if (!programsContainer) return;
  
  // Clear existing content
  programsContainer.innerHTML = '';
  
  // Add program cards
  programs.forEach(program => {
    const programCard = document.createElement('div');
    programCard.className = 'affiliate-program-card';
    
    programCard.innerHTML = `
      <div class="program-header">
        <img src="${program.logo}" alt="${program.name} logo" class="program-logo">
        <span class="program-status ${program.status.toLowerCase()}">${program.status}</span>
      </div>
      <h3 class="program-name">${program.name}</h3>
      <div class="program-metrics">
        <div class="metric">
          <span class="metric-label">Earnings:</span>
          <span class="metric-value">$${program.earnings.toFixed(2)}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Clicks:</span>
          <span class="metric-value">${program.clicks}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Conversions:</span>
          <span class="metric-value">${program.conversions}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Conv. Rate:</span>
          <span class="metric-value">${program.conversionRate}%</span>
        </div>
        <div class="metric">
          <span class="metric-label">EPC:</span>
          <span class="metric-value">$${program.epc.toFixed(2)}</span>
        </div>
      </div>
      <div class="program-actions">
        <button class="btn btn-sm btn-outline-primary view-links-btn" data-program-id="${program.id}">View Links</button>
        <button class="btn btn-sm btn-outline-primary view-stats-btn" data-program-id="${program.id}">Detailed Stats</button>
      </div>
    `;
    
    programsContainer.appendChild(programCard);
  });
  
  // Add event listeners to buttons
  document.querySelectorAll('.view-links-btn').forEach(button => {
    button.addEventListener('click', function() {
      const programId = this.getAttribute('data-program-id');
      showProgramLinksModal(programId);
    });
  });
  
  document.querySelectorAll('.view-stats-btn').forEach(button => {
    button.addEventListener('click', function() {
      const programId = this.getAttribute('data-program-id');
      showProgramStatsModal(programId);
    });
  });
}

// Initialize basic niche analysis tools
function initializeNicheAnalysisBasic() {
  const nicheAnalysisSection = document.getElementById('niche-analysis-section');
  if (!nicheAnalysisSection) return;
  
  // Fetch niche research data
  fetch('/api/niches/basic')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      renderNicheAnalysisBasic(data);
    })
    .catch(error => {
      console.error('Error loading niche analysis data:', error);
      // Fallback to demo data
      const demoData = window.dashboardDemoData ? window.dashboardDemoData.basic.nicheResearch : null;
      
      if (demoData) {
        renderNicheAnalysisBasic(demoData);
      } else {
        nicheAnalysisSection.innerHTML = `
          <div class="section-header">
            <h2>Niche Analysis</h2>
            <p>Basic niche research tools</p>
          </div>
          <div class="error-message">
            <p>Unable to load niche analysis data. Please try again later.</p>
          </div>
        `;
      }
    });
}

// Render basic niche analysis tools
function renderNicheAnalysisBasic(data) {
  const nicheAnalysisSection = document.getElementById('niche-analysis-section');
  if (!nicheAnalysisSection) return;
  
  // Create niche analysis content
  let nichesHtml = '';
  data.niches.forEach(niche => {
    nichesHtml += `
      <div class="niche-card ${niche.isSelected ? 'selected' : ''}">
        <h3>${niche.name}</h3>
        <div class="niche-metrics">
          <div class="metric">
            <span class="metric-label">Demand:</span>
            <span class="metric-value ${getDemandClass(niche.demand)}">${niche.demand}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Competition:</span>
            <span class="metric-value ${getCompetitionClass(niche.competition)}">${niche.competition}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Profit Potential:</span>
            <span class="metric-value ${getProfitClass(niche.profitPotential)}">${niche.profitPotential}</span>
          </div>
        </div>
        <div class="niche-details">
          <div class="detail-item">
            <span class="detail-label">Monthly Search Volume:</span>
            <span class="detail-value">${niche.metrics.monthlySearchVolume.toLocaleString()}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Avg. Commission:</span>
            <span class="detail-value">${niche.metrics.averageCommission}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Avg. Order Value:</span>
            <span class="detail-value">${niche.metrics.averageOrderValue}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Conversion Rate:</span>
            <span class="detail-value">${niche.metrics.conversionRate}</span>
          </div>
        </div>
        <div class="niche-actions">
          <button class="btn btn-primary analyze-btn" data-niche-id="${niche.id}">Analyze Keywords</button>
        </div>
      </div>
    `;
  });
  
  // Create keywords table
  let keywordsHtml = '';
  data.topKeywords.forEach(keyword => {
    keywordsHtml += `
      <tr>
        <td>${keyword.keyword}</td>
        <td>${keyword.volume.toLocaleString()}</td>
        <td><span class="badge ${getCompetitionBadgeClass(keyword.competition)}">${keyword.competition}</span></td>
        <td>
          <div class="difficulty-meter">
            <div class="difficulty-bar" style="width: ${keyword.difficulty}%"></div>
            <span class="difficulty-value">${keyword.difficulty}</span>
          </div>
        </td>
        <td>
          <button class="btn btn-sm btn-outline-primary keyword-action-btn">
            <i class="bi bi-plus-circle"></i> Add
          </button>
        </td>
      </tr>
    `;
  });
  
  nicheAnalysisSection.innerHTML = `
    <div class="section-header">
      <h2>Niche Analysis</h2>
      <p>Basic niche research tools</p>
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Niche Opportunities</h6>
          </div>
          <div class="card-body">
            <div class="niches-container">
              ${nichesHtml}
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Top Keywords</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Volume</th>
                    <th>Competition</th>
                    <th>Difficulty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${keywordsHtml}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="upgrade-message">
      <div class="message-content">
        <h3>Want advanced niche analysis tools?</h3>
        <p>Upgrade to Medium tier to unlock the High Demand Low Competition Scanner, Market Gap Identifier, and more advanced niche research tools.</p>
        <button class="btn btn-primary upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  document.querySelectorAll('.analyze-btn').forEach(button => {
    button.addEventListener('click', function() {
      const nicheId = this.getAttribute('data-niche-id');
      // Show keyword analysis for the selected niche
      alert(`This would show detailed keyword analysis for the selected niche. This is a demo.`);
    });
  });
  
  document.querySelectorAll('.keyword-action-btn').forEach(button => {
    button.addEventListener('click', function() {
      const keyword = this.closest('tr').querySelector('td:first-child').textContent;
      // Add keyword 
(Content truncated due to size limit. Use line ranges to read in chunks)