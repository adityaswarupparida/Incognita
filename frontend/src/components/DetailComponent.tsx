import { Copy } from "lucide-react";
import { useState } from "react";
import { FaMessage, FaVideo } from "react-icons/fa6";

export const DetailComponent = () => {
    const [pasteboard, setPasteboard] = useState(false);
    const [choose, setChoose] = useState(0);
    const randomCode = '765FT9'; //'765FT9'; EF30CB
    
    return (
        <div className="flex flex-col mx-4 my-40">
            <div className="flex justify-evenly my-2 text-white border shadow-lg text-lg border-neutral-600 rounded-md">
                <ChooseButton choose={0} chosen={choose===0} onClick={() => setChoose(0)}/>
                <ChooseButton choose={1} chosen={choose===1} onClick={() => setChoose(1)}/>
            </div>
            <div className="flex flex-col justify-center gap-2">
                <button className="w-full bg-white text-black" onClick={() => setPasteboard(true)}>Create new room</button>
                <input type="text" placeholder="Enter you Name" className='p-2.5 w-full rounded-lg'></input>
                <input type="text" placeholder="Enter Room Id" className='p-2.5 w-full rounded-lg'></input>
                <button className="w-full bg-white text-black">Join room</button>
            </div>
            { pasteboard && <div className="w-full h-32 my-3 rounded-lg bg-neutral-800 flex flex-col justify-center items-center gap-2">
                <div className="text-gray-400 text-sm"> Share this code with your friend </div>
                <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold"> {randomCode} </div>
                    <div className="cursor-pointer"><Copy size={'16'}/></div>
                </div>
            </div> }
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