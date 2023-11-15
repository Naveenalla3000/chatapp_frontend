import { Modal,Box } from '@mui/material'
import React from 'react'
import ChatUserInfo from './ChatUserInfo'

const UserInfoModel = ({open,handleClose}) => {
    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px] p-4 px-8 shadow outline-none">
                    <ChatUserInfo isBorder={false} allInfo={true} handleClose={handleClose} />
                </Box>
            </Modal>
        </div>
    )
}

export default UserInfoModel