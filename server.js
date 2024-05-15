// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://sp21bse022:yousafzaI13@product.mrpqpvz.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Body parser middleware
app.use(express.json());

// Define routes
app.use('/api', require('./routes'));

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

