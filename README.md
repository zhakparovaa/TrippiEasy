# Travel Planner Backend

A Node.js/Express backend for a travel planning application that allows users to:
- Browse and filter destinations
- Create and manage travel itineraries
- Share tips and experiences
- Collaborate with friends and family

## Features

### Destination Management
- Browse destinations with filtering and sorting capabilities
- Filter by country, price range, climate, and rating
- Sort by various criteria (name, rating, etc.)

### Itinerary Management
- Create and manage travel itineraries
- Add activities and details for each day
- Share itineraries with others via unique links
- Collaborate with friends and family

### Tips and Experiences
- Share travel tips and experiences
- View tips from other travelers

## API Endpoints

### Destinations
- `GET /api/destinations` - Get all destinations with filtering and sorting
- `GET /api/destinations/:id` - Get a single destination
- `POST /api/destinations` - Create a new destination
- `PUT /api/destinations/:id` - Update a destination

### Itineraries
- `GET /api/itineraries` - Get all itineraries
- `GET /api/itineraries/:id` - Get a single itinerary
- `POST /api/itineraries` - Create a new itinerary
- `PUT /api/itineraries/:id` - Update an itinerary
- `DELETE /api/itineraries/:id` - Delete an itinerary
- `POST /api/itineraries/:id/collaborators` - Add a collaborator
- `POST /api/itineraries/:id/tips` - Add a tip
- `GET /api/itineraries/share/:shareLink` - Get itinerary by share link

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv
