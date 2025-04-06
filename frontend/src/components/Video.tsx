import { RefObject, useEffect, useState } from "react";
import { VideoButton } from "./ui/video-button";
import { Mic, MicOff, Phone, VideoIcon, VideoOff } from "lucide-react";
import { CurrentDateTime } from "./CurrentDateTime";
const WSVIDEO_URL = "ws://localhost:8081";

export const Video = ({ videoRef, roomCode }: { 
    videoRef: RefObject<HTMLVideoElement>;
    roomCode: string | undefined;
}) => {
    const [activeVideo, setActiveVideo] = useState(true);
    const [activeAudio, setActiveAudio] = useState(true);

    useEffect(() => {
        const socket = new WebSocket(WSVIDEO_URL);

        socket.onopen = () => {
            if(roomCode === undefined) return;

            // socket.send(JSON.stringify({
            //     type: "JOINED",
            //     socket: socket,
            //     room: 
            // }))
        }
    }, []);

    return (
        <div className="flex flex-col w-full h-full p-10 bg-stone-900 relative">
            <video ref={videoRef} className="bg-red-400 absolute right-4 top-4 rounded-lg"></video>
            <video ref={videoRef} className="bg-black rounded-lg"></video>
            <div className="flex justify-center items-center gap-6 mt-2 relative">
                <div className="text-xl absolute left-1">{<CurrentDateTime format="short" />}</div>
                <VideoButton 
                    active={activeVideo} 
                    activeIcon={<VideoIcon size={33}/>} 
                    passiveIcon={<VideoOff size={33}/>} 
                    onClick={() => setActiveVideo(active => !active)}
                    className="p-4"
                />
                <VideoButton 
                    active={activeAudio} 
                    activeIcon={<Mic size={29}/>} 
                    passiveIcon={<MicOff size={29}/>} 
                    onClick={() => setActiveAudio(active => !active)}
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