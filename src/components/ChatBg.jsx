import { messages } from "../data/Messages";
import BackToBottom from "../utils/BackToBottom";
import ChatMessages from "../utils/ChatMessages";

import { useEffect, useRef, useState } from 'react';
import UserInfoHeader from "./UserInfoHeader";

const ChatBg = ({userRole,selectedUser}) => {
    const [showBottom, setShowBottom] = useState(true);
    const chatContainerRef = useRef(null);
    const scrollToBottom = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };
    const handleScroll = () => {
        const maxHeight = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;
        setShowBottom(chatContainerRef.current.scrollTop < maxHeight);
    };
    useEffect(() => {
        scrollToBottom();
        chatContainerRef.current.addEventListener('scroll', handleScroll);
    }, [messages]);

    return (
        <div className={`${userRole === "USER"?"w-0":"w-3/4 relative"}`}>

            <UserInfoHeader selectedUser={selectedUser}/>
            {
                selectedUser && (
                    <div className="flex justify-between items-center">
                        {
                            selectedUser.name
                        }
                    </div>
                )
            }

            <div ref={chatContainerRef} className="h-[80%] overflow-y-auto !py-0 px-10">
                <img src="/backGrondAi.png" alt="bg" className="absolute inset-0 w-full h-full object-cover -z-10" />
                {messages &&
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`my-2 ${message.sender === 'two' ? 'text-start' : 'text-end'
                                }`}
                        >
                            <span className="px-2 py-1 block rounded-md">
                                <span className="w-[70%]">
                                    <span className={`${message.sender === 'two' ? 'bg-white' : "bg-green-100"} px-4 py-2 rounded-lg `}>
                                        <span>{message.text}</span>
                                        <span className="ml-[6px]"><sub>21:00</sub></span>
                                    </span>
                                </span>
                            </span>
                        </div>
                    ))}
                {
                    showBottom && (
                        <>
                            <BackToBottom scrollToBottom={scrollToBottom} />
                        </>
                    )
                }
            </div>

            <ChatMessages />
        </div>
    );
};

export default ChatBg;