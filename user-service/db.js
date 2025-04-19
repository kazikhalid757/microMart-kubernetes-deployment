const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgres',          // This should match the Kubernetes service name for PostgreSQL
  port: 5432,
  user: 'myuser',
  password: 'mypassword',
  database: 'micromart',
});

pool.connect()
  .then(() => console.log('✅ Database connected successfully!'))
  .catch(err => console.error('❌ Database connection failed:', err.stack));

module.exports = pool;
