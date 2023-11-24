import { Box, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLoadUserQuery } from '../redux/features/api/apiSlice';
import { useChangePasswordMutation } from '../redux/features/user/userApi';
import { toast } from 'react-toastify';

const PasswordModel = ({ open, handleClose }) => {
    const { data, isError, isSuccess, error } = useLoadUserQuery({}, { refetchOnMountOrArgChange: true });
    const [user, setUser] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [changePassword, 
        { 
            isSuccess: isChangePasswordSuccess, 
            isError: isChangePasswordError, 
            data: changePasswordData,
            error: changePasswordError,
        }] = useChangePasswordMutation();
    const resetAllFields = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }
    useEffect(() => {
        if (isSuccess) {
            setUser(data.user);
        }
        if (isError) {
            console.log(isError);
        }
        if(isChangePasswordSuccess || isChangePasswordError){
            if (isChangePasswordSuccess) {
                toast.success(changePasswordData.message);
            }
            else if (isChangePasswordError) {
                toast.error(changePasswordError.data.message);
            }
            resetAllFields();
            handleClose();
        }
    }, [data, error, isChangePasswordSuccess, isChangePasswordError]);

    const handleChangePassword = (e) => {
        e.preventDefault();
        const data = {
            oldPassword,
            newPassword,
            confirmNewPassword
        };
        changePassword(data);
    }

    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box className="absolute top-[50%] left-[50%] w-[35%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px] py-10 px-8 shadow-xl outline-none">
                    <div className='w-full mb-4'>
                        <div className="flex ml-4 justify-start items-center">
                            <img
                                src={'/avatar.jpg'}
                                alt='icon'
                                className='w-10 h-10 rounded-full cursor-pointer'
                            />
                            <div className="flex flex-col ml-4">
                                <p>{user && user.name}</p>
                                <p>online</p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <p className='pt-4 text-xl text-left pb-4'>
                            Change password
                        </p>
                        <form onSubmit={handleChangePassword} className='gap-4 flex flex-col'>
                            <TextField
                                id="outlined-basic-2"
                                label="Old Password"
                                variant="outlined"
                                fullWidth
                                className='mb-4'
                                name='oldPassword'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <div className="flex gap-4">
                                <TextField
                                    id="outlined-basic-2"
                                    label="New Password"
                                    variant="outlined"
                                    fullWidth
                                    className='mb-4'
                                    name='oldPassword'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <TextField
                                    id="outlined-basic-2"
                                    label="Confirm New Password"
                                    variant="outlined"
                                    fullWidth
                                    className='mb-4'
                                    name='oldPassword'
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-row justify-center items-center w-full gap-4">
                                    <button
                                        className="bg-slate-100 hover.bg-slate-200 text-black border py-2 px-8 rounded-md w-full"
                                        onClick={handleClose}
                                    >Cancel
                                    </button>
                                    <button
                                        className="text-white border py-2 px-8 rounded-md w-full bg-green-400 hover.bg-green-500"
                                        type='submit'
                                    >Change password
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default PasswordModel;
