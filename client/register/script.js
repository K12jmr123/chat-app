// server/register/register.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const router = express.Router();
router.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat-app'
});

connection.connect();

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if required fields are present
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Check if username or email is already taken
  connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Username or email already taken' });
    }

    // Store the user information in the database
    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      return res.status(201).json({ message: 'Registration successful' });
    });
  });
});

module.exports = router;
