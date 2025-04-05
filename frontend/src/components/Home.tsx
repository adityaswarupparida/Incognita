import { useNavigate } from "react-router-dom"
import { CurrentDateTime } from "./CurrentDateTime"
import { VideoIcon } from "../icons/VideoIcon";
import { DetailComponent } from "./DetailComponent";
import { VenetianMask } from "lucide-react";

export const Home = () => {
    const navigate = useNavigate();
    const randomCode = '765FT9'; //'765FT9'; EF30CB

    return <div className="h-screen">
        <div className="bg-black p-8 w-full h-full overflow-hidden">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <VenetianMask className="text-stone-400 animate-slow-pulse" size={40}/>
                    <span className="text-2xl">
                        <span className="">Incognito</span>
                        Talk
                    </span>
                </div>
                {/* <button onClick={() => {
                    navigate(`/chat/${randomCode}`)
                }}>Chat</button>
                <button onClick={() => {
                    navigate(`/video/${randomCode}`)
                }}>Video</button> */}
                <div className="flex justify-end items-center gap-3">
                    <div className="text-xl">{<CurrentDateTime format="long" />}</div>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-3 h-full">
                {/* <DetailComponent /> */}
                <div className="h-full flex flex-col gap-6 justify-center">
                    <div className="tracking-tighter">
                        <h1>Private Conversations,</h1>
                        <h1 className="text-stone-400">Zero Traces</h1>
                    </div>
                    <div>Create instant chat rooms, share the code, and connect securely. When everyone leaves, everything disappears.</div>
                    <div className="flex justify-start mt-6">
                        <button className="rounded-full border-stone-700 py-4 px-6">Start Chatting</button>
                    </div>
                </div>
                <div className="my-10 flex flex-col justify-center">
                    <div className="relative">
                        <img src="/premium_photo.jpeg" className="shadow-xl border border-stone-700 rounded-2xl"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}