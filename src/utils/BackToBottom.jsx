import { motion } from 'framer-motion'
const BackToBottom = ({ scrollToBottom }) => {
    return (
        <div
            className='relative'>
            <motion.div
                className=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, }}
                transition={{ duration: 1.5 }}
            >
                <button
                    className='w-10 h-10 bg-transparent text-slate-400
                      border-2 border-slate-400 rounded-full focus:outline-none fixed bottom-[65px] right-1 flex justify-center items-center'
                    onClick={scrollToBottom}
                >
                    <svg viewBox="0 0 19 20" height="20" width="19"
                        preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px">
                        <path fill="currentColor"
                            d="M3.8,6.7l5.7,5.7l5.7-5.7l1.6,1.6l-7.3,7.2L2.2,8.3L3.8,6.7z">
                        </path>
                    </svg>
                </button>
            </motion.div>
        </div>
    );
};

export default BackToBottom;
