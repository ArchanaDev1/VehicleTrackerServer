const express = require('express');
const cors = require('cors');
const axios = require('axios'); // For making API requests

const app = express();
app.use(cors());

// OSRM API base URL (free public OSRM service)
const osrmUrl = 'http://router.project-osrm.org/route/v1/driving/';

// Define start and end points for the route (replace with actual coordinates)
const startPoint = [17.385044, 78.486671]; // Starting coordinates
const endPoint = [17.396564, 78.491248];   // Destination coordinates

// Generate the route by querying OSRM
app.get('/route', async (req, res) => {
  try {
    const response = await axios.get(`${osrmUrl}${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}?overview=full&geometries=geojson`);
    const route = response.data.routes[0].geometry.coordinates;
    
    // Convert route from [longitude, latitude] to [latitude, longitude] for compatibility with frontend
    const formattedRoute = route.map(coord => [coord[1], coord[0]]);
    
    res.json(formattedRoute);
  } catch (error) {
    console.error('Error fetching route:', error);
    res.status(500).send('Error fetching route data');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
