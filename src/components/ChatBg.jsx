import ChatMessages from "../utils/ChatMessages";
import ChatUserInfo from "../utils/ChatUserInfo";
import { useEffect, useRef } from 'react';

const ChatBg = () => {
    const messages = [
        {
            sender: "one",
            receiver: "two",
            text: "Hello"
        },
        {
            sender: "two",
            receiver: "one",
            text: "Hi there!"
        },
        {
            sender: "one",
            receiver: "two",
            text: "How's your day going?"
        },
        {
            sender: "two",
            receiver: "one",
            text: "It's been good, thanks! How about yours?"
        },
        {
            sender: "one",
            receiver: "two",
            text: "Busy, but productive."
        },
        {
            sender: "two",
            receiver: "one",
            text: "That's great to hear!"
        },
        {
            sender: "one",
            receiver: "two",
            text: "Any exciting plans for the weekend?"
        },
        {
            sender: "two",
            receiver: "one",
            text: "Not sure yet, maybe catch up on some reading."
        },
        {
            sender: "one",
            receiver: "two",
            text: "Sounds relaxing!"
        },
        {
            sender: "two",
            receiver: "one",
            text: "Definitely needed. How about you?"
        },
        {
            sender: "one",
            receiver: "two",
            text: "Thinking of trying a new recipe."
        },
        {
            sender: "two",
            receiver: "one",
            text: "That sounds delicious!"
        },
        {
            sender: "one",
            receiver: "two",
            text: "I hope so!"
        },
        {
            sender: "two",
            receiver: "one",
            text: "Let me know how it turns out."
        },// ... (previous messages)

        {
            sender: "one",
            receiver: "two",
            text: "Just finished a coding marathon!"
        },
        {
            sender: "two",
            receiver: "one",
            text: "Impressive! What were you working on?"
        },
        {
            sender: "one",
            receiver: "two",
            text: "Building a new feature for a client's website."
        },
        {
            sender: "two",
            receiver: "one",
            text: "Nice! I love seeing projects come together."
        },
        {
            sender: "one",
            receiver: "two",
            text: "Me too! It's always rewarding."
        },
        {
            sender: "two",
            receiver: "one",
            text: "Have you explored any new technologies lately?"
        },
        {
            sender: "one",
            receiver: "two",
            text: "I've been learning about serverless architecture. It's fascinating!"
        },
        {
            sender: "two",
            receiver: "one",
            text: "That's a hot topic! Any specific use case in mind?"
        },
        {
            sender: "one",
            receiver: "two",
            text: "Considering implementing it for real-time data processing."
        },
        {
            sender: "two",
            receiver: "one",
            text: "Sounds like a solid plan. Let me know how it goes!"
        },
        {
            sender: "one",
            receiver: "two",
            text: "Considering implementing it for real-time data processing."
        },
        {
            sender: "two",
            receiver: "one",
            text: "Not sure yet, maybe catch up on some reading."
        },
        {
            sender: "one",
            receiver: "two",
            text: "Sounds relaxing!"
        },
        {
            sender: "two",
            receiver: "one",
            text: "Definitely needed. How about you?"
        },
        {
            sender: "one",
            receiver: "two",
            text: "Sounds relaxing!"
        },
        {
            sender: "one",
            receiver: "two",
            text: "Sounds relaxing!"
        },
    ];

    return (
        <div className=" h-screen w-3/4 relative">
            <ChatUserInfo />
            <div className="h-[90%] overflow-y-auto pb-10">
                <img src="/whatsapp-chat.jpg" alt="bg" className="absolute inset-0 w-full h-full object-cover -z-10" />
                {messages &&
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`my-2 block ${message.sender === 'two' ? 'text-start' : 'text-end'
                                }`}
                        >
                            <span className="px-3 py-2 block rounded-md">
                                <span>
                                    <span className={`${message.sender === 'two' ? 'bg-white' : "bg-green-100"} px-4 py-2 rounded-lg`}>
                                       <span> {message.text}</span>
                                       <span className="ml-[4px]"><sub>21:00</sub></span>
                                    </span>
                                </span>
                            </span>
                        </div>
                    ))}
            </div>
            <ChatMessages />
        </div>
    );
};

export default ChatBg;
