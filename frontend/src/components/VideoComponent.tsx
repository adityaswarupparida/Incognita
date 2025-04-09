import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { VideoButton } from "./ui/video-button";
import { VideoContext } from "../context/videoContext";
import { useVideo } from "../hooks/useVideo";
import { useAudio } from "../hooks/useAudio";

export const VideoComponent = () => {
    const { constraints, setConstraints } = useContext(VideoContext);
    const { videoRef } = useVideo(constraints.video);
    useAudio(constraints.audio);

    return (
        <div className="relative w-[640px] h-[480px]">
            <video ref={videoRef} className="bg-black rounded-md h-full w-full object-cover"></video>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex gap-6">
                    <VideoButton 
                        active={constraints.video} 
                        activeIcon={<Video size={33}/>} 
                        passiveIcon={<VideoOff size={33}/>} 
                        onClick={() => setConstraints(cns => ({...cns, video: !constraints.video }))}
                    />
                    <VideoButton 
                        active={constraints.audio} 
                        activeIcon={<Mic size={29}/>} 
                        passiveIcon={<MicOff size={29}/>} 
                        onClick={() => setConstraints(cns => ({...cns, audio: !constraints.audio }))}
                    />           
                </div>
            </div>
        </div>
    );
}