const { Pool } = require('pg');

let connectionString = process.env.DATABASE_URL;

if (connectionString) {
  try {
    const parsedUrl = new URL(connectionString);
    parsedUrl.searchParams.delete('sslmode');
    parsedUrl.searchParams.delete('channel_binding');
    connectionString = parsedUrl.toString();
  } catch (err) {
    // If not a standard URL string, keep original connectionString
  }
}

const pool = new Pool({
  connectionString,
  ssl: connectionString && !connectionString.includes('localhost')
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;
