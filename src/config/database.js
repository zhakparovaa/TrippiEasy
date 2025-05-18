const mongoose = require('mongoose');

     const connectDB = async () => {
       try {
         const uri = process.env.MONGO_URI;
         if (!uri) throw new Error('MONGO_URI is not defined in .env');
         await mongoose.connect(uri, {
           
           useNewUrlParser: true, 
           useUnifiedTopology: true, 
         });
         console.log('MongoDB connected');
       } catch (err) {
         console.error('MongoDB connection error:', err);
         throw err;
       }
     };

     module.exports = connectDB;