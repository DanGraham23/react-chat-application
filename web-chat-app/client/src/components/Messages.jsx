import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { getMsgsRoute,sendMsgRoute } from '../utils/APIRoutes';
import {FaPaperPlane} from 'react-icons/fa';

export default function Messages({curUser, curChat}){
    const [msg, setMsg] = useState("");
    const [msgs,setMsgs] = useState([]);
    const [arrivalMsg, setArrivalMsg] = useState(null);

    async function fetchData(){
        if (curChat){
            const response = await axios.post(getMsgsRoute, {
                from: curUser._id,
                to: curChat._id,
            });
            setMsgs(response.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [curChat]);

    async function handleSend(e){
        e.preventDefault();
        if (msg.length > 0){
            await axios.post(sendMsgRoute, {
                from: curUser._id,
                to: curChat._id,
                message:msg,
            });
            const messages = [...msgs];
            messages.push({fromSelf:true,message:msg});
            setMsgs(messages);
            setMsg("");
        }
        
    }

    useEffect(() => {
        arrivalMsg && setMsgs((oldMsgs) => [...oldMsgs, arrivalMsg]);

    }, [arrivalMsg]);
    
    return (
        <div className='messages-container'>
            {
            curChat && (
            <div className='message-area'>
            <div className='messages'>
                {
                    msgs.map((message) => {
                        return (
                            <div key={uuidv4()}> 
                                <div className={`message ${message.fromSelf ? "sent" : "recieved"}`}>
                                    <p>{message.message}</p>
                                </div>

                            </div>
                        );
                    })
                }
            </div>
            <form className='message-form' onSubmit={handleSend}>
                <input 
                className="message-input"
                type="text"
                placeholder="Enter Message"
                name="message"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                />
                <button className='message-btn'><FaPaperPlane/></button>
            </form>
            </div>
            )
        }
        </div>
    )
}