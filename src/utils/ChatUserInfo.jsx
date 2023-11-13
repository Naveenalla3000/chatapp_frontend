

const ChatUserInfo = () => {
    return (
        <div className='w-full h-14 border bg-white'>
            <div className="flex ml-4 justify-start items-center">
                <img
                    src={'/avatar.jpg'}
                    alt='icon'
                    className='w-10 h-10 rounded-full'
                />
                <div className="flex flex-col ml-4">
                    <p>naveen</p>
                    <p>online</p>
                </div>
            </div>
        </div>
    )
}

export default ChatUserInfo