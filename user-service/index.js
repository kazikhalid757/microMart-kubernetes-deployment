const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users');
  res.json(rows);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  await db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
  res.send('User created');
});

app.listen(3000, () => {
  console.log('User service running on port 3000');
});
