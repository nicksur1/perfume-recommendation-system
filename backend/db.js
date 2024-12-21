const { Pool } = require("pg");
require("dotenv").config();

console.log("Connecting to database with these settings:");
console.log({
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "uhaveebola321",
    host: process.env.PGHOST || "localhost",
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || "perfumedb",
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false, // Disable SSL for local development
  });


(async () => {
    try {
      const client = await pool.connect();
      console.log("Connected to the database successfully!");
      client.release(); // Release the client back to the pool
    } catch (err) {
      console.error("Error connecting to the database:", err.message);
    }
  })();
  

module.exports = pool;

console.log("DATABASE_URL:", process.env.DATABASE_URL);
