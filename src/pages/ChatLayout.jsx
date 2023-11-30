import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import DefaultWallpaper from '../components/DefaultWallpaper';
import { useSelector } from 'react-redux';
import Conversation from '../components/Conversation';


const ChatLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const { role: userRole } = user;
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='w-full h-screen'>
      <div className="flex">
        <SideBar
          user={user}
          userRole={userRole}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        {selectedUser ? (
          <Conversation
            selectedUser={selectedUser}
          />
        ) : (
          <DefaultWallpaper
            setSelectedUser={setSelectedUser}
            userRole={userRole}
          />
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
