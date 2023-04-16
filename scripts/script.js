const socket = io("http://localhost:5050");

socket.on("connection", data => {
    console.log(`received ${data}`);
})

const chattingSection = document.getElementById("chat-section");

const messageForm = document.getElementById("message-form");
const messageBox = document.getElementById("message-box");
const messageSubmit = document.getElementById("message-send");

messageBox.value = "shit happens"

const roomIDForm = document.getElementById("roomID-form");
const roomIDBox = document.getElementById("roomID-box");
const roomIDSubmit = document.getElementById("roomID-send");

messageForm.addEventListener("submit", ev => {
    ev.preventDefault();
    const message = messageBox.value;

    if (message === "") return;

    addNewMessage(message);
})

roomIDForm.addEventListener("submit", ev => {
    ev.preventDefault();
    const roomID = roomIDBox.value;

    if (roomID === "") return;

    join(roomID);
})

function addNewMessage(msg, name="no one") {
    let senderName = document.createElement("h4");
    senderName.classList.add("sender");
    senderName.innerHTML = name;

    let message = document.createElement("p");
    message.classList.add("message");
    message.innerHTML = msg;

    messageBox.value = "";

    let chatMessage = document.createElement("div");
    chatMessage.classList.add("chat-message");

    chatMessage.appendChild(senderName);
    chatMessage.appendChild(message);

    chattingSection.appendChild(chatMessage);
}

function join(id) {
    console.log(`joined room ${id}`);
}

const chatMsg = document.querySelectorAll(".chat-message");
console.log(chatMsg[1].children[1].innerHTML);