import { useState } from "react";
import { BsSend } from "react-icons/bs";
import EmptyMessage from "./EmptyMessage";
import EmojiPicker from "emoji-picker-react";
import SmileEmoji from "./SmileEmoji";

const ChatMessages = () => {
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const changeMessage = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      setAlert(true);
    } else {
      console.log(message);
      setMessage('');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const isMessageNotEmpty = message.trim() !== '';

  return (
    <div className="absolute bottom-0 w-full h-14 bg-[#f0f2f5]">
      <form
        className='flex gap-2 min-h-full h-full w-full items-center justify-between border-t outline-none py-2 px-2 relative'
        onSubmit={sendMessage}
      >
        {showEmojis && (
          <div className="absolute bottom-[60px] left-1">
            <EmojiPicker width={425} height={425} onEmojiClick={() => { }} />
          </div>
        )}
        <span
          className="text-slate-400 cursor-pointer"
          onClick={() => setShowEmojis(!showEmojis)}
        >
          <SmileEmoji />
        </span>
        <textarea
          type='text'
          name='message'
          value={message}
          onChange={changeMessage}
          onKeyDown={handleKeyDown}
          className='w-[100%] h-full bg-white outline-none px-2 py-[6px] rounded-lg resize-none'
          placeholder='Enter message'
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
