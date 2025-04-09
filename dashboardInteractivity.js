// Fast Track Wizard Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Load the appropriate tier data
  const currentPath = window.location.pathname;
  let currentTier = 'free';
  
  if (currentPath.includes('/basic/')) {
    currentTier = 'basic';
  } else if (currentPath.includes('/medium/')) {
    currentTier = 'medium';
  } else if (currentPath.includes('/expert/')) {
    currentTier = 'expert';
  }
  
  // Initialize wizard functionality
  initFastTrackWizard(currentTier);
  
  // Initialize dashboard metrics
  updateDashboardMetrics(currentTier);
  
  // Initialize other interactive elements based on tier
  initTierSpecificFeatures(currentTier);
});

// Fast Track Wizard Initialization
function initFastTrackWizard(tier) {
  const startButton = document.getElementById('fast-track-start-btn');
  if (!startButton) return;
  
  startButton.addEventListener('click', function() {
    // Load the Fast Track Wizard interface
    window.location.href = `/fast-track-wizard.html?tier=${tier}`;
  });
  
  // If we're on the wizard page, initialize the wizard steps
  if (window.location.pathname.includes('fast-track-wizard')) {
    const urlParams = new URLSearchParams(window.location.search);
    const wizardTier = urlParams.get('tier') || 'free';
    
    // Load wizard data from our demo data
    loadWizardData(wizardTier);
  }
}

// Load wizard data and initialize the interface
function loadWizardData(tier) {
  // In a real implementation, this would fetch data from the backend
  // For now, we'll simulate by using our demo data
  fetch('/js/allTiersDemoData.js')
    .then(response => response.text())
    .then(data => {
      // Extract the JSON data from the JS file
      const jsonStr = data.replace('const dashboardDemoData =', '')
                          .replace('export default dashboardDemoData;', '');
      const demoData = JSON.parse(jsonStr);
      
      // Get the wizard data for the current tier
      const wizardData = demoData[tier].fastTrackWizard;
      
      // Initialize the wizard interface
      renderWizardSteps(wizardData.steps);
      
      // Set up event listeners for wizard navigation
      setupWizardNavigation(wizardData.steps, tier);
    })
    .catch(error => {
      console.error('Error loading wizard data:', error);
    });
}

// Render the wizard steps in the interface
function renderWizardSteps(steps) {
  const wizardContainer = document.getElementById('wizard-steps-container');
  if (!wizardContainer) return;
  
  // Clear existing content
  wizardContainer.innerHTML = '';
  
  // Create step indicators
  const stepsIndicator = document.createElement('div');
  stepsIndicator.className = 'wizard-steps-indicator';
  
  steps.forEach((step, index) => {
    const stepIndicator = document.createElement('div');
    stepIndicator.className = `wizard-step-indicator ${index === 0 ? 'active' : ''}`;
    stepIndicator.setAttribute('data-step', index + 1);
    stepIndicator.innerHTML = `
      <div class="step-number">${index + 1}</div>
      <div class="step-name">${step.name}</div>
    `;
    stepsIndicator.appendChild(stepIndicator);
  });
  
  wizardContainer.appendChild(stepsIndicator);
  
  // Create step content container
  const stepContent = document.createElement('div');
  stepContent.className = 'wizard-step-content';
  stepContent.id = 'wizard-step-content';
  
  // Initially show the first step
  stepContent.innerHTML = renderStepContent(steps[0], 0);
  
  wizardContainer.appendChild(stepContent);
}

// Render the content for a specific step
function renderStepContent(step, stepIndex) {
  let content = `
    <h2>${step.name}</h2>
    <p>${step.description}</p>
  `;
  
  // Render different content based on the step
  switch (stepIndex) {
    case 0: // Choose Niche
      content += renderNicheSelection(step.niches || []);
      break;
    case 1: // Select Offers
      content += renderOfferSelection(step.offers || []);
      break;
    case 2: // Content Strategy
      content += renderContentStrategy(step.contentTypes || [], step.frequencies || []);
      break;
    case 3: // Action Plan
      content += renderActionPlan(step.actionPlan || []);
      break;
    case 4: // Launch
      content += renderLaunchStep();
      break;
    default:
      content += '<p>This step is not yet implemented.</p>';
  }
  
  // Add navigation buttons
  content += `
    <div class="wizard-navigation">
      ${stepIndex > 0 ? '<button id="prev-step" class="btn btn-secondary">Previous</button>' : ''}
      ${stepIndex < 4 ? '<button id="next-step" class="btn btn-primary">Next</button>' : ''}
      ${stepIndex === 4 ? '<button id="complete-wizard" class="btn btn-success">Complete</button>' : ''}
    </div>
  `;
  
  return content;
}

// Render niche selection interface
function renderNicheSelection(niches) {
  let content = `
    <div class="niche-selection">
      <p>Select a profitable niche for your affiliate marketing business:</p>
      <div class="niches-grid">
  `;
  
  niches.forEach((niche, index) => {
    content += `
      <div class="niche-card ${niche.isRecommended ? 'recommended' : ''}" data-niche-id="${niche.id}">
        <div class="niche-header">
          <h3>${niche.name}</h3>
          ${niche.isRecommended ? '<span class="recommended-badge">Recommended</span>' : ''}
        </div>
        <div class="niche-metrics">
          <div class="metric">
            <span class="label">Demand:</span>
            <span class="value ${niche.demand.toLowerCase()}">${niche.demand}</span>
          </div>
          <div class="metric">
            <span class="label">Competition:</span>
            <span class="value ${niche.competition.toLowerCase()}">${niche.competition}</span>
          </div>
          <div class="metric">
            <span class="label">Profit Potential:</span>
            <span class="value ${niche.profitPotential.toLowerCase()}">${niche.profitPotential}</span>
          </div>
        </div>
        <p class="niche-description">${niche.description}</p>
        <button class="select-niche-btn" data-niche-id="${niche.id}">Select This Niche</button>
      </div>
    `;
  });
  
  content += `
      </div>
    </div>
  `;
  
  return content;
}

// Render offer selection interface
function renderOfferSelection(offers) {
  let content = `
    <div class="offer-selection">
      <p>Choose the best affiliate programs for your selected niche:</p>
      <div class="offers-table">
        <table class="table">
          <thead>
            <tr>
              <th>Program</th>
              <th>Network</th>
              <th>Commission</th>
              <th>EPC</th>
              <th>Match</th>
              <th>Description</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
  `;
  
  offers.forEach((offer) => {
    content += `
      <tr data-offer-id="${offer.id}">
        <td>${offer.name}</td>
        <td>${offer.network}</td>
        <td>${offer.commission}</td>
        <td>${offer.epc}</td>
        <td><span class="match-score">${offer.match}</span></td>
        <td>${offer.description}</td>
        <td><input type="checkbox" class="offer-checkbox" data-offer-id="${offer.id}"></td>
      </tr>
    `;
  });
  
  content += `
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  return content;
}

// Render content strategy interface
function renderContentStrategy(contentTypes, frequencies) {
  let content = `
    <div class="content-strategy">
      <div class="strategy-section">
        <h3>Content Types</h3>
        <p>Select the types of content you want to create:</p>
        <div class="content-types-grid">
  `;
  
  contentTypes.forEach((type) => {
    content += `
      <div class="content-type-card" data-content-id="${type.id}">
        <h4>${type.type}</h4>
        <div class="effectiveness">
          <span class="label">Effectiveness:</span>
          <span class="value ${type.effectiveness.toLowerCase()}">${type.effectiveness}</span>
        </div>
        <p>${type.description}</p>
        <button class="select-content-btn" data-content-id="${type.id}">Select</button>
      </div>
    `;
  });
  
  content += `
        </div>
      </div>
      
      <div class="strategy-section">
        <h3>Publishing Frequency</h3>
        <p>Choose how often you'll publish new content:</p>
        <div class="frequency-options">
  `;
  
  frequencies.forEach((freq) => {
    content += `
      <div class="frequency-option" data-freq-id="${freq.id}">
        <input type="radio" name="frequency" id="${freq.id}" value="${freq.id}">
        <label for="${freq.id}">
          <h4>${freq.name}</h4>
          <div class="schedule">${freq.schedule}</div>
          <p>${freq.description}</p>
        </label>
      </div>
    `;
  });
  
  content += `
        </div>
      </div>
    </div>
  `;
  
  return content;
}

// Render action plan interface
function renderActionPlan(actionPlan) {
  let content = `
    <div class="action-plan">
      <p>Here's your personalized 7-day action plan:</p>
      <div class="action-plan-timeline">
  `;
  
  actionPlan.forEach((day) => {
    content += `
      <div class="day-card">
        <div class="day-header">
          <h3>Day ${day.day}: ${day.title}</h3>
        </div>
        <div class="day-tasks">
          <ul>
    `;
    
    day.tasks.forEach((task) => {
      content += `<li>${task}</li>`;
    });
    
    content += `
          </ul>
        </div>
      </div>
    `;
  });
  
  content += `
      </div>
    </div>
  `;
  
  return content;
}

// Render launch step interface
function renderLaunchStep() {
  return `
    <div class="launch-step">
      <div class="success-message">
        <div class="success-icon">✓</div>
        <h3>Your Affiliate Marketing Plan is Ready!</h3>
        <p>You've successfully completed all the steps to create your personalized affiliate marketing plan. You're now ready to start your journey to affiliate success!</p>
      </div>
      
      <div class="summary-section">
        <h3>Your Plan Summary</h3>
        <div class="summary-details">
          <div class="summary-item">
            <span class="label">Selected Niche:</span>
            <span class="value" id="summary-niche">Home Fitness Equipment</span>
          </div>
          <div class="summary-item">
            <span class="label">Selected Offers:</span>
            <span class="value" id="summary-offers">Rogue Fitness, NordicTrack, Bowflex</span>
          </div>
          <div class="summary-item">
            <span class="label">Content Strategy:</span>
            <span class="value" id="summary-content">Product Reviews, Comparison Articles</span>
          </div>
          <div class="summary-item">
            <span class="label">Publishing Frequency:</span>
            <span class="value" id="summary-frequency">Growth (2-3 articles per week)</span>
          </div>
        </div>
      </div>
      
      <div class="next-steps">
        <h3>Next Steps</h3>
        <p>Follow your 7-day action plan to get started. Here's what to do right now:</p>
        <ol>
          <li>Sign up for the recommended affiliate programs</li>
          <li>Research the top-selling products in your niche</li>
          <li>Set up tracking links for each product</li>
        </ol>
      </div>
    </div>
  `;
}

// Set up event listeners for wizard navigation
function setupWizardNavigation(steps, tier) {
  // Next button
  const nextButton = document.getElementById('next-step');
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      const currentStep = document.querySelector('.wizard-step-indicator.active');
      const currentStepNum = parseInt(currentStep.getAttribute('data-step'));
      const nextStepNum = currentStepNum + 1;
      
      if (nextStepNum <= steps.length) {
        // Update step indicators
        currentStep.classList.remove('active');
        document.querySelector(`.wizard-step-indicator[data-step="${nextStepNum}"]`).classList.add('active');
        
        // Update step content
        const stepContent = document.getElementById('wizard-step-content');
        stepContent.innerHTML = renderStepContent(steps[nextStepNum - 1], nextStepNum - 1);
        
        // Re-attach event listeners
        setupWizardNavigation(steps, tier);
      }
    });
  }
  
  // Previous button
  const prevButton = document.getElementById('prev-step');
  if (prevButton) {
    prevButton.addEventListener('click', function() {
      const currentStep = document.querySelector('.wizard-step-indicator.active');
      const currentStepNum = parseInt(currentStep.getAttribute('data-step'));
      const prevStepNum = currentStepNum - 1;
      
      if (prevStepNum >= 1) {
        // Update step indicators
        currentStep.classList.remove('active');
        document.querySelector(`.wizard-step-indicator[data-step="${prevStepNum}"]`).classList.add('active');
        
        // Update step content
        const stepContent = document.getElementById('wizard-step-content');
        stepContent.innerHTML = renderStepContent(steps[prevStepNum - 1], prevStepNum - 1);
        
        // Re-attach event listeners
        setupWizardNavigation(steps, tier);
      }
    });
  }
  
  // Complete button
  const completeButton = document.getElementById('complete-wizard');
  if (completeButton) {
    completeButton.addEventListener('click', function() {
      // In a real implementation, this would save the user's selections
      // For now, just redirect back to the dashboard
      window.location.href = `/${tier}/`;
    });
  }
  
  // Niche selection buttons
  const nicheButtons = document.querySelectorAll('.select-niche-btn');
  nicheButtons.forEach(button => {
    button.addEventListener('click', function() {
      const nicheId = this.getAttribute('data-niche-id');
      
      // Clear any previous selections
      document.querySelectorAll('.niche-card').forEach(card => {
        card.classList.remove('selected');
      });
      
      // Mark this niche as selected
      document.querySelector(`.niche-card[data-niche-id="${nicheId}"]`).classList.add('selected');
      
      // Store the selection (in a real app, this would be saved to state/backend)
      localStorage.setItem('selectedNiche', nicheId);
    });
  });
  
  // Offer checkboxes
  const offerCheckboxes = document.querySelectorAll('.offer-checkbox');
  offerCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const offerId = this.getAttribute('data-offer-id');
      const isChecked = this.checked;
      
      // Highlight the row if selected
      const row = document.querySelector(`tr[data-offer-id="${offerId}"]`);
      if (isChecked) {
        row.classList.add('selected');
      } else {
        row.classList.remove('selected');
      }
      
      // Store the selections (in a real app, this would be saved to state/backend)
      const selectedOffers = JSON.parse(localStorage.getItem('selectedOffers') || '[]');
      if (isChecked && !selectedOffers.includes(offerId)) {
        selectedOffers.push(offerId);
      } else if (!isChecked && selectedOffers.includes(offerId)) {
        const index = selectedOffers.indexOf(offerId);
        selectedOffers.splice(index, 1);
      }
      localStorage.setItem('selectedOffers', JSON.stringify(selectedOffers));
    });
  });
  
  // Content type selection buttons
  const contentButtons = document.querySelectorAll('.select-content-btn');
  contentButtons.forEach(button => {
    button.addEventListener('click', function() {
      const contentId = this.getAttribute('data-content-id');
      const card = document.querySelector(`.content-type-card[data-content-id="${contentId}"]`);
      
      // Toggle selection
      if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        this.textContent = 'Select';
      } else {
        
(Content truncated due to size limit. Use line ranges to read in chunks)