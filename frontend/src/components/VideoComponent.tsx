import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { VideoButton } from "./ui/video-button";
import { VideoContext } from "../context/videoContext";

export const VideoComponent = () => {
    const { constraints, setConstraints } = useContext(VideoContext);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videonotstarted = useRef(true);
    const audionotstarted = useRef(true);

    const toggleVideo = async () => {
        if (constraints.video) {
            if (!videoRef.current || !videonotstarted.current) return;
            // to prevent turning on camera twice initially
            videonotstarted.current = false;
            const stream = await window.navigator.mediaDevices.getUserMedia({
                video: true
            });
            setConstraints(cns => ({...cns, videostream: stream}));
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } else {
            if (constraints.videostream === undefined || !videoRef.current) return;
            constraints.videostream.getVideoTracks().forEach(track => {
                if (track.readyState == 'live')
                    track.stop();
            })
            videonotstarted.current = true;
            videoRef.current.srcObject = null;
        }
    }

    const toggleAudio = async () => {
        if (constraints.audio) {
            if (!audionotstarted.current) return;
            audionotstarted.current = false;
            const stream = await window.navigator.mediaDevices.getUserMedia({
                audio: true
            });
            setConstraints(cns => ({...cns, audiostream: stream}));
        } else {
            if (!constraints.audiostream) return;
            constraints.audiostream.getAudioTracks().forEach(track => {
                if (track.readyState == "live")
                    track.stop();
            })
            audionotstarted.current = true;
        }
    }

    useEffect(() => {
        toggleVideo();
    }, [constraints.video])

    useEffect(() => {
        toggleAudio();
    }, [constraints.audio])

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