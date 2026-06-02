const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "b320650a-a356-4c55-b1a7-24a0d8239e18";

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.post('/sensor', async (req, res) => {
  try {
    const { device, model } = req.body;
    const response = await fetch("https://openapi.api.govee.com/router/api/v1/device/state", {
      method: 'POST',
      headers: {
        'Govee-API-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ device, model })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`✅ Govee proxy running on port ${PORT}`));
