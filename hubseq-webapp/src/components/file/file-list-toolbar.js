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


export const FileListToolbar = ({filesSelected, setFilesSelected, props}) => {
  let upload_button;
  let download_button;
  let run_module_button;
  let run_pipeline_button;

  // upload button - always show
  upload_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}> Upload
                  </Button>

  // download button - toggle on file clicking
  if(filesSelected.length > 0){
    download_button = <Button startIcon={(<DownloadIcon fontSize="small" />)}
                              sx={{ mr: 1 }}>Download
                      </Button>
  } else {
    download_button = null;
  }

  // run module button - toggle on file clicking
  if(filesSelected.length > 0){
    run_module_button = <Button startIcon={(<DownloadIcon fontSize="small" />)}
                                sx={{ mr: 1 }}
                                onClick={() => {alert('clicked');}}>Run Module
                        </Button>
  } else {
    run_module_button = null;
  }

  // run pipeline button - toggle on file clicking
  if(filesSelected.length > 0){
    run_pipeline_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                                  sx={{ mr: 1 }}>Run Pipeline
                          </Button>
  } else {
    run_pipeline_button = null;
  }

  return(
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          File Explorer
        </Typography>
        <Box sx={{ m: 1 }}>
          {run_pipeline_button}
          {run_module_button}
          {download_button}
          {upload_button}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
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
                placeholder="Search files"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
