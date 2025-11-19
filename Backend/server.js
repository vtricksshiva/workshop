const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'react_app_db'
};

// Create database connection pool
const pool = mysql.createPool(dbConfig);

// Initialize database tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create users table with consistent column names
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        bio TEXT,
        profile_picture VARCHAR(500),
        role ENUM('user', 'admin') DEFAULT 'user',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL
      )
    `);
    
    // Create posts table for user activities
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_created_at (created_at)
      )
    `);
    
    // Create comments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_post_id (post_id),
        INDEX idx_user_id (user_id)
      )
    `);
    
    // Create likes table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS likes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_like (post_id, user_id),
        INDEX idx_post_id (post_id),
        INDEX idx_user_id (user_id)
      )
    `);
    
    // Create user_profiles table for extended profile information
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        date_of_birth DATE,
        location VARCHAR(255),
        website VARCHAR(255),
        phone_number VARCHAR(20),
        occupation VARCHAR(255),
        company VARCHAR(255),
        education TEXT,
        skills TEXT,
        interests TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    
    // Create password_reset_tokens table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_token (token),
        INDEX idx_user_id (user_id)
      )
    `);

    // Insert default users with CORRECT COLUMN NAMES
    await connection.execute(`
      INSERT IGNORE INTO users (email, password, name, bio, profile_picture, role) 
      VALUES 
      ('admin@example.com', 'admin123', 'Admin User', 'System Administrator', 'https://via.placeholder.com/150/007bff/ffffff?text=Admin', 'admin'),
      ('user@example.com', 'user123', 'John Doe', 'Software Developer', 'https://via.placeholder.com/150/28a745/ffffff?text=John', 'user')
    `);
    
    connection.release();
    console.log('All database tables initialized successfully');
    console.log('Default users created:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: user@example.com / user123');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Get user from database
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password - PLAIN TEXT COMPARISON (NO HASHING)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login time
    await pool.execute(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return user data (excluding password) - using correct column names
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      bio: user.bio,
      profilePicture: user.profile_picture,
      role: user.role
    };

    res.json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify token endpoint
app.get('/api/auth/verify', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT id, email, name, bio, profile_picture as profilePicture, role FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile endpoint
app.put('/api/profile/update', authenticateToken, async (req, res) => {
  try {
    const { name, bio, profilePicture } = req.body;
    const userId = req.user.userId;

    // Update user in database - using profile_picture column
    await pool.execute(
      'UPDATE users SET name = ?, bio = ?, profile_picture = ? WHERE id = ?',
      [name, bio, profilePicture, userId]
    );

    // Get updated user data - using alias
    const [users] = await pool.execute(
      'SELECT id, email, name, bio, profile_picture as profilePicture, role FROM users WHERE id = ?',
      [userId]
    );

    res.json({
      message: 'Profile updated successfully',
      user: users[0]
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register endpoint - UPDATED TO USE POOL INSTEAD OF DB
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log("Registration attempt:", email, password, name);

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists - USING POOL
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Default values for the new customer
    const bio = ''; // Empty bio
    const profile_picture = ''; // Empty profile picture
    const role = 'user'; // Set role as user (not customer)
    const is_active = 1; // Active by default

    // Insert new user WITH PLAIN PASSWORD (to match your login logic)
    const [result] = await pool.execute(
      `INSERT INTO users (email, password, name, bio, profile_picture, role, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        password, // Using plain password to match your login
        name,
        bio,
        profile_picture,
        role,
        is_active
      ]
    );

    // Get the newly created user (without password)
    const [newUsers] = await pool.execute(
      `SELECT id, email, name, bio, profile_picture, role, is_active, created_at, updated_at, last_login 
       FROM users WHERE id = ?`,
      [result.insertId]
    );

    const newUser = newUsers[0];

    // Generate JWT token for auto-login after registration
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        bio: newUser.bio,
        profilePicture: newUser.profile_picture,
        role: newUser.role,
        isActive: newUser.is_active,
        createdAt: newUser.created_at,
        lastLogin: newUser.last_login
      },
      token: token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server running on port ${PORT}`);
});