import SearchAndCreateBox from './SearchBox';
import ContactItem from './ContactItem';
import { useGetAllUsersQuery } from '../redux/features/chat/chatApi';
import { useEffect, useState } from 'react';

const SideBar = ({ user, userRole, selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);

  const { data, isError, isSuccess, error } = useGetAllUsersQuery(undefined, {
    skip: userRole === "USER",
  });


  useEffect(() => {
    if (isSuccess) {
      setUsers(data?.allUsers);
    }
  }, [isSuccess, data]);

  return (
    <div className={`${userRole ==='USER'?"w-0 hidden":"w-1/4"}`}>
      <SearchAndCreateBox />
      <div className="holder p-1 flex flex-col gap-1 h-screen overflow-auto bg-[#f0f2f5] pb-[63px]">
        {
          users && users.map((user, index) => (
            <ContactItem
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              key={index}
              user={user}
            />
          ))
        }
      </div>
    </div>
  );
};

export default SideBar;
