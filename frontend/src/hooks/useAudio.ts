import { Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useRef } from "react";
import { VideoContext } from "../context/videoContext";
import { VideoConstraints } from "../components/VideoPreview";

const toggleAudio = async (
    audionotstarted: MutableRefObject<boolean>,
    constraints: VideoConstraints,
    setConstraints: Dispatch<SetStateAction<VideoConstraints>>
) => {
    if (constraints.audio) {
        if (!audionotstarted.current) return;
        audionotstarted.current = false;
        const stream = await window.navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: { exact: true },
                autoGainControl: { exact: true },
                noiseSuppression: { exact: true },
            }
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

export const useAudio = (audio: boolean, dataChannelRef?: MutableRefObject<RTCDataChannel | undefined>) => {
    const { constraints, setConstraints } = useContext(VideoContext);
    const audionotstarted = useRef(true);

    useEffect(() => {
        toggleAudio(audionotstarted, constraints, setConstraints);
        if (dataChannelRef && dataChannelRef.current) {
            dataChannelRef.current.send(JSON.stringify({
                type: "AUDIO"
            }))
        }
    }, [audio])
}