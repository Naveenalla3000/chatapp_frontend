import { IoMdLogOut } from 'react-icons/io';
import {RiLockPasswordFill} from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import LogoutModel from '../utils/LogoutModel';
import { motion } from 'framer-motion';
const SettingsModel = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(!open);
    }
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.7, z: 0 }}
                animate={{ opacity: 1, scale: 1, z: 1 }}
                transition={{ duration: 0.2 }}
                className='z-10 absolute bg-white w-[50%] h-auto top-4 right-4 rounded-lg shadow-2xl border'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <button className='py-2 px-4 w-full hover:bg-green-100 rounded-lg flex items-center gap-3 justify-start h-[45px]'>
                        <FaUserAlt/>
                        <span>Profile</span>
                    </button>
                    <button className='py-2 px-4 w-full hover:bg-green-100 rounded-lg flex items-center gap-3 justify-start h-[45px]'>
                        <RiLockPasswordFill/>
                        <span>Change password</span>
                    </button>
                    <button className='py-2 px-4 w-full hover:bg-green-100 rounded-lg flex items-center gap-3 justify-start h-[45px]'
                        onClick={handleClose}
                    >
                        <IoMdLogOut size={25} />
                        <span>Logout</span>
                    </button>
                </div>
            </motion.div>
            {
                open && (
                    <LogoutModel open={open} handleClose={handleClose} />
                )
            }
        </>
    )
}

export default SettingsModel;