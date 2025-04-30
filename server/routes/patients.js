const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL connection setup
const db = mysql.createPool({
  host: 'localhost', 
  user: 'root',
  password: 'chirantan@321',
  database: 'hospital_db',
});

// POST route to add a patient
router.post('/', (req, res) => {
  const { name, age, gender, disease, contact, address } = req.body;

  if (!name || !age || !disease || !contact || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // MySQL query to insert patient data
  const query = 'INSERT INTO patients (name, age, gender, disease, contact, address) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, age, gender, disease, contact, address];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding patient:', err);
      return res.status(500).json({ message: 'Failed to add patient' });
    }
    res.status(201).json({ message: 'Patient added successfully' });
  });
});

module.exports = router;
