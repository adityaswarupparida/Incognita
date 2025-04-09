import { WebSocket } from "ws";

export interface User {
    userId : string;
    socket : WebSocket;
}

export interface RTCPayload {
    type     : string;
    payload  : {
        userId   : string;
        roomcode : string;
        from     : "SENDER" | "RECEIVER";
        candidate: RTCIceCandidate;
        offer    : RTCSessionDescription;
        answer   : RTCSessionDescription;
    } 
}