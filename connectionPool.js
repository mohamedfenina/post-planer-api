// connectionPool.js
const mysql = require('mysql');

// Create MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Maximum number of connections in the pool
    host: 'localhost', // MySQL server hostname
    user: 'root', // MySQL username
    password: '', // MySQL password
    database: 'post_planer' // MySQL database name
});

// Export the connection pool for use in other modules
module.exports = pool;
