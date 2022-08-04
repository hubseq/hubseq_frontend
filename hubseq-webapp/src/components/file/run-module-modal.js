import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Upload as UploadIcon } from '../../icons/upload';

export const RunModuleModal = ({}) => {
    const [open, setOpen] = useState(false);
    const [mymodule, setMyModule] = useState('');
    let run_module_button;
    let module_options;

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleModuleSelect = (event) => {
      setMyModule(event.target.value);
    };

      // upload button - always show
    run_module_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Module
                  </Button>

    module_options = mymodule!='' ? 'Module Details!' : null;

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
          <DialogContentText>
            {module_options}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Run</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
