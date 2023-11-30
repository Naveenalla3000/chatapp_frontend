import React from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

const MessageModel = ({ message }) => {

  const { user } = useSelector(state => state.auth);
  const { content, sender, createdAt } = message;

  const isMyMessage = sender === user._id;

  return (
    <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] lg:max-w-[60%] p-3 rounded-b-[12px] ${isMyMessage ? 'bg-green-100 shadow rounded-tl-[12px]' : 'bg-gray-100 shadow rounded-tr-[12px]'}`}>
        <p className={`break-words text-gray-900 ${isMyMessage ? 'text-end' : 'text-start'}`}>
          {content}
          <sub className={`text-xs text-gray-500 ${isMyMessage ? "pl-3" : 'pl-2'}`}>
            {format(parseISO(createdAt), 'dd/MM HH:mm')}
          </sub>
        </p>
      </div>
    </div>
  );
};

export default MessageModel;