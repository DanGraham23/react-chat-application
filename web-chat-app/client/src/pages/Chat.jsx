import Friends from '../components/Friends';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Chat(){ 
    const navigate = useNavigate();
    const [curUser, setCurUser] = useState({});

    async function fetchUser(){
        if (localStorage.getItem('react-chat-user') === null){
            navigate("/login");
        }else{
            setCurUser(await JSON.parse(localStorage.getItem('react-chat-user')));
        }
    };

    useEffect(() => {
        fetchUser();
    }, [curUser]);

    function logout(){
        localStorage.removeItem('react-chat-user');
        setCurUser({});
    }

    return (
        <div className='chat-container'>
            <div className='chat-navbar'>
                <div className="chat-header">Hello, {curUser.username}</div>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
            
            <div className='chat-main'>
                <Friends />
                <div className='chat-area'>
                    This is the main chat window
                </div>
            </div>
            
        </div>
    )
}