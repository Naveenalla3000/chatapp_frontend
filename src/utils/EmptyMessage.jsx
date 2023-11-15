import { Box, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'

const EmptyMessage = ({alert,setAlert}) => {

    const handleClose = () => {
        setAlert(false);
    }

    return (
        <div>
            <Modal
                keepMounted
                open={alert}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  w-auto bg-white rounded-[8px] p-4 px-8 shadow outline-none">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Alert
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Empty message should not be sent!
                    </Typography>
                    <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleClose}>
                        Close
                    </button>
                </Box>
            </Modal>
        </div>
    )
}

export default EmptyMessage;
