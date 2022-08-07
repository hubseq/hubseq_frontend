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
import { FileUploadModal } from './file-upload-modal';
import { MetadataModal } from './metadata/update-metadata-modal';
import { RunModuleModal } from './module/run-module-modal';
import { RunPipelineModal } from './pipeline/run-pipeline-modal';
import { isFolder, isDataFile, isFastqFile, isSequencingFile } from '../../utils/jsutils';

export const FileListToolbar = ({currentPath, filesSelectedInfo, filesSelected, setFilesSelected, props}) => {
  let download_button;
  let run_module_modal;
  let run_pipeline_modal;
  let metadata_modal;

  const getObjectName = (f) => {
    const fout = f.endsWith('/') ? f.split('/').at(-2)+'/' : f.split('/').pop();
    return fout
  };

  const areFileFormatsCorrect = function( file_info, file_type ){
    if (file_type == "file"){
      return file_info.filter((e, fidx) => !isFolder(e["Key"])).length == file_info.length;
    } else if (file_type == "datafile"){
      return file_info.filter((e, fidx) => isDataFile(e["Key"])).length == file_info.length;
    } else if (file_type == "fastqfile"){
      return file_info.filter((e, fidx) => isFastqFile(e["Key"])).length == file_info.length;
    } else if (file_type == "sequencingfile"){
      return file_info.filter((e, fidx) => isSequencingFile(e["Key"])).length == file_info.length;
    }
  };

  // download button - toggle on file clicking
  if (filesSelected && filesSelected.length > 0){
    console.log("filesSelectedInfo: ", filesSelectedInfo);
    console.log("and files selected: ", filesSelected);
    download_button = <Button startIcon={(<DownloadIcon fontSize="small" />)}
                              sx={{ mr: 1 }}>Download
                      </Button>
  } else {
    download_button = null;
  }

  // metadata button - toggle on file clicking
  if (filesSelected && filesSelectedInfo && filesSelected.length > 0 && areFileFormatsCorrect(filesSelectedInfo, "file")){
    metadata_modal = <MetadataModal currentPath={currentPath} selectedFiles={filesSelectedInfo.map((e) => getObjectName(e["Key"]))} />
  } else {
    metadata_modal = null;
  }

  // run module button - toggle on data file clicking
  if (filesSelected && filesSelectedInfo && filesSelected.length > 0 && areFileFormatsCorrect(filesSelectedInfo, "datafile")){
    run_module_modal = <RunModuleModal currentPath={currentPath} selectedFiles={filesSelectedInfo.map((e) => getObjectName(e["Key"]))} />
  } else {
    run_module_modal = null;
  }

  // run pipeline button - toggle on sequencing file clicking
  if(filesSelected && filesSelectedInfo && filesSelected.length > 0 && areFileFormatsCorrect(filesSelectedInfo, "fastqfile")){
    run_pipeline_modal = <RunPipelineModal currentPath={currentPath} selectedFiles={filesSelectedInfo.map((e) => getObjectName(e["Key"]))} />
  } else {
    run_pipeline_modal = null;
  }

  return(
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
          File Explorer
        </Typography>
        <Box sx={{ m: 1 }}>
          {run_pipeline_modal}
          {run_module_modal}
          {metadata_modal}
          {download_button}
          <FileUploadModal/>
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
