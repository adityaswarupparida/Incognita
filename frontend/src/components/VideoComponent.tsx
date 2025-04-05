import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";
import { VideoButton } from "./ui/video-button";

export const VideoComponent = ({ videoRef }: { 
    videoRef: RefObject<HTMLVideoElement>;
}) => {
    const [activeVideo, setActiveVideo] = useState(true);
    const [activeAudio, setActiveAudio] = useState(true);
    const [videoStream, setVideoStream] = useState<MediaStream>();
    const [audioStream, setAudioStream] = useState<MediaStream>();
    const videonotstarted = useRef(true);
    const audionotstarted = useRef(true);

    const toggleVideo = async () => {
        if (activeVideo) {
            if (!videoRef.current || !videonotstarted.current) return;
            // to prevent turning on camera twice initially
            videonotstarted.current = false;
            const stream = await window.navigator.mediaDevices.getUserMedia({
                video: true
            });
            setVideoStream(stream);
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } else {
            if (videoStream === undefined || !videoRef.current) return;
            videoStream.getVideoTracks().forEach(track => {
                if (track.readyState == 'live')
                    track.stop();
            })
            videonotstarted.current = true;
            videoRef.current.srcObject = null;
        }
    }

    const toggleAudio = async () => {
        if (activeAudio) {
            if (!audionotstarted.current) return;
            audionotstarted.current = false;
            const stream = await window.navigator.mediaDevices.getUserMedia({
                audio: true
            });
            setAudioStream(stream);
        } else {
            if (!audioStream) return;
            audioStream.getAudioTracks().forEach(track => {
                if (track.readyState == "live")
                    track.stop();
            })
            audionotstarted.current = true;
        }
    }

    useEffect(() => {
        toggleVideo();
    }, [activeVideo])

    useEffect(() => {
        toggleAudio();
    }, [activeAudio])

    return (
        <div className="relative w-[640px] h-[480px]">
            <video ref={videoRef} className="bg-black rounded-md h-full w-full object-cover"></video>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex gap-6">
                    <VideoButton 
                        active={activeVideo} 
                        activeIcon={<Video size={33}/>} 
                        passiveIcon={<VideoOff size={33}/>} 
                        onClick={() => setActiveVideo(active => !active)}
                    />
                    <VideoButton 
                        active={activeAudio} 
                        activeIcon={<Mic size={29}/>} 
                        passiveIcon={<MicOff size={29}/>} 
                        onClick={() => setActiveAudio(active => !active)}
                    />           
                </div>
            </div>
        </div>
    );
}