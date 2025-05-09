import { CurrentDateTime } from "./CurrentDateTime"
import { DetailComponent } from "./DetailComponent";
import { VenetianMask } from "lucide-react";
import { useState } from "react";

export const Home = () => {
    const [modal, setModal] = useState(false);

    return <div className="h-screen relative">
        <div className="bg-black p-8 w-full h-full overflow-hidden relative">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <VenetianMask className="text-stone-400 animate-slow-pulse" size={40}/>
                    <span className="text-2xl">
                        Incognita
                    </span>
                </div>
                <div className="flex justify-end items-center gap-3">
                    <div className="text-xl">{<CurrentDateTime format="long" />}</div>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-3 h-full">
                <div className="h-full flex flex-col gap-6 justify-center">
                    <div className="tracking-tighter">
                        <h1>Private Conversations,</h1>
                        <h1 className="text-stone-400">Zero Traces</h1>
                    </div>
                    <div>Create instant chat rooms, share the code, and connect securely. When everyone leaves, everything disappears.</div>
                    <div className="flex justify-start mt-6">
                        <button 
                            className="rounded-full border-stone-700 py-4 px-6"
                            onClick={() => setModal(true)}
                        >
                            Start Chatting
                        </button>
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
        { modal && <div className="absolute inset-0 h-full">
            <div className="bg-neutral-700/50 h-screen w-screen relative"></div>
            <div className="flex justify-center items-center border border-stone-700 h-full absolute inset-0">
                <div className="px-10 py-6 bg-neutral-900 rounded-xl">
                    <div className="flex justify-end text-2xl">
                        <button className="bg-transparent p-0 border-none cursor-pointer hover:text-white text-stone-400"
                                onClick={() => setModal(false)}
                        >
                            &#10005;
                        </button>
                    </div>
                    <DetailComponent />
                </div>
            </div>
        </div>
        }
    </div>
}