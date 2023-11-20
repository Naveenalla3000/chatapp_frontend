import { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import EmptyMessage from "./EmptyMessage";
import InputEmoji from 'react-input-emoji';

const ChatMessages = () => {
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);

  const sendMessage = (text) => {
    setMessage('');
    if(message===undefined||message.trim()===''){
        setAlert(true);
        return;
    }
    console.log(message);
  }
  const isMessageNotEmpty = message !== undefined && message.trim() !== '';

  return (
    <div className="absolute bottom-0 w-full h-14 bg-[#f0f2f5]">
      <form
        className='flex gap-2 min-h-full h-full w-full items-center justify-between border-t outline-none py-2 px-2 relative'
        onSubmit={(e) => {
          e.preventDefault();
          if (message === undefined || message.trim() === null) {
            setAlert(true);
            return;
          }
          sendMessage(message);
        }}
      >
        <InputEmoji
          name='message'
          value={message}
          onChange={setMessage}
          className='w-[100%] h-full bg-white outline-none py-[6px] resize-none'
          placeholder='Enter message'
          onEnter={sendMessage}
          borderRadius={12}
        />
        <button
          className={`w-[3.5%] h-full p-2 font-bold cursor-pointer
            rounded-full bg-trans parent border outline-none 
            px-2 flex justify-center items-center gap-2 ${isMessageNotEmpty ? "bg-green-500" : "bg-green-200"}`}
          type="submit"
        >
          <span>
            <BsSend />
          </span>
        </button>
      </form>
      {alert && <EmptyMessage alert={alert} setAlert={setAlert} />}
    </div>
  );
}

export default ChatMessages;
