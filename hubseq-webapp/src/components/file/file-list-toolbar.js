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
import axios from 'axios';

/*
let runmodule = async () => {
  const response = await fetch('https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test/gettable', {
    Method: 'POST',
    Headers: {
      'Content-Type': 'application/json',
      Accept: 'application.json'
    },
    Body: {"userid": "testuser1", "teamid": "hubseq", "table": "pipelinedetails"},
    Cache: 'default'
  });
  console.log(JSON.stringify(response));
};
*/
/*
let runmodule = () => {
  axios.post('https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test/gettable',
  {"userid": "testuser1", "teamid": "hubseq", "table": "pipelinedetails"},
  {
    headers: {
      'Content-Type': 'application/json',
    },
  },
).then(response => {console.log(response)});
}
*/

let runmodule = async () => {
  try {
    const response = await axios.post(
      'https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test_cors/gettable',
      {"userid": "testuser1", "teamid": "hubseq", "table": "pipelinedetails"},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    console.log(JSON.stringify(response));
  } catch (err) {
    console.log("error");
  } finally {
    console.log("loaded");
  }
};

export const FileListToolbar = (props) => (
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
      <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
          onClick={() => {
            alert('clicked');
          }}
        >
          Run Pipeline
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
          onClick={runmodule}
        >
          Run Modules
        </Button>
        <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Upload
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Download
        </Button>
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
