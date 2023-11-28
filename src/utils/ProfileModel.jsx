import { Box, Modal } from '@mui/material';
import { useSelector } from 'react-redux';

const ProfileModel = ({ open, handleClose }) => {
    const {user} = useSelector(state=>state.auth);
    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box className="absolute w-[35%] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px] py-10 px-8 shadow-xl outline-none">
                    <div className='w-full mb-6'>
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
                    <div>
                        <p className='text-xl text-left pb-4'>My Profile</p>
                    <table className="table-auto border rounded-md">
                        <tbody className="border rounded-lg">
                            <tr className="border h-10 px-4 bg-white">
                                <td className="px-4 py-1">My Name</td>
                                <td className="px-4 py-1">{user && user.name}</td>
                            </tr>
                            <tr className="border h-10 px-4 bg-slate-100">
                                <td className="px-4 py-1 w-full">Email</td>
                                <td className="px-4 py-1 w-full">{user && user.email}</td>
                            </tr>
                            <tr className="border h-10 px-4 bg-white">
                                <td className="px-4 py-1 w-full">Role</td>
                                <td className="px-4 py-1 w-full">{user && user.role}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ProfileModel;
