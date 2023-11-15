import { useState } from "react";
import { BsSend } from "react-icons/bs";
import EmptyMessage from "./EmptyMessage";

const ChatMessages = () => {
  const [message, setMessage] = useState('');
  const [alert,setAlert]= useState(false);

  const changeMessage = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
  }

  const sendMessage = (event)=>{
    event.preventDefault();
    if(!message.trim()){
       setAlert(true);
    }
    console.log(message);
    setMessage('');
  }

  const isMessageNotEmpty = message.trim() !== '';

  return (
    <div className="absolute bottom-0 w-full h-14 bg-white">
      <form 
        className='flex gap-2 min-h-full h-full w-full items-center justify-between border-t outline-none py-2 px-2'
        onSubmit={sendMessage}
      >
        <input 
          type='text' 
          name='message' 
          value={message}
          onChange={changeMessage}
          className='w-[96.5%] h-full bg-transparent border outline-none px-2' 
          placeholder='Enter message' 
        />
        <button 
          className={`w-[3.5%] h-full p-2 font-bold cursor-pointer
            rounded-full bg-trans parent border outline-none 
            px-2 flex justify-center items-center gap-2 ${isMessageNotEmpty ? "bg-green-500" : "bg-green-100"}`}
          type="submit"
        > 
          <span>
            <BsSend/>
          </span>
        </button>
      </form>
      {
        alert && (
          <EmptyMessage alert={alert} setAlert={setAlert}/>
        )
      }
    </div>
  );
}

export default ChatMessages;
