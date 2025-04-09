#!/bin/bash

# Deployment script for Ultimate Affiliate Dashboard
# This script prepares and deploys the updated dashboard

echo "Starting deployment process for Ultimate Affiliate Dashboard..."

# Create deployment directory
echo "Creating deployment directory..."
mkdir -p /home/ubuntu/dashboard/deploy

# Copy all necessary files to deployment directory
echo "Copying files to deployment directory..."
cp -r /home/ubuntu/dashboard/*.html /home/ubuntu/dashboard/deploy/
cp -r /home/ubuntu/dashboard/*.js /home/ubuntu/dashboard/deploy/
cp -r /home/ubuntu/dashboard/*.css /home/ubuntu/dashboard/deploy/

# Create directory structure for different tiers
echo "Creating tier-specific directories..."
mkdir -p /home/ubuntu/dashboard/deploy/free
mkdir -p /home/ubuntu/dashboard/deploy/basic
mkdir -p /home/ubuntu/dashboard/deploy/medium
mkdir -p /home/ubuntu/dashboard/deploy/expert

# Create tier-specific index files
echo "Creating tier-specific index files..."

# Free tier index
cat > /home/ubuntu/dashboard/deploy/free/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimate Affiliate Dashboard - Free Tier</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../no-scroll-layout.css">
    <style>
        :root {
            --primary-color: #4e73df;
            --secondary-color: #1cc88a;
            --dark-color: #5a5c69;
            --light-color: #f8f9fc;
            --danger-color: #e74a3b;
            --warning-color: #f6c23e;
            --free-color: #4e73df;
        }
        
        .sidebar {
            background: linear-gradient(180deg, var(--free-color) 0%, #224abe 100%);
        }
        
        .btn-free {
            background-color: var(--free-color);
            color: white;
        }
        
        .btn-free:hover {
            background-color: #224abe;
            color: white;
        }
    </style>
</head>
<body>
    <div id="dashboard-container"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../allTiersDemoData.js"></script>
    <script src="../freeTierFeatures.js"></script>
    <script>
        // Load dashboard structure
        document.addEventListener('DOMContentLoaded', function() {
            fetch('../index.html')
                .then(response => response.text())
                .then(html => {
                    // Extract the body content
                    const bodyContent = html.match(/<body>([\s\S]*)<\/body>/i)[1];
                    
                    // Insert into dashboard container
                    document.getElementById('dashboard-container').innerHTML = bodyContent;
                    
                    // Update title to show Free Tier
                    document.title = 'Ultimate Affiliate Dashboard - Free Tier';
                    
                    // Update sidebar brand
                    const sidebarBrand = document.querySelector('.sidebar-brand');
                    if (sidebarBrand) {
                        sidebarBrand.innerHTML = '<i class="bi bi-bar-chart me-2"></i> FREE DASHBOARD';
                    }
                    
                    // Initialize free tier features
                    initializeFreeTierDashboard();
                    initializeAffiliateFinderFree();
                    initializeBasicContentTools();
                    initializeStandardAnalytics();
                    initializeFreeTierLimitations();
                    
                    // Show conversion limit warning when appropriate
                    checkConversionLimits();
                });
        });
    </script>
</body>
</html>
EOL

# Basic tier index
cat > /home/ubuntu/dashboard/deploy/basic/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimate Affiliate Dashboard - Basic Tier</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../no-scroll-layout.css">
    <style>
        :root {
            --primary-color: #4e73df;
            --secondary-color: #1cc88a;
            --dark-color: #5a5c69;
            --light-color: #f8f9fc;
            --danger-color: #e74a3b;
            --warning-color: #f6c23e;
            --basic-color: #1cc88a;
        }
        
        .sidebar {
            background: linear-gradient(180deg, var(--basic-color) 0%, #169a6c 100%);
        }
        
        .btn-basic {
            background-color: var(--basic-color);
            color: white;
        }
        
        .btn-basic:hover {
            background-color: #169a6c;
            color: white;
        }
    </style>
</head>
<body>
    <div id="dashboard-container"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../allTiersDemoData.js"></script>
    <script src="../basicTierFeatures.js"></script>
    <script>
        // Load dashboard structure
        document.addEventListener('DOMContentLoaded', function() {
            fetch('../index.html')
                .then(response => response.text())
                .then(html => {
                    // Extract the body content
                    const bodyContent = html.match(/<body>([\s\S]*)<\/body>/i)[1];
                    
                    // Insert into dashboard container
                    document.getElementById('dashboard-container').innerHTML = bodyContent;
                    
                    // Update title to show Basic Tier
                    document.title = 'Ultimate Affiliate Dashboard - Basic Tier';
                    
                    // Update sidebar brand
                    const sidebarBrand = document.querySelector('.sidebar-brand');
                    if (sidebarBrand) {
                        sidebarBrand.innerHTML = '<i class="bi bi-bar-chart me-2"></i> BASIC DASHBOARD';
                    }
                    
                    // Initialize basic tier features
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
        });
    </script>
</body>
</html>
EOL

# Create API configuration file
echo "Creating API configuration file..."
cat > /home/ubuntu/dashboard/deploy/apiConfig.js << 'EOL'
// API Configuration
const apiConfig = {
    baseUrl: 'https://affiliate-dashboard-api.onrender.com/api',
    endpoints: {
        dashboard: {
            free: '/dashboard/free',
            basic: '/dashboard/basic',
            medium: '/dashboard/medium',
            expert: '/dashboard/expert'
        },
        affiliates: {
            free: '/affiliates/free',
            basic: '/affiliates/basic',
            all: '/affiliates/all'
        },
        niches: {
            basic: '/niches/basic',
            analysis: '/niches/analysis'
        },
        content: {
            templates: '/content/templates',
            calendar: '/content/calendar'
        },
        seo: {
            keywords: '/seo/keywords',
            analysis: '/seo/analysis'
        },
        analytics: {
            performance: '/analytics/performance',
            traffic: '/analytics/traffic',
            conversions: '/analytics/conversions'
        }
    },
    mockUser: {
        id: 'user123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        tier: 'free'
    }
};
EOL

# Create a simple server for local testing
echo "Creating local test server..."
cat > /home/ubuntu/dashboard/deploy/server.js << 'EOL'
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve tier-specific pages
app.get('/free', (req, res) => {
  res.sendFile(path.join(__dirname, 'free/index.html'));
});

app.get('/basic', (req, res) => {
  res.sendFile(path.join(__dirname, 'basic/index.html'));
});

app.get('/medium', (req, res) => {
  res.sendFile(path.join(__dirname, 'medium/index.html'));
});

app.get('/expert', (req, res) => {
  res.sendFile(path.join(__dirname, 'expert/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the dashboard at http://localhost:${PORT}`);
  console.log(`Free tier: http://localhost:${PORT}/free`);
  console.log(`Basic tier: http://localhost:${PORT}/basic`);
});
EOL

# Create package.json for deployment
echo "Creating package.json for deployment..."
cat > /home/ubuntu/dashboard/deploy/package.json << 'EOL'
{
  "name": "affiliate-dashboard",
  "version": "1.0.0",
  "description": "Ultimate Affiliate Dashboard",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
EOL

# Create Vercel configuration
echo "Creating Vercel configuration..."
cat > /home/ubuntu/dashboard/deploy/vercel.json << 'EOL'
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/free", "dest": "/free/index.html" },
    { "src": "/basic", "dest": "/basic/index.html" },
    { "src": "/medium", "dest": "/medium/index.html" },
    { "src": "/expert", "dest": "/expert/index.html" },
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
EOL

# Create README for deployment
echo "Creating README for deployment..."
cat > /home/ubuntu/dashboard/deploy/README.md << 'EOL'
# Ultimate Affiliate Dashboard

This is the Ultimate Affiliate Dashboard, a comprehensive tool for affiliate marketers to track, analyze, and optimize their affiliate marketing efforts.

## Deployment

This dashboard is configured for deployment on Vercel with a backend API on Render.com.

### Local Testing

1. Install dependencies:
   ```
   npm install
   ```

2. Start the local server:
   ```
   npm start
   ```

3. Access the dashboard at:
   - Main: http://localhost:3000
   - Free Tier: http://localhost:3000/free
   - Basic Tier: http://localhost:3000/basic

### Vercel Deployment

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```
   vercel
   ```

3. For production deployment:
   ```
   vercel --prod
   ```

## Features

- **Free Tier**: Basic dashboard with limited features
- **Basic Tier**: Enhanced dashboard with more detailed analytics
- **Medium Tier**: Advanced features with AI-powered recommendations
- **Expert Tier**: Complete suite with all premium features

## API Integration

The dashboard connects to the backend API at https://affiliate-dashboard-api.onrender.com/api
EOL

# Create zip file for deployment
echo "Creating deployment zip file..."
cd /home/ubuntu/dashboard/deploy
zip -r /home/ubuntu/dashboard-deploy.zip .

echo "Deployment preparation complete!"
echo "Deployment zip file created at: /home/ubuntu/dashboard-deploy.zip"
echo "You can now deploy this package to Vercel using the Vercel CLI or web interface."
echo "For local testing, run: cd /home/ubuntu/dashboard/deploy && npm install && npm start"
