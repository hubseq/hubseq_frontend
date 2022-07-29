import { useState } from 'react';
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
  TableRow
} from '@mui/material';

export const FileListResults = ({ files, ...rest }) => {
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedFileIds;

    if (event.target.checked) {
      newSelectedFileIds = files.map((files) => files.id);
    } else {
      newSelectedFileIds = [];
    }

    setSelectedFileIds(newSelectedFileIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFileIds.indexOf(id);
    let newSelectedFileIds = [];

    if (selectedIndex === -1) {
      newSelectedFileIds = newSelectedFileIds.concat(selectedFileIds, id);
    } else if (selectedIndex === 0) {
      newSelectedFileIds = newSelectedFileIds.concat(selectedFileIds.slice(1));
    } else if (selectedIndex === selectedFileIds.length - 1) {
      newSelectedFileIds = newSelectedFileIds.concat(selectedFileIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFileIds = newSelectedFileIds.concat(
        selectedFileIds.slice(0, selectedIndex),
        selectedFileIds.slice(selectedIndex + 1)
      );
    }

    setSelectedFileIds(newSelectedFileIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
              {files.slice(0, limit).map((file) => (
                <TableRow
                  hover
                  key={file.id}
                  selected={selectedFileIds.indexOf(file.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFileIds.indexOf(file.id) !== -1}
                      onChange={(event) => handleSelectOne(event, file.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {file.title}
                  </TableCell>
                  <TableCell>
                    {file.body}
                  </TableCell>
                  <TableCell>
                    {file.id}
                  </TableCell>
                  <TableCell>
                    {file.userID}
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
