const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, age, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create a new user
        const user = new User({ name, email, age, password: hashedPassword });

        // Save the user to the database
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        // Respond with the user and token
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Log in an existing user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true }); // Store the token in a cookie
        res.redirect('/homepage'); // Redirect to homepage after successful login
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
