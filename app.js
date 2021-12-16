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
    socket.broadcast.emit("user_connected", socket.id);

    socket.on("disconnect", () => {
        let name = socket.nickname || socket.id
        console.log(`user ${name} has disconnected`);
        socket.broadcast.emit("user_disconnected", name);
    });

    socket.on("chat message", (message) => {
        let name = socket.nickname || socket.id
        console.log(`${name}: ${message}`);
        socket.broadcast.emit("chat message", {
            name: name,
            message: message,
        });
    });

    socket.on("send_nickname", (nickname) => {
        socket.nickname = nickname;
        console.log(`${socket.id} changed their username to ${nickname}`)
        io.emit("nickname_change", {
            id: socket.id,
            nickname: nickname,
        });
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
