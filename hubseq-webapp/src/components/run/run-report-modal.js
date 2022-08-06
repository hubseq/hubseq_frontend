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

export const RunReportModal = ({runsSelected, runInfo, props}) => {
    const [open, setOpen] = useState(false);
    const [jobs, setJobs] = useState([]);
    let run_report_button;
    let runs_array = runInfo.map(d => d["runid"]);

    React.useEffect(() => {
      async function getJobs() {
        const newjobs = await jobsCall(runs_array);
        setJobs(newjobs);
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
    run_report_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Run Report
                  </Button>

    return (
        <>
        <Button startIcon={(<UploadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> View Report
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth='xl' >
        <DialogTitle>Run Report for {runs_array[runsSelected]}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <JobListResults myruns={runs_array} myjobs={jobs} />
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
