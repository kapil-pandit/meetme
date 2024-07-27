// routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');

// Use authentication routes
router.use('/auth', authRoutes);

router.post('/public',(req, res)=> {
    res.send("Hello")
})

module.exports = router;
