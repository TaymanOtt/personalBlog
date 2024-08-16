// server.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const clamscan = require('clamscan');
const { scanPorts } = require('./scanner');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

const upload = multer({
  dest: './uploads/',
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(exe|zip|rar)$/)) {
      return cb(new Error('Only .exe, .zip, and .rar files are allowed'));
    }
    cb(null, true);
  },
});

//route to post port scan
app.post('/api/scan', async (req, res) => {
    const { host, startPort, endPort } = req.body;
    if (!host || !startPort || !endPort) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    try {
      const results = await scanPorts(host, parseInt(startPort), parseInt(endPort));
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Error scanning ports' });
    }
  });
//route for virus scan
app.post('/api/virus-scan', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const scanResult = await clamscan.scanFile(file.path);
    if (scanResultFOUND) {
      res.status(200).send({ result: 'clean', file: scanResult.file });
    } else {
      res.status(406).send({ result: 'infected', file: scanResult.file });
    }
  } catch (err) {
    res.status(500).send({ error: 'Error scanning file' });
  }
});
// API routes
app.get('/api/projects', (req, res) => {
    res.json([
        // Example project data
        { id: 1, title: 'Project 1', description: 'Description of Project 1' },
        { id: 2, title: 'Project 2', description: 'Description of Project 2' }
    ]);
});

// Catch-all handler to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
