import { useContext, useEffect, useRef } from "react";
import { VideoButton } from "./ui/video-button";
import { Mic, MicOff, Phone, VideoIcon, VideoOff } from "lucide-react";
import { CurrentDateTime } from "./CurrentDateTime";
import { VideoContext } from "../context/videoContext";
const WSVIDEO_URL = "ws://localhost:8081";

export const Video = ({ roomCode }: { 
    roomCode : string | undefined;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const {constraints, setConstraints} = useContext(VideoContext);

    useEffect(() => {
        const socket = new WebSocket(WSVIDEO_URL);

        socket.onopen = () => {
            if(roomCode === undefined) return;

            socket.send(JSON.stringify({
                type: "JOINED",
                socket: socket,
                room: roomCode,
                payload: {}
            }))
        }

        socket.onmessage = (msg) => {
            const parsedMsg = JSON.parse(msg.data);
            switch (parsedMsg.type) {
                case "SEND_OFFER":
                    
                    break;
                
                case "OFFER":
                
                    break;
                case "ANSWER":
                    
                    break;
            
                default:
                    break;
            }
        }
    }, []);

    useEffect(() => {
        (async () => {
        if (videoRef && videoRef.current) {
            // refrain assigning twice to srcobj to prevent load while playing
            if (!constraints.videostream || videoRef.current.srcObject) return;
            
            console.log('Play video!!')
            videoRef.current.srcObject = constraints.videostream;
            await videoRef.current.play();
        }})();
    }, [videoRef])

    return (
        <div className="flex flex-col w-full h-full p-10 bg-stone-900 relative">
            <video className="bg-red-400 absolute right-4 top-4 rounded-lg"></video>
            <video ref={videoRef} className="bg-black rounded-lg h-full w-full object-cover overflow-hidden"></video>
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