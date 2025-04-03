import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (socket: WebSocket) => {
    socket.on("message", () => {

    })

    socket.send("Yo Mac")
})