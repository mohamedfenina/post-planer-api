// createDatabase.js
const mysql = require('mysql');

// Function to create MySQL connection pool and initialize database if not exists
function createDatabase() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    });

    // SQL query to create the database if it doesn't exist
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS post_planer`;

    // Connect to MySQL and create the database
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return;
        }

        connection.query(createDatabaseQuery, (error) => {
            if (error) {
                console.error('Error creating database:', error);
            } else {
                console.log('Database "post_planer" created or already exists');
                require('./createPostTable');
            }
            // Close the connection
            connection.end();
        });
    });
}

// Call the function to create the database
createDatabase();
