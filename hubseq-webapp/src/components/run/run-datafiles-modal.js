import { useState } from 'react';
import React from "react";
import { Box, Container } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { ReportTable } from './report-table';
import { getFileCall } from '../file/file_list_api_call';
import * as path from 'path';
import { useSession } from "next-auth/react";

// assumes that runs are in [HOMEDIR]/runs/[runid]/...
export const RunDataFilesModal = ({runsSelected, runInfo, props}) => {
    const [open, setOpen] = useState(false);
    const [dataFilesSummaryQC, setDataFilesSummaryQC] = useState([]);
    const [dataFilesAlignment, setDataFilesAlignment] = useState([]);
    const [dataFilesGeneExpression, setDataFilesGeneExpression] = useState([]);
    const [dataFilesAlignQC, setDataFilesAlignQC] = useState([]);
    const [dataFilesExpressionQC, setDataFilesExpressionQC] = useState([]);
    const [dataFilesDESeq2, setDataFilesDESeq2] = useState([]);
    const [dataFilesDAVIDGO, setDataFilesDAVIDGO] = useState([]);
    const { data: session, status } = useSession();

    const baseRunPath = "tranquis/runs/"; // replace with teamid later

    let runs_array = runInfo.map(d => d["runid"]);

    React.useEffect(() => {
      async function getReports(reportType, session) {
        let dataFiles = [];
        let pdfFiles = [];
        let pdfFiles2 = [];
        console.log('REPORT RUNS SELECTED: ', runsSelected);
        console.log('REPORT RUNS INFO: ', runInfo);
        // console.log('the file call: ', path.join(baseRunPath,runInfo[runsSelected]['runid'],'fastqc'));
        if (reportType == "SummaryQC") {
          dataFiles = await getFileCall(path.join(baseRunPath,runInfo[runsSelected]['runid'],'rnaseq_summaryqc'), session.idToken, ".csv");
          setDataFilesSummaryQC(dataFiles);
        } else if (reportType == "Alignment"){
          dataFiles = await getFileCall(path.join(baseRunPath,runInfo[runsSelected]['runid'],'rnastar'), session.idToken, ".bam");
          setDataFilesAlignment(dataFiles);
        } else if (reportType == "GeneExpression"){
          dataFiles = await getFileCall(path.join(baseRunPath,runInfo[runsSelected]['runid'],'rnastar'), session.idToken, ".tab");
          setDataFilesGeneExpression(dataFiles);
        } else if (reportType == "ExpressionQC"){
          dataFiles = await getFileCall(path.join(baseRunPath,runInfo[runsSelected]['runid'],'expressionqc'), session.idToken, ".csv");
          setDataFilesExpressionQC(dataFiles);
        } else if (reportType == "DESeq2"){
          dataFiles = await getFileCall(path.join(baseRunPath,runInfo[runsSelected]['runid'],'deseq2'), session.idToken, ".csv");
          setDataFilesDESeq2(dataFiles);
        } else if (reportType == "DAVIDGO"){
          dataFiles = await getFileCall(path.join(baseRunPath,runInfo[runsSelected]['runid'],'david_go'), session.idToken, ".txt");
          setDataFilesDAVIDGO(dataFiles);
        }
      }
      if (session && runsSelected){
        getReports("SummaryQC", session);
        getReports("Alignment", session);
        getReports("GeneExpression", session);
        getReports("ExpressionQC", session);
        getReports("DESeq2", session);
        getReports("DAVIDGO", session);
      }
    }, [runsSelected, session]);

    const handleClickOpen = () => {
      // getJobs();
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    // report is specific to RNA-Seq - will generalize this modal later
    return (
        <>
        <Button startIcon={(<DownloadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Get Data Files
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth='xl' fullWidth>
        <DialogTitle>Run Report for {runInfo[runsSelected]['runid']}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <ReportTable title="Summary QC Data Files" filelist={dataFilesSummaryQC} filetype="SummaryQC" session={session} />
            <ReportTable title="Alignment Data Files" filelist={dataFilesAlignment} filetype="Alignment" session={session} />
            <ReportTable title="Gene Expression Data Files" filelist={dataFilesGeneExpression} filetype="GeneExpression" session={session} />
            <ReportTable title="Expression QC Data Files" filelist={dataFilesExpressionQC} filetype="ExpressionQC" session={session} />
            <ReportTable title="Differential Expression Data Files" filelist={dataFilesDESeq2} filetype="DESeq2" session={session} />
            <ReportTable title="Gene Ontology Data Files" filelist={dataFilesDAVIDGO} filetype="DAVIDGO" session={session} />
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
