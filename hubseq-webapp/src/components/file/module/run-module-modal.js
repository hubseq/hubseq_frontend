import { useState } from 'react';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Upload as UploadIcon } from '../../../icons/upload';
import * as moment from 'moment';

export const RunModuleModal = ({currentPath, selectedFiles, ...rest}) => {
    const [open, setOpen] = useState(false);
    const [mymodule, setMyModule] = useState('');
    const [runid, setRunid] = useState('')
    let run_module_button;
    let module_options;

    React.useEffect(() => {
      console.log('RUN MODULE MODAL USE EFFECTCALLED!', selectedFiles);
    }, [selectedFiles]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleModuleSelect = (event) => {
      setMyModule(event.target.value);
      setRunid(moment().format('YYYY-MM-DD-hhmm[-]') + event.target.value);
    };

    // upload button - always show
    run_module_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Module
                  </Button>

    if (mymodule && mymodule!=""){
      module_options = <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '75ch' },}}
                            noValidate autoComplete="off">
                         <TextField margin="dense" id="module-runid" label="Run ID" defaultValue={runid}
                                  size="small" helperText="Enter Run ID" fullWidth />
                         <TextField disabled margin="dense" id="module-input"
                                  label="Input" defaultValue="(Selected Files)"
                                  size="small" helperText="Enter Input File(s)" fullWidth />
                         <TextField margin="dense" id="module-output" label="Output" defaultValue={"~/runs/"+runid+"/"}
                                  size="small" helperText="Enter Output Folder" fullWidth />
                       </Box>
    } else {
      module_options = null;
    }

    return (
        <>
        <Button startIcon={(<UploadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Run Module
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth='xl' fullWidth>
        <DialogTitle>Run Module</DialogTitle>
        <DialogContent>
          <FormControl variant="standard" fullWidth>
          <InputLabel>Select Module</InputLabel>
          <Select
            labelId="select-module-dropdown"
            id="select-module-dropdown"
            value={mymodule}
            label="Module"
            onChange={handleModuleSelect}
          >
            <MenuItem value={'fastqc'}>FASTQ QC (FastQC)</MenuItem>
            <MenuItem value={'rnastar'}>Genome Alignment (RNA-STAR)</MenuItem>
            <MenuItem value={'expressionqc'}>Gene Expression QC (ExpressionQC)</MenuItem>
            <MenuItem value={'deseq2'}>Differential Expression (DESeq2)</MenuItem>
            <MenuItem value={'deqc'}>DE Volcano and MA Plots (DE-QC)</MenuItem>
            <MenuItem value={'david_go'}>Gene Ontology analysis (DAVID GO)</MenuItem>
            <MenuItem value={'goqc'}>Gene Ontology Bar plots (GO-QC)</MenuItem>
          </Select>
          </FormControl>
          {module_options}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Run</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
