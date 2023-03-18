import Friends from '../components/Friends';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute } from '../utils/APIRoutes';
import Home from '../components/Home'
import Messages from '../components/Messages'


export default function Chat(){ 
    const navigate = useNavigate();
    const [curUser, setCurUser] = useState({});
    const [curChat, setCurChat] = useState(undefined);
    const [friends, setFriends] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    

    async function fetchUser(){
        if (localStorage.getItem('react-chat-user') === null){
            navigate("/login");
        }else{
            setCurUser(await JSON.parse(localStorage.getItem('react-chat-user')));
            setIsLoaded(true);
        }
    };

    async function fetchData(){
        if (curUser){
            const data = await axios.get(`${allUsersRoute}/${curUser._id}`);
            setFriends(data.data);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [curUser]);

    useEffect(() => {
        fetchData();
    }, [curUser]);

    function logout(){
        localStorage.clear();
        setCurUser({});
    }

    function handleChatChange(chat){
        setCurChat(chat);
    }

    return (
        <div className='chat-container'>
            <div className='chat-navbar'>
                <div className="chat-header">Hello, {curUser.username}</div>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
            
            <div className='chat-main'>
                <Friends
                friends={friends}
                changeChat={handleChatChange}/>
                {
                    isLoaded && curChat === undefined ? 
                    <Home /> : 
                    <Messages 
                    curChat={curChat}
                    curUser = {curUser}/>
                    
                }
            </div>
            
        </div>
    );
}