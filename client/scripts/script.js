import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
    addNewMessage(socket.id, `You're ${socket.id}`);
    messageBox.value = "shit happens";
});

const chattingSection = document.getElementById("chat-section");

const messageForm = document.getElementById("message-form");
const messageBox = document.getElementById("message-box");
const messageSubmit = document.getElementById("message-send");
const roomIDForm = document.getElementById("roomID-form");
const roomIDBox = document.getElementById("roomID-box");
const roomIDSubmit = document.getElementById("roomID-send");

//Common vars
const randomRange = (min, max) => Math.floor(Math.random()*(max-min)) + min;

messageForm.addEventListener("submit", ev => {
    ev.preventDefault();
    const msg = messageBox.value;
    const roomID = roomIDBox.value;
    // let tempName = "temp-name";

    if (msg === "") return;
    
    addNewMessage(socket.id, msg);
    socket.emit("sending-message", socket.id, msg, roomID);
})

socket.on("message-received", (name, msg) => {
    addNewMessage(name, msg);
})

// socket.on("room-joined", (name, roomID) => {
//     let msg = `${name} has just joined ${roomID}`;
//     addNewMessage("Server", msg);
// })

function addNewMessage(name="no one", msg) {
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


roomIDForm.addEventListener("submit", ev => {
    ev.preventDefault();
    const roomID = roomIDBox.value;

    if (roomID === "") return;

    socket.emit("join-room", roomID, inform => {
        addNewMessage(socket.id, inform); //Callback Function
        //A function to show that the user is in any room
    });
})


const userList = [
    "Yang hồ Tân Phong",
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
    }, 8000);
}

// sendRandomMessage();