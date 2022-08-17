import { useState } from 'react';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, SvgIcon, Typography } from '@mui/material';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Modules as ModuleIcon } from '../../../icons/modules';
import { Cog as CogIcon } from '../../../icons/cog';
import { addTrailingSlash } from '../../../utils/jsutils';
import * as moment from 'moment';
import { runModuleCall } from './run-module-api-call';

export const RunModuleModal = ({currentPath, selectedFiles, ...rest}) => {
    const [open, setOpen] = useState(false);
    const [mymodule, setMyModule] = useState('');
    const [runid, setRunid] = useState('');
    const [output, setOutput] = useState('');
    const [params, setParams] = useState('');
    const [mygenome, setMyGenome] = useState('human');
    const [timenow, setTimeNow] = useState(moment().format('YYYY-MM-DD-hhmmss[-]'));
    const [timesubmit, setTimeSubmit] = useState(moment().format('YYYY-MM-DD hh:mm:ss'));
    const teamid = "tranquis";  // replace w session value at some point
    const userid = "test"; // replace w session value at some point

    let run_module_button;
    let moduleTextFields;
    let extraTextFields;

    React.useEffect(() => {
      console.log('RUN MODULE MODAL USE EFFECTCALLED!', mymodule);
      console.log('current path: ', currentPath);
      console.log('SELECTED FILES: ', selectedFiles);
    }, [selectedFiles, mymodule]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleModuleSelect = (event) => {
      setMyModule(event.target.value);
      setRunid(timenow + event.target.value);
    };

    const handleGenomeSelect = (event) => {
      setMyGenome(event.target.value);
    }

    const handleRunIdChange = (event)=> {
      setRunid(event.target.value);
    }

    const handleOutputChange = (event)=> {
      setOutput(event.target.value);
    }

    const handleParamsChange = (event)=> {
      setParams(event.target.value);
    }

    const getDefaultOutputFolder = () => {
      return teamid+"/runs/"+runid+"/"+mymodule+"/";
    };

    const handleRunModule = () => {
        const moduleSubmit = mymodule;
        const inputSubmit = selectedFiles.map((f) => (addTrailingSlash(currentPath)+f));
        const outputSubmit = [getDefaultOutputFolder()];
        const paramsSubmit = params;
        const runidSubmit = runid;
        const teamidSubmit = teamid;
        const useridSubmit = userid;
        const timenowSubmit = timesubmit;
        runModuleCall(moduleSubmit, inputSubmit, outputSubmit, [], [], paramsSubmit, runidSubmit, teamidSubmit, useridSubmit, timenowSubmit);
        setOpen(false);
    }

    if (mymodule && mymodule!=""){
      moduleTextFields = <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '75ch' },}}
                                  noValidate autoComplete="off">
                           <TextField disabled margin="dense" id="module-input"
                                    label="Input" defaultValue="(Selected Files)"
                                    size="small" helperText="Enter Input File(s)" fullWidth />
                           <TextField disabled margin="dense" id="module-output" label="Output" value={getDefaultOutputFolder()}
                                    size="small" helperText="Enter Output Folder" fullWidth />
                           <TextField margin="dense" id="module-runid" label="Run ID" value={runid}
                                    size="small" helperText="Enter Run ID" fullWidth onChange={handleRunIdChange}/>
                           <TextField margin="dense" id="module-params" label="Parameters" InputLabelProps={{ shrink: true }}
                                    size="small" helperText="Example: -p -s 2 -bed ~/genomes/bed/hg38_targeted.bed" fullWidth onChange={handleParamsChange} />
                         </Box>

      if (mymodule=="rnastar"){
        extraTextFields = <Box component="form" sx={{ m: 3, width: '50ch' }}>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel>Select Genome</InputLabel>
                              <Select
                                labelId="select-genome-dropdown"
                                id="select-genome-dropdown"
                                value={mygenome}
                                label="Genome"
                                onChange={handleGenomeSelect}
                              >
                                <MenuItem value={'human'}>Human</MenuItem>
                                <MenuItem value={'mouse'}>Mouse</MenuItem>
                                <MenuItem value={'custom'}>Custom</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
      } else {
        extraTextFields = null;
      }
    } else {
      moduleTextFields = null;
      extraTextFields = null;
    }

    // upload button - always show
    run_module_button = <Button startIcon={(<ModuleIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Module
                  </Button>

    return (
        <>
        <Button startIcon={(<ModuleIcon fontSize="small" />)}
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
          {moduleTextFields}
          {extraTextFields}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Help</Button>
          <Button onClick={handleRunModule}>Run</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
