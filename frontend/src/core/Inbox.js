import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';

const user = isAuthenticated().user;

const Inbox = () => {

    const [chats, setChats] = useState([]);

    async function init() {
        let chatValues = await fetch(`http://localhost:8000/api/inbox/${user._id}`);
        chatValues = await chatValues.json();
        console.log(chatValues);
        setChats(chatValues);
    }

    useEffect(() => {
        init();
    }, [])

    let chatStyle = {
        padding: '20px',
        border: '1px solid black'
    }

    return (
        <div>
            <h2>Inbox</h2>
            <ul>
                {chats.map(chat => (
                    <li key={chat._id} style={chatStyle}>
                        <Link
                            to={user.role === 0 ?
                                `/messages/${user._id}/${chat.partnerId}` :
                                `/messages/${chat.partnerId}/${user._id}`}
                        >
                            |Profile Pic|
                            <h3>{chat.partnerName}: </h3>
                            {chat.messages[chat.messages.length - 1].message}
                            |Time of message|
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Inbox;