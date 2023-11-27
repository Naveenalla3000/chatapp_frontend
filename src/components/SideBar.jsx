import SearchAndCreateBox from './SearchBox';
import ContactItem from './ContactItem';
import { useGetAllUsersQuery } from '../redux/features/chat/chatApi';
import { useEffect, useState } from 'react';
import { MdOutlineGroupOff } from 'react-icons/md';
const SideBar = ({ user, userRole, selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);

  const { data, isError, isSuccess, error, isLoading: isLoadingUsers } = useGetAllUsersQuery(undefined, {
    skip: userRole === "USER",
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
  }, [isSuccess, data, user, userRole, isError]);

  return (
    <div className={`${userRole === 'USER' ? "w-0 hidden" : "w-1/4"}`}>
      <SearchAndCreateBox />
      <div className="holder p-1 flex flex-col gap-1 px-1 h-screen overflow-auto bg-[#f0f2f5] pb-[63px] border-r-0">
        {
          users && users.map((user, index) => (
            <ContactItem
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              key={index}
              user={user}
            />
          ))
        }{
          users.length === 0 && (
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
