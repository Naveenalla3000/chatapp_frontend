
import SideBar from '../components/SideBar'
import ChatBg from '../components/ChatBg'

const ChatLayout = () => {
  return (
    <div className='flex w-full'>
      <SideBar/>
      <ChatBg/>
    </div>
  )
}

export default ChatLayout