import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileModel from '../utils/ProfileModel';
import { IoMdLogOut } from 'react-icons/io';
import LogoutModel from '../utils/LogoutModel';
import { Skeleton } from '@mui/material';
import { useSocket } from '../context/socketContext';

const UserInfoHeader = ({ chatLoading, selectedUser }) => {
  const { user } = useSelector(state => state.auth);
  const { socket, onlineUsers } = useSocket();
  const [openProfile, setOpenProfile] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const handleClickProfile = (e) => {
    e.preventDefault();
    if (user.role !== "USER") {
      return;
    }
    setOpenProfile(!openProfile)
  }
  const handleClickLogout = (e) => {
    e.preventDefault();
    setOpenLogout(!openLogout)
  }
  return (
    <div className='w-full p-1 h-[8vh] bg-[#f0f2f5]'>
      {
        !chatLoading ? (
          <>
            <div className="flex ml-4 justify-start items-center">
              <img
                src={'/avatar.jpg'}
                alt='icon'
                className='w-10 h-10 rounded-full cursor-pointer'
                onClick={handleClickProfile}
              />
              <div className="flex flex-col ml-4">
                {user._id === selectedUser._id ? (
                  <p>{import.meta.env.VITE_APP_COMPANY_NAME.toString()}</p>
                ) : (
                  <p>{selectedUser.name}</p>
                )}
                <p>{
                  onlineUsers.includes(selectedUser._id) ? (
                    <span className='text-green-500'>Online</span>
                  ) : (
                    <span className='text-red-500'>Offline</span>
                  )
                }</p>
              </div>
              {
                user.role === "USER" && (
                  <div className="absolute top-[16px] right-10">
                    <span>
                      <IoMdLogOut size={25} onClick={handleClickLogout} className='cursor-pointer' />
                    </span>
                  </div>
                )
              }
            </div>
          </>) : (
          <>
            <div className="flex gap-3 justify-start">
              <Skeleton variant="circular" width={50} height={50} className='rounded-xl' />
              <Skeleton variant="rectangular" width={'100%'} height={50} className='rounded-xl' />
            </div>
          </>)
      }
      {
        openProfile && (
          <ProfileModel open={openProfile} handleClose={handleClickProfile} />
        )
      }{
        openLogout && (
          <LogoutModel open={openLogout} handleClose={handleClickLogout} />
        )
      }
    </div>
  );
};

export default UserInfoHeader;
