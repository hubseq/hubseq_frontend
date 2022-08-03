import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Upload as UploadIcon } from '../../icons/upload';

export const RunDetailsModal = ({}) => {
    const [open, setOpen] = useState(false);
    let run_details_button;

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

      // upload button - always show
    run_details_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Details
                  </Button>

    return (
        <>
        <Button startIcon={(<UploadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Run Details
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Run Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Run details here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Run_Details"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
