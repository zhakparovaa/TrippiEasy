const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    activities: [{
        day: Number,
        title: String,
        description: String,
        time: String,
        location: String,
        notes: String
    }],
    collaborators: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['owner', 'editor', 'viewer'],
            default: 'viewer'
        }
    }],
    shareLink: {
        type: String,
        unique: true
    },
    tips: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Method to generate a unique share link
itinerarySchema.methods.generateShareLink = function() {
    this.shareLink = Math.random().toString(36).substring(2, 15);
    return this.shareLink;
};

// Method to add a collaborator
itinerarySchema.methods.addCollaborator = function(userId, role = 'viewer') {
    this.collaborators.push({ user: userId, role });
    return this.save();
};

// Method to add a tip
itinerarySchema.methods.addTip = function(userId, content) {
    this.tips.push({ user: userId, content });
    return this.save();
};

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary; 