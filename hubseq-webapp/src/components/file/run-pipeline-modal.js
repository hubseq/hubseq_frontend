import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Upload as UploadIcon } from '../../icons/upload';

export const RunPipelineModal = ({}) => {
    const [open, setOpen] = useState(false);
    let run_pipeline_button;

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

      // upload button - always show
    run_pipeline_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Pipeline
                  </Button>

    return (
        <>
        <Button startIcon={(<UploadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Run Pipeline
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Run Module</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Which Pipeline to run.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Pipeline"
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
