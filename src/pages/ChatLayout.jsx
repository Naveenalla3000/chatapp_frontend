import { useState } from 'react';

import SideBar from '../components/SideBar';
import ChatBg from '../components/ChatBg';
import DefaultWallpaper from '../components/DefaultWallpaper';
import { useSelector } from 'react-redux';


const ChatLayout = () => {
  const {user} = useSelector(state => state.auth);
  const {role:userRole} =user;
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='w-full h-screen'>
      <div className="flex h-screen">
        <SideBar 
          user={user} 
          userRole={userRole} 
          selectedUser={selectedUser} 
          setSelectedUser={setSelectedUser} 
        />
        {
          selectedUser ? 
            <ChatBg 
              userRole={userRole} 
              selectedUser={selectedUser}
            />
            :
            <DefaultWallpaper 
              userRole={userRole}
            />
        }
      </div>
    </div>
  );
};

export default ChatLayout