const io = require("socket.io")(5000, {
    cors: {
        origin: ["http://localhost:8080"]
    }
});

io.on("connection", socket => {
    // console.log(`Welcome ${socket.id}`);
    
    socket.on("sending-message", (name, msg, room) => {
        // console.log(`Server got ${name} ${msg} \n And respond with: `);
        // io.emit("message-received", name, msg); // Only if the client show message after recceiving event

        if (room === "") {//Public
            socket.broadcast.emit("message-received", name, msg);
        }

        socket.to(room).emit("message-received", name, msg); //This is for DM
        // But I'll work on this later
        // socket.broadcast.emit("message-received", name, msg);
    });

    socket.on("join-room", (roomID, callbackFunc) => {
        socket.join(roomID);
        // io.to(roomID).emit("room-joined", socket.id, roomID);
        callbackFunc(`You've joined ${roomID}`);
    })
});

