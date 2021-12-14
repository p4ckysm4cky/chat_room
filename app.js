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

io.on("connection", (socket) => {
    console.log("A user has connected");
    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});