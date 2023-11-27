import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import SettingsModel from './SettingsModel';

const SearchBox = () => {
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
        />
        <button
          onClick={handleShowSettings}
        >
          <BsThreeDotsVertical size={25} />
        </button>
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