import { createContext, ReactNode, useMemo, useState } from "react";
import { VideoConstraints } from "../components/VideoPreview";

const videoConstraints: VideoConstraints = {
    audio: true,
    video: true,
    audiostream: undefined,
    videostream: undefined
};

export const VideoContext = createContext<{
    constraints: VideoConstraints;
    setConstraints: React.Dispatch<React.SetStateAction<VideoConstraints>>;
}>({
    constraints: videoConstraints,
    setConstraints: () => {},
});

export const VideoProvider = ({ children }: {
    children: ReactNode; 
}) => {
    const [constraints, setConstraints] = useState<VideoConstraints>(videoConstraints);
    const value = useMemo(() => ({ constraints, setConstraints }), [constraints, setConstraints]);
   
    return (
        <VideoContext.Provider value={value}>
            {children}
        </VideoContext.Provider>
    );
};