import { VideoComponent } from "./VideoComponent";
import { Video } from "./Video";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { VideoProvider } from "../context/videoContext";

export interface VideoConstraints {
    audio: boolean;
    video: boolean;
    audiostream: MediaStream | undefined;
    videostream: MediaStream | undefined;
}

export const VideoPreview = () => {
    const [showVideo, setShowVideo] = useState(false);
    const params = useParams();

    return (
        <VideoProvider>
            <div className="flex h-screen items-center justify-center">
                {!showVideo && 
                    <div className="flex flex-col justify-between gap-4">
                        <VideoComponent />
                        <button onClick={() => setShowVideo(true)}>Join now</button>
                    </div>
                }
                {showVideo && <Video roomCode={params.roomId} />}
            </div>
        </VideoProvider>
    );
} 