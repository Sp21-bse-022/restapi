// models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true // Add this line to create an index on the email field
    },
    age: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });
// Hash password before saving

userSchema.pre('save', async function(next) {
    if (this.isModified('password') && this.password !== undefined) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
