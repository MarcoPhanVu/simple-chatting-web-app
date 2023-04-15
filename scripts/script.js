const scoket = io("http://localhost:5050")

socket.on("connection", data => {
    console.log(`received ${data}`);
})