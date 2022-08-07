import { useState } from 'react';
import React from 'react';
import * as path from 'path';
import { getFileCall } from './file_list_api_call';
import { addTrailingSlash, isFolder } from '../../utils/jsutils';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from '@mui/material';

export const FileListResults = ({ files, setFiles, currentPath, setFilesSelected, setCurrentPath, ...rest }) => {
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  React.useEffect(() => {
    console.log('FILELIST RESULTS USEEFFECT TRIGGERED');
    setPage(0);
    setSelectedFileIds([]);
    setFilesSelected([]);
  }, [currentPath]);

  const handleSelectAll = (event) => {
    let newSelectedFileIds;

    if (event.target.checked) {
      newSelectedFileIds = files.map((files) => files.id);
    } else {
      newSelectedFileIds = [];
    }

    setSelectedFileIds(newSelectedFileIds);
    setFilesSelected(newSelectedFileIds);
    console.log('selectedFileIds: ', newSelectedFileIds);
  };

  const handleSelectOne = (event, file, id) => {
    console.log('ONE: EVENT: SHIFT ', event.nativeEvent.shiftKey);
    if (file && !isFolder(file["Key"])){
      const selectedIndex = selectedFileIds.indexOf(id);
      let newSelectedFileIds = [];

      if (selectedIndex === -1) {
        console.log("one n here = -1 ", id);
        newSelectedFileIds = newSelectedFileIds.concat(selectedFileIds, id);
      } else if (selectedIndex === 0) {
        console.log("one n here = 0 ", id);
        newSelectedFileIds = newSelectedFileIds.concat(selectedFileIds.slice(1));
      } else if (selectedIndex === selectedFileIds.length - 1) {
        console.log("one n here = length - 1... ", id);
        newSelectedFileIds = newSelectedFileIds.concat(selectedFileIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        console.log("one n here > 0... ", id);
        newSelectedFileIds = newSelectedFileIds.concat(
          selectedFileIds.slice(0, selectedIndex),
          selectedFileIds.slice(selectedIndex + 1)
        );
      }
      setSelectedFileIds(newSelectedFileIds);
      setFilesSelected(newSelectedFileIds);
      console.log('selectedFileIds: ', newSelectedFileIds);
    }
  };

  const getPreviousSelectedFileId = (currentIds, newId) => {
    // for selecting multiple items in the file list
    let sortedIds = [...currentIds].sort((a,b) => a-b); // sort, make new array
    if (sortedIds.length > 0){
      for( let i=0; i<sortedIds.length; i++){
        // go until we are past the newId, and return previous Id in sorted list
        if (sortedIds[i] > newId){
          console.log("previous selected id: ", sortedIds[i-1]);
          return i > 0 ? sortedIds[i-1] : -1;
        }
      }
      return sortedIds[sortedIds.length-1];
    }
    else {
      return -1;
    }
  };

  const handleSelectMultiple = (event, file, id) => {
    if (file && !isFolder(file["Key"])){
      const selectedIndex = selectedFileIds.indexOf(id);
      let newSelectedFileIds = [];
      let fileIdsToAdd = [];

      if (selectedIndex === -1) {
        // if selected index is currently not in selected list
        console.log("in here -1.. ", id);
        for( let j=getPreviousSelectedFileId(selectedFileIds,id)+1; j<id+1; j++){
          fileIdsToAdd.push(j);
        }
        newSelectedFileIds = selectedFileIds.concat(fileIdsToAdd);
      } else if (selectedIndex === 0) {
        // if selected index is before all currently selected ids
        console.log("in here = 0.. ", id);
        newSelectedFileIds = newSelectedFileIds.concat(selectedFileIds.slice(1));
      } else if (selectedIndex === selectedFileIds.length - 1) {
        // if selected index is the last file
        console.log("in here > length - 1.. ", id);
        newSelectedFileIds = newSelectedFileIds.concat(selectedFileIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        // if the selected index is somewhere in the middle
        console.log("in here > 0.. ", id);
        newSelectedFileIds = newSelectedFileIds.concat(
          selectedFileIds.slice(0, selectedIndex),
          selectedFileIds.slice(selectedIndex + 1)
        );
      }
      setSelectedFileIds(newSelectedFileIds);
      setFilesSelected(newSelectedFileIds);
      console.log('selectedFileIds: ', newSelectedFileIds);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (event, file, file_id) => {
    // event.preventDefault();
    // handleSelectOne(event, file_id);
    console.log('ROW CLICKED!!!', file);
  }

  const handleFileClick = async (event, file, file_id) => {
    if (file["Key"].endsWith('/')){
      // go to new path and make another API call
      const newPath = addTrailingSlash(path.join(currentPath, file["Key"].split('/').at(-2)))
      setCurrentPath( newPath );
      const newFiles = await getFileCall(newPath);
      setFiles( newFiles );
    }
    console.log('FILE CELL CLICKED!!!', file);
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedFileIds.length === files.length}
                    color="primary"
                    indeterminate={
                      selectedFileIds.length > 0
                      && selectedFileIds.length < files.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Last Modified
                </TableCell>
                <TableCell>
                  Access
                </TableCell>
                <TableCell>
                  Size
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.slice(0+limit*page, limit+limit*page).map((file, file_idx) => (
                <TableRow
                  hover
                  onClick={(e) => handleRowClick(e, file, file.id)}
                  key={file.id}
                  selected={selectedFileIds.indexOf(file.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFileIds.indexOf(file.id) !== -1}
                      onChange={(event) => (event.nativeEvent.shiftKey ? handleSelectMultiple(event, file, file.id) : handleSelectOne(event, file, file.id))}
                      value="true"
                    />
                  </TableCell>
                  <Tooltip title={isFolder(file.Key) ? "Open Folder" : ""} placement="right-start" arrow>
                    <TableCell onClick={(e) => (isFolder(file.Key) ? handleFileClick(e, file, file.id) : null)}>
                      {file.Key.endsWith('/') ? file.Key.slice(0,-1).split('/').pop()+'/' : file.Key.split('/').pop()}
                    </TableCell>
                  </Tooltip>
                  <TableCell>
                    {file.LastModified}
                  </TableCell>
                  <TableCell>
                    {"Team"}
                  </TableCell>
                  <TableCell>
                    {(file.Size/1000).toFixed(1) + " KB"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={files.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

FileListResults.propTypes = {
  files: PropTypes.array.isRequired
};
