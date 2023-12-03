// ContactItem.jsx
import React, { useState, useEffect } from "react";
import { GrContactInfo } from "react-icons/gr";
import UserInfoModel from "../utils/UserInfoModel";
import { useDispatch, useSelector } from "react-redux";
import { setChatByUser } from "../redux/features/chat/chatSlice";
import { is } from "date-fns/locale";
import { useSocket } from "../context/socketContext";

const ContactItem = ({selectedUser, setSelectedUser, user }) => {
  const { user: stateUser } = useSelector((state) => state.auth);
  const lastMessage = useSelector((state) => {
    const userChat = state.chat.find((chat) => chat.userId === user._id);
    return userChat ? userChat.message : '';
  });

  const [openOptions, setOpenOptions] = useState(false);
  const [open, setOpen] = useState(false);
  const [presentUser, setPresentUser] = useState(null);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    setPresentUser(user);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleNewMessage = (user) => {
    dispatch(setChatByUser({
      userId: user._id,
      message: user.lastMessageContent,
    }));
  };

  useEffect(() => {
    if (presentUser === null && user !== null) {
      setPresentUser(user);
    }
    handleNewMessage(user);
  }, [presentUser, user, setPresentUser]);

  const {socket,onlineUsers} = useSocket();

  return (
    <>
      <div
        role="button"
        className={`${selectedUser === user ? 'bg-green-400' : 'bg-white'
          } group py-1 px-2 !pr-4 flex justify-between cursor-pointer rounded-3xl border ${selectedUser !== user ? 'hover:bg-green-100' : ''
          }`}
        onMouseLeave={() => setOpenOptions(false)}
      >
        <div className="">
          <div className="flex items-center self-center p-1 relative">
            <GrContactInfo
              className="h-6 group-hover:mr-2 group-hover:w-6 group-hover:opacity-100 w-0 opacity-0 transition-all ease-in-out duration-100 text-zinc-300"
              onClick={handleOpen}
            />
            <div
              className={`
            z-20 text-left absolute bottom-0 translate-y-full text-sm w-52 bg-dark rounded-2xl p-2 shadow-md border-[1px] border-secondary
            ${openOptions ? "block" : "hidden"}
          `}
            ></div>
            <img src={"/avatar.jpg"} alt="icon" className="w-10 h-10 rounded-[50%]" />
            <button onClick={() => { setSelectedUser(user) }}>
              <div className="flex flex-col ml-4">
                <p className="text-left">
                  {user._id === stateUser._id ? (
                    <span>{
                      import.meta.env.VITE_APP_COMPANY_NAME.toString()
                    }</span>
                  ) : (
                    <span>{user.name}</span>
                  )}
                </p>
                <p className="text-start">
                  {lastMessage.substring(0, 22)}
                  {lastMessage.length > 22 && <span>....</span>}
                </p>
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center text-center">
          <span className="">{
            onlineUsers.includes(user._id) ? <span className="text-green-600">Online</span> : <span className="text-red-400">Offline</span>
          }</span>
        </div>
      </div>
      {presentUser && (
        <UserInfoModel
          user={presentUser}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default ContactItem;
