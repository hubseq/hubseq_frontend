import { useState } from 'react';
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField, Box, Container } from '@mui/material';
import { Upload as UploadIcon } from '../../icons/upload';
import { getMetadataCall } from './get-metadata-api-call';
import { MetadataListResults } from './get-metadata-list-results';

export const MetadataModal = ({}) => {
    const [open, setOpen] = useState(false);
    const [metadata, setMetadata] = useState([[]]);
    const files = ["IT.png","JerryChen.jpg"];
    let update_metadata_button;

    React.useEffect(() => {
      async function getMetadata() {
        const new_metadata = await getMetadataCall(files, "www.hubseq.com/assets/");
        setMetadata(new_metadata);
      }
      getMetadata();
    }, []);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

      // upload button - always show
    update_metadata_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Update Metadata
                  </Button>

    return (
        <>
        <Button startIcon={(<UploadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Update Metadata
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth='xl'>
        <DialogTitle>Update Metadata</DialogTitle>
        <DialogContent>
        <Box sx={{ mt: 3 }}>
          <MetadataListResults myfiles={files} mytags={metadata} />
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
