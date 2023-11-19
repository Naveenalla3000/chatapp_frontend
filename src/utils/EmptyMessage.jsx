import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Slide, Typography } from '@mui/material'
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
                        <Alert severity="warning"> Sending empty message is not allowed</Alert>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{border:'1px solid #fff4e5',color:'#70480f',}} onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default EmptyMessage;
