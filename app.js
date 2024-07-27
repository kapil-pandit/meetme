// app.js
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const cors = require("cors")
// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', indexRouter);
app.use(cors());
module.exports = app;
