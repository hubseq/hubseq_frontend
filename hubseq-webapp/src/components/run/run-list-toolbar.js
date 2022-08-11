import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { RunDetailsModal } from './run-details-modal';
import { RunReportModal } from './run-report-modal';
import { Refresh as RefreshIcon } from '../../icons/refresh';
import { updateJobStatusCall } from './update-job-status-api-call';

export const RunListToolbar = ({runsSelected, setRunsSelected, runInfo, props}) => {
  let view_run_details_modal;
  let view_run_report_modal;

  // run details button - toggle on clicking a run
  if(runsSelected.length > 0 && runsSelected.length < 2){
    view_run_details_modal = <RunDetailsModal runsSelected={runsSelected} runInfo={runInfo} props={props}/>
  } else {
    view_run_details_modal = null;
  }

  // run report button - toggle on clicking a run
  if(runsSelected.length > 0 && runsSelected.length < 2){
    view_run_report_modal = <RunReportModal runsSelected={runsSelected} runInfo={runInfo} props={props}/>
  } else {
    view_run_report_modal = null;
  }

  const handleRefresh = function( event ){
    updateJobStatusCall();
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1.5
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Runs
        </Typography>
        <Box sx={{ m: 1 }}>
          {view_run_report_modal}
          {view_run_details_modal}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <TextField
                width='95%'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search runs"
                variant="outlined"
                size="small"
              />
              <Button width='5%' startIcon={(<RefreshIcon fontSize="small" />)}
                                    sx={{ mr: 1 }}
                                    onClick={handleRefresh}>
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
