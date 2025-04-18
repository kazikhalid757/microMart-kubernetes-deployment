import express from 'express';
import { Sequelize } from 'sequelize';  // ES6 import for Sequelize
import db from './db';  // Assuming db is a pg Pool or Sequelize instance

const app = express();

// Sequelize connection
const sequelize = new Sequelize(process.env.DB_URI);

sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully.'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

app.use(express.json());

// Products routes
app.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  try {
    await db.query('INSERT INTO products (name, price) VALUES ($1, $2)', [name, price]);
    res.send('Product added');
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Health check route
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).send('DB is connected');
  } catch (err) {
    res.status(500).send('DB is not connected');
  }
});

// Start the service
app.listen(3001, () => {
  console.log('Product service running on port 3001');
});
