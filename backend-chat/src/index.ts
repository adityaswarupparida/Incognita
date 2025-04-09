import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface UserSocket {
    socket: WebSocket;
    roomId: string;
    userId: string;
}

let sockets: UserSocket[] = [];
let socketUserMap = new Map<WebSocket, string>();

wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());

        switch (parsedMessage.type) {
            case "join":
                sockets.push({
                    socket,
                    roomId: parsedMessage.payload.roomId,
                    userId: parsedMessage.payload.userId
                })

                socketUserMap.set(socket, parsedMessage.payload.userId);
                sockets.forEach((skt) => {
                    if(skt.roomId === parsedMessage.payload.roomId) {
                        skt.socket.send(JSON.stringify({
                            type: "join",
                            payload: {
                                message: parsedMessage.payload.userId+" joined the chat",
                            }
                        }));
                    }
                })
                break;
        
            case "chat":
                const roomToBeSent = sockets.find(skt => skt.socket == socket)?.roomId;
                sockets.forEach((skt) => {
                    if(skt.roomId === roomToBeSent) {
                        skt.socket.send(JSON.stringify({
                            type: "chat",
                            payload: {
                                message: parsedMessage.payload.message,
                                userId : parsedMessage.payload.userId,
                            }
                        }));
                    }
                })
                break;

            default:
                break;
        }
    });

    socket.on("close", () => {
        const roomToBeSent = sockets.find(skt => skt.socket == socket)?.roomId;
        sockets.forEach((skt) => {
            if(skt.roomId === roomToBeSent) {
                skt.socket.send(JSON.stringify({
                    type: "left",
                    payload: {
                        message: socketUserMap.get(socket)+" left the chat",
                    }
                }));
            }
        })
        sockets = sockets.filter((skt) => skt.socket != socket);        
    });
})