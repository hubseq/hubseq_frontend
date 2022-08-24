import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Upload as UploadIcon } from '../../icons/upload';
import { useS3Upload } from 'next-s3-upload';
import { fileUploadCall } from './file-upload-api-call';
import * as path from 'path';
//  <a href='/static/test.html' target='_blank'>link to test.html</a>

export const FileUploadModal = ({currentPath, session, ...rest}) => {
    const [open, setOpen] = useState(false);
    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
    let upload_button;

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    let handleFileChange = async file => {
      console.log('FILE: ', file);
      // console.log('FILE CONTENTS: ', file.text());
      console.log('PATH: ', path.join(currentPath,file.name));
      let response = await fileUploadCall(path.join(currentPath,file.name), file, session.idToken);
    };

      // upload button - always show
    upload_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={openFileDialog}> Upload
                  </Button>

    return (
        <>
        <FileInput onChange={handleFileChange} />
        <Button startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
          onClick={openFileDialog}> Upload
        </Button>

      </>
    );
};
