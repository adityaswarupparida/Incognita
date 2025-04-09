import { WebSocketServer } from "ws";
import { UserManager } from "./managers/UserManager";

const wss = new WebSocketServer({ port: 8081 });
const userManager = new UserManager();

wss.on("connection", (socket) => {
    socket.on("message", (data) => {
        const parsedData = JSON.parse(data.toString());  
        switch (parsedData.type) {
            case 'JOINED':
                userManager.addUser(socket, parsedData);
                break;
            case 'LEFT' :
                userManager.removeUser(parsedData);
                break;
            default:
                userManager.handleEvents(socket, parsedData);
                break;
        }           
    })
})