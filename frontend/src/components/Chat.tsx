import { Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';

interface Message {
    type: string;
    payload: {
        message: string;
        userId?: string;
    }
}

export const Chat = () => {   
	const params = useParams();
	const roomId = params.roomId!;
	//@ts-ignore
    const [messages, setMessages] = useState<Message[]>([{ type: "create", payload: { message: "Room "+ roomId +" was created" }}]);

	const inputRef = useRef<HTMLInputElement>(null);
	const wsRef = useRef(null);
	const name = useRef("");
	
	useEffect(() => {
		name.current = window.localStorage.getItem("name") ?? "";
		const ws = new WebSocket('ws://localhost:8080');

		//@ts-ignore
		wsRef.current = ws;
		ws.onmessage = (event) => {
			setMessages(msgs => [...msgs, JSON.parse(event.data)]);
		}

		// Need to work later on joining room
		ws.onopen = () => {
			ws.send(JSON.stringify({
			  type: "join",
			  payload: {
				roomId: roomId,
                userId: name.current,
			  }
			}))
		}
		return () => {
			ws.close();
		}
	}, []);

	return (
		<div className='h-screen bg-black overflow-hidden'>
			<div className='h-[90vh] my-4'>
				<div className={`text-white flex gap-3 p-3 backdrop-blur-3xl border-b border-stone-800 shadow-lg`}>
					<div className="text-2xl font-bold"> Code: {roomId} </div>
                    <button className="cursor-pointer p-0 border-none focus:outline-none hover:text-white"
                            onClick={() => {
                                (async () => await navigator.clipboard.writeText(roomId))();
                            }}
                    >
                        <Copy size={'16'}/>
                    </button>
				</div>
				<div className='bg-black w-full h-full rounded-lg px-2 overflow-y-scroll font-merriweather'>
					{messages.map((message, index) => 
						<div key={index}>
							{ message.type === 'chat' ? (
								<div className={`flex flex-col ${ message.payload.userId !== name.current ? "items-start" : "items-end"}`}>
									{ (!index || index > 0 && message.payload.userId !== messages[index-1].payload.userId) && <span className='text-white'>{message.payload.userId}</span> }
									<span className='bg-white text-black rounded-md px-3 py-2 my-2 max-w-prose text-wrap'>
										{message.payload.message}
									</span>
								</div> 
							) : (
								<div className={`flex flex-col items-center justify-center`}>
									<span className='bg-neutral-600 opacity-70 text-white/95 text-xs rounded-md px-3 py-1 my-2 max-w-prose text-wrap'>
										{message.payload.message}
									</span>
								</div>
							) }               
						</div>
                	)}
				</div>
			</div>
			<div className='flex gap-4 p-3 backdrop-blur-3xl font-merriweather'>
				<input ref={inputRef} type='text' placeholder='Type a message here ...' className='p-2 w-full rounded-lg border border-stone-700'></input>
				<button className='border border-stone-700' onClick={
					() => {
						if(inputRef.current && inputRef.current.value !== '') {
							const msg = inputRef.current?.value;
							//@ts-ignore
							wsRef.current?.send(JSON.stringify({
								type: "chat",
								payload: {
									message: msg,
                                    userId: name.current
								}
							}))
							inputRef.current.value = "";
						}
					}
				}>Send</button>
			</div>
		</div>
	)
}
