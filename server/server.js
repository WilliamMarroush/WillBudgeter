// Import necessary modules for setting up the server
const express = require('express');  // Express framework to handle HTTP requests
const cors = require('cors');  // CORS middleware to allow cross-origin requests
const bodyParser = require('body-parser');  // Middleware to parse incoming request bodies

// Create an instance of express application
const app = express();
const PORT = 5000;  // Set the server port number

// Import the routes for handling authentication
const authRoutes = require('./routes/authRoutes');

// Middleware setup
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse JSON data in request bodies
app.use(express.json());  // Use express's built-in JSON parser
app.use(express.urlencoded({ extended: true }));  // Handle URL-encoded data

// Use authentication routes for any requests starting with '/api/auth'
app.use('/api/auth', authRoutes);

// Simple test route to check if the server is running
app.get(`/api/test`, (req, res) => {
    res.send(`Server is running on port: ${PORT}`);
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
