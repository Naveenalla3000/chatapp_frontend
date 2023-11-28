import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ChatBg from '../components/ChatBg';
import DefaultWallpaper from '../components/DefaultWallpaper';
import { useSelector } from 'react-redux';
import { useGetASpecificChatMutation } from '../redux/features/chat/chatApi';
import Loader from '../components/Loader/Loader';

const ChatLayout = () => {
  const { user } = useSelector(state => state.auth);
  const { role: userRole } = user;
  const [selectedUser, setSelectedUser] = useState(null);
  const [getASpecificChat, {
    data: dataGetASpecificChat,
    isLoading: isLoadingGetASpecificChat,
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
      <div className="flex">
        <SideBar
          user={user}
          userRole={userRole}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        {
          selectedUser ? (
            <ChatBg
              user={user}
              isLoadingGetASpecificChat = {isLoadingGetASpecificChat}
              userRole={userRole}
              selectedUser={selectedUser}
              dataGetASpecificChat={dataGetASpecificChat}
            />
          )
            :
            (
              <DefaultWallpaper
                setSelectedUser={setSelectedUser}
                userRole={userRole}
              />
            )
        }
      </div>
    </div>
  );
};

export default ChatLayout;
