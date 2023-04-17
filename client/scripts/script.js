
// import { io } from "../node_modules/socket.io-client";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

socket.on("connection", data => {
    console.log(`received ${data}`);
});

const chattingSection = document.getElementById("chat-section");

const messageForm = document.getElementById("message-form");
const messageBox = document.getElementById("message-box");
const messageSubmit = document.getElementById("message-send");
messageBox.value = "shit happens";
const roomIDForm = document.getElementById("roomID-form");
const roomIDBox = document.getElementById("roomID-box");
const roomIDSubmit = document.getElementById("roomID-send");

//Common vars
const randomRange = (min, max) => Math.floor(Math.random()*(max-min)) + min;


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

    chattingSection.scrollTop = chattingSection.scrollHeight;
}

function join(id) {
    console.log(`joined room ${id}`);
}

const chatMsg = document.querySelectorAll(".chat-message");


const userList = [
    "Thí Di",
    "Tứn Cà Mu",
    "cô Tiên xanh",
    "Gâu Gẩu Gầu Gâu",
    "Meu Multimedia",
    "Chym Éng",
    "Ngĩn Híu",
    "Bắp xào"
];

const randomMessages = [
    "mở toóc sô đi mọi người",
    "mầy khoải",
    "đâu đâu",
    "cho coi cái này nè",
    "ê kể nè",
    "thôi để bữa nào kể",
    "đá cái hẹn",
    "ê tuần sau đi chơi đi",
    "mãi keo",
    "quỷ 2 mặt",
    "quỷ này",
    "má mì của toy",
    "muốn được phú bà bao nuôi",
    "lóc",
    "cứ vậy mãi thoai",
];


function sendRandomMessage() {
    addNewMessage(
        randomMessages[randomRange(0, randomMessages.length)], 
        userList[randomRange(0, userList.length)]
    );

    setTimeout(() => {
        sendRandomMessage();
        console.log("sendRandomMessage again");
    }, 10000);
}

sendRandomMessage();