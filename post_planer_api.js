require('./models/createDatabase');

const express = require('express');
const app = express();
const {join} = require("node:path");
app.use('/uploads', express.static(join(__dirname, 'uploads')));


const createPostRouter = require('./routes/posts/createPost');
const getAllPostsRouter = require('./routes/posts/getAllPosts');










app.use(express.json()); // For parsing application/json
app.use('/createPost', createPostRouter);
app.use('/getAllPosts', getAllPostsRouter);


// Create a MySQL connection pool

//function to create new post


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port',PORT);
});