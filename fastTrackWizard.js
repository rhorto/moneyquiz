// Fast Track Wizard Component
class FastTrackWizard {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.userData = {
      userId: apiConfig.mockUser.id,
      selectedNiche: null,
      selectedOffers: [],
      selectedContentTypes: [],
      contentFrequency: '2-3 pieces per week',
      preferences: {
        emailReminders: true,
        contentTemplates: true
      }
    };
    this.wizardContainer = document.getElementById('fast-track-wizard-container');
    this.stepIndicator = document.getElementById('step-indicator');
    this.contentContainer = document.getElementById('wizard-content');
    this.navigationButtons = document.getElementById('wizard-navigation');
    
    this.init();
  }
  
  async init() {
    this.renderStepIndicator();
    await this.loadStep(1);
    this.setupEventListeners();
  }
  
  renderStepIndicator() {
    let stepsHtml = '';
    for (let i = 1; i <= this.totalSteps; i++) {
      stepsHtml += `
        <div class="step ${i === this.currentStep ? 'active' : ''}">
          <div class="step-number">${i}</div>
          <div class="step-name">${this.getStepName(i)}</div>
        </div>
      `;
      if (i < this.totalSteps) {
        stepsHtml += '<div class="step-connector"></div>';
      }
    }
    this.stepIndicator.innerHTML = stepsHtml;
  }
  
  getStepName(stepNumber) {
    const stepNames = {
      1: 'Choose Niche',
      2: 'Select Offers',
      3: 'Content Strategy',
      4: 'Action Plan',
      5: 'Review & Launch'
    };
    return stepNames[stepNumber] || `Step ${stepNumber}`;
  }
  
  async loadStep(stepNumber) {
    this.currentStep = stepNumber;
    this.renderStepIndicator();
    
    // Clear current content
    this.contentContainer.innerHTML = '<div class="loading-spinner">Loading...</div>';
    
    // Load step content
    try {
      switch (stepNumber) {
        case 1:
          await this.loadNicheSelectionStep();
          break;
        case 2:
          await this.loadOfferSelectionStep();
          break;
        case 3:
          await this.loadContentStrategyStep();
          break;
        case 4:
          await this.loadActionPlanStep();
          break;
        case 5:
          await this.loadReviewStep();
          break;
        default:
          this.contentContainer.innerHTML = '<p>Unknown step</p>';
      }
    } catch (error) {
      console.error('Error loading step:', error);
      this.contentContainer.innerHTML = `<div class="error-message">Error loading step: ${error.message}</div>`;
    }
    
    // Update navigation buttons
    this.updateNavigationButtons();
  }
  
  async loadNicheSelectionStep() {
    try {
      const niches = await fastTrackService.getNiches();
      
      let nichesHtml = `
        <h2>Choose Your Niche</h2>
        <p class="step-description">Select a niche for your affiliate marketing business. We've highlighted recommended niches with high demand and manageable competition.</p>
        <div class="niches-container">
      `;
      
      niches.forEach(niche => {
        const isSelected = this.userData.selectedNiche && this.userData.selectedNiche.id === niche.id;
        nichesHtml += `
          <div class="niche-card ${isSelected ? 'selected' : ''} ${niche.isRecommended ? 'recommended' : ''}" data-niche-id="${niche.id}">
            ${niche.isRecommended ? '<div class="recommended-badge">Recommended</div>' : ''}
            <h3>${niche.name}</h3>
            <div class="niche-metrics">
              <div class="metric">
                <span class="metric-label">Demand:</span>
                <span class="metric-value ${this.getDemandClass(niche.demand)}">${niche.demand}</span>
              </div>
              <div class="metric">
                <span class="metric-label">Competition:</span>
                <span class="metric-value ${this.getCompetitionClass(niche.competition)}">${niche.competition}</span>
              </div>
              <div class="metric">
                <span class="metric-label">Profit Potential:</span>
                <span class="metric-value ${this.getProfitClass(niche.profitPotential)}">${niche.profitPotential}</span>
              </div>
            </div>
            <p class="niche-description">${niche.description}</p>
            <button class="select-niche-btn ${isSelected ? 'selected' : ''}" data-niche-id="${niche.id}">
              ${isSelected ? 'Selected' : 'Select This Niche'}
            </button>
          </div>
        `;
      });
      
      nichesHtml += '</div>';
      this.contentContainer.innerHTML = nichesHtml;
      
      // Add event listeners to niche cards
      document.querySelectorAll('.select-niche-btn').forEach(button => {
        button.addEventListener('click', (e) => {
          const nicheId = e.target.dataset.nicheId;
          const selectedNiche = niches.find(niche => niche.id === nicheId);
          this.userData.selectedNiche = selectedNiche;
          
          // Update UI to show selected niche
          document.querySelectorAll('.niche-card').forEach(card => {
            card.classList.remove('selected');
          });
          document.querySelectorAll('.select-niche-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.textContent = 'Select This Niche';
          });
          
          const selectedCard = document.querySelector(`.niche-card[data-niche-id="${nicheId}"]`);
          const selectedButton = document.querySelector(`.select-niche-btn[data-niche-id="${nicheId}"]`);
          if (selectedCard) selectedCard.classList.add('selected');
          if (selectedButton) {
            selectedButton.classList.add('selected');
            selectedButton.textContent = 'Selected';
          }
          
          // Enable next button
          this.updateNavigationButtons();
        });
      });
    } catch (error) {
      console.error('Error loading niches:', error);
      this.contentContainer.innerHTML = `<div class="error-message">Error loading niches: ${error.message}</div>`;
    }
  }
  
  async loadOfferSelectionStep() {
    if (!this.userData.selectedNiche) {
      this.contentContainer.innerHTML = `
        <div class="error-message">
          <p>Please select a niche first.</p>
          <button class="btn btn-primary" id="go-back-to-niche">Go Back to Select Niche</button>
        </div>
      `;
      document.getElementById('go-back-to-niche').addEventListener('click', () => {
        this.loadStep(1);
      });
      return;
    }
    
    try {
      const offers = await fastTrackService.getOffersByNiche(this.userData.selectedNiche.id);
      
      let offersHtml = `
        <h2>Select Affiliate Programs</h2>
        <p class="step-description">Choose 2-3 affiliate programs to promote in your ${this.userData.selectedNiche.name} niche. We've sorted them by match score based on commission rates and EPC (earnings per click).</p>
        <div class="offers-container">
      `;
      
      offers.forEach(offer => {
        const isSelected = this.userData.selectedOffers.some(o => o.id === offer.id);
        offersHtml += `
          <div class="offer-card ${isSelected ? 'selected' : ''}" data-offer-id="${offer.id}">
            <div class="offer-header">
              <img src="${offer.logo}" alt="${offer.name} logo" class="offer-logo">
              <div class="match-score">
                <span class="match-label">Match</span>
                <span class="match-value">${offer.matchScore}%</span>
              </div>
            </div>
            <h3>${offer.name}</h3>
            <p class="offer-description">${offer.description}</p>
            <div class="offer-metrics">
              <div class="metric">
                <span class="metric-label">Commission:</span>
                <span class="metric-value">${offer.commission}</span>
              </div>
              <div class="metric">
                <span class="metric-label">EPC:</span>
                <span class="metric-value">${offer.epc}</span>
              </div>
              <div class="metric">
                <span class="metric-label">Cookie:</span>
                <span class="metric-value">${offer.cookieDuration}</span>
              </div>
            </div>
            <button class="select-offer-btn ${isSelected ? 'selected' : ''}" data-offer-id="${offer.id}">
              ${isSelected ? 'Selected' : 'Select This Program'}
            </button>
          </div>
        `;
      });
      
      offersHtml += '</div>';
      this.contentContainer.innerHTML = offersHtml;
      
      // Add event listeners to offer cards
      document.querySelectorAll('.select-offer-btn').forEach(button => {
        button.addEventListener('click', (e) => {
          const offerId = e.target.dataset.offerId;
          const selectedOffer = offers.find(offer => offer.id === offerId);
          
          // Toggle selection
          const offerIndex = this.userData.selectedOffers.findIndex(o => o.id === offerId);
          if (offerIndex === -1) {
            this.userData.selectedOffers.push(selectedOffer);
          } else {
            this.userData.selectedOffers.splice(offerIndex, 1);
          }
          
          // Update UI
          const offerCard = document.querySelector(`.offer-card[data-offer-id="${offerId}"]`);
          const offerButton = document.querySelector(`.select-offer-btn[data-offer-id="${offerId}"]`);
          
          if (offerIndex === -1) {
            // Was not selected, now is selected
            offerCard.classList.add('selected');
            offerButton.classList.add('selected');
            offerButton.textContent = 'Selected';
          } else {
            // Was selected, now is not selected
            offerCard.classList.remove('selected');
            offerButton.classList.remove('selected');
            offerButton.textContent = 'Select This Program';
          }
          
          // Enable/disable next button based on selections
          this.updateNavigationButtons();
        });
      });
    } catch (error) {
      console.error('Error loading offers:', error);
      this.contentContainer.innerHTML = `<div class="error-message">Error loading offers: ${error.message}</div>`;
    }
  }
  
  async loadContentStrategyStep() {
    if (!this.userData.selectedNiche || this.userData.selectedOffers.length === 0) {
      this.contentContainer.innerHTML = `
        <div class="error-message">
          <p>Please select a niche and at least one affiliate program first.</p>
          <button class="btn btn-primary" id="go-back-to-offers">Go Back</button>
        </div>
      `;
      document.getElementById('go-back-to-offers').addEventListener('click', () => {
        this.loadStep(this.userData.selectedNiche ? 2 : 1);
      });
      return;
    }
    
    try {
      const contentTypes = await fastTrackService.getContentTypes();
      
      let contentHtml = `
        <h2>Content Strategy</h2>
        <p class="step-description">Select the types of content you'll create to promote your ${this.userData.selectedNiche.name} affiliate products. Choose at least 2 content types.</p>
        <div class="content-types-container">
      `;
      
      contentTypes.forEach(contentType => {
        const isSelected = this.userData.selectedContentTypes.some(c => c.id === contentType.id);
        contentHtml += `
          <div class="content-type-card ${isSelected ? 'selected' : ''}" data-content-id="${contentType.id}">
            <div class="content-type-icon">
              <i class="fas fa-${contentType.icon}"></i>
            </div>
            <h3>${contentType.name}</h3>
            <p class="content-type-description">${contentType.description}</p>
            <button class="select-content-btn ${isSelected ? 'selected' : ''}" data-content-id="${contentType.id}">
              ${isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
        `;
      });
      
      contentHtml += `
        </div>
        <div class="content-frequency-section">
          <h3>Content Frequency</h3>
          <p>How many content pieces will you create per week?</p>
          <div class="frequency-options">
            <label class="frequency-option">
              <input type="radio" name="content-frequency" value="1 piece per week" ${this.userData.contentFrequency === '1 piece per week' ? 'checked' : ''}>
              <span class="frequency-label">1 piece per week</span>
              <span class="frequency-description">Recommended for beginners with limited time</span>
            </label>
            <label class="frequency-option">
              <input type="radio" name="content-frequency" value="2-3 pieces per week" ${this.userData.contentFrequency === '2-3 pieces per week' ? 'checked' : ''}>
              <span class="frequency-label">2-3 pieces per week</span>
              <span class="frequency-description">Balanced approach for steady growth</span>
            </label>
            <label class="frequency-option">
              <input type="radio" name="content-frequency" value="4-5 pieces per week" ${this.userData.contentFrequency === '4-5 pieces per week' ? 'checked' : ''}>
              <span class="frequency-label">4-5 pieces per week</span>
              <span class="frequency-description">Accelerated growth strategy</span>
            </label>
            <label class="frequency-option">
              <input type="radio" name="content-frequency" value="6+ pieces per week" ${this.userData.contentFrequency === '6+ pieces per week' ? 'checked' : ''}>
              <span class="frequency-label">6+ pieces per week</span>
              <span class="frequency-description">Full-time commitment for maximum results</span>
            </label>
          </div>
        </div>
      `;
      
      this.contentContainer.innerHTML = contentHtml;
      
      // Add event listeners to content type cards
      document.querySelectorAll('.select-content-btn').forEach(button => {
        button.addEventListener('click', (e) => {
          const contentId = e.target.dataset.contentId;
          const selectedContent = contentTypes.find(content => content.id === contentId);
          
          // Toggle selection
          const contentIndex = this.userData.selectedContentTypes.findIndex(c => c.id === contentId);
          if (contentIndex === -1) {
            this.userData.selectedContentTypes.push(selectedContent);
          } else {
            this.userData.selectedContentTypes.splice(contentIndex, 1);
          }
          
          // Update UI
          const contentCard = document.querySelector(`.content-type-card[data-content-id="${contentId}"]`);
          const contentButton = document.querySelector(`.select-content-btn[data-content-id="${contentId}"]`);
          
          if (contentIndex === -1) {
            // Was not selected, now is selected
            contentCard.classList.add('selected');
            contentButton.classList.add('selected');
            contentButton.textContent = 'Selected';
          } else {
            // Was selected, now is not selected
            contentCard.classList.remove('selected');
            contentButton.classList.remove('selected');
            contentButton.textContent = 'Select';
          }
          
          // Enable/disable next button based on selections
          this.updateNavigationButtons();
        });
      });
      
      // Add event listeners to frequency options
      document.querySelectorAll('input[name="content-frequency"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          this.userData.contentFrequency = e.target.value;
        });
      });
    } catch (error) {
      console.error('Error loading content types:', error);
      this.contentContainer.innerHTML = `<div class="error-message">Error loading content types: ${error.message}</div>`;
    }
  }
  
  async loadActionPlanStep() {
    if (!this.userDat
(Content truncated due to size limit. Use line ranges to read in chunks)