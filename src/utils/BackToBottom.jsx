const BackToBottom = ({scrollToBottom}) => {
    return (
        <div className='relative'>
            <button
                className='w-10 h-10 bg-transparent text-white
                      border-2 border-white rounded-full focus:outline-none fixed bottom-[61px] right-[7px] flex justify-center items-center'
                onClick={scrollToBottom}
            >
                <svg viewBox="0 0 19 20" height="20" width="19"
                    preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px">
                    <path fill="currentColor"
                        d="M3.8,6.7l5.7,5.7l5.7-5.7l1.6,1.6l-7.3,7.2L2.2,8.3L3.8,6.7z">
                    </path>
                </svg>
            </button>
        </div>
    );
};

export default BackToBottom;
