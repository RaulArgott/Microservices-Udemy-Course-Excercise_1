const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
    const event = req.body;

    console.log("Event received to event-bus");
    await axios.post("http://posts-service:4000/events", event).catch(err => console.log(err));
    await axios.post("http://comments-service:4001/events", event).catch(err => console.log(err));
    await axios.post("http://query-service:4002/events", event).catch(err => console.log(err));

    console.log("Event sent to event-bus");
    res.send({ status: "OK" });
});

app.listen(4005, () => {
    console.log("Listening on port 4005");
});