import React, { useState } from "react";
import { GrContactInfo } from "react-icons/gr";
import { Box, Modal, Typography } from "@mui/material";
import UserInfoModel from "../utils/UserInfoModel";


const ContactItem = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        role="button"
        className={`group py-1 px-2 !pr-4 flex justify-between bg-white cursor-pointer rounded-3xl hover:bg-green-100 border`}
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
            <div className="flex flex-col ml-4">
              <p>naveen</p>
              <p>last message</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center text-center">
          <span className="text-green-900">online</span>
        </div>
      </div>
      <UserInfoModel open={open} handleClose={handleClose} />
    </>
  );
};

export default ContactItem;
