// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
console.log("auth Router");
// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
