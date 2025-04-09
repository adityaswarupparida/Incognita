import { WebSocket } from "ws";
import { User } from "../types";

export class RoomManager {
    private roomUsers: Map<string, User[]>;
    constructor() {
        this.roomUsers = new Map<string, User[]>();
    }
    createRoom(user: User, code: string) {
        let users = this.roomUsers.get(code);
        // restrict more than 2 users in a room for video-chatting
        if (users !== undefined && users.length == 2) return;

        if (this.roomUsers.has(code)) {
            this.roomUsers.get(code)?.push(user);
        } else {
            this.roomUsers.set(code, [user]);
        }
        users = this.roomUsers.get(code);
        // don't send offer for less than 2 users
        if (users === undefined || users.length < 2) return;

        const user1 = users[0];
        const user2 = users[1];
        user1.socket.send(JSON.stringify({
            type: "SEND_OFFER",
            code: code
        }));
        user2.socket.send(JSON.stringify({
            type: "SEND_OFFER",
            code: code
        }));
    }
    destroyRoom(code: string) {
        this.roomUsers.delete(code);
    }
    onOffer(code: string, socket: WebSocket, offer: RTCSessionDescription) {
        const users = this.roomUsers.get(code);
        if (users === undefined) return;

        const remoteUser = users[0].socket === socket ? users[1] : users[0];
        remoteUser.socket.send(JSON.stringify({
            type: "OFFER",
            offer: offer,
            code : code
        }))
    }
    onAnswer(code: string, socket: WebSocket, answer: RTCSessionDescription) {
        const users = this.roomUsers.get(code);
        if (users === undefined) return;

        const remoteUser = users[0].socket === socket ? users[1] : users[0];
        remoteUser.socket.send(JSON.stringify({
            type: "ANSWER",
            answer: answer,
            code : code
        }))
    }
    onIceCandidate(code: string, socket: WebSocket, candidate: RTCIceCandidate, from: "SENDER" | "RECEIVER") {     
        const users = this.roomUsers.get(code);
        if (users === undefined) return;

        const toUser = users[0].socket === socket ? users[1] : users[0];
        toUser.socket.send(JSON.stringify({
            type: "ADD_ICE_CANDIDATE",
            candidate: candidate,
            from: from,
            code : code
        }))
    }
}