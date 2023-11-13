
const ChatMessages = () => {
  return (
    <div className="absolute bottom-0 w-full h-14 bg-white">
      <div className='flex gap-2 min-h-full h-full border-t outline-none py-2 px-2'>
        <input type='text' name='user' className='w-10/12 h-full bg-transparent border outline-none px-2' placeholder='Enter message' />
        <button className='w-2/12 h-full bg-trans parent border outline-none px-2'>Send</button>
      </div>
    </div>
  )
}

export default ChatMessages