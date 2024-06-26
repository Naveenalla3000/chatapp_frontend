import SearchAndCreateBox from './SearchBox';
import ContactItem from './ContactItem';
import { useGetAllUsersQuery } from '../redux/features/chat/chatApi';
import { useEffect, useState } from 'react';
import { MdOutlineGroupOff } from 'react-icons/md';
import { useSelector } from 'react-redux';
import ChatUsersSkeleton from '../utils/ChatUsersSkeleton';
import { useSocket } from '../context/socketContext';

const SideBar = ({ user, userRole, selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const { user: stateUser } = useSelector(state => state.auth);
  const [searchUser, setSearchUser] = useState('');
  const { data, isError, isSuccess, error, isLoading: isLoadingUsers } = useGetAllUsersQuery(undefined, {
    // skip: userRole === "USER",
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setUsers(data?.allUsers);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, data, user, isError]);


  return (
    <div className={`${userRole !== "USER" ? "w-1/4" : "hidden w-0"}`}>
      <SearchAndCreateBox setSearchUser={setSearchUser} />
      <div className="flex flex-col gap-1 px-2 h-screen overflow-auto bg-[#f0f2f5] pb-[64px] border-r-0">
        {
          isLoadingUsers ?
            (
              <ChatUsersSkeleton />
            )
            :
            (
              <>
                {
                  users && users.filter((user) => {
                    return searchUser.toLowerCase() === '' ? user : user.name.toLowerCase().includes(searchUser.toLowerCase())
                  }).map((user, index) => (
                    <ContactItem
                      selectedUser={selectedUser}
                      setSelectedUser={setSelectedUser}
                      key={index}
                      user={user}
                    />
                  )
                  )
                }
              </>
            )
        }{
          users.length === 1 && userRole === "HELPER" && (
            <div className={`${isLoadingUsers ? "hidden" : ""} `}>
              <div className="flex flex-col justify-center items-center">
                <MdOutlineGroupOff size={25} />
                <p className='text-left pr-3'>No users have been assigned to you yet.</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default SideBar;
