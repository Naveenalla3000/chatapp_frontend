import { useTransition, useState } from "react";
import InfoTable from "./InfoTable";
import { MenuItem, Select } from "@mui/material";
import { motion } from 'framer-motion';

const ChatUserInfo = ({ isBorder, allInfo, handleClose }) => {
    const [slide, setSlide] = useState("INFO");
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const variants = {
        default: { borderBottom: "2px" },
        active: { borderBottom: "2px solid #e2e8f0"},
    };
    const [, startTransition] = useTransition();

    const handleTabChange = (slideName) => {
        startTransition(() => {
            setSlide(slideName);
        });
    };

    const [role, setRole] = useState('');
    const handleSetRole = (e) => { };
    const [helper, setHelper] = useState('');
    const handleSetHelper = (e) => { };

    return (
        <div className={`w-full p-1 ${isBorder ? "border bg-[#f0f2f5]" : "h-[50%]"}`}>
            <div className="flex ml-4 justify-start items-center">
                <img
                    src={'/avatar.jpg'}
                    alt='icon'
                    className='w-10 h-10 rounded-full cursor-pointer'
                />
                <div className="flex flex-col ml-4">
                    <p>Naveen</p>
                    <p>online</p>
                </div>
            </div>

            {
                allInfo && (
                    <div className="p-4 bg-white">

                        <div className="flex justify-start items-center gap-4 px-6">
                            <motion.div
                                animate={slide === "INFO" ? "active" : "default"}
                                variants={variants}
                                className=""
                                onClick={() => handleTabChange("INFO")}
                            >
                                <button className="py-2 text-xl">Details</button>
                            </motion.div>
                            <motion.div
                                animate={slide === "SET_HELPER" ? "active" : "default"}
                                variants={variants}
                                className=""
                                onClick={() => handleTabChange("SET_HELPER")}
                            >
                                <button className="py-2 text-xl">Change Helper</button>
                            </motion.div>
                            <motion.div
                                animate={slide === "SET_ROLE" ? "active" : "default"}
                                variants={variants}
                                className=""
                                onClick={() => handleTabChange("SET_ROLE")}
                            >
                                <button className="py-2 text-xl">Change Role</button>
                            </motion.div>
                        </div>

                        <div className={`info p-6 ${slide === 'INFO' ? '' : "hidden"}`}>
                            <InfoTable />
                            <div className="h-[104px]"></div>
                            <div className="flex justify-between mt-4 gap-4">
                                <button
                                    className="bg-slate-100 hover:bg-slate-200 text-black border py-2 px-8 rounded-md w-full"
                                    onClick={handleClose}
                                >Close
                                </button>
                                <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-8 rounded-md w-full">
                                    Ok
                                </button>
                            </div>
                        </div>

                        <div className={`info p-6 ${slide === 'SET_HELPER' ? '' : "hidden"}`}>
                            <InfoTable />
                            <form onSubmit={handleSetHelper} className="">
                                <p className="mt-8">Select / Change Helper : </p>
                                <Select
                                    className="mt-2 border rounded-lg w-full outline-none ring-green-500 h-10 p-1"
                                    defaultValue="default"
                                    onChange={(e) => {setHelper(e.target.value)}}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="default" disabled>Choose a helper</MenuItem>
                                    <MenuItem value="John">John</MenuItem>
                                    <MenuItem value="Emma">Emma</MenuItem>
                                </Select>
                                <div className="flex justify-between mt-4 gap-4">
                                    <button
                                        className="bg-slate-100 hover:bg-slate-200 text-black border py-2 px-8 rounded-md w-full"
                                        onClick={handleClose}
                                    >Close
                                    </button>
                                    <button
                                        className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-8 rounded-md w-full"
                                        type="submit"
                                    >
                                        Change Helper
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className={`info p-6 ${slide === 'SET_ROLE' ? '' : "hidden"}`}>
                            <InfoTable />
                            <form onSubmit={handleSetRole} className="">
                                <p className="mt-8">Change Role : </p>
                                <Select
                                    className="mt-2 border rounded-lg w-full outline-none ring-green-500 h-10 p-1"
                                    defaultValue="default"
                                    onChange={(e) => setRole(e.target.value)}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="default" disabled>Choose Role</MenuItem>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Helper">Helper</MenuItem>
                                    <MenuItem value="User">User</MenuItem>
                                </Select>
                                <div className="flex justify-between mt-4 gap-4">
                                    <button
                                        className="bg-slate-100 hover:bg-slate-200 text-black border py-2 px-8 rounded-md w-full"
                                        onClick={handleClose}
                                    >Close
                                    </button>
                                    <button
                                        className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-8 rounded-md w-full"
                                        type="submit"
                                    >
                                        Change Role
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                )
            }
        </div>
    );
}

export default ChatUserInfo;
