const http = require("http");
const WebSocketServer = require("websocket").server;

let connection = null;

const httpserver = http.createServer((req, res) => {
    console.log("http server received a request");
});

const websocket = new WebSocketServer({
    "httpServer": httpserver
})

websocket.on("request", request => {
    // null for accepting any request.
    connection = request.accept(null, request.origin);

    connection.on("open", () => console.log("Connection opened"));
    connection.on("close", () => console.log("Connection closed"));
    connection.on("message", message => {
        console.log(`Message received: ${message.utf8Data}`);
    });

    sendevery3sec();
})

httpserver.listen(5050, () => console.log("http server is listening on 5050"));

function sendevery3sec() {
    connection.send(`Something ${Math.floor(Math.random()*500)}`);

    setTimeout(sendevery3sec, 3000);
}