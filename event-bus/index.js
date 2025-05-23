const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");


const app = express();
app.use(bodyParser.json());


const events = [];

app.post("/events", async (req, res) => {
    const event = req.body;

    events.push(event);

    console.log("Event received to event-bus");

    console.log(event);

    await axios.post("http://posts-clusterip-srv:4000/events", event).catch(err => console.log(err));
    await axios.post("http://comments-clusterip-srv:4001/events", event).catch(err => console.log(err));
    await axios.post("http://query-clusterip-srv:4002/events", event).catch(err => console.log(err));
    await axios.post("http://moderation-clusterip-srv:4003/events", event).catch(err => console.log(err));

    console.log("Event sent to event-bus");
    res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log("Listening on port 4005");
});