const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    priceRange: {
        type: String,
        enum: ['$', '$$', '$$$', '$$$$'],
        required: true
    },
    climate: {
        type: String,
        required: true
    },
    bestTimeToVisit: {
        type: String,
        required: true
    },
    attractions: [{
        name: String,
        description: String,
        imageUrl: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

destinationSchema.statics.getFilteredDestinations = async function(filters = {}, sort = {}) {
    const query = this.find(filters);
    
    if (sort) {
        query.sort(sort);
    }
    
    return await query.exec();
};

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination; 