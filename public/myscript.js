const socket = io();
const messagesUl = document.getElementById("messages");
const messageBoxInput = document.getElementById("messageBox");

function main() {
    initInput();
    socket.on("chat message", (message) => {
        appendLi(`Anonymous User: ${message}`)
    });
}

function sendMessage(message) {
    /**
     * Sends message to the socket backend server
     */
    socket.emit("chat message", message);
}

function appendLi(text) {
    let newLi = document.createElement("li");
    newLi.innerHTML = text;
    messagesUl.appendChild(newLi);
}

function initInput() {
    /**
     * This function is ran to add eventlisteners to the
     * input box
     */
    const runFunction = () => {
        let message = messageBoxInput.value;
        sendMessage(message);
        appendLi(`You: ${message}`);
        messageBoxInput.value = "";
    };

    messageBoxInput.addEventListener("keyup", event => {
        if ("Enter" === event.key) runFunction();
    });
}

main();
