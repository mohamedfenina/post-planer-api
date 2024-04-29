// getAllPosts.js
const express = require('express');
const pool = require('../../connectionPool');

const router = express.Router();

router.get('/', (req, res) => {
    // SQL query to retrieve all posts from the database
    const query = 'SELECT * FROM posts ORDER BY date DESC';

    // Using the pool to handle the query
    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        const postsWithImageUrl = results.map(post => {
            // Construct the imageUrl using protocol, host, and imagePath from the post
            const imageUrl = `${req.protocol}://${req.get('host')}/${post.imagePath}`;
            // Return the modified post object with the imageUrl added
            return { ...post, imageUrl: imageUrl };
        });

        res.status(200).json({ code: res.statusCode, message: 'get successfully', data: postsWithImageUrl });
    });
});

module.exports = router;
