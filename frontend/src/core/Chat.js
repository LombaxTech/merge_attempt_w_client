import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/index';

const io = require('socket.io-client');
const socket = io('http://localhost:8000');

let user = isAuthenticated().user;

const Chat = ({ match }) => {

    let { studentId, tutorId } = match.params;

    const [student, setStudent] = useState({});
    const [tutor, setTutor] = useState({});

    async function getStudentAndTutorValues() {
        try {
            let tutorValue = await fetch(`http://localhost:8000/api/tutors/profile/${tutorId}`);
            tutorValue = await tutorValue.json()

            let studentValue = await fetch(`http://localhost:8000/api/student/profile/${studentId}`);
            studentValue = await studentValue.json();

            setTutor(tutorValue);
            setStudent(studentValue);
        } catch (error) {
            console.log({ error })
        }
    }

    // * LOADING MESSAGES

    const [messages, setMessages] = useState([]);

    async function initMessages() {
        try {
            let messagesValue = await fetch(`http://localhost:8000/api/messages/${user._id}/${studentId}/${tutorId}`)
            messagesValue = await messagesValue.json();
            console.log(messagesValue.messages);
            setMessages(messagesValue.messages)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        getStudentAndTutorValues();
        initMessages();
    }, [])


    // * SOCKET STUFF

    const roomName = `${studentId}and${tutorId}`

    socket.on('connect', () => {
        console.log('connected');
        // ! putting socket.emit('join room', roomName) here results on only working in the second reload
    })

    socket.emit('join room', roomName)

    socket.on('message', message => {
        setMessages([...messages, { name: message.name, message: message.message }])
    })



    // * HANDLING SEND MESSAGE BUTTON INPUT

    const [inputMessage, setInputMessage] = useState('');

    const handleInput = e => {
        setInputMessage(e.target.value);
    }

    const sendMessage = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/chat/${studentId}/${tutorId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    sender: user,
                    message: inputMessage
                })
            })
            result = await result.json();
            console.log({ result });
            socket.emit('msg', {
                roomName,
                message: {
                    name: user.name,
                    message: inputMessage
                }
            })
            setInputMessage('');
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <div>
            <h2 style={{ textDecoration: 'underline' }}>{user.role == 0 ? tutor.name : student.name}</h2>

            <ul>
                {messages.map((message, i) => (
                    <li key={i}>{message.name}: {message.message}</li>
                ))}
            </ul>

            <input type="text" value={inputMessage} onChange={handleInput} />
            <button onClick={sendMessage}>Send message</button>
        </div>
    )
}

export default Chat;