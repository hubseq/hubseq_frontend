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

export const RunPipelineModal = ({currentPath, selectedFiles, ...rest}) => {
    const [open, setOpen] = useState(false);
    const [pipeline, setPipeline] = useState('');
    const [runid, setRunid] = useState('');
    const [output, setOutput] = useState('');
    const [params, setParams] = useState('');
    const [fastqcmodule, setFastQCModule] = useState('fastqc');
    const [alignmodule, setAlignModule] = useState('rnastar');
    const [demodule, setDEModule] = useState('deseq2');
    const [gomodule, setGOModule] = useState('david_go');

    let run_pipeline_button;
    let pipelineTextFields;
    let pipelineDetailFields;

    React.useEffect(() => {
      // nothing yet
    }, [selectedFiles, pipeline]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handlePipelineSelect = (event) => {
      setPipeline(event.target.value);
      setRunid(moment().format('YYYY-MM-DD-hhmmss[-]') + event.target.value);
    };

    const handleRunIdChange = (event)=> {
      setRunid(event.target.value);
    }

    const handleOutputChange = (event)=> {
      setOutput(event.target.value);
    }

    const handleParamsChange = (event)=> {
      setParams(event.target.value);
    }

    const handleCheck = (event)=> {
      //
    }

    const handleFastQCModuleSelect = (event)=> {
      //
    }

    const handleAlignModuleSelect = (event) => {
      //
    }

    const handleDEModuleSelect = (event) => {
      //
    }

    const handleGOModuleSelect = (event) => {
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
                         </Box>


      if (pipeline=="rnaseq-human-pipeline" || pipeline=="rnaseq-mouse-pipeline"){
        pipelineDetailFields =   <Box sx={{ m: 2, width: '75ch' }}>
                                 <Typography sx={{ m: 2 }} variant="subtitle1"> PIPELINE WORKFLOW </Typography>
                                 <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={1}>
                                      <Checkbox
                                        checked="true"
                                        color="primary"
                                        value="true"
                                      />
                                    </Grid>
                                    <Grid item xs={3}>
                                      <FormControl variant="standard" fullWidth>
                                      <InputLabel>Select Fastq QC Module</InputLabel>
                                        <Select
                                          labelId="select-fastqc-dropdown"
                                          id="select-fastqc-dropdown"
                                          value={fastqcmodule}
                                          label="FastQC Module"
                                          onChange={handleFastQCModuleSelect}
                                        >
                                          <MenuItem value={'fastqc'}>FastQC</MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                      <TextField margin="dense" id="fastqc-params" label="(FastQC Parameters)"
                                               size="small" helperText="Example: -p -s 2 -bed ~/genomes/bed/hg38_targeted.bed" fullWidth onChange={handleParamsChange} />
                                    </Grid>
                                    <Grid item xs={1}>
                                      <Checkbox
                                        checked="true"
                                        color="primary"
                                        value="true"
                                      />
                                    </Grid>
                                    <Grid item xs={3}>
                                      <FormControl variant="standard" fullWidth>
                                      <InputLabel>Select Alignment Module</InputLabel>
                                        <Select
                                          labelId="select-align-dropdown"
                                          id="select-align-dropdown"
                                          value={alignmodule}
                                          label="Alignment Module"
                                          onChange={handleAlignModuleSelect}
                                        >
                                          <MenuItem value={'rnastar'}>RNA-STAR</MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                      <TextField margin="dense" id="align-params" label="(Align Parameters)"
                                               size="small" helperText="Example: -p -s 2 -bed ~/genomes/bed/hg38_targeted.bed" fullWidth onChange={handleParamsChange} />
                                    </Grid>

                                    <Grid item xs={1}>
                                      <Checkbox
                                        checked="true"
                                        color="primary"
                                        value="true"
                                      />
                                    </Grid>
                                    <Grid item xs={3}>
                                      <FormControl variant="standard" fullWidth>
                                      <InputLabel>Select Differential Expression Module</InputLabel>
                                        <Select
                                          labelId="select-de-dropdown"
                                          id="select-de-dropdown"
                                          value={demodule}
                                          label="Differential Expression Module"
                                          onChange={handleDEModuleSelect}
                                        >
                                          <MenuItem value={'deseq2'}>DESeq2</MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                      <TextField margin="dense" id="de-params" label="(Differential Expression Parameters)"
                                               size="small" helperText="Example: -p -s 2 -bed ~/genomes/bed/hg38_targeted.bed" fullWidth onChange={handleParamsChange} />
                                    </Grid>

                                    <Grid item xs={1}>
                                      <Checkbox
                                        checked="true"
                                        color="primary"
                                        value="true"
                                      />
                                    </Grid>
                                    <Grid item xs={3}>
                                      <FormControl variant="standard" fullWidth>
                                      <InputLabel>Select Gene Ontology Module</InputLabel>
                                        <Select
                                          labelId="select-go-dropdown"
                                          id="select-go-dropdown"
                                          value={gomodule}
                                          label="Gene Ontology Module"
                                          onChange={handleGOModuleSelect}
                                        >
                                          <MenuItem value={'david_go'}>DAVID GO</MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                      <TextField margin="dense" id="go-params" label="(Gene Ontology Parameters)"
                                               size="small" helperText="Example: -p -s 2 -bed ~/genomes/bed/hg38_targeted.bed" fullWidth onChange={handleParamsChange} />
                                    </Grid>

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
            <MenuItem value={'rnaseq-mouse-pipeline'}>RNA Sequencing - Mouse</MenuItem>
            <MenuItem value={'rnaseq-human-pipeline'}>RNA Sequencing - Human</MenuItem>
          </Select>
          </FormControl>
          {pipelineTextFields}
          {pipelineDetailFields}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Run</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
