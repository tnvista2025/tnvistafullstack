const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANT: Use YOUR actual PostgreSQL password
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'district_db',  // Your database name
  password: 'Tnvista2025', // 🔴 REPLACE THIS with your real password
  port: 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to PostgreSQL successfully');
  release();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running with PostgreSQL' });
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('📝 Signup attempt:', email);
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    
    // Create token
    const token = jwt.sign(
      { id: newUser.rows[0].id, email: newUser.rows[0].email },
      'tnvista_secret_key_2024',
      { expiresIn: '7d' }
    );
    
    console.log('✅ User created:', email);
    res.json({ user: newUser.rows[0], token });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('📝 Login attempt:', email);
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Create token
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      'tnvista_secret_key_2024',
      { expiresIn: '7d' }
    );
    
    console.log('✅ Login successful:', email);
    res.json({ 
      user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email },
      token 
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});