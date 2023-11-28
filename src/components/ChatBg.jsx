import { parseISO, format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import UserInfoHeader from "./UserInfoHeader";
import BackToBottom from "../utils/BackToBottom";
import ChatMessages from "../utils/ChatMessages";
import { useSelector } from 'react-redux';

const ChatBg = ({ isLoadingGetASpecificChat, user, userRole, selectedUser, dataGetASpecificChat }) => {
    const { user: stateUser } = useSelector(state => state.auth);
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
    }, [selectedUser, dataGetASpecificChat?.messages]);

    return (
        <div className={`${userRole === "USER" ? "w-full" : "w-3/4 relative"} border-[0px] border-[#f0f2f5]`}>

            <UserInfoHeader selectedUser={selectedUser} />

            <div
                ref={chatContainerRef}
                className={`overflow-y-auto !border-[0px] !py-0 px-1 lg:px-6 h-[85.5vh] bg-zinc-300 relative`}
                style={{
                    backgroundColor: 'transparent',
                    backgroundImage: `url('/backGrondAi.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {
                    dataGetASpecificChat &&
                    dataGetASpecificChat.messages.map((message, index) => (
                        <div
                            key={index}
                            className={`my-3 ${message.sender.toString() !== stateUser?._id.toString() || message.sender.toString() === "ADMIN" ? 'text-start' : 'text-end'
                                }`}
                        >
                            <span className="px-[32px] py-1 block rounded-md">
                                <span className="w-[100%]">
                                    <span className={`${message.sender.toString() !== selectedUser?._id.toString() || message.sender.toString() === "ADMIN" ? 'bg-white' : "bg-green-100"} px-4 py-2 rounded-lg `}>
                                        <span>{message.content}</span>
                                        <span className="ml-[6px]">
                                            <sub>{format(parseISO(message.createdAt), 'HH:mm')}</sub>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </div>
                    ))}
                {
                    showBottom && <BackToBottom scrollToBottom={scrollToBottom} />
                }
            </div>
            {
                <ChatMessages chatId={selectedUser?._id} />
            }
        </div>
    );
};

export default ChatBg;
