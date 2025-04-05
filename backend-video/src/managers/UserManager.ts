import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager";

enum RTCEventType {
    JOINED,
    SEND_OFFER,
    OFFER,
    ANSWER,
    LEFT
}

export interface User {
    userId : string;
    socket : WebSocket;
}

interface RTCPayload {
    type     : string;
    userId   : string;
    roomcode : string;
    socket   : WebSocket;
    payload  : {
        offer  ?: RTCSessionDescription;
        answer ?: RTCSessionDescription;
    } 
}

export class UserManager {
    private roomManager: RoomManager;
    constructor() {
        this.roomManager = new RoomManager();
    }
    addUser(data: RTCPayload) {
        const user: User = {
            userId: data.userId,
            socket: data.socket
        }
        this.roomManager.createRoom(user, data.roomcode);
    }
    removeUser(data: RTCPayload) {
        this.roomManager.destroyRoom(data.roomcode);
    }
    handleEvents(parsedData: RTCPayload) {
        const parsedType = parsedData.type;
        const parsedUser = parsedData.userId;
        const parsedCode = parsedData.roomcode;

        switch (parsedType) {
            case 'OFFER':
                const offer = parsedData.payload.offer;
                if (offer === undefined) return;
                this.roomManager.onOffer(parsedCode, parsedUser, offer);
                break;

            case 'ANSWER':
                const answer = parsedData.payload.answer;
                if (answer === undefined) return;
                this.roomManager.onAnswer(parsedCode, parsedUser, answer);
                break;  

            default:
                break;
        }
    }
} 