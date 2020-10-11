const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const initialize_postgres = async () => {
  await pool.connect();
  const res = await pool.query(`CREATE TABLE IF NOT EXISTS USER {
    username VARCHAR(32)
  }`);
  await pool.end();
};
module.exports = initialize_postgres;
