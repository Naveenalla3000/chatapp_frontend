import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React from 'react';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const JokeModel = ({ joke,alert, setAlert }) => {
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
                    <DialogTitle>{"😊 ZOKE"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        <p className='bg-[#e1ece1] text-[#527354] px-2 py-2 rounded-lg text-center'>{joke}</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{border:'1px solid #fff4e5',fontSize:'20px'}} onClick={handleClose}>😊 </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
    </div>
  )
}

export default JokeModel