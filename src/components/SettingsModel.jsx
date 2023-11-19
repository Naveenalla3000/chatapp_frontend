import {IoMdLogOut} from 'react-icons/io'
import React, { useState } from 'react'
import LogoutModel from '../utils/LogoutModel';
const SettingsModel = () => {
    const [open,setOpen] = useState(false);
    const handleClose = () => {
        setOpen(!open);
    }
  return (
    <>
    <div className='z-10 absolute bg-white w-[60%] h-auto top-4 right-4 rounded-lg shadow-2xl border'>
        <div className='w-full flex flex-col justify-center items-center'>
           <button className='py-2 px-4 w-full hover:bg-green-100 rounded-lg h-[45px]'>Change Password</button>
           <button className='py-2 px-4 w-full hover:bg-green-100 rounded-lg flex items-center gap-3 justify-center h-[45px]'
            onClick={handleClose}
           >
                Logout
                <IoMdLogOut size={25}/>
           </button>
        </div>
    </div>{
        open && (
            <LogoutModel open={open} handleClose={handleClose}/>
        )
    }
    </>
  )
}

export default SettingsModel