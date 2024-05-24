// routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authRoutes = require('./authRoutes');

router.use(authRoutes);
// Create a user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Update a user
router.patch('/users/:id', userController.updateUser);

// Delete a user
router.delete('/users/:id', userController.deleteUser);


module.exports = router;
