const { Pool } = require('pg');

let connectionString = process.env.DATABASE_URL;

if (connectionString) {
  // Replace sslmode parameter to silence pg-connection-string deprecation warning
  connectionString = connectionString.replace(/([?&])sslmode=[^&]+/i, '$1sslmode=verify-full');
}

const pool = new Pool({
  connectionString,
  ssl: connectionString && !connectionString.includes('localhost')
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;
