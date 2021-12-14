const socket = io();
const messagesUl = document.getElementById("messages");
const messageBoxInput = document.getElementById("messageBox");

function main() {
    socket.on("chat message", (message) => {
        console.log(`Anonymous: ${message}`);
    });
}

function sendMessage(message) {
    /**
     * Sends message to the socket backend server
     */
    socket.emit("chat message", message);
    console.log(`YOU: ${message}`);
}

main();
