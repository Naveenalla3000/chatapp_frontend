import React, { useState } from 'react'
import { useLogoutQuery } from '../redux/features/auth/authApi';
import { Box, Modal } from '@mui/material';
import {motion} from 'framer-motion';

const LogoutModel = ({ open, handleClose }) => {
    const [logout, setLogout] = useState(false);
    const { } = useLogoutQuery(undefined, {
        skip: !logout,
    });

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log('logout');
        setLogout(true);
    };
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box className="absolute top-[50%] left-[50%] w-[30%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px] p-4 px-8 shadow-xl outline-none">
                    <div className="">
                        <div className="flex flex-col gap-4">
                            <p className='text-xl text-left'>
                                Logout?
                            </p>
                            <p className='text-left'>
                                Are you sure you want to log out?
                            </p>
                            <div className="flex justify-end mt-4 gap-4">
                                <div className="flex gap-5">
                                    <button
                                        className="bg-slate-100 hover:bg-slate-200 text-black border py-2 px-8 rounded-md w-full"
                                        onClick={handleClose}
                                    >Cancel
                                    </button>
                                    <button
                                        className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-8 rounded-md w-full"
                                        onClick={handleLogout}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </motion.div>
    )
}

export default LogoutModel