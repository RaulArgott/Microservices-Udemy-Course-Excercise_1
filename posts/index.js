const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title
    };

    console.log('Event received to create a post');
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    }).catch(err => console.log(err));

    console.log('Event sent to event bus'); 

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received event:', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('version 2');
    console.log('Listening on port 4000');
});