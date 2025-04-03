import { useEffect, useRef, useState } from 'react'


export const Chat = ({ roomId, userId }: {
    roomId: string;
    userId: string;
}) => {
   
    const [messages, setMessages] = useState([
        { type: "join", payload: { message: "Kohli joined the chat", }}, 
        { type: "chat", payload: { message: "Hello", userId: "Kohli" }}, 
        { type: "chat", payload: { message: "Hey There", userId: "Rohit" }}, 
        { type: "chat", payload: { message: "Good Morning", userId: "Kohli" }}, 
        { type: "chat", payload: { message: "Very good morning! Hope you are having awesome day", userId: "Rohit" }},
        { type: "left", payload: { message: "Kohli left the chat", }}, ]);

	const inputRef = useRef<HTMLInputElement>(null);
	const wsRef = useRef(null);

	console.log("App rendered: Before use-effect");
	
	useEffect(() => {
		const ws = new WebSocket('ws://localhost:8080');
		console.log("Websocket is live");

		//@ts-ignore
		wsRef.current = ws;
		ws.onmessage = (event) => {
			console.log("Enter into onmessage handler" + event.data);
			setMessages(msgs => [...msgs, JSON.parse(event.data)]);
		}

		// Need to work later on joining room
		ws.onopen = () => {
			console.log("Enter into onopen handler");
			ws.send(JSON.stringify({
			  type: "join",
			  payload: {
				roomId: roomId,
                userId: userId,
			  }
			}))
		}
		return () => {
			ws.close();
			console.log("Websocket is closed");
		}
	}, []);

	console.log("App rendered: After use-effect");


	return (
		<div className='h-screen font-merriweather'>
			<div className='h-[90vh] my-4'>
				<div className='bg-black w-full h-full rounded-lg px-2 overflow-y-scroll'>
					<div className={`text-white bg-black rounded-lg`}>RoomId: {roomId}</div>
					{messages.map(message => 
                    message.type === 'chat' ? (
                        <div className={`flex flex-col ${ message.payload.userId !== userId ? "items-start" : "items-end"}`}>
                            <span className='text-white'>{message.payload.userId}</span>
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
                    )                
                
                )}
				</div>
			</div>
			<div className='flex gap-4'>
				<input ref={inputRef} type='text' placeholder='Type a message here ...' className='p-2 w-full rounded-lg'></input>
				<button onClick={
					() => {
						if(inputRef.current && inputRef.current.value !== '') {
							const msg = inputRef.current?.value;
							//@ts-ignore
							wsRef.current?.send(JSON.stringify({
								type: "chat",
								payload: {
									message: msg,
                                    userId: userId
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


 /*
    {
        type: "join",
        payload: {
            message: "Kohli joined the chat"
        }
    }

    {
        type: "chat",
        payload: {
            message: "Hey There",
            userId : "Kohli"
        }
    }

    {
        type: "left",
        payload: {
            message: "Kohli left the chat"
        }
    }
*/