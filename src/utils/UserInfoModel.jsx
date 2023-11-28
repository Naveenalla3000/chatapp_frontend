import { Modal, Box } from '@mui/material'
import React, { useEffect, useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { MenuItem, Select } from "@mui/material";
import { useChangeRoleMutation, useChangehelperMutation, useGetHelperinfoMutation, useGetavailableHelpersQuery } from '../redux/features/admin/adminApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const UserInfoModel = ({ user, open, handleClose }) => {
    const { user: stateUser } = useSelector(state => state.auth);
    const [slide, setSlide] = useState("INFO");
    const [role, setRole] = useState('');
    const [helper, setHelper] = useState('');
    const [availableHelpers, setAvailableHelpers] = useState([]);
    const [availableHelperInfo, setAvailableHelperInfo] = useState(null);
    const {
        data: availableHelpersData,
        isSuccess: availableHelpersIsSuccess,
        error: availableHelpersError,
    } = useGetavailableHelpersQuery(undefined, {
        skip: stateUser.role !== "ADMIN",
    });

    const [getHelperinfo,
        {
            data: getHelperInfoData,
            isSuccess: getHelperInfoIsSuccess,
            error: getHelperInfoError
        }] = useGetHelperinfoMutation({
            skip: stateUser.role !== "ADMIN",
            refetchOnMountOrArgChange: true,
        });

    const [changehelper, { isSuccess: changeHelperSuccess, error: changeHelperError }] = useChangehelperMutation();
    const [changeRole, { isSuccess: changeRoleSuccess, error: changeRoleError }] = useChangeRoleMutation();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user.role === "HELPER" && availableHelperInfo === null && stateUser.role === "ADMIN") {
                    await getHelperinfo({ helperId: user._id });

                    if (getHelperInfoIsSuccess) {
                        setAvailableHelperInfo(getHelperInfoData?.users);
                        //console.log(availableHelperInfo);
                    }

                    if (getHelperInfoError) {
                        console.log(getHelperInfoError);
                    }

                }

                if (availableHelpersError) {
                    console.log(availableHelpersError);
                }

                if (availableHelpersData) {
                    setAvailableHelpers(availableHelpersData?.helpers);
                }
                if (changeHelperSuccess) {
                    toast.success("Helper changed successfully");
                }
                if (changeHelperError) {
                    toast.error(changeHelperError.data.message || "Helper change failed");
                    console.log(changeHelperError);
                }
                if (changeRoleSuccess) {
                    toast.success("Role changed successfully");
                }
                if (changeRoleError) {
                    toast.error(changeRoleError.data.message || "Role change failed");
                    console.log(changeRoleError);
                }
                if (changeHelperSuccess || changeHelperError || changeRoleSuccess || changeRoleError) {
                    handleClose();
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [
        availableHelpersError,
        availableHelpersIsSuccess,
        user, getHelperInfoIsSuccess,
        changeRoleSuccess,
        changeRoleError,
        changeHelperSuccess,
        changeHelperError
    ]);


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
        active: { borderBottom: "2px solid #e2e8f0" },
    };
    const [, startTransition] = useTransition();
    const resetFields = () => {
        setRole('');
        setHelper('');
    }
    const handleTabChange = (slideName) => {
        startTransition(() => {
            setSlide(slideName);
        });
    };
    const handleSetRole = async (e) => {
        e.preventDefault();
        await changeRole({ role, userId: user._id });
        resetFields();


    };
    const handleSetHelper = async (e) => {
        e.preventDefault();
        await changehelper({ helperId: helper, chatOrUserId: user._id });
        resetFields();
    };
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <Box className="absolute w-[45%] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px] p-4 px-8 shadow outline-none">
                    <div className='w-full p-1'>
                        {/* Header */}
                        <div className="flex ml-4 justify-start items-center">
                            <img
                                src={'/avatar.jpg'}
                                alt='icon'
                                className='w-10 h-10 rounded-full cursor-pointer'
                            />
                            <div className="flex flex-col ml-4">
                                <p>{user.name}</p>
                                <p>online</p>
                            </div>
                        </div>

                        <div className="p-4 bg-white">

                            <div className="flex justify-start items-center gap-4 px-6">
                                {/* Details */}
                                <motion.div
                                    animate={slide === "INFO" ? "active" : "default"}
                                    variants={variants}
                                    className=""
                                    onClick={() => handleTabChange("INFO")}
                                >
                                    <button className="py-2 text-xl">Details</button>
                                </motion.div>

                                {/* change helper */}
                                {
                                    stateUser.role === "ADMIN" && (
                                        user.role === "USER" && (
                                            <motion.div
                                                animate={slide === "SET_HELPER" ? "active" : "default"}
                                                variants={variants}
                                                className=""
                                                onClick={() => handleTabChange("SET_HELPER")}
                                            >
                                                <button className="py-2 text-xl">Change Helper</button>
                                            </motion.div>
                                        )
                                    )
                                }

                                {
                                    stateUser.role === "ADMIN" && (
                                        // get all users under helper
                                        user.role === "HELPER" && (
                                            <motion.div
                                                animate={slide === "GET_USERS" ? "active" : "default"}
                                                variants={variants}
                                                className=""
                                                onClick={() => handleTabChange("GET_USERS")}
                                            >
                                                <button className="py-2 text-xl">Get Users</button>
                                            </motion.div>
                                        )
                                    )
                                }

                                {/* change role */}
                                {
                                    stateUser.role === "ADMIN" && (
                                        <motion.div
                                            animate={slide === "SET_ROLE" ? "active" : "default"}
                                            variants={variants}
                                            className=""
                                            onClick={() => handleTabChange("SET_ROLE")}
                                        >
                                            <button className="py-2 text-xl">Change Role</button>
                                        </motion.div>
                                    )
                                }

                            </div>

                            <div className={`info p-6 ${slide === 'INFO' ? '' : "hidden"}`}>
                                <div>
                                    <table className="table-auto border">
                                        <tbody className="border">
                                            <tr className="border h-10 px-4 bg-white">
                                                <td className="px-4 py-1 ">User Name </td>
                                                <td className="px-4 py-1 ">
                                                    {
                                                        user._id === stateUser._id ? (
                                                            <span>{
                                                                import.meta.env.VITE_APP_COMPANY_NAME.toString()
                                                            }</span>
                                                        ) : (
                                                            <span>{user.name}</span>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="border h-10 px-4 bg-slate-100">
                                                <td className="px-4 py-1 w-full">Email</td>
                                                <td className="px-4 py-1 w-full">{
                                                    user._id === stateUser._id ? (
                                                        <span>{
                                                            import.meta.env.VITE_APP_COMPANY_EMAIL.toString()
                                                        }</span>
                                                    ) : (
                                                        <span>{user.email}</span>
                                                    )

                                                }</td>
                                            </tr>
                                            <tr className="border h-10 px-4 bg-white">
                                                <td className="px-4 py-1 w-full">Role</td>
                                                <td className="px-4 py-1 w-full">{
                                                    user._id === stateUser._id ? (
                                                        <span>{
                                                            import.meta.env.VITE_APP_ADMIN_ROLE.toString()
                                                        }</span>
                                                    ) : (
                                                        <span>{user.role}</span>
                                                    )
                                                }</td>
                                            </tr>
                                            <tr className="border h-10 px-4 bg-slate-100">
                                                <td className="px-4 py-1 w-full">Current helper</td>
                                                <td className="px-4 py-1 w-full">{
                                                    user._id === stateUser._id ? (
                                                        <span>{
                                                            import.meta.env.VITE_APP_ADMIN_NAME.toString()
                                                        }</span>
                                                    ) : (
                                                        <span>{user.helperName}</span>
                                                    )
                                                }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {
                                stateUser.role === "ADMIN" && (
                                    user.role === "USER" && (
                                        <div className={` p-6 ${slide === 'SET_HELPER' ? '' : "hidden"}`}>
                                            <form onSubmit={handleSetHelper} className="">
                                                <p className="mt-8">Select / Change Helper : </p>
                                                <Select
                                                    className="mt-2 flex items-center justify-center border rounded-lg w-full outline-none ring-green-500 h-10 p-1"
                                                    defaultValue="default"
                                                    onChange={(e) => { setHelper(e.target.value) }}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="default" disabled>Choose a helper</MenuItem>
                                                    {
                                                        availableHelpers && availableHelpers.map((helperProps) => (
                                                            <MenuItem
                                                                key={helperProps._id}
                                                                className='px-3'
                                                                value={helperProps?._id}
                                                                style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <div>
                                                                    {helperProps?.name}
                                                                </div>
                                                                <div className="ml-2">
                                                                    {helperProps?.noOfAssignedUsers}
                                                                </div>
                                                            </MenuItem>
                                                        ))
                                                    }
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
                                    )
                                )
                            }

                            {
                                stateUser.role === "ADMIN" && (
                                    user.role === "HELPER" && (
                                        <div className={` p-6 ${slide === 'GET_USERS' ? '' : "hidden"}`}>
                                            <table className="w-full overflow-y-auto">
                                                <tbody className="border">
                                                    <tr className="border h-10 px-4 bg-slate-100">
                                                        <td className="px-4 py-1">Sl.No</td>
                                                        <td className="px-4 py-1">User name</td>
                                                        <td className="px-4 py-1">Email</td>
                                                    </tr>
                                                    {
                                                        availableHelperInfo && availableHelperInfo.map((user, index) => (
                                                            <tr key={index} className="border h-10 px-4 bg-white">
                                                                <td className="px-4 py-1">{index + 1}</td>
                                                                <td className="px-4 py-1">{user.name}</td>
                                                                <td className="px-4 py-1">{user.email}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            {
                                                !availableHelperInfo && (
                                                    <p className='mt-4 flex justify-center items-center'>No users are assigned to this helper.</p>
                                                )
                                            }
                                        </div>
                                    )
                                )
                            }

                            {
                                stateUser.role === "ADMIN" && (
                                    <div className={`info p-6 ${slide === 'SET_ROLE' ? '' : "hidden"}`}>
                                        <form onSubmit={handleSetRole} className="">
                                            <p className="mt-8">Change Role : </p>
                                            <Select
                                                className="mt-2 border rounded-lg w-full outline-none ring-green-500 h-10 p-1"
                                                defaultValue="default"
                                                onChange={(e) => setRole(e.target.value)}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value="default" disabled>Choose Role</MenuItem>
                                                <MenuItem value="HELPER">Helper</MenuItem>
                                                <MenuItem value="USER">User</MenuItem>
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
                                )
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </motion.div>
    )
}
export default UserInfoModel;