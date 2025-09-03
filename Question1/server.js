const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
// Replace with your actual Authorization Token
const authToken = 'YOUR_AUTH_TOKEN';

// API Endpoint to fetch and display train schedule
app.get('/api/train-schedule', async (req, res) => {
  try {
    const trainData = await fetchTrainData(authToken);

    // Filter, process, and sort train data
    const processedTrainData = processTrainData(trainData);

    // Return the sorted train data as the API response
    res.json(processedTrainData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to fetch train data from the John Doe Railway Server
async function fetchTrainData(authToken) {
  try {
    const response = await axios.get('http://20.244.56.144/train/trains', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching train data');
  }
}

// Function to filter, process, and sort train data
function processTrainData(data) {
  // Filter out trains departing in the next 30 minutes
  const filteredTrains = data.filter(train => !isDepartingSoon(train));

  // Calculate the departure time considering delays in minutes
  const processedTrains = filteredTrains.map(train => ({
    ...train,
    calculatedDepartureTime: calculateDepartureTime(train),
  }));

  // Sort by prices and departure time
  processedTrains.sort((a, b) => {
    if (a.price === b.price) {
      return b.calculatedDepartureTime - a.calculatedDepartureTime;
    }
    return a.price - b.price;
  });

  return processedTrains;
}

function isDepartingSoon(train) {
  // Example: Assuming train.departureTime is in minutes
  const currentTime = getCurrentTimeInMinutes();
  return train.departureTime <= currentTime + 30;
}

// Placeholder: Implement logic to calculate departure time considering delays in minutes
function calculateDepartureTime(train) {
  // Example: Assuming train.delay is in minutes
  return train.departureTime + train.delay;
}

// Placeholder: Implement logic to get the current time in minutes
function getCurrentTimeInMinutes() {
  // Example: You can use JavaScript Date to get the current time and convert it to minutes
  const currentTime = new Date();
  return currentTime.getHours() * 60 + currentTime.getMinutes();
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


