import { useState } from 'react';
//import React from 'react';
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

export const RunPipelineModal = ({currentPath, selectedFiles, session, ...rest}) => {
    const [open, setOpen] = useState(false);
    const [pipeline, setPipeline] = useState('');
    const [runid, setRunid] = useState('');
    const [output, setOutput] = useState('');
    const [params, setParams] = useState({});
    const [modules, setModules] = useState({});
    const [showPipelineDetails, setShowPipelineDetails] = useState(false);
    const [timenow, setTimeNow] = useState(moment().format('YYYY-MM-DD-hhmmss[-]'));
    const [timesubmit, setTimeSubmit] = useState(moment().format('YYYY-MM-DD hh:mm:ss'));
    let pipelineTextFields;
    let pipelineDetailFields;

    //React.useEffect(() => {
      // nothing yet
    //}, [selectedFiles, pipeline, modules, params, pipelineTextFields, pipelineDetailFields]);

    const processParamsAll = (_pargs_dict) => {
      const _pargs_list = Object.values(_pargs_dict);
      const _pargs_keys = Object.keys(_pargs_dict);
      let _pout_dict = {};
      let _alti_dict = {};
      let _alto_dict = {};
      let _sid_list = '';
      for (let i=0;i<_pargs_list.length;i++){
        const module_args = _pargs_list[i];
        let mlist = module_args.split(' ');
        let alti = '';
        let alto = '';
        let sid = '';
        let module_args_out = [];
        while (mlist.length > 0){
          if (mlist[0]=='--alti'){
            // alternate input provided as a parameter
            if (mlist.length > 1){
              alti = mlist[1];
              mlist = mlist.slice(2);
            } else {
              mlist = mlist.slice(1);
            }
          } else if (mlist[0]=='--alto'){
            // alternate output provided as a parameter
            if (mlist.length > 1){
              alto = mlist[1];
              mlist = mlist.slice(2);
            } else {
              mlist = mlist.slice(1);
            }
          } else if (mlist[0]=='--sid'){
            // sample id provided as a parameter
            if (mlist.length > 1){
              sid = mlist[1];
              mlist = mlist.slice(2);
            } else {
              mlist = mlist.slice(1);
            }
          } else {
            module_args_out.push(mlist[0]);
            mlist = mlist.slice(1);
          }
        }
        _pout_dict[_pargs_keys[i]] = module_args_out.join(" ");
        _alti_dict[_pargs_keys[i]] = alti;
        _alto_dict[_pargs_keys[i]] = alto;
        if (sid!=''){
          _sid_list = sid;
        }
      }
      return [{'params': _pout_dict, 'alti': _alti_dict, 'alto': _alto_dict}, _sid_list]
    }

    const handleRunPipeline = () => {
      const pipelineSubmit = pipeline;
      const modulesSubmit = modules;
      const inputSubmit = selectedFiles.map((f) => (addTrailingSlash(currentPath)+f));
      const [paramsOut, samplesOut] = processParamsAll( params );
      const runidSubmit = runid;
      const timenowSubmit = timesubmit;
      runPipelineCall(pipelineSubmit, modulesSubmit, inputSubmit, paramsOut['alti'], paramsOut['alto'], paramsOut['params'], runidSubmit, samplesOut, timenowSubmit, session.idToken);
      setOpen(false);
    }
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      // reset everything on close
      setPipeline('');
      setRunid('');
      setOutput('');
      setParams({});
      setModules({});
      setShowPipelineDetails(false);
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
        setModules({"Alignment": 'rnastar', "Gene Expression": "expressionqc", "Differential Expression": 'deseq2', "Gene Ontology": 'david_go'});
      } else if (event.target.value=="rnaseq-qc.human" || event.target.value=="rnaseq-qc.mouse"){
        setModules({"FASTQ QC": 'fastqc', "Alignment": 'rnastar', "Alignment QC by Sample": 'qorts', "Alignment QC by Group": 'qorts_multi',
                    "RNA-Seq QC": 'rnaseqc', "Summary QC": 'rnaseq-summaryqc'});
      } else if (event.target.value=="singlecell_rnaseq_qc.human" || event.target.value=="singlecell_rnaseq_qc.mouse"){
        setModules({"Alignment and Expression": 'cellranger', "Clustering QC": 'seurat'});
      } else if (event.target.value=="singlecell_rnaseq.human" || event.target.value=="singlecell_rnaseq.mouse"){
        setModules({"Alignment and Expression": 'cellranger', "Dim Reduction and Clustering": 'seurat'});
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
                           <TextField disabled margin="dense" id="pipeline-output" label="Output" value={"runs/"+runid+"/"}
                                    size="small" helperText="Enter Output Folder" fullWidth />
                           <TextField margin="dense" id="pipeline-runid" label="Run ID" value={runid}
                                    size="small" helperText="Enter Run ID" fullWidth onChange={handleRunIdChange}/>
                           <p><u onClick={()=>setShowPipelineDetails(true)}>Edit Pipeline Configuration</u></p>
                         </Box>


      if (showPipelineDetails && (pipeline=="rnaseq.human" || pipeline=="rnaseq.mouse")){
        pipelineDetailFields =   <Box sx={{ m: 2, width: '100ch' }}>
                                 <Typography sx={{ m: 2 }} variant="subtitle1"> PIPELINE WORKFLOW </Typography>
                                 <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <GridRowModule modulelabel="Alignment" defaultmodule="rnastar" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Gene Expression" defaultmodule="expressionqc" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Differential Expression" defaultmodule="deseq2" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Gene Ontology" defaultmodule="david_go" addParam={addParam} addModule={addModule} />
                                 </Grid>
                                 </Box>
      } else if (showPipelineDetails && (pipeline=="rnaseqqc.human" || pipeline=="rnaseqqc.mouse")){
        pipelineDetailFields =   <Box sx={{ m: 2, width: '100ch' }}>
                                 <Typography sx={{ m: 2 }} variant="subtitle1"> PIPELINE WORKFLOW </Typography>
                                 <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <GridRowModule modulelabel="FASTQ QC" defaultmodule="fastqc" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Alignment" defaultmodule="rnastar" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Alignment QC by Sample" defaultmodule="qorts" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Alignment QC by Group" defaultmodule="qorts_multi" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="RNA-Seq QC" defaultmodule="rnaseqc" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Summary QC" defaultmodule="rnaseq-summaryqc" addParam={addParam} addModule={addModule} />
                                 </Grid>
                                 </Box>
      } else if (showPipelineDetails && (pipeline=="singlecell_rnaseq.human" || pipeline=="singlecell_rnaseq.mouse")){
        pipelineDetailFields =   <Box sx={{ m: 2, width: '100ch' }}>
                                 <Typography sx={{ m: 2 }} variant="subtitle1"> PIPELINE WORKFLOW </Typography>
                                 <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <GridRowModule modulelabel="Alignment and Expression" defaultmodule="cellranger" addParam={addParam} addModule={addModule} />
                                    <GridRowModule modulelabel="Dim Reduction and Clustering" defaultmodule="seurat" addParam={addParam} addModule={addModule} />
                                 </Grid>
                                 </Box>
       } else if (showPipelineDetails && (pipeline=="singlecell_rnaseq_qc.human" || pipeline=="singlecell_rnaseq_qc.mouse")){
         pipelineDetailFields =   <Box sx={{ m: 2, width: '100ch' }}>
                                  <Typography sx={{ m: 2 }} variant="subtitle1"> PIPELINE WORKFLOW </Typography>
                                  <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                     <GridRowModule modulelabel="Alignment and Expression" defaultmodule="cellranger" addParam={addParam} addModule={addModule} />
                                     <GridRowModule modulelabel="Clustering QC" defaultmodule="seurat" addParam={addParam} addModule={addModule} />
                                  </Grid>
                                  </Box>
      } else {
        pipelineDetailFields = null;
      }
    } else {
      pipelineTextFields = null;
      pipelineDetailFields = null;
    }

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
            <MenuItem value={'rnaseqqc.mouse'}>RNA-Seq QC - Mouse</MenuItem>
            <MenuItem value={'rnaseqqc.human'}>RNA-Seq QC - Human</MenuItem>
            <MenuItem value={'rnaseq.mouse'}>RNA-Seq Pipeline - Mouse</MenuItem>
            <MenuItem value={'rnaseq.human'}>RNA-Seq Pipeline - Human</MenuItem>
            <MenuItem value={'singlecell_rnaseq_qc.mouse'}>Single Cell RNA-Seq QC - Mouse</MenuItem>
            <MenuItem value={'singlecell_rnaseq_qc.human'}>Single Cell RNA-Seq QC - Human</MenuItem>
            <MenuItem value={'singlecell_rnaseq.mouse'}>Single Cell RNA-Seq Pipeline - Mouse</MenuItem>
            <MenuItem value={'singlecell_rnaseq.human'}>Single Cell RNA-Seq Pipeline - Human</MenuItem>
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
