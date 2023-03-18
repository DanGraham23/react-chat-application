import {useState, useEffect} from 'react';
import {BsFillPersonFill} from 'react-icons/bs';

export default function Friends({friends, changeChat}){
    const [curFriendSelected, setCurFriendSelected] = useState(undefined);

    function changeCurChat(index, friend){
        setCurFriendSelected(index);
        changeChat(friend);
    }

    return (
        <div className="friends-container scroll-style">
            {
                friends.map((friend, index) => {
                    return (
                        <div
                        className={`friend-container ${index === curFriendSelected ? "selected" : ""}`}
                        key={index}
                        onClick={() => changeCurChat(index, friend)}>
                            <div className="friend-info">
                                <BsFillPersonFill className='friend-icon' />
                                <h3>{friend.username}</h3>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}