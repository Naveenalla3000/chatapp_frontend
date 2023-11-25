import React from 'react'

const UserInfoHeader = ({selectedUser}) => {
  return (
    <div className='w-full p-1 bg-[#f0f2f5]'>
      <div className="flex ml-4 justify-start items-center">
        <img
          src={'/avatar.jpg'}
          alt='icon'
          className='w-10 h-10 rounded-full cursor-pointer'
        />
        <div className="flex flex-col ml-4">
          <p>{selectedUser.name}</p>
          <p>{selectedUser.onlineStatus}</p>
        </div>
      </div>
    </div>
  )
}

export default UserInfoHeader