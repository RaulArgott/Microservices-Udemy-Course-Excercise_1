const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', async (req, res) => {
    res.send(posts);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content });
    }

    res.send({});
});

app.listen(4002, () => {
    console.log('Listening on port 4002');
});