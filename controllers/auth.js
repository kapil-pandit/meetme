// controller/auth.js
const pool = require('../config/config');

// Registration logic
// Registration logic
const register = async (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    gender,
    location
  } = req.body;

  // Check for missing fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await pool.query(
      'SELECT userid FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const result = await pool.query(
      `INSERT INTO users (
        username, email, password_hash, first_name, last_name, date_of_birth, gender, location
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING userid`,
      [username, email, hashedPassword, first_name, last_name, date_of_birth, gender, location]
    );

    // Send response
    res.status(201).json({ userid: result.rows[0].userid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};
// Login logic
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    // Check if the user exists
    const result = await pool.query(
      'SELECT userid, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password (you should hash and compare passwords in production)
    if (password !== user.password_hash) { // Use password hashing method in production
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Send response
    res.status(200).json({ userid: user.userid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login };
