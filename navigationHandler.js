// Navigation Handler for No-Scroll Layout
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
  
  // Initialize navigation for the no-scroll layout
  initializeNoScrollNavigation(currentTier);
});

// Initialize navigation for the no-scroll layout
function initializeNoScrollNavigation(tier) {
  // Get all navigation links in the sidebar
  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  
  // Add click event listeners to each navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section from the data-section attribute
      const targetSection = this.getAttribute('data-section');
      if (!targetSection) return;
      
      // Update active state in navigation
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      this.classList.add('active');
      
      // Show the corresponding content section
      showContentSection(targetSection);
    });
  });
  
  // Initialize with the default section (dashboard)
  const defaultSection = document.querySelector('.sidebar .nav-link.active');
  if (defaultSection) {
    const defaultSectionTarget = defaultSection.getAttribute('data-section');
    if (defaultSectionTarget) {
      showContentSection(defaultSectionTarget);
    }
  }
}

// Show the specified content section and hide others
function showContentSection(sectionId) {
  // Get all content sections
  const contentSections = document.querySelectorAll('.content-section');
  
  // Hide all sections
  contentSections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show the target section
  const targetSection = document.getElementById(`${sectionId}-section`);
  if (targetSection) {
    targetSection.classList.add('active');
  } else {
    console.warn(`Content section not found: ${sectionId}-section`);
  }
}
