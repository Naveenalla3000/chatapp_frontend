import React, { useState, useEffect } from "react";
import { GrContactInfo } from "react-icons/gr";
import UserInfoModel from "../utils/UserInfoModel";

const ContactItem = ({ selectedUser, setSelectedUser, user, index }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [open, setOpen] = useState(false);
  const [presentUser, setPresentUser] = useState(null);

  useEffect(() => {
    if (presentUser === null && user !== null) {
      setPresentUser(user);
    }
  }, [presentUser, user, setPresentUser]);

  const handleOpen = () => {
    setOpen(true);
    setPresentUser(user);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

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
                <p className="text-left">{user.name}</p>
                <p>
                  {user.lastMessageContent.substring(0, 22)}
                  {
                    user.lastMessageContent.length > 22 && (
                      <span>....</span>
                    )
                  }
                </p>
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center text-center">
          <span className="">{user.onlineStatus}</span>
        </div>
      </div>
      {
        presentUser && (
          <UserInfoModel
            user={presentUser}
            open={open}
            handleClose={handleClose}
          />
        )
      }
    </>
  );
};

export default ContactItem;
