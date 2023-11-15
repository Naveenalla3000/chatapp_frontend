import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Slide, Typography } from '@mui/material'
import React, { useState } from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
const EmptyMessage = ({ alert, setAlert }) => {

    const handleClose = () => {
        setAlert(false);
    }

    return (
        <div>
            <React.Fragment>
                <Dialog
                    open={alert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Alert"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Sending empty message is not allowed
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{border:'1px solid #f44336',color:'#f44336'}} onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default EmptyMessage;
