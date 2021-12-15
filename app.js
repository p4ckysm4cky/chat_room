const express = require("express");
const http = require("http");
const { Server } = require("socket.io"); // object destructuring

const app = express();
// we need to do this because we will run socket.io on the same server
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/myscript.js", (req, res) => {
    res.sendFile(__dirname + "/public/myscript.js");
});

app.get("/styles.css", (req, res) => {
    res.sendFile(__dirname + "/public/styles.css");
});

io.on("connection", (socket) => {
    console.log("A user has connected");
    socket.broadcast.emit("user connected", socket.id);

    socket.on("disconnect", () => {
        console.log(`user ${socket.id} has disconnected`);
        socket.broadcast.emit("user disconnected", socket.id);
    });

    socket.on("chat message", (message) => {
        console.log(`${socket.id}: ${message}`);
        socket.broadcast.emit("chat message", {
            id: socket.id,
            message: message,
        });
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
