const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

const API_KEY = 'a7845be027832fc9caf5dd879c427ccb9a9c0628a90574464e41615a5fb26547';

app.get('/theaters', async (req, res) => {
  const { longitude, latitude } = req.query;
  console.log(longitude + " "+ latitude);
  
  if (!longitude || !latitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_maps',
        q: 'cinemalhall',  
        ll: `@${latitude},${longitude},15.1z`,
        type: 'search',
        api_key : API_KEY
      }
    });
    res.json(response.data);  
  } catch (error) {
    console.error('Error fetching theater data from SerpAPI:', error.message);
    res.status(500).json({ error: 'Failed to fetch theater data.' });  
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
