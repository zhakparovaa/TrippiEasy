const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const destinationRoutes = require('./routes/destinationRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3001' })); 
app.use(express.json());

app.use('/api/destinations', destinationRoutes);
app.use('/api/itineraries', itineraryRoutes);

app.use('/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();