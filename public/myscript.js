const socket = io();
const messagesUl = document.getElementById("messages");
const messageBoxInput = document.getElementById("messageBox");
const toggleMenuBtn = document.getElementById("toggleMenu");
const menuBoxDiv = document.getElementById("menuBox");

function main() {
    initInput();
    initToggleMenu();
    socket.on("chat message", (data) => {
        const { id, message } = data;
        appendLi(`${id}: ${message}`);
    });
    socket.on("user connected", (userId) => {
        appendLi(`${userId} has connected`);
    });
    socket.on("user disconnected", (userId) => {
        appendLi(`${userId} has disconnected`);
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
    // scroll to bottom of screen when message is received;
    window.scrollTo(0, document.body.scrollHeight);
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

    messageBoxInput.addEventListener("keyup", (event) => {
        if ("Enter" === event.key) runFunction();
    });
}

function initToggleMenu() {
    toggleMenuBtn.addEventListener("click" ,event => {
        if (menuBoxDiv.style.display === "none")
            menuBoxDiv.style.display = "flex";
        else
            menuBoxDiv.style.display = "none";
    })
}

main();
