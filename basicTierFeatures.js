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
      // Add keyword to content planner
      alert(`Keyword "${keyword}" would be added to your content planner. This is a demo.`);
    });
  });
  
  const upgradeButton = nicheAnalysisSection.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      alert('This would redirect to the upgrade page. This is a demo.');
    });
  }
}

// Initialize affiliate platform manager for basic tier
function initializeAffiliatePlatformManager() {
  const affiliatePlatformSection = document.getElementById('affiliate-platform-section');
  if (!affiliatePlatformSection) return;
  
  // Create basic affiliate platform manager
  affiliatePlatformSection.innerHTML = `
    <div class="section-header">
      <h2>Affiliate Platform Manager</h2>
      <p>Track your affiliate program applications and manage your accounts</p>
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Application Tracker</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Applied</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CJ Affiliate</td>
                    <td>Mar 28, 2025</td>
                    <td><span class="badge bg-success">Approved</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary">Manage</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Impact Radius</td>
                    <td>Apr 2, 2025</td>
                    <td><span class="badge bg-warning">Pending</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary">Check</button>
                    </td>
                  </tr>
                  <tr>
                    <td>ClickBank</td>
                    <td>Apr 5, 2025</td>
                    <td><span class="badge bg-warning">Pending</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary">Check</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Program Directory</h6>
          </div>
          <div class="card-body">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Search programs...">
              <button class="btn btn-outline-primary" type="button">Search</button>
            </div>
            <div class="program-directory">
              <div class="program-item">
                <div class="program-info">
                  <h5>Awin</h5>
                  <p>Global affiliate network with thousands of advertisers</p>
                </div>
                <button class="btn btn-sm btn-primary">Apply</button>
              </div>
              <div class="program-item">
                <div class="program-info">
                  <h5>Rakuten Advertising</h5>
                  <p>Leading affiliate marketing network with premium brands</p>
                </div>
                <button class="btn btn-sm btn-primary">Apply</button>
              </div>
              <div class="program-item">
                <div class="program-info">
                  <h5>Partnerize</h5>
                  <p>Partnership management platform for direct brand relationships</p>
                </div>
                <button class="btn btn-sm btn-primary">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners
  const searchButton = affiliatePlatformSection.querySelector('.input-group button');
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      const searchInput = affiliatePlatformSection.querySelector('.input-group input');
      alert(`This would search for "${searchInput.value}" in the program directory. This is a demo.`);
    });
  }
  
  const applyButtons = affiliatePlatformSection.querySelectorAll('.program-item button');
  applyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const programName = this.closest('.program-item').querySelector('h5').textContent;
      alert(`This would start the application process for ${programName}. This is a demo.`);
    });
  });
  
  const manageButtons = affiliatePlatformSection.querySelectorAll('tbody button');
  manageButtons.forEach(button => {
    button.addEventListener('click', function() {
      const programName = this.closest('tr').querySelector('td:first-child').textContent;
      alert(`This would open the management interface for ${programName}. This is a demo.`);
    });
  });
}

// Initialize enhanced affiliate finder for basic tier
function initializeAffiliateFinderBasic() {
  const affiliateFinderSection = document.getElementById('affiliate-finder-section');
  if (!affiliateFinderSection) return;
  
  // Create enhanced affiliate finder
  affiliateFinderSection.innerHTML = `
    <div class="section-header">
      <h2>Affiliate Finder</h2>
      <p>Discover and evaluate affiliate programs for your niche</p>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="search-filters">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="category-filter">Category</label>
                    <select class="form-select" id="category-filter">
                      <option value="">All Categories</option>
                      <option value="fitness">Fitness & Health</option>
                      <option value="tech">Technology</option>
                      <option value="home">Home & Garden</option>
                      <option value="fashion">Fashion & Apparel</option>
                      <option value="finance">Finance</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="commission-filter">Min. Commission</label>
                    <select class="form-select" id="commission-filter">
                      <option value="">Any</option>
                      <option value="5">5%+</option>
                      <option value="10">10%+</option>
                      <option value="15">15%+</option>
                      <option value="20">20%+</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="cookie-filter">Min. Cookie Duration</label>
                    <select class="form-select" id="cookie-filter">
                      <option value="">Any</option>
                      <option value="7">7+ days</option>
                      <option value="14">14+ days</option>
                      <option value="30">30+ days</option>
                      <option value="60">60+ days</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="network-filter">Network</label>
                    <select class="form-select" id="network-filter">
                      <option value="">All Networks</option>
                      <option value="amazon">Amazon Associates</option>
                      <option value="cj">CJ Affiliate</option>
                      <option value="shareasale">ShareASale</option>
                      <option value="awin">Awin</option>
                      <option value="impact">Impact</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-9">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search by keyword or program name">
                  </div>
                </div>
                <div class="col-md-3">
                  <button class="btn btn-primary w-100">Search Programs</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h6>Affiliate Programs (50 results)</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Category</th>
                    <th>Commission</th>
                    <th>Cookie</th>
                    <th>Network</th>
                    <th>EPC</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rogue Fitness</td>
                    <td>Fitness & Health</td>
                    <td>12%</td>
                    <td>30 days</td>
                    <td>ShareASale</td>
                    <td>$1.25</td>
                    <td>
                      <button class="btn btn-sm btn-primary">Apply</button>
                    </td>
                  </tr>
                  <tr>
                    <td>NordicTrack</td>
                    <td>Fitness & Health</td>
                    <td>8%</td>
                    <td>45 days</td>
                    <td>CJ Affiliate</td>
                    <td>$1.50</td>
                    <td>
                      <button class="btn btn-sm btn-primary">Apply</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Bowflex</td>
                    <td>Fitness & Health</td>
                    <td>5%</td>
                    <td>24 hours</td>
                    <td>Amazon Associates</td>
                    <td>$1.10</td>
                    <td>
                      <button class="btn btn-sm btn-primary">Apply</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Under Armour</td>
                    <td>Fashion & Apparel</td>
                    <td>10%</td>
                    <td>30 days</td>
                    <td>ShareASale</td>
                    <td>$0.95</td>
                    <td>
                      <button class="btn btn-sm btn-primary">Apply</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Bluehost</td>
                    <td>Technology</td>
                    <td>$65 flat</td>
                    <td>90 days</td>
                    <td>Direct</td>
                    <td>$2.50</td>
                    <td>
                      <button class="btn btn-sm btn-primary">Apply</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav aria-label="Affiliate programs pagination">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    
    <div class="upgrade-message mt-4">
      <div class="message-content">
        <h3>Want personalized program recommendations?</h3>
        <p>Upgrade to Medium tier to unlock AI-powered program recommendations based on your audience and performance history.</p>
        <button class="btn btn-primary upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  const searchButton = affiliateFinderSection.querySelector('.search-filters button');
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      alert('This would search for affiliate programs with the specified filters. This is a demo.');
    });
  }
  
  const applyButtons = affiliateFinderSection.querySelectorAll('tbody button');
  applyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const programName = this.closest('tr').querySelector('td:first-child').textContent;
      alert(`This would start the application process for ${programName}. This is a demo.`);
    });
  });
  
  const paginationLinks = affiliateFinderSection.querySelectorAll('.pagination .page-link');
  paginationLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (!this.parentElement.classList.contains('disabled') && !this.parentElement.classList.contains('active')) {
        alert('This would navigate to the next page of results. This is a demo.');
      }
    });
  });
  
  const upgradeButton = affiliateFinderSection.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      alert('This would redirect to the upgrade page. This is a demo.');
    });
  }
}

// Initialize content strategy tools for basic tier
function initializeContentStrategyBasic() {
  const contentStrategySection = document.getElementById('content-strategy-section');
  if (!contentStrategySection) return;
  
  // Create basic content strategy tools
  contentStrategySection.innerHTML = `
    <div class="section-header">
      <h2>Content Strategy</h2>
      <p>Plan and create high-converting affiliate content</p>
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Content Templates</h6>
          </div>
          <div class="card-body">
            <div class="content-templates">
              <div class="template-card">
                <h4>Product Review</h4>
                <p>Comprehensive review template with pros, cons, and comparison sections</p>
                <button class="btn btn-primary template-btn" data-template="review">Use Template</button>
              </div>
              <div class="template-card">
                <h4>Comparison Post</h4>
                <p>Side-by-side comparison template for evaluating multiple products</p>
                <button class="btn btn-primary template-btn" data-template="comparison">Use Template</button>
              </div>
              <div class="template-card">
                <h4>Buying Guide</h4>
                <p>Detailed buying guide template with feature explanations and recommendations</p>
                <button class="btn btn-primary template-btn" data-template="guide">Use Template</button>
              </div>
              <div class="template-card">
                <h4>How-To Tutorial</h4>
                <p>Step-by-step tutorial template with product recommendations</p>
                <button class="btn btn-primary template-btn" data-template="tutorial">Use Template</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Content Types Effectiveness</h6>
          </div>
          <div class="card-body">
            <div class="content-types">
              <div class="content-type-item">
                <div class="content-type-info">
                  <h5>Product Reviews</h5>
                  <div class="effectiveness-meter">
                    <div class="effectiveness-label">Effectiveness:</div>
                    <div class="effectiveness-bar high">
                      <span>High</span>
                    </div>
                  </div>
                </div>
                <p>In-depth reviews of fitness equipment with pros, cons, and personal experiences</p>
              </div>
              <div class="content-type-item">
                <div class="content-type-info">
                  <h5>Comparison Articles</h5>
                  <div class="effectiveness-meter">
                    <div class="effectiveness-label">Effectiveness:</div>
                    <div class="effectiveness-bar high">
                      <span>High</span>
                    </div>
                  </div>
                </div>
                <p>Side-by-side comparisons of similar fitness products</p>
              </div>
              <div class="content-type-item">
                <div class="content-type-info">
                  <h5>Buying Guides</h5>
                  <div class="effectiveness-meter">
                    <div class="effectiveness-label">Effectiveness:</div>
                    <div class="effectiveness-bar medium">
                      <span>Medium</span>
                    </div>
                  </div>
                </div>
                <p>Comprehensive guides to help readers choose the right equipment</p>
              </div>
              <div class="content-type-item">
                <div class="content-type-info">
                  <h5>How-To Tutorials</h5>
                  <div class="effectiveness-meter">
                    <div class="effectiveness-label">Effectiveness:</div>
                    <div class="effectiveness-bar medium">
                      <span>Medium</span>
                    </div>
                  </div>
                </div>
                <p>Instructional content showing how to use fitness equipment effectively</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="upgrade-message">
      <div class="message-content">
        <h3>Want advanced content optimization tools?</h3>
        <p>Upgrade to Medium tier to unlock conversion optimization tools, A/B testing, and advanced content distribution strategies.</p>
        <button class="btn btn-primary upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  const templateButtons = contentStrategySection.querySelectorAll('.template-btn');
  templateButtons.forEach(button => {
    button.addEventListener('click', function() {
      const templateType = this.getAttribute('data-template');
      showTemplateModal(templateType);
    });
  });
  
  const upgradeButton = contentStrategySection.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      alert('This would redirect to the upgrade page. This is a demo.');
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
  switch (templateType) {
    case 'review':
      templateTitle = 'Product Review Template';
      templateContent = `
        <h2>[Product Name] Review: Is It Worth It? (2025)</h2>
        
        <p><strong>Introduction</strong> - Brief overview of the product and why it matters to your audience.</p>
        
        <p><strong>Quick Verdict</strong> - Summary of your review for those who don't want to read the entire article.</p>
        
        <p><strong>Key Features</strong> - List and explain the main features of the product.</p>
        
        <p><strong>Pros and Cons</strong> - Balanced assessment of advantages and disadvantages.</p>
        
        <p><strong>Who Is This For?</strong> - Describe the ideal customer for this product.</p>
        
        <p><strong>Performance</strong> - Detailed analysis of how the product performs in real-world use.</p>
        
        <p><strong>Alternatives</strong> - Mention 2-3 alternative products for comparison.</p>
        
        <p><strong>Value for Money</strong> - Assessment of whether the product is worth its price.</p>
        
        <p><strong>Conclusion</strong> - Final thoughts and recommendation.</p>
        
        <p><strong>Call to Action</strong> - Clear direction on what the reader should do next.</p>
      `;
      break;
    case 'comparison':
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
      break;
    case 'guide':
      templateTitle = 'Buying Guide Template';
      templateContent = `
        <h2>The Ultimate Guide to Buying [Product Category]</h2>
        
        <p><strong>Introduction</strong> - Overview of the product category and why this guide is helpful.</p>
        
        <p><strong>Why You Should Trust Us</strong> - Establish your credibility and research process.</p>
        
        <p><strong>Who Should Buy [Product Category]</strong> - Define the target audience for these products.</p>
        
        <p><strong>Key Features to Consider</strong> - Detailed explanation of important features and specifications.</p>
        
        <p><strong>Price Range Expectations</strong> - What to expect at different price points.</p>
        
        <p><strong>Top Recommendations</strong> - Your top picks with explanations.</p>
        
        <p><strong>Best Budget Option</strong> - Best choice for cost-conscious buyers.</p>
        
        <p><strong>Best Premium Option</strong> - Best choice for those willing to spend more.</p>
        
        <p><strong>Best Value for Money</strong> - Best balance of features and price.</p>
        
        <p><strong>Maintenance and Care</strong> - How to maintain the product for longevity.</p>
        
        <p><strong>FAQ Section</strong> - Common questions about the product category.</p>
        
        <p><strong>Conclusion</strong> - Final thoughts and recommendations.</p>
      `;
      break;
    case 'tutorial':
      templateTitle = 'How-To Tutorial Template';
      templateContent = `
        <h2>How to [Accomplish Task] with [Product]: Step-by-Step Guide</h2>
        
        <p><strong>Introduction</strong> - Overview of what the reader will learn and why it's valuable.</p>
        
        <p><strong>What You'll Need</strong> - List of required products and tools (with affiliate links).</p>
        
        <p><strong>Preparation Steps</strong> - What to do before starting the main process.</p>
        
        <p><strong>Step 1: [First Step]</strong> - Detailed explanation with images.</p>
        
        <p><strong>Step 2: [Second Step]</strong> - Detailed explanation with images.</p>
        
        <p><strong>Step 3: [Third Step]</strong> - Detailed explanation with images.</p>
        
        <p><strong>Step 4: [Fourth Step]</strong> - Detailed explanation with images.</p>
        
        <p><strong>Step 5: [Fifth Step]</strong> - Detailed explanation with images.</p>
        
        <p><strong>Troubleshooting</strong> - Common issues and how to solve them.</p>
        
        <p><strong>Product Recommendations</strong> - Specific products that work well for this task.</p>
        
        <p><strong>Conclusion</strong> - Summary and encouragement.</p>
      `;
      break;
    default:
      templateTitle = 'Content Template';
      templateContent = 'Template content not available.';
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
  
  // Add event listener to copy button
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

// Initialize basic SEO tools
function initializeSeoToolsBasic() {
  const seoSection = document.getElementById('seo-optimization-section');
  if (!seoSection) return;
  
  // Create basic SEO tools
  seoSection.innerHTML = `
    <div class="section-header">
      <h2>SEO Optimization</h2>
      <p>Basic keyword research and on-page SEO tools</p>
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Keyword Opportunities</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Volume</th>
                    <th>Competition</th>
                    <th>Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>adjustable dumbbells set</td>
                    <td>12,000</td>
                    <td><span class="badge bg-success">Low</span></td>
                    <td><span class="badge bg-success">High</span></td>
                  </tr>
                  <tr>
                    <td>foldable treadmill for small apartment</td>
                    <td>5,400</td>
                    <td><span class="badge bg-success">Low</span></td>
                    <td><span class="badge bg-success">High</span></td>
                  </tr>
                  <tr>
                    <td>affordable exercise bike with screen</td>
                    <td>7,200</td>
                    <td><span class="badge bg-warning">Medium</span></td>
                    <td><span class="badge bg-warning">Medium</span></td>
                  </tr>
                  <tr>
                    <td>best home gym under $500</td>
                    <td>8,500</td>
                    <td><span class="badge bg-warning">Medium</span></td>
                    <td><span class="badge bg-warning">Medium</span></td>
                  </tr>
                  <tr>
                    <td>resistance bands workout set</td>
                    <td>9,800</td>
                    <td><span class="badge bg-success">Low</span></td>
                    <td><span class="badge bg-success">High</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>On-Page SEO Checklist</h6>
          </div>
          <div class="card-body">
            <div class="seo-checklist">
              <div class="checklist-item">
                <input type="checkbox" id="seo-check-1">
                <label for="seo-check-1">Include target keywords in title, headings, and first paragraph</label>
              </div>
              <div class="checklist-item">
                <input type="checkbox" id="seo-check-2">
                <label for="seo-check-2">Add product comparison tables with key specifications</label>
              </div>
              <div class="checklist-item">
                <input type="checkbox" id="seo-check-3">
                <label for="seo-check-3">Include high-quality images with descriptive alt text</label>
              </div>
              <div class="checklist-item">
                <input type="checkbox" id="seo-check-4">
                <label for="seo-check-4">Write detailed pros and cons sections for each product</label>
              </div>
              <div class="checklist-item">
                <input type="checkbox" id="seo-check-5">
                <label for="seo-check-5">Add user testimonials or personal experience with products</label>
              </div>
              <div class="checklist-item">
                <input type="checkbox" id="seo-check-6">
                <label for="seo-check-6">Include clear call-to-action buttons near product mentions</label>
              </div>
              <div class="checklist-item">
                <input type="checkbox" id="seo-check-7">
                <label for="seo-check-7">Optimize meta description with primary keyword and value proposition</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Content Optimizer</h6>
          </div>
          <div class="card-body">
            <div class="content-optimizer">
              <div class="form-group mb-3">
                <label for="target-keyword">Target Keyword</label>
                <input type="text" class="form-control" id="target-keyword" placeholder="Enter your main keyword">
              </div>
              <div class="form-group mb-3">
                <label for="content-text">Content</label>
                <textarea class="form-control" id="content-text" rows="6" placeholder="Paste your content here for SEO analysis"></textarea>
              </div>
              <button class="btn btn-primary analyze-content-btn">Analyze Content</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="upgrade-message">
      <div class="message-content">
        <h3>Want advanced SEO tools?</h3>
        <p>Upgrade to Medium tier to unlock complete on-page and off-page SEO tools, schema markup generator, and more.</p>
        <button class="btn btn-primary upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  const analyzeButton = seoSection.querySelector('.analyze-content-btn');
  if (analyzeButton) {
    analyzeButton.addEventListener('click', function() {
      const keyword = document.getElementById('target-keyword').value;
      const content = document.getElementById('content-text').value;
      
      if (!keyword || !content) {
        alert('Please enter both a target keyword and content to analyze.');
        return;
      }
      
      alert(`This would analyze your content for SEO optimization based on the keyword "${keyword}". This is a demo.`);
    });
  }
  
  const upgradeButton = seoSection.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      alert('This would redirect to the upgrade page. This is a demo.');
    });
  }
}

// Initialize basic content calendar
function initializeContentCalendarBasic() {
  const contentCalendarSection = document.getElementById('content-calendar-section');
  if (!contentCalendarSection) return;
  
  // Create basic content calendar
  contentCalendarSection.innerHTML = `
    <div class="section-header">
      <h2>Content Calendar</h2>
      <p>Plan and schedule your affiliate content</p>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6>April 2025</h6>
            <div class="calendar-controls">
              <button class="btn btn-sm btn-outline-primary me-2">Previous</button>
              <button class="btn btn-sm btn-outline-primary">Next</button>
            </div>
          </div>
          <div class="card-body">
            <div class="content-calendar">
              <table class="table table-bordered calendar-table">
                <thead>
                  <tr>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="calendar-day empty"></td>
                    <td class="calendar-day empty"></td>
                    <td class="calendar-day">
                      <div class="day-number">1</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">2</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">3</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">4</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">5</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="calendar-day">
                      <div class="day-number">6</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">7</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">8</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">9</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">10</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">11</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">12</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="calendar-day">
                      <div class="day-number">13</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">14</div>
                    </td>
                    <td class="calendar-day has-content">
                      <div class="day-number">15</div>
                      <div class="content-item blog-post">
                        <span class="content-title">Top 10 Home Fitness Equipment Review</span>
                      </div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">16</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">17</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">18</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">19</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="calendar-day has-content">
                      <div class="day-number">20</div>
                      <div class="content-item blog-post">
                        <span class="content-title">Beginner's Guide to Home Workouts</span>
                      </div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">21</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">22</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">23</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">24</div>
                    </td>
                    <td class="calendar-day has-content">
                      <div class="day-number">25</div>
                      <div class="content-item blog-post">
                        <span class="content-title">Best Budget Fitness Equipment Comparison</span>
                      </div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">26</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="calendar-day">
                      <div class="day-number">27</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">28</div>
                    </td>
                    <td class="calendar-day">
                      <div class="day-number">29</div>
                    </td>
                    <td class="calendar-day has-content">
                      <div class="day-number">30</div>
                      <div class="content-item blog-post">
                        <span class="content-title">How to Choose the Right Treadmill</span>
                      </div>
                    </td>
                    <td class="calendar-day empty"></td>
                    <td class="calendar-day empty"></td>
                    <td class="calendar-day empty"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6>Upcoming Content</h6>
            <button class="btn btn-sm btn-primary add-content-btn">Add Content</button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Top 10 Home Fitness Equipment Review</td>
                    <td>Apr 15, 2025</td>
                    <td>Blog Post</td>
                    <td><span class="badge bg-warning">Planned</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                      <button class="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Beginner's Guide to Home Workouts</td>
                    <td>Apr 20, 2025</td>
                    <td>Blog Post</td>
                    <td><span class="badge bg-warning">Planned</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                      <button class="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Best Budget Fitness Equipment Comparison</td>
                    <td>Apr 25, 2025</td>
                    <td>Blog Post</td>
                    <td><span class="badge bg-warning">Planned</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                      <button class="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>How to Choose the Right Treadmill</td>
                    <td>Apr 30, 2025</td>
                    <td>Blog Post</td>
                    <td><span class="badge bg-warning">Planned</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                      <button class="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="upgrade-message">
      <div class="message-content">
        <h3>Want advanced content calendar features?</h3>
        <p>Upgrade to Medium tier to unlock social media calendar analysis, content gap analysis, and team collaboration features.</p>
        <button class="btn btn-primary upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  const calendarControls = contentCalendarSection.querySelectorAll('.calendar-controls button');
  calendarControls.forEach(button => {
    button.addEventListener('click', function() {
      alert('This would navigate to the previous/next month in the calendar. This is a demo.');
    });
  });
  
  const addContentButton = contentCalendarSection.querySelector('.add-content-btn');
  if (addContentButton) {
    addContentButton.addEventListener('click', function() {
      showAddContentModal();
    });
  }
  
  const editButtons = contentCalendarSection.querySelectorAll('tbody .btn-outline-primary');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const title = this.closest('tr').querySelector('td:first-child').textContent;
      alert(`This would open the edit form for "${title}". This is a demo.`);
    });
  });
  
  const deleteButtons = contentCalendarSection.querySelectorAll('tbody .btn-outline-danger');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const title = this.closest('tr').querySelector('td:first-child').textContent;
      alert(`This would delete "${title}" from your content calendar. This is a demo.`);
    });
  });
  
  const upgradeButton = contentCalendarSection.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      alert('This would redirect to the upgrade page. This is a demo.');
    });
  }
  
  // Make calendar days clickable
  const calendarDays = contentCalendarSection.querySelectorAll('.calendar-day:not(.empty)');
  calendarDays.forEach(day => {
    day.addEventListener('click', function() {
      const dayNumber = this.querySelector('.day-number').textContent;
      if (this.classList.contains('has-content')) {
        const contentTitle = this.querySelector('.content-title').textContent;
        alert(`Content scheduled for April ${dayNumber}, 2025: "${contentTitle}"`);
      } else {
        alert(`This would allow you to add content for April ${dayNumber}, 2025. This is a demo.`);
      }
    });
  });
}

// Show add content modal
function showAddContentModal() {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'addContentModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'addContentModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  
  // Create modal content
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addContentModalLabel">Add New Content</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="add-content-form">
            <div class="mb-3">
              <label for="content-title" class="form-label">Title</label>
              <input type="text" class="form-control" id="content-title" required>
            </div>
            <div class="mb-3">
              <label for="content-type" class="form-label">Content Type</label>
              <select class="form-select" id="content-type" required>
                <option value="">Select content type</option>
                <option value="Blog Post">Blog Post</option>
                <option value="Product Review">Product Review</option>
                <option value="Comparison Article">Comparison Article</option>
                <option value="Buying Guide">Buying Guide</option>
                <option value="Tutorial">Tutorial</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="due-date" class="form-label">Due Date</label>
              <input type="date" class="form-control" id="due-date" required>
            </div>
            <div class="mb-3">
              <label for="content-keywords" class="form-label">Keywords (comma separated)</label>
              <input type="text" class="form-control" id="content-keywords">
            </div>
            <div class="mb-3">
              <label for="content-notes" class="form-label">Notes</label>
              <textarea class="form-control" id="content-notes" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="save-content-btn">Save Content</button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.appendChild(modal);
  
  // Initialize and show the modal
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  // Add event listener to save button
  const saveButton = modal.querySelector('#save-content-btn');
  if (saveButton) {
    saveButton.addEventListener('click', function() {
      const title = document.getElementById('content-title').value;
      const contentType = document.getElementById('content-type').value;
      const dueDate = document.getElementById('due-date').value;
      
      if (!title || !contentType || !dueDate) {
        alert('Please fill in all required fields.');
        return;
      }
      
      alert(`This would save the new content "${title}" to your calendar. This is a demo.`);
      bsModal.hide();
    });
  }
  
  // Remove modal from DOM when hidden
  modal.addEventListener('hidden.bs.modal', function () {
    document.body.removeChild(modal);
  });
}

// Initialize basic analytics
function initializeAnalyticsBasic() {
  const analyticsSection = document.getElementById('analytics-section');
  if (!analyticsSection) return;
  
  // Create basic analytics dashboard
  analyticsSection.innerHTML = `
    <div class="section-header">
      <h2>Analytics</h2>
      <p>Track and analyze your affiliate performance</p>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6>Performance Overview</h6>
            <div class="date-range-selector">
              <select class="form-select form-select-sm">
                <option value="7">Last 7 days</option>
                <option value="30" selected>Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last 365 days</option>
                <option value="custom">Custom range</option>
              </select>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-container">
              <canvas id="performance-chart" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Traffic Sources</h6>
          </div>
          <div class="card-body">
            <div class="chart-container">
              <canvas id="traffic-sources-chart" height="250"></canvas>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Conversion by Device</h6>
          </div>
          <div class="card-body">
            <div class="chart-container">
              <canvas id="device-chart" height="250"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">
            <h6>Top Performing Content</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Content Title</th>
                    <th>Page Views</th>
                    <th>Clicks</th>
                    <th>Conversions</th>
                    <th>Revenue</th>
                    <th>CTR</th>
                    <th>Conv. Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Top 10 Home Treadmills for 2025</td>
                    <td>2,547</td>
                    <td>312</td>
                    <td>18</td>
                    <td>$234.56</td>
                    <td>12.25%</td>
                    <td>5.77%</td>
                  </tr>
                  <tr>
                    <td>Best Adjustable Dumbbells: Complete Guide</td>
                    <td>1,982</td>
                    <td>245</td>
                    <td>12</td>
                    <td>$187.32</td>
                    <td>12.36%</td>
                    <td>4.90%</td>
                  </tr>
                  <tr>
                    <td>Affordable Home Gym Equipment Under $500</td>
                    <td>1,756</td>
                    <td>198</td>
                    <td>9</td>
                    <td>$112.45</td>
                    <td>11.28%</td>
                    <td>4.55%</td>
                  </tr>
                  <tr>
                    <td>Bowflex vs NordicTrack: Which is Better?</td>
                    <td>1,432</td>
                    <td>187</td>
                    <td>7</td>
                    <td>$98.76</td>
                    <td>13.06%</td>
                    <td>3.74%</td>
                  </tr>
                  <tr>
                    <td>5 Best Exercise Bikes for Small Spaces</td>
                    <td>1,245</td>
                    <td>156</td>
                    <td>6</td>
                    <td>$87.23</td>
                    <td>12.53%</td>
                    <td>3.85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="upgrade-message">
      <div class="message-content">
        <h3>Want advanced analytics?</h3>
        <p>Upgrade to Medium tier to unlock profitability analysis, ROI calculator, and advanced reporting capabilities.</p>
        <button class="btn btn-primary upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  `;
  
  // Initialize charts (using Chart.js)
  setTimeout(() => {
    initializePerformanceChart();
    initializeTrafficSourcesChart();
    initializeDeviceChart();
  }, 500);
  
  // Add event listeners
  const dateRangeSelector = analyticsSection.querySelector('.date-range-selector select');
  if (dateRangeSelector) {
    dateRangeSelector.addEventListener('change', function() {
      const range = this.value;
      if (range === 'custom') {
        alert('This would open a date range picker. This is a demo.');
      } else {
        alert(`This would update the charts to show data for the last ${range} days. This is a demo.`);
      }
    });
  }
  
  const upgradeButton = analyticsSection.querySelector('.upgrade-btn');
  if (upgradeButton) {
    upgradeButton.addEventListener('click', function() {
      alert('This would redirect to the upgrade page. This is a demo.');
    });
  }
}

// Initialize performance chart
function initializePerformanceChart() {
  const ctx = document.getElementById('performance-chart');
  if (!ctx) return;
  
  // Sample data for the last 30 days
  const labels = Array.from({length: 30}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });
  
  // Generate some random but realistic data
  const clicksData = Array.from({length: 30}, () => Math.floor(Math.random() * 50) + 20);
  const conversionsData = clicksData.map(clicks => Math.floor(clicks * (Math.random() * 0.05 + 0.02)));
  const revenueData = conversionsData.map(conversions => +(conversions * (Math.random() * 10 + 10)).toFixed(2));
  
  // Create chart
  if (window.performanceChart) {
    window.performanceChart.destroy();
  }
  
  window.performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Clicks',
          data: clicksData,
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          tension: 0.3,
          fill: false,
          yAxisID: 'y'
        },
        {
          label: 'Conversions',
          data: conversionsData,
          borderColor: '#1cc88a',
          backgroundColor: 'rgba(28, 200, 138, 0.05)',
          tension: 0.3,
          fill: false,
          yAxisID: 'y'
        },
        {
          label: 'Revenue ($)',
          data: revenueData,
          borderColor: '#f6c23e',
          backgroundColor: 'rgba(246, 194, 62, 0.05)',
          tension: 0.3,
          fill: false,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Clicks / Conversions'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
          title: {
            display: true,
            text: 'Revenue ($)'
          }
        }
      }
    }
  });
}

// Initialize traffic sources chart
function initializeTrafficSourcesChart() {
  const ctx = document.getElementById('traffic-sources-chart');
  if (!ctx) return;
  
  // Create chart
  if (window.trafficSourcesChart) {
    window.trafficSourcesChart.destroy();
  }
  
  window.trafficSourcesChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Organic Search', 'Direct', 'Social Media', 'Referral', 'Email'],
      datasets: [{
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          '#4e73df',
          '#1cc88a',
          '#36b9cc',
          '#f6c23e',
          '#e74a3b'
        ],
        hoverBackgroundColor: [
          '#2e59d9',
          '#17a673',
          '#2c9faf',
          '#dda20a',
          '#be2617'
        ],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      },
      cutout: '70%'
    }
  });
}

// Initialize device chart
function initializeDeviceChart() {
  const ctx = document.getElementById('device-chart');
  if (!ctx) return;
  
  // Create chart
  if (window.deviceChart) {
    window.deviceChart.destroy();
  }
  
  window.deviceChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [{
        data: [55, 40, 5],
        backgroundColor: [
          '#4e73df',
          '#1cc88a',
          '#36b9cc'
        ],
        hoverBackgroundColor: [
          '#2e59d9',
          '#17a673',
          '#2c9faf'
        ],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  });
}

// Setup upgrade prompts
function setupUpgradePrompts() {
  // Add event listeners to all upgrade buttons
  document.querySelectorAll('.upgrade-btn').forEach(button => {
    button.addEventListener('click', function() {
      showUpgradeModal();
    });
  });
}

// Show upgrade modal
function showUpgradeModal() {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'upgradeModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'upgradeModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  
  // Create modal content
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="upgradeModalLabel">Upgrade Your Plan</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="pricing-plans">
            <div class="row">
              <div class="col-md-4">
                <div class="pricing-card">
                  <div class="pricing-header">
                    <h3>Basic</h3>
                    <div class="price">$49<span>/month</span></div>
                    <div class="price-annual">$39<span>/month billed annually</span></div>
                    <div class="current-plan">Your Current Plan</div>
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
                </div>
              </div>
              <div class="col-md-4">
                <div class="pricing-card recommended">
                  <div class="pricing-header">
                    <div class="recommended-badge">Recommended</div>
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
                    <button class="btn btn-primary btn-lg w-100">Upgrade to Medium</button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="pricing-card">
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
                    <button class="btn btn-outline-primary btn-lg w-100">Upgrade to Expert</button>
                  </div>
                </div>
              </div>
            </div>
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
  
  // Add event listeners to upgrade buttons
  const upgradeButtons = modal.querySelectorAll('.pricing-action button');
  upgradeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tier = this.textContent.includes('Medium') ? 'Medium' : 'Expert';
      alert(`This would redirect to the payment page for the ${tier} tier. This is a demo.`);
      bsModal.hide();
    });
  });
  
  // Remove modal from DOM when hidden
  modal.addEventListener('hidden.bs.modal', function () {
    document.body.removeChild(modal);
  });
}

// Helper functions for styling
function getDemandClass(demand) {
  if (demand === 'High') return 'high';
  if (demand === 'Medium') return 'medium';
  if (demand === 'Low') return 'low';
  return '';
}

function getCompetitionClass(competition) {
  if (competition === 'High') return 'high-negative';
  if (competition === 'Medium') return 'medium-negative';
  if (competition === 'Low') return 'low-negative';
  return '';
}

function getProfitClass(profit) {
  if (profit === 'High') return 'high';
  if (profit === 'Medium') return 'medium';
  if (profit === 'Low') return 'low';
  return '';
}

function getCompetitionBadgeClass(competition) {
  if (competition === 'High') return 'bg-danger';
  if (competition === 'Medium') return 'bg-warning';
  if (competition === 'Low') return 'bg-success';
  return 'bg-secondary';
}
