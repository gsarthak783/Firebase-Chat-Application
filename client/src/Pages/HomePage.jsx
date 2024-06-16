import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";


const HomePage = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const response = await axios.get("https://temp-server-virid.vercel.app/message-api/get-message");
            setMessages(response.data.payload.reverse());
           ;
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
        };
    
        
          fetchMessages();
       
      }, []);

return (<>
    <div className="min-h-screen bg-slate-100 p-4 flex flex-col items-center">
        <h1 className="text-3xl text-center py-10">HomePage Messages</h1>

        <div className="w-full max-w-2xl space-y-4">
        {messages?.map((message, index) => (
          <div
            key={index}
            className="p-6 bg-white bg-opacity-75 rounded-lg shadow-md border border-gray-200"
          >
            <p className="text-gray-700 font-semibold mb-2 font-mono text-center">Date: {message.date}</p>
            <p className="text-gray-800 font-mono text-center">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
</>);
}

export default HomePage;