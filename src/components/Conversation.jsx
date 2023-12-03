import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetASpecificChatQuery, useSendMessageMutation } from '../redux/features/chat/chatApi';
import UserInfoHeader from './UserInfoHeader';
import ChatMessagesSkeleton from '../utils/ChatMessageSkeleton';
import ChatMessagesInput from '../utils/ChatMessagesInput';
import MessageModel from '../utils/MessageModel';
import BackToBottom from '../utils/BackToBottom';
import Typing from './Typing';
import { useSocket } from '../context/socketContext';
import { setChatByUser } from '../redux/features/chat/chatSlice';
import messageNotification from '../assets/messageNotification.mp3';

const Conversation = ({ selectedUser }) => {
    const { user: stateUser } = useSelector((state) => state.auth);
    const { socket } = useSocket();
    const userRole = stateUser.role;

    const dispatch = useDispatch();

    const [chatMessages, setChatMessages] = useState([]);
    const chatWrapperRef = useRef(null);

    const { data: chatData, isLoading: chatLoading, refetch: chatRefresh } = useGetASpecificChatQuery(selectedUser?._id);

    const scrollToBottom = () => {
        chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    };
    const [showBottom, setShowBottom] = useState(false);

    const [isTyping, setIsTyping] = useState(false); // To track if someone is currently typing
    const handleOnSocketTyping = (selectedUser) => {
        // Check if the typing event is for the currently active chat.
        if (selectedUser !== stateUser._id) return;

        // Set the typing state to true for the current chat.
        setIsTyping(true);
    };
    const handleOnSocketStopTyping = (selectedUser) => {
        // Check if the stop typing event is for the currently active chat.
        if (selectedUser !== stateUser._id) return;

        // Set the typing state to false for the current chat.
        setIsTyping(false);
    };

    useEffect(() => {
        if (!socket) return;
        socket.on("typing", handleOnSocketTyping);
        socket.on("stopTyping", handleOnSocketStopTyping);
        return () => {
            socket.off("typing", handleOnSocketTyping);
            socket.off("stopTyping", handleOnSocketStopTyping);
        }
    }, [socket, selectedUser]);

    // const handleTyping = () => {
    //     if (!isTyping) {
    //         socket.emit(TYPING_EVENT, selectedUser._id);
    //         setIsTyping(true);
    //     }
    // };

    // const handleStopTyping = () => {
    //     socket.emit(STOP_TYPING_EVENT, selectedUser._id);
    //     setIsTyping(false);
    // };

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
    }, [chatData]);
    useEffect(() => {
        const handleScroll = () => {
            const maxHeight = chatWrapperRef.current.scrollHeight - chatWrapperRef.current.clientHeight;
            setShowBottom(chatWrapperRef.current.scrollTop < maxHeight);
        };
        chatWrapperRef.current.addEventListener('scroll', handleScroll);
        scrollToBottom();
        return () => {
            chatWrapperRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [scrollToBottom, chatData]);

    useEffect(() => {
        socket?.on('newMessage', async (message) => {
            // console.log("Message received:", message);
            setChatMessages((prevMessages) => [...prevMessages, message]);
            const sound = new Audio(messageNotification);
            if (!document.hasFocus() && message.sender !== stateUser._id) {
                sound.play();
            }
            dispatch(setChatByUser({
                userId: selectedUser._id,
                message: message.content
            }));
        });
        scrollToBottom();
        return () => {
            socket.off('newMessage');
        };
    }, [socket])

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
                        {chatMessages && (
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
                        {isTyping ? <Typing /> : null}
                    </>
                ) : (
                    <div className="p-1 lg:p-4">
                        <ChatMessagesSkeleton />
                    </div>
                )}
            </div>
            <ChatMessagesInput
                chatId={selectedUser?._id}
                setChatMessages={setChatMessages}
                scrollToBottom={scrollToBottom}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
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
