import { RefObject } from "react";

export const Video = ({ videoRef }: { 
    videoRef: RefObject<HTMLVideoElement>;
}) => {
    return (
        <div>
            <video ref={videoRef} className="bg-black rounded-md h-full w-full object-cover"></video>
        </div>
    );
}