// Main entry point for Vercel deployment
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

// API routes for local testing
app.get('/api/dashboard/:tier', (req, res) => {
  const tier = req.params.tier;
  // Return mock data based on tier
  res.json({
    metrics: {
      totalClicks: tier === 'free' ? 387 : 1245,
      conversions: tier === 'free' ? 12 : 42,
      revenue: tier === 'free' ? 156.48 : 587.94,
      conversionRate: tier === 'free' ? 3.1 : 3.4,
      epc: tier === 'free' ? 0.40 : 0.47,
      pendingCommissions: tier === 'free' ? 42.75 : 156.75
    },
    recentActivity: [
      {
        date: "2025-03-30",
        time: "09:15 AM",
        type: "Conversion",
        details: "New sale from Amazon Associates - $12.49 commission"
      },
      {
        date: "2025-03-29",
        time: "03:42 PM",
        type: "Click",
        details: "52 clicks from your 'Best Home Fitness Equipment' article"
      },
      {
        date: "2025-03-28",
        time: "11:20 AM",
        type: "Application",
        details: "Application to ShareASale approved"
      }
    ],
    goals: {
      monthlyClicks: { current: tier === 'free' ? 387 : 1245, target: tier === 'free' ? 500 : 2000 },
      conversions: { current: tier === 'free' ? 12 : 42, target: tier === 'free' ? 20 : 100 },
      revenue: { current: tier === 'free' ? 156.48 : 587.94, target: tier === 'free' ? 250 : 1000 },
      conversionRate: { current: tier === 'free' ? 3.1 : 3.4, target: 5 }
    }
  });
});

app.get('/api/affiliates/:tier', (req, res) => {
  // Return mock affiliate programs
  res.json({
    programs: [
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
    ]
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the dashboard at http://localhost:${PORT}`);
    console.log(`Free tier: http://localhost:${PORT}/free`);
    console.log(`Basic tier: http://localhost:${PORT}/basic`);
  });
}

// Export for Vercel
module.exports = app;
