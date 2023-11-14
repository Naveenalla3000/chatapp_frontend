import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { GrContactInfo } from "react-icons/gr";
import UserInfoModel from "../utils/UserInfoModel";

const ContactItem = () => {
  const [visibleDots, setVisibleDots] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      className={`flex border pl-1 pr-3 justify-between items-center rounded-3xl cursor-pointer`}
      onMouseEnter={() => setVisibleDots(true)}
      onMouseLeave={() => setVisibleDots(false)}
    >
      <div className="flex items-center transition-transform duration-2000 ease-in-out">
        {visibleDots && (
          <GrContactInfo
            size={30}
            className="text-blue-500 mx-2 transform hover:scale-110"
            onClick={handleOpen}
          />
        )}
        <img
          src={"/avatar.jpg"}
          alt="icon"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col ml-4">
          <p>naveen</p>
          <p>last message</p>
        </div>
      </div>
      <div className="">
        <span className="text-green-900">online</span>
      </div>
     <UserInfoModel open={open} handleClose={handleClose} />
    </div>
  );
};

export default ContactItem;
