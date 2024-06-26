import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import SettingsModel from './SettingsModel';
import { IconButton } from '@mui/material';
import { MdClose } from 'react-icons/md';

const SearchBox = ({ setSearchUser }) => {
  const [showSettings, setShowSettings] = useState(false);
  const handleShowSettings = (e) => {
    e.preventDefault();
    setShowSettings(!showSettings);
  }
  return (
    <>
      <div className='flex gap-2 p-2 h-14 bg-[#f0f2f5]'>
        <input
          type='text'
          name='user'
          className='w-[95%] h-full bg-white border outline-none px-2 rounded-lg'
          placeholder='Search for user or helper'
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <IconButton aria-label="Settings"
          onClick={handleShowSettings}
        >
          {!showSettings ? <BsThreeDotsVertical size={25} /> : <MdClose size={25} />}
        </IconButton>
      </div>
      {
        showSettings && (
          <div className='relative'>
            <SettingsModel />
          </div>
        )
      }
    </>
  )
}

export default SearchBox;