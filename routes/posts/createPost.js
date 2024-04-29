// createPost.js
const express = require('express');
const pool = require('../../connectionPool');
const { upload } = require('../../storage');
const {join} = require("node:path");


const router = express.Router();

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(403).json({ code: res.statusCode, error: err });
        } else {
            const { title, description, date } = req.body;
            const image = req.file ? req.file.path : null;
            if (!image) {
                return res.status(402).json({ code: res.statusCode, error: 'Image is required' });
            }

            // SQL query to insert data into the database
            let query = 'INSERT INTO posts (title, imagePath) VALUES (?, ?)';
            let queryParams = [title, image];

            // Check if description and date are provided
            if (description && date) {
                query = 'INSERT INTO posts (title, date, description, imagePath) VALUES (?, ?, ?, ?)';
                queryParams = [title, date, description, image];
            } else if (description) {
                query = 'INSERT INTO posts (title, description, imagePath) VALUES (?, ?, ?)';
                queryParams = [title, description, image];
            } else if (date) {
                query = 'INSERT INTO posts (title, date, imagePath) VALUES (?, ?, ?)';
                queryParams = [title, date, image];
            }

            // Using the pool to handle the query
            pool.query(query, queryParams, (error, results) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                res.status(200).json({ message: 'Post created successfully!', data: image });
            });
        }
    });
});

module.exports = router;
