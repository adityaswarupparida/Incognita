import { WebSocket, WebSocketServer } from "ws";
import { UserManager } from "./managers/UserManager";

const wss = new WebSocketServer({ port: 8081 });
const userManager = new UserManager();

wss.on("connection", (socket: WebSocket) => {
    socket.on("message", (data) => {
        const parsedData = JSON.parse(data.toString());  

        switch (parsedData.type) {
            case 'JOINED':
                userManager.addUser(parsedData);
                break;
            case 'LEFT' :
                userManager.removeUser(parsedData);
                break;
            default:
                userManager.handleEvents(parsedData);
                break;
        }
               
    })

    // socket.send("Yo Mac")
})

/**
 * {
 *      type: "sendOffer" | "offer" | "answer",
 *      userId: "......"
 *      roomcode: "XXXXXX",
 *      payload: {
 *          offer?
 *          answer?
 *      }
 * }
 */