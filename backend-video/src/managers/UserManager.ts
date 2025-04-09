import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager";
import { RTCPayload, User } from "../types";

export class UserManager {
    private roomManager: RoomManager;
    constructor() {
        this.roomManager = new RoomManager();
    }
    addUser(socket: WebSocket, data: RTCPayload) {
        const user: User = {
            userId: data.payload.userId,
            socket: socket
        }
        this.roomManager.createRoom(user, data.payload.roomcode);
    }
    removeUser(data: RTCPayload) {
        this.roomManager.destroyRoom(data.payload.roomcode);
    }
    handleEvents(socket: WebSocket, parsedData: RTCPayload) {
        const parsedType = parsedData.type;
        const parsedCode = parsedData.payload.roomcode;

        switch (parsedType) {
            case 'OFFER':
                const offer = parsedData.payload.offer;
                if (offer === undefined) return;
                this.roomManager.onOffer(parsedCode, socket, offer);
                break;

            case 'ANSWER':
                const answer = parsedData.payload.answer;
                if (answer === undefined) return;
                this.roomManager.onAnswer(parsedCode, socket, answer);
                break;  

            case 'ADD_ICE_CANDIDATE':
                const candidate = parsedData.payload.candidate;
                const fromUser = parsedData.payload.from;

                if (candidate === undefined || fromUser === undefined) return;
                this.roomManager.onIceCandidate(parsedCode, socket, candidate, fromUser);
                break;

            default:
                break;
        }
    }
} 