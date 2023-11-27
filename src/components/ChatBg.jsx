import { parseISO, format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import UserInfoHeader from "./UserInfoHeader";
import BackToBottom from "../utils/BackToBottom";
import ChatMessages from "../utils/ChatMessages";

const ChatBg = ({ user, userRole, selectedUser, dataGetASpecificChat }) => {
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
        return () => {
            chatContainerRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [selectedUser, dataGetASpecificChat]);

    return (
        <div className={`${userRole === "USER" ? "w-0" : "w-3/4 relative"}`}>
            <UserInfoHeader selectedUser={selectedUser} />
            <div ref={chatContainerRef} className="h-[80%] overflow-y-auto !py-0 px-10">
                <img src="/backGrondAi.png" alt="bg" className="absolute inset-0 w-full h-full object-cover -z-10" />
                {
                    dataGetASpecificChat &&
                    dataGetASpecificChat.messages.map((message, index) => (
                        <div
                            key={index}
                            className={`my-3 ${message.sender === selectedUser?._id ? 'text-start' : 'text-end'
                                }`}
                        >
                            <span className="px-2 py-1 block rounded-md">
                                <span className="w-[70%]">
                                    <span className={`${message.sender === selectedUser?._id ? 'bg-white' : "bg-green-100"} px-4 py-2 rounded-lg `}>
                                        <span>{message.content}</span>
                                        <span className="ml-[6px]">
                                            <sub>{format(parseISO(message.createdAt), 'HH:mm')}</sub>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </div>
                    ))}
                {showBottom && <BackToBottom scrollToBottom={scrollToBottom} />}
            </div>
            {
                selectedUser && (
                    <ChatMessages chatId={selectedUser?._id} />
                )
            }
        </div>
    );
};

export default ChatBg;
