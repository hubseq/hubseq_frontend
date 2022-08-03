import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Upload as UploadIcon } from '../../icons/upload';

export const FileModal = ({}) => {
    const [open, setOpen] = useState(false);
    let upload_button;

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

      // upload button - always show
    upload_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Upload
                  </Button>

    return (
        <>
        <Button startIcon={(<UploadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Upload
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload File to HubSeq</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To upload a file. Please enter the local file path.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Local Filepath"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Upload</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};