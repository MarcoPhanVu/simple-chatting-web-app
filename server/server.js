const io = require("socket.io")(3000, {
    cors: [

    ]
}); //port 8080

console.log("Connecting?");

io.on("connection", socket => {
    socket.emit("chat-message", "Hello user");
    console.log(`welcome ${socket.id}`);
});