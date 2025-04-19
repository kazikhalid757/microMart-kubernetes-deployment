const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

// Root route to check app is running
app.get('/', (req, res) => {
  res.send('Product Service is running!');
});

// Health check route to verify DB connection
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1'); // Simple query that doesn't require a table
    res.send('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).send('Database connection failed');
  }
});

// ✅ New API: Get all users
app.get('/api/products', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(3001, () => {
  console.log('Product service running on port 3001');
});