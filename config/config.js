// config/config.js
const { Pool } = require('pg');

// Create a new pool instance for PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'meetme',
  password: 'postgres',
  port: 5432, // Default port for PostgreSQL
});

module.exports = pool;
