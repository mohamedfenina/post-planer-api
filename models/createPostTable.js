// createTable.js
const mysql = require('mysql');
const pool = require('../connectionPool');

// SQL query to create the 'posts' table if it doesn't exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        date VARCHAR(255) default current_timestamp(),
        imagePath VARCHAR(255)
    )
`;

// Using the pool to handle the query to create the table
pool.query(createTableQuery, (error) => {
    if (error) {
        console.error('Error creating table:', error);
    } else {
        console.log('Table "posts" created or already exists');
    }
});
