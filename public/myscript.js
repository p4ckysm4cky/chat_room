const socket = io();

function main() {
    socket.on("chat message", (message) => {
        console.log(`Anonymous: ${message}`);
    });
}

function sendMessage(message) {
    socket.emit("chat message", message);
    console.log(`YOU: ${message}`);
}

main()