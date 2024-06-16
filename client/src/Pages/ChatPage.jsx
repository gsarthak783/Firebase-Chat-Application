import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5000'); // Replace with your server URL

const ChatPage = () => {
    const {name} = useParams()
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    // const [user, setUser] = useState('User' + Math.floor(Math.random() * 1000));
    const [user, setUser] = useState(name); // Random username for simplicity
    const messageEndRef = useRef(null);

    useEffect(() => {
        socket.on('init', (messages) => {
            setMessages(messages);
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('init');
            socket.off('message');
        };
    }, []);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const messageData = { user, message };
            socket.emit('message', messageData);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 mx-40  border-4">
            <h1 className='text-2xl text-center font-bold'>Chat Application</h1>
            <div className="flex-grow p-6 overflow-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.user === user ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div
                                className={`rounded-lg p-4 max-w-xs ${
                                    msg.user === user
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-slate-200 text-black'
                                }`}
                            >
                                <div className="font-bold">{msg.user}</div>
                                <div>{msg.message}</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
            </div>
            <form
                onSubmit={sendMessage}
                className="flex items-center p-4 bg-white border-t"
            >
                <input
                    type="text"
                    className="flex-grow p-2 mr-4 border rounded"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatPage;
