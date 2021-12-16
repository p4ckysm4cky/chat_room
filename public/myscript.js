const socket = io();
const messagesUl = document.getElementById("messages");
const messageBoxInput = document.getElementById("messageBox");
const toggleMenuBtn = document.getElementById("toggleMenu");
const menuBoxDiv = document.getElementById("menuBox");
const nicknameInput = document.getElementById("nicknameInput");
const changeBtn = document.getElementById("changeBtn");

function main() {
    initInput();
    initToggleMenu();
    initChangeNickname();
    socket.on("chat message", (data) => {
        const { name, message } = data;
        appendLi(`${name}: ${message}`);
    });
    socket.on("user_connected", (userId) => {
        appendLi(`${userId} has connected`);
    });
    socket.on("user_disconnected", (userId) => {
        appendLi(`${userId} has disconnected`);
    });
    socket.on("nickname_change", (data) => {
        const { id, nickname } = data;
        appendLi(`${id} has changed their nickname to ${nickname}`);
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
    /**
     * adds even listener to the left button to toggle
     * the menu on the right hand side
     */
    toggleMenuBtn.addEventListener("click", (event) => {
        if (menuBoxDiv.style.display === "none")
            menuBoxDiv.style.display = "flex";
        else menuBoxDiv.style.display = "none";
    });
}

function initChangeNickname() {
    /**
     * adds eventlistener to change button
     * and nickname input
     * to emit nickname to socket server
     */
    const runFunction = () => {
        if (nicknameInput.value !== "") {
            socket.emit("send_nickname", nicknameInput.value);
            nicknameInput.value = "";
        }
    };

    changeBtn.addEventListener("click", (event) => {
        runFunction();
    });
    nicknameInput.addEventListener("keyup", (event) => {
        if ("Enter" === event.key) runFunction();
    });
}

main();
