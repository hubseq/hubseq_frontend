import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Pipeline as PipelineIcon } from '../../../icons/pipeline';

export const RunPipelineModal = ({}) => {
    const [open, setOpen] = useState(false);
    const [pipeline, setPipeline] = useState('');
    let run_pipeline_button;
    let pipeline_options;

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handlePipelineSelect = (event) => {
      setPipeline(event.target.value);
    };

    run_pipeline_button = <Button startIcon={(<PipelineIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Pipeline
                  </Button>

    pipeline_options = pipeline!='' ? 'Pipeline Details!' : null;

    return (
        <>
        <Button startIcon={(<PipelineIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Run Pipeline
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth='xl' fullWidth>
        <DialogTitle>Run Pipeline</DialogTitle>
        <DialogContent>
          <FormControl variant="standard" fullWidth>
          <InputLabel>Select Pipeline</InputLabel>
          <Select
            labelId="select-pipeline-dropdown"
            id="select-pipeline-dropdown"
            value={pipeline}
            label="Pipeline"
            onChange={handlePipelineSelect}
          >
            <MenuItem value={'rnaseq:mouse'}>RNA Sequencing - Mouse</MenuItem>
            <MenuItem value={'rnaseq:human'}>RNA Sequencing - Human</MenuItem>
          </Select>
          </FormControl>
          <DialogContentText>
            {pipeline_options}
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
