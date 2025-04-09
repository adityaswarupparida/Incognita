import { Dispatch, MutableRefObject, RefObject, SetStateAction, useContext, useEffect, useRef } from "react";
import { VideoContext } from "../context/videoContext";
import { VideoConstraints } from "../components/VideoPreview";

const toggleVideo = async (
    videoRef: RefObject<HTMLVideoElement>, 
    videonotstarted: MutableRefObject<boolean>,
    constraints: VideoConstraints,
    setConstraints: Dispatch<SetStateAction<VideoConstraints>>
) => {    
    if (constraints.video) {
        if (!videoRef.current || !videonotstarted.current) return;
        // to prevent turning on camera twice initially
        videonotstarted.current = false;
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true
        });
        setConstraints(cns => ({...cns, videostream: stream}));
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
    } else {
        if (constraints.videostream === undefined || !videoRef.current) return;
        constraints.videostream.getVideoTracks().forEach(track => {
            if (track.readyState == 'live') {
                track.stop();
                track.enabled = false;
            }
        })
        videonotstarted.current = true;
        videoRef.current.srcObject = null;
    }
}
export const useVideo = (video: boolean, dataChannelRef?: MutableRefObject<RTCDataChannel | undefined>) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { constraints, setConstraints } = useContext(VideoContext);
    const videonotstarted = useRef(true);

    useEffect(() => {
        toggleVideo(videoRef, videonotstarted, constraints, setConstraints);
        if (dataChannelRef && dataChannelRef.current) {
            dataChannelRef.current.send(JSON.stringify({
                type: "VIDEO"
            }))
        }
    }, [video])

    return {
        videoRef
    }
}