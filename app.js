const express = require('express');
const cors = require('cors');
const destinationRoutes = require('./routes/destinations');
const inineraryRoutes = require('./routes/itineraries');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/destinations', destinationRoutes);
app.use('/api/itineraries', inineraryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });