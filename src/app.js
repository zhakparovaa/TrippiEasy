const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itineraryRoutes = require('./routes/itineraryRoutes');
const countryRoutes = require('./routes/countryRoutes');
const activityRoutes = require('./routes/activityRoutes');
const seedRoutes = require('./routes/seedRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

mongoose.connect('mongodb://localhost:27018/trippeasy')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', itineraryRoutes);
app.use('/api', countryRoutes);
app.use('/api', activityRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));