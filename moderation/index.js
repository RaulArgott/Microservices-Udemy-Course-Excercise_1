const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    console.log("Event received to moderation-service");

    if (type === "CommentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved";

        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentModerated",
            data: {
                ...data,
                status,
            },
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log("Listening on port 4003");
});