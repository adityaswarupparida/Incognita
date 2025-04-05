import { ReactNode } from "react";

interface VideoButtonProps {
    active: boolean;
    activeIcon: ReactNode;
    passiveIcon: ReactNode;
    onClick: () => void;
}
export const VideoButton = (props: VideoButtonProps) => {
    return (
        <button 
            className={`rounded-full ${props.active ? `bg-white text-black`: ``}`} 
            onClick={props.onClick}>
            {props.active ? props.activeIcon : props.passiveIcon}
        </button>
    );
}