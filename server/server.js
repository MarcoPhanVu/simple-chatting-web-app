const io = require("socket.io")(5000, {
    cors: {
        origin: ["http://localhost:8080"]
    }
});

console.log("Connecting?");

io.on("connection", socket => {
    socket.emit("chat-message", "Hello user");
    console.log(`Welcome ${socket.id}`);
});