const io = require("socket.io")(5050); //port 5050

io.on("connection", socket => {
    socket.emit("chat-message", "Hello user")
});