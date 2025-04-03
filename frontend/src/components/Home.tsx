// import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { CurrentDateTime } from "./CurrentDateTime"
// import { useState } from "react";
import { Copy, EllipsisVertical } from "lucide-react";
import { VideoIcon } from "../icons/VideoIcon";
import { DetailComponent } from "./DetailComponent";

export const Home = () => {
    const navigate = useNavigate();
    const randomCode = '765FT9'; //'765FT9'; EF30CB

    return <div className="font-merriweather">
        <div className="bg-black h-screen p-3 w-full">
            <div className="flex justify-between">
                <div className="flex gap-2 items-start">
                    <VideoIcon />
                    <span className="text-xl">IncognitoTalk</span>
                </div>
                <button onClick={() => {
                    navigate(`/chat/${randomCode}`)
                }}>Chat</button>
                <div className="flex justify-end items-center gap-3">
                    <div>
                        {/* <span className="text-xl">{new Date().toLocaleString() + ""}</span> */}
                        <span className="text-xl">{<CurrentDateTime format="long" />}</span>
                    </div>
                    <div><EllipsisVertical size={"22"} /></div>
                    {/* <button>Login</button> */}
                </div>
            </div>
            <div className="w-full grid grid-cols-3 gap-3 h-full">
                <div className="col-span-2 my-10">
                    <img src="/premium_photo.jpeg" />
                </div>
                <DetailComponent />
            </div>
        </div>
        
    </div>
}