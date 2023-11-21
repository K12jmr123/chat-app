// server/login/login.js
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

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if required fields are present
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Check if the user exists and the password is correct
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 1) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

module.exports = router;
