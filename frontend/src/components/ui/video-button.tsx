import { ReactNode } from "react";

interface VideoButtonProps {
    active?: boolean;
    activeIcon: ReactNode;
    passiveIcon: ReactNode;
    onClick: () => void;
    className?: string;
}
export const VideoButton = (props: VideoButtonProps) => {
    return (
        <button 
            className={`rounded-full ${props.active ? `bg-white text-black`: ``} ${props.className}`} 
            onClick={props.onClick}>
            {props.active ? props.activeIcon : props.passiveIcon}
        </button>
    );
}