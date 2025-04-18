const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  }
});

pool.connect()
  .then(() => console.log('✅ Database connected successfully!'))
  .catch(err => console.error('❌ Database connection failed:', err.stack));

module.exports = pool;
