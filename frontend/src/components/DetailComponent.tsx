import { Copy } from "lucide-react";
import { useRef, useState } from "react";
import { FaMessage, FaVideo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const DetailComponent = () => {
    const navigate = useNavigate();
    const [pasteboard, setPasteboard] = useState(false);
    const [choose, setChoose] = useState(0);
    const randomCode = '765FT9'; //'765FT9'; EF30CB
    const nameRef = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    
    return (
        <div className="flex flex-col mx-4 my-4 p-4">
            <h1 className="text-center tracking-tighter mb-8">Join your room</h1>
            <div className="flex justify-evenly my-2 text-white border shadow-lg text-lg border-neutral-600 rounded-md">
                <ChooseButton choose={0} chosen={choose===0} onClick={() => setChoose(0)}/>
                <ChooseButton choose={1} chosen={choose===1} onClick={() => setChoose(1)}/>
            </div>
            <div className="flex flex-col justify-center gap-2">
                <button className="w-full bg-white text-black" onClick={() => setPasteboard(true)}>Create new room</button>
                <input ref={nameRef} type="text" placeholder="Enter you Name" className='p-2.5 w-full rounded-lg'></input>
                <input ref={codeRef} type="text" placeholder="Enter Room code" className='p-2.5 w-full rounded-lg'></input>
                <button className="w-full bg-white text-black"
                    onClick={() => {
                        if (!nameRef.current || !codeRef.current) return;
                        if (nameRef.current.value.trim() === "") {
                            alert("Please fill the name correctly.");
                            nameRef.current.value = "";
                        }
                        if (codeRef.current.value.length !== 6) {
                            alert("Please fill a valid code or, generate a new one.");
                            codeRef.current.value = "";
                        }
                        console.log(nameRef.current.value);
                        console.log(codeRef.current.value);
                        if (!choose) navigate(`/chat/${randomCode}`)
                        else navigate(`/video/${randomCode}`)
                    }}
                >
                    Join room
                </button>
            </div>
            { pasteboard && <div className="w-full h-32 my-3 px-3 rounded-lg bg-neutral-800 flex flex-col justify-center items-center gap-2">
                <div className="text-gray-400 text-sm"> Share this code with your friend </div>
                <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold"> {randomCode} </div>
                    <button className="cursor-pointer p-0 border-none focus:outline-none hover:text-white"
                            onClick={() => {
                                (async () => await navigator.clipboard.writeText(randomCode))();
                            }}
                    >
                        <Copy size={'16'}/>
                    </button>
                </div>
            </div> }
            <div className="text-wrap max-w-96 text-xs mt-4">Note: To create a new room, click the "Create New Room" button, copy the code, and paste it, or enter an existing room code to join a room.</div>
        </div>
    );
}

const options = [ 
    { title:"Chat", icon:<FaMessage size={24}/> }, 
    { title:"Video", icon:<FaVideo size={29}/> } 
];

const ChooseButton = ({ choose, chosen, onClick }: {
    choose: number;
    chosen: boolean;
    onClick: () => void;
}) => {
    return (
        <button className={`flex justify-center items-center gap-2 w-full h-full py-4 ${chosen ? `bg-white text-black rounded-md`: ``}`} onClick={onClick}>
            {options[choose].icon} {options[choose].title}
        </button>
    );
}