const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM products');
  res.json(rows);
});

app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  await db.query('INSERT INTO products (name, price) VALUES ($1, $2)', [name, price]);
  res.send('Product added');
});

app.listen(3001, () => {
  console.log('Product service running on port 3001');
});
