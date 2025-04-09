import { useContext, useEffect, useRef } from "react";
import { VideoButton } from "./ui/video-button";
import { Mic, MicOff, Phone, VideoIcon, VideoOff } from "lucide-react";
import { CurrentDateTime } from "./CurrentDateTime";
import { VideoContext } from "../context/videoContext";
import { useVideo } from "../hooks/useVideo";
import { useAudio } from "../hooks/useAudio";
const WSVIDEO_URL = "ws://localhost:8081";

export const Video = ({ roomCode }: { 
    roomCode : string | undefined;
}) => {
    const {constraints, setConstraints} = useContext(VideoContext);
    const dataChannelRef = useRef<RTCDataChannel>();
    const { videoRef } = useVideo(constraints.video, dataChannelRef);
    useAudio(constraints.audio);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localConnectionRef = useRef<RTCPeerConnection>();
    const remoteConnectionRef = useRef<RTCPeerConnection>();
    let name: string | null;

    const onMessage = async (socket: WebSocket, parsedMsg: any) => {
        switch (parsedMsg.type) {
            case "SEND_OFFER":
                const localConnection = new RTCPeerConnection();
                const dataChannel = localConnection.createDataChannel("channel");

                if (constraints.videostream) {
                    constraints.videostream.getVideoTracks().forEach(track => {
                        if (track.readyState === "live"){
                            localConnection.addTrack(track);
                        }
                    })
                }

                if (constraints.audiostream) {
                    constraints.audiostream.getAudioTracks().forEach(track => {
                        if (track.readyState === "live") {
                            localConnection.addTrack(track);
                        }
                    })
                }

                localConnection.oniceconnectionstatechange = () => {
                    if (localConnection.iceConnectionState === 'failed') {
                        console.error('ICE connection failed');
                        // Retry ICE connection or notify the user
                    }
                };

                localConnection.onicecandidate = async (e) => {
                    if (!e.candidate) return;
                    socket.send(JSON.stringify({
                        type: "ADD_ICE_CANDIDATE",
                        payload: {
                            candidate: e.candidate,
                            from: "SENDER",
                            roomcode: parsedMsg.code
                        }
                    }))
                }
                
                dataChannel.onmessage = (e) => {
                    const msg = e.data;
                    console.log(JSON.parse(msg));
                }
                dataChannelRef.current = dataChannel;

                localConnection.onnegotiationneeded = async () => {
                    const offer = await localConnection.createOffer();
                    await localConnection.setLocalDescription(offer);
                    localConnectionRef.current = localConnection;
                    socket.send(JSON.stringify({
                        type: "OFFER",
                        payload: {
                            offer: offer,
                            roomcode: parsedMsg.code
                        }
                    }))
                }
                break;
            
            case "OFFER":
                (async() => {
                    const remoteConnection = new RTCPeerConnection();
                    const stream = new MediaStream();
                    if (remoteVideoRef.current) 
                        remoteVideoRef.current.srcObject = stream;

                    remoteConnection.ontrack = async (e) => {
                        console.log('Inside ontrack '+e.track.muted+ ' '+e.track.enabled);
                        // if (!remoteVideoRef.current) return;
                        //@ts-ignore
                        remoteVideoRef.current.srcObject.addTrack(e.track);
                        if (remoteVideoRef.current) 
                            await remoteVideoRef.current.play();
                    }

                    remoteConnection.oniceconnectionstatechange = () => {
                        console.log('ICE connection state:', remoteConnection.iceConnectionState);
                        if (remoteConnection.iceConnectionState === 'failed') {
                          console.error('ICE connection failed');
                          // Retry ICE connection or notify the user
                        }
                    };
                    remoteConnection.onicecandidate = async (e) => {
                        if (!e.candidate) return;
                        socket.send(JSON.stringify({
                            type: "ADD_ICE_CANDIDATE",
                            payload: {
                                candidate: e.candidate,
                                from: "RECEIVER",
                                roomcode: parsedMsg.code
                            }
                        }))
                    }
                    remoteConnection.ondatachannel = (e) => {
                        const channel = e.channel;
                        channel.onmessage = (e) => {
                            const msg = JSON.parse(e.data);
                            if (remoteConnection.iceConnectionState === "disconnected") return;
                            remoteConnection.getReceivers().forEach(receiver => {
                                if (msg.type === "VIDEO" && receiver.track.kind === "video") {
                                    receiver.track.enabled = !(receiver.track.enabled);
                                }
                                if (msg.type === "AUDIO" && receiver.track.kind === "audio") {
                                    receiver.track.enabled = !(receiver.track.enabled);
                                }
                            });
                        }
                    }

                    if (!parsedMsg.offer) return;
                    await remoteConnection.setRemoteDescription(parsedMsg.offer);
                    const answer = await remoteConnection.createAnswer();
                    await remoteConnection.setLocalDescription(answer);
                    remoteConnectionRef.current = remoteConnection;

                    socket.send(JSON.stringify({
                        type: "ANSWER",
                        payload: {
                            answer: answer,
                            roomcode: parsedMsg.code
                        }
                    }))
                })()
                break;

            case "ANSWER":
                if (!parsedMsg.answer) return;
                localConnectionRef.current?.setRemoteDescription(parsedMsg.answer);
                break;
            
            case "ADD_ICE_CANDIDATE":
                if (parsedMsg.from === undefined || parsedMsg.candidate === undefined) return;

                if (parsedMsg.from === "SENDER") {
                    remoteConnectionRef.current?.addIceCandidate(parsedMsg.candidate);

                } else {
                    localConnectionRef.current?.addIceCandidate(parsedMsg.candidate);
                }
                break;
        
            default:
                break;
        }
    }
    useEffect(() => {
        const socket = new WebSocket(WSVIDEO_URL);

        socket.onopen = () => {
            name = window.localStorage.getItem("name"); 
            if(roomCode === undefined || !name) return;
            
            socket.send(JSON.stringify({
                type: "JOINED",
                payload: {
                    userId: name,
                    roomcode: roomCode
                }
            }))
        }

        socket.onmessage = (msg) => {
            const parsedMsg = JSON.parse(msg.data);
            onMessage(socket, parsedMsg);
        }

        return () => socket.close();
    }, []);

    return (
        <div className="flex flex-col w-full h-full p-10 bg-stone-900 relative">
            <video autoPlay ref={videoRef} className="bg-transparent absolute right-4 top-4 rounded-lg h-40 w-80 object-cover overflow-hidden"></video>
            <video ref={remoteVideoRef} className="bg-black rounded-lg h-full w-full object-cover overflow-hidden"></video>
            <div className="flex justify-center items-center gap-6 mt-2 relative">
                <div className="text-xl absolute left-1">{<CurrentDateTime format="short" />}</div>
                <VideoButton 
                    active={constraints.video} 
                    activeIcon={<VideoIcon size={33}/>} 
                    passiveIcon={<VideoOff size={33}/>} 
                    onClick={() => setConstraints(cns => ({...cns, video: !constraints.video }))}
                    className="p-4"
                />
                <VideoButton 
                    active={constraints.audio} 
                    activeIcon={<Mic size={29}/>} 
                    passiveIcon={<MicOff size={29}/>} 
                    onClick={() => setConstraints(cns => ({...cns, audio: !constraints.audio }))}
                    className="p-4"
                /> 
                <VideoButton 
                    activeIcon={<Phone size={29} className="rotate-[2.35rad]"/>} 
                    passiveIcon={<Phone size={29} className="rotate-[2.35rad]"/>} 
                    onClick={() => {}}
                    className="bg-red-500/80 hover:border-red-500 hover:bg-red-500 p-4 focus:outline-none"
                /> 
            </div>
        </div>
    );
}