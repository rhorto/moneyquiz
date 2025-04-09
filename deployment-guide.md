# Deployment Guide for Ultimate Affiliate Dashboard

This guide provides step-by-step instructions for deploying the Ultimate Affiliate Dashboard to free hosting services.

## 1. Backend Deployment to Render.com

1. Create a Render.com account at https://render.com/
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository or use "Deploy from existing repository"
4. Configure your service:
   - Name: affiliate-dashboard-api
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Select the Free plan
5. Add the following environment variables:
   - MONGODB_URI (from MongoDB Atlas setup)
   - JWT_SECRET (generate a secure random string)
   - NODE_ENV: production
   - CORS_ORIGIN: Your Vercel frontend URL
6. Click "Create Web Service"

## 2. Frontend Deployment to Vercel

1. Create a Vercel account at https://vercel.com/
2. Click "New Project"
3. Import your GitHub repository or upload your project files
4. Configure your project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Add the following environment variables:
   - NEXT_PUBLIC_API_URL: Your Render.com backend URL + /api
6. Click "Deploy"

## 3. Static Dashboard Deployment

For the static HTML/CSS/JS dashboard version:

1. Log in to your Vercel account
2. Click "New Project"
3. Import your GitHub repository or upload the `/affiliate_dashboard_website` directory
4. Configure your project:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: (leave empty)
5. Click "Deploy"
6. Your dashboard will be available at the provided Vercel URL

## 4. No-Scrolling Layout Implementation

The dashboard now features a no-scrolling layout that ensures content appears without requiring scrolling when using the left navigation. This is implemented through:

1. CSS file: `css/no-scroll-layout.css` which contains the layout styles
2. HTML structure with content sections contained in a scrollable container
3. JavaScript that handles navigation between sections

When deploying updates to the dashboard, ensure these files are included:
- The CSS file is linked in all HTML files
- The JavaScript navigation handlers are properly implemented
- The HTML structure follows the container pattern for proper overflow handling

## 5. Connecting Frontend to Backend

After both deployments are complete:

1. Update the CORS_ORIGIN in your Render.com environment variables to match your Vercel deployment URL
2. Update the NEXT_PUBLIC_API_URL in your Vercel environment variables to match your Render.com API URL

## 6. Testing the Deployment

1. Visit your Vercel deployment URL
2. Test the following functionality:
   - Navigation: Verify all sidebar links work correctly and content appears without scrolling
   - Fast Track Wizard: Test the step-by-step process
   - Niche Analysis: Test the niche scanner and results display
   - Affiliate Finder: Test program search and filtering
   - Content Strategy: Test content planning tools
   - Analytics: Test performance tracking displays

## 7. Tier-Specific Testing

Test each tier separately to ensure tier-specific features are working:

1. Free Tier: `/free/` - Basic functionality with limited features
2. Basic Tier: `/basic/` - Enhanced features with more detailed analysis
3. Medium Tier: `/medium/` - Advanced features including personalized recommendations
4. Expert Tier: `/expert/` - Complete suite with all premium features

## 8. Monitoring and Maintenance

- Render.com Dashboard: Monitor backend performance and logs
- Vercel Dashboard: Monitor frontend performance and deployment status
- MongoDB Atlas Dashboard: Monitor database performance and storage usage

## Important Notes

- Free tier services have limitations:
  - Render.com free tier may sleep after periods of inactivity
  - MongoDB Atlas free tier has 512MB storage limit
  - Vercel has build time and serverless function limitations
- For production use, consider upgrading to paid tiers for better performance and reliability
- The no-scrolling layout is optimized for desktop use; mobile responsiveness may require additional adjustments
