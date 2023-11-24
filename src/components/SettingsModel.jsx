import { IoMdLogOut } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import LogoutModel from '../utils/LogoutModel';
import { motion } from 'framer-motion';
import ProfileModel from '../utils/ProfileModel';
import PasswordModel from '../utils/PasswordModel';
const SettingsModel = () => {
    const [openLogout, setOpenLogout] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const handleCloseLogout = () => {
        setOpenLogout(!openLogout);
    };
    const handleCloseProfile = () => {
        setOpenProfile(!openProfile);
    };
    const handleClosePassword = () => {
        setOpenPassword(!openPassword);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.7, z: 0 }}
                animate={{ opacity: 1, scale: 1, z: 1 }}
                transition={{ duration: 0.2 }}
                className='z-10 absolute bg-white h-auto top-4 right-4 rounded-lg shadow-2xl border'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <button className='py-2 px-4 w-full hover:bg-green-100 rounded-lg flex items-center gap-3 justify-start h-[45px]'
                        onClick={handleCloseProfile}
                    >
                        <FaUserAlt />
                        <span>My Profile</span>
                    </button>
                    <button className='py-2 px-4 w-full hover:bg-green-100 rounded-lg flex items-center gap-3 justify-start h-[45px]'
                        onClick={handleClosePassword}
                    >
                        <RiLockPasswordFill />
                        <span>Change password</span>
                    </button>
                    <button className='py-2 px-4 w-full hover:bg-green-100 rounded-lg flex items-center gap-3 justify-start h-[45px]'
                        onClick={handleCloseLogout}
                    >
                        <IoMdLogOut size={25} />
                        <span>Logout</span>
                    </button>
                </div>
            </motion.div>
            {
                openProfile && (
                    <ProfileModel open={openProfile} handleClose={handleCloseProfile} />
                )
            }
            {
                openPassword && (
                    <PasswordModel open={openPassword} handleClose={handleClosePassword} />
                )
            }
             {
                openLogout && (
                    <LogoutModel open={openLogout} handleClose={handleCloseLogout} />
                )
            }
        </>
    )
}

export default SettingsModel;