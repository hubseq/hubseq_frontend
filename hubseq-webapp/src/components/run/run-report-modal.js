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
import { ReportTable } from './report-table';
import { getFileCall } from '../file/file_list_api_call';
import * as path from 'path';

// assumes that runs are in [HOMEDIR]/runs/[runid]/...
export const RunReportModal = ({runsSelected, runInfo, props}) => {
    const [open, setOpen] = useState(false);
    const [reportFiles, setReportFiles] = useState([]);
    const baseRunPath = "hubtenants/tranquis/runs/";

    let run_report_button;
    let runs_array = runInfo.map(d => d["runid"]);

    React.useEffect(() => {
      async function getReports() {
        console.log('REPORT RUNS SELECTED: ', runsSelected);
        console.log('REPORT RUNS INFO: ', runInfo);
        console.log('the file call: ', path.join(baseRunPath,runInfo[runsSelected]['runid'],'fastqc'));
        const htmlFiles = await getFileCall(path.join(baseRunPath,runInfo[runsSelected]['runid'],'fastqc'), ".html");
        console.log('HTML FILES! ', htmlFiles);
        setReportFiles(htmlFiles);
      }
      if (runsSelected){
        getReports();
      }
    }, [runsSelected]);

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
        <DialogTitle>Run Report for {runInfo[runsSelected]['runid']}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <ReportTable title="FASTQC Reports" filelist={reportFiles} filetype="FastQC" />
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
