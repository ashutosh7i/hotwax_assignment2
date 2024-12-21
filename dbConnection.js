const mysql = require("mysql2/promise");

// Create a connection pool  
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    debug: true,
});

// Test database connection
const testConnection = async () => {
    try {
        const conn = await pool.getConnection();
        console.log("Connected to database");
        conn.release();
    } catch (err) {
        console.error("Error connecting to database", err);
    }
};

module.exports = { pool, testConnection };