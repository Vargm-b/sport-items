const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'sport_items',
  password: 'sport',
  port: 5432,
  connectionTimeoutMillis: 3000,
});

module.exports = pool;