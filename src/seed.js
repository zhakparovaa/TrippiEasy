const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    const connectDB = require('./config/database');
    const Destination = require('./models/Destination');

    dotenv.config();

    const seedDestinations = async () => {
      try {
        await connectDB();
        await Destination.deleteMany(); 

        const destinations = [
          { name: 'France', flag: '🇫🇷' },
          { name: 'Italy', flag: '🇮🇹' },
          { name: 'Spain', flag: '🇪🇸' },
          { name: 'Japan', flag: '🇯🇵' },
          { name: 'Australia', flag: '🇦🇺' },
        ];

        await Destination.insertMany(destinations);
        console.log('Destinations seeded successfully');
        process.exit();
      } catch (err) {
        console.error('Error seeding destinations:', err);
        process.exit(1);
      }
    };

    seedDestinations();