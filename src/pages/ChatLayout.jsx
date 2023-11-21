
import SideBar from '../components/SideBar';
import ChatBg from '../components/ChatBg';

const ChatLayout = () => {
  return (
    <div className='w-full h-screen'>
      <div className="flex h-screen">
        <SideBar />
        <ChatBg />
      </div>
    </div>
  );
};

export default ChatLayout