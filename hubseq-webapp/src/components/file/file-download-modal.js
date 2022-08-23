import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { fileDownloadCall } from './file-download-api-call';
import * as path from 'path';
// import { showSaveFilePicker } from 'native-file-system-adapter';
import * as streamSaver from 'streamsaver';

//  <a href='/static/test.html' target='_blank'>link to test.html</a>

export const FileDownloadModal = ({currentPath, selectedFiles, session, ...rest}) => {
    const [open, setOpen] = useState(false);

    let download_button;

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleDownload = async () => {
      const filePaths = selectedFiles.map((f)=>(path.join(currentPath,f)));
      for (let i=0; i<filePaths.length; i++){
        // fileDownloadCall(filePaths[i]);
        console.log('HANDLE DOWNLOAD: ', filePaths[i]);
      }
      const filedata = await fileDownloadCall( filePaths, session.idToken );
      const blob = new Blob([filedata], {type: "application/octet-stream"});
      const readableStream = blob.stream();
      const fileStream = streamSaver.createWriteStream('Untitled.png', { size: blob.size });
      await readableStream.pipeTo(fileStream);

      setOpen(false);
    }
    download_button = <Button startIcon={(<DownloadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Download
                      </Button>

    return (
        <>
        <Button startIcon={(<DownloadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Download
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Download File from HubSeq</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The selected files will be downloaded. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDownload}>Download</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
