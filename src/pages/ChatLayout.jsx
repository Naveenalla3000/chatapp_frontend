import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ChatBg from '../components/ChatBg';
import DefaultWallpaper from '../components/DefaultWallpaper';
import { useSelector } from 'react-redux';
import { useGetASpecificChatMutation } from '../redux/features/chat/chatApi';

const ChatLayout = () => {
  const { user } = useSelector(state => state.auth);
  const { role: userRole } = user;
  const [selectedUser, setSelectedUser] = useState(null);
  const [getASpecificChat, {
    isSuccess: isSuccessGetASpecificChat,
    isError: isErrorGetASpecificChat,
    data: dataGetASpecificChat,
    error: errorGetASpecificChat
  }] = useGetASpecificChatMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedUser) {
          await getASpecificChat({ chatId: selectedUser?._id });
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };
    fetchData();
  }, [selectedUser]);

  return (
    <div className='w-full h-screen'>
      <div className="flex h-screen">
        <SideBar
          user={user}
          userRole={userRole}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        {selectedUser ? (
          <ChatBg
            user={user}
            userRole={userRole}
            selectedUser={selectedUser}
            dataGetASpecificChat={dataGetASpecificChat}
          />
        ) : (
          <DefaultWallpaper userRole={userRole} />
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
