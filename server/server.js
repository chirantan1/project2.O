const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// MySQL database connection
const db = mysql.createPool({
  host: 'localhost', // MySQL host
  user: 'root',      // MySQL username
  password: 'chirantan@321',      // MySQL password
  database: 'hospital_db', // Your MySQL database name
});

// MongoDB connection URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/authDB';

// MongoDB User Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// MongoDB routes for user authentication
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      return res.json({ message: 'Login successful' });
    }
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// MySQL-based route for patient data
const patientRoutes = require('./routes/patients');
app.use('/api/patients', patientRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
