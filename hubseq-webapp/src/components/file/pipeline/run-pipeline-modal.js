import { useState } from 'react';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Checkbox } from '@mui/material';
import { Pipeline as PipelineIcon } from '../../../icons/pipeline';
import * as moment from 'moment';
import { addTrailingSlash } from '../../../utils/jsutils';
import { GridRowModule } from './gridrow-module';
import { runPipelineCall } from './run-pipeline-api-call';

export const RunPipelineModal = ({currentPath, selectedFiles, ...rest}) => {
    const [open, setOpen] = useState(false);
    const [pipeline, setPipeline] = useState('');
    const [runid, setRunid] = useState('');
    const [output, setOutput] = useState('');
    const [params, setParams] = useState({});
    const [modules, setModules] = useState({});
    const [showPipelineDetails, setShowPipelineDetails] = useState(false);

    let run_pipeline_button;
    let pipelineTextFields;
    let pipelineDetailFields;

    React.useEffect(() => {
      // nothing yet
      console.log('MODULES: ', modules);
      console.log('PARAMS: ', params);
    }, [selectedFiles, pipeline, modules, params]);

    const handleRunPipeline = () => {
      const pipelineSubmit = pipeline;
      const modulesSubmit = modules;
      const inputSubmit = selectedFiles.map((f) => ("s3://"+addTrailingSlash(currentPath)+f));
      const paramsSubmit = params;
      const runidSubmit = runid;
      const teamid = "hubseq"; // replace w session variable
      const userid = "test"; // replace w session variable
      console.log("PIPELINE: ", pipelineSubmit);
      console.log("MODULES: ", modulesSubmit);
      console.log("Input: ", inputSubmit);
      console.log("PARAMS: ", paramsSubmit);
      runPipelineCall(pipelineSubmit, modulesSubmit, inputSubmit, [], [], paramsSubmit, runidSubmit, teamid, userid);
      setOpen(false);
    }
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const addModule = (k, v) => {
      const currentModules = {...modules}; // makes a detached copy of dict
      currentModules[k] = v;
      setModules(currentModules);
    }

    const addParam = (k, v) => {
      const currentParams = {...params}; // make a detached copy of dict
      currentParams[k] = v;
      setParams(currentParams);
    }

    const handlePipelineSelect = (event) => {
      setPipeline(event.target.value);
      setRunid(moment().format('YYYY-MM-DD-hhmmss[-]') + event.target.value);
      if (event.target.value=="rnaseq.human" || event.target.value=="rnaseq.mouse"){
        setModules({"FASTQ QC": 'fastqc', "Align QC": 'rnastar', "Differential Expression": 'deseq2', "Gene Ontology": 'david_go'});
      }

    };

    const handleRunIdChange = (event)=> {
      setRunid(event.target.value);
    }

    const handleCheck = (event)=> {
      //
    }

    if (pipeline && pipeline!=""){
      pipelineTextFields = <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '75ch' },}}
                                  noValidate autoComplete="off">
                           <TextField disabled margin="dense" id="pipeline-input"
                                    label="Input" defaultValue="(Selected Files)"
                                    size="small" helperText="Enter Input File(s)" fullWidth />
                           <TextField disabled margin="dense" id="pipeline-output" label="Output" value={"~/runs/"+runid+"/"}
                                    size="small" helperText="Enter Output Folder" fullWidth />
                           <TextField margin="dense" id="pipeline-runid" label="Run ID" value={runid}
                                    size="small" helperText="Enter Run ID" fullWidth onChange={handleRunIdChange}/>
                           <p><u onClick={()=>setShowPipelineDetails(true)}>Edit Pipeline Configuration</u></p>
                         </Box>


      if (showPipelineDetails && (pipeline=="rnaseq.human" || pipeline=="rnaseq.mouse")){
        pipelineDetailFields =   <Box sx={{ m: 2, width: '100ch' }}>
                                 <Typography sx={{ m: 2 }} variant="subtitle1"> PIPELINE WORKFLOW </Typography>
                                 <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <GridRowModule modulelabel="FASTQ QC" defaultmodule="fastqc" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Align QC" defaultmodule="rnastar" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Differential Expression" defaultmodule="deseq2" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Gene Ontology" defaultmodule="david_go" addParam={addParam} addModule={addModule} />
                                 </Grid>
                                 </Box>

      } else {
        pipelineDetailFields = null;
      }
    } else {
      pipelineTextFields = null;
      pipelineDetailFields = null;
    }

    run_pipeline_button = <Button startIcon={(<PipelineIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Pipeline
                  </Button>

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
            <MenuItem value={'rnaseq.mouse'}>RNA Sequencing - Mouse</MenuItem>
            <MenuItem value={'rnaseq.human'}>RNA Sequencing - Human</MenuItem>
          </Select>
          </FormControl>
          {pipelineTextFields}
          {pipelineDetailFields}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRunPipeline}>Run</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
