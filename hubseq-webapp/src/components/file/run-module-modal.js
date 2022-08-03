import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Upload as UploadIcon } from '../../icons/upload';

export const RunModuleModal = ({}) => {
    const [open, setOpen] = useState(false);
    let run_module_button;

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

      // upload button - always show
    run_module_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Module
                  </Button>

    return (
        <>
        <Button startIcon={(<UploadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Run Module
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Run Module</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Which module to run.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Module"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Run</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
