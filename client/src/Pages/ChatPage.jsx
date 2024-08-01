import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5000'); // Replace with your server URL

const ChatPage = () => {
    const { username } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(username);
    const [activeUsers, setActiveUsers] = useState([]);
    const messageEndRef = useRef(null);

    useEffect(() => {
        socket.emit('join', { username });

        socket.emit('user-disconnect', { username });

        socket.on('init', (messages) => {
            setMessages(messages);
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('updateUsers', (users) => {
            setActiveUsers(users);
        });

        return () => {
            socket.off('init');
            socket.off('message');
            socket.off('updateUsers');
        };
    }, [username]);

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
        <div className="flex min-h-screen bg-gray-100 mx-40 border-4">
            <div className="flex-grow p-6 overflow-auto">
                <h1 className="text-2xl text-center font-bold">Chat Application</h1>
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
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-green-600 text-white'
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
            <div className="w-1/4 p-4 bg-white border-l">
                <h2 className="text-lg font-bold">Active Users</h2>
                <ul className="space-y-2">
                    {activeUsers.map((activeUser, index) => (
                        <li key={index} className="p-2 bg-gray-200 rounded">
                            {activeUser.username}
                        </li>
                    ))}
                </ul>
            </div>
            <form
                onSubmit={sendMessage}
                className="fixed bottom-0 left-0 right-0 flex items-center p-4 bg-white border-t"
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
