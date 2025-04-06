import { useRef, useState } from "react";
import { VideoComponent } from "./VideoComponent";
import { Video } from "./Video";
import { useParams } from "react-router-dom";

export const VideoPreview = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showVideo, setShowVideo] = useState(false);
    const params = useParams();

    return (
        <div className="flex h-screen items-center justify-center">
            {!showVideo && 
                <div className="flex flex-col justify-between gap-4">
                    <VideoComponent videoRef={videoRef} />
                    <button onClick={() => setShowVideo(true)}>Join now</button>
                </div>
            }
            {showVideo && <Video videoRef={videoRef} roomCode={params.roomId} />}
        </div>
    );
} 