// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route (GET request)
router.get('/login', (req, res) => {
  res.render('login.ejs'); // Assuming you have a login.ejs view file
});

// Login route (POST request)
router.post('/login', authController.loginUser);

// Signup route (GET request)
router.get('/signup', (req, res) => {
  res.render('signup.ejs'); // Assuming you have a signup.ejs view file
});

// Signup route (POST request)
router.post('/signup', authController.registerUser);

module.exports = router;
