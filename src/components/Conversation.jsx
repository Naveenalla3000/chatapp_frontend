import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetASpecificChatQuery, useSendMessageMutation } from '../redux/features/chat/chatApi';
import UserInfoHeader from './UserInfoHeader';
import ChatMessagesSkeleton from '../utils/ChatMessageSkeleton';
import ChatMessagesInput from '../utils/ChatMessagesInput';
import MessageModel from '../utils/MessageModel';
import BackToBottom from '../utils/BackToBottom';

const Conversation = ({ selectedUser }) => {
    const { user: stateUser } = useSelector((state) => state.auth);
    const userRole = stateUser.role;

    const [chatMessages, setChatMessages] = useState([]);
    const chatWrapperRef = useRef(null);

    const { data: chatData, isLoading: chatLoading, refetch: chatRefresh } = useGetASpecificChatQuery(selectedUser?._id);

    const scrollToBottom = () => {
        chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    };
    const [showBottom, setShowBottom] = useState(false);
    const handleScroll = () => {
        const maxHeight = chatWrapperRef.current.scrollHeight - chatWrapperRef.current.clientHeight;
        setShowBottom(chatWrapperRef.current.scrollTop < maxHeight);
    };

    // const [message, setMessage] = useState('');
    // const [sendMessage, { isSuccess, isError, error,data }] = useSendMessageMutation();
    // const sendChat = async(event) => {
    //     event.preventDefault();
    //     setMessage('')
    //     await sendMessage({
    //         chatId: selectedUser?._id,
    //         content: message,
    //     });
    //     console.log("Message sent successfully:", data);
    //     await chatRefresh();
    //     scrollToBottom();
    // };


    useEffect(() => {
        if (chatData && chatData.messages)
            setChatMessages(chatData.messages);
        scrollToBottom();
    });
    useEffect(() => {
        chatRefresh();
    }, []);
    useEffect(() => {
        chatWrapperRef.current.addEventListener('scroll', handleScroll);
        return () => {
            chatWrapperRef.current.removeEventListener('scroll', handleScroll);
        };
    })


    return (
        <div className={`${userRole === 'USER' ? 'w-full' : 'w-3/4 relative'}`}>
            <UserInfoHeader chatLoading={chatLoading} selectedUser={selectedUser} />
            <div
                ref={chatWrapperRef}
                id="chat_wrapper"
                className='py-2 px-2 lg:px-[50px] flex flex-col gap-2 relative'
                style={{
                    maxHeight: '84vh',
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)',
                }}
            >
                {!chatLoading ? (
                    <>
                        {Array.isArray(chatMessages) && chatMessages.length > 0 && (
                            <>
                                {chatMessages.map((_payload, index) => (
                                    <MessageModel message={_payload} key={index} />
                                ))}
                                {
                                    showBottom && (
                                        <>
                                            <BackToBottom scrollToBottom={scrollToBottom} />
                                        </>
                                    )
                                }
                            </>
                        )}
                    </>
                ) : (
                    <div className="p-1 lg:p-4">
                        <ChatMessagesSkeleton />
                    </div>
                )}
            </div>
            <ChatMessagesInput
                chatId={selectedUser?._id}
                chatRefresh={chatRefresh}
                scrollToBottom={scrollToBottom}
            />
            {/* <form onSubmit={sendChat}>
                <input
                    type="text"
                    placeholder='Enter your message'
                    name='chat'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form> */}
        </div>
    );
};

export default Conversation;
