import { useState } from 'react';
import React from "react";
import { Box, Container } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Upload as UploadIcon } from '../../icons/upload';
// import JobList from './job-list-api-call';
import { jobsCall } from './job-list-api-call';
import { JobListResults } from './job-list-results';

export const RunDetailsModal = ({runsSelected, runInfo, props}) => {
    const [open, setOpen] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [runs, setRuns] = useState([]);
    let run_details_button;
    // let runs_array = runInfo.map(d => d["runid"]);

    React.useEffect(() => {
      async function getJobs() {
        // only one run ID can be selected currently, but still have it as a list
        const runidSelected = [runInfo[runsSelected]['runid']];
        const newjobs = await jobsCall(runidSelected);
        setJobs(newjobs);
        setRuns(runidSelected);
      }
      getJobs();
    }, []);

    const handleClickOpen = () => {
      // getJobs();
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

      // upload button - always show
    run_details_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Details
                  </Button>

    return (
        <>
        <Button startIcon={(<UploadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Run Details
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth='xl' >
        <DialogTitle>Run Details for {runs[0]}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <JobListResults myruns={runs} myjobs={jobs} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
      </>
    );
};