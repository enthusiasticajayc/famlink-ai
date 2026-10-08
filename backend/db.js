const { Pool } = require('pg');

let connectionString = process.env.DATABASE_URL;

if (connectionString) {
  // Remove sslmode query parameter from URL so pg options object controls SSL behavior
  connectionString = connectionString.replace(/([?&])sslmode=[^&]*/gi, '');
}

const pool = new Pool({
  connectionString,
  ssl: connectionString && !connectionString.includes('localhost')
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;
