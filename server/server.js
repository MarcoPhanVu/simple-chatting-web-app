const io = require("socket.io")(5000, {
    cors: {
        origin: ["http://localhost:8080"]
    }
});

console.log("||");
console.log("||");
console.log("||");
console.log("||");
console.log("||");

io.on("connection", socket => {
    // console.log(`Welcome ${socket.id}`);
    
    socket.on("sending-message", (name, msg) => {
        // console.log(`Server got ${name} ${msg} \n And respond with: `);
        // io.emit("message-received", name, msg); // Only if the client show message after recceiving event
        socket.broadcast.emit("message-received", name, msg);
    });
});

