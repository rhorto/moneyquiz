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
