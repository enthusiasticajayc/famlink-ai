const { Pool } = require('pg');

// Fix SSL mode warning for Neon / cloud Postgres connections
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: connectionString && !connectionString.includes('localhost')
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;
