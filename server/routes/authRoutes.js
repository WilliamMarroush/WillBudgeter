// Importing express to set up the routing functionality
const express = require('express');
const router = express.Router(); // Initialize a new router instance

// Import the signUp and signIn functions from the authController
const { signUp, signIn } = require('../controllers/authController');

// Route for handling POST requests to '/signup' for user registration
router.post('/signup', signUp);

// Route for handling POST requests to '/signin' for user login
router.post('/signin', signIn);

// Export the router so it can be used in the main server file (e.g., app.js)
module.exports = router;
