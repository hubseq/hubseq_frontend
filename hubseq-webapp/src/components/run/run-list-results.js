import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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

export const RunListResults = ({ runs, setRunsSelected, ...rest }) => {
  const [selectedRunIds, setSelectedRunIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedRunIds;

    if (event.target.checked) {
      newselectedRunIds = runs.map((runs) => runs.id);
    } else {
      newselectedRunIds = [];
    }

    setSelectedRunIds(newselectedRunIds);
    setRunsSelected(newselectedRunIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRunIds.indexOf(id);
    let newselectedRunIds = [];

    if (selectedIndex === -1) {
      newselectedRunIds = newselectedRunIds.concat(selectedRunIds, id);
    } else if (selectedIndex === 0) {
      newselectedRunIds = newselectedRunIds.concat(selectedRunIds.slice(1));
    } else if (selectedIndex === selectedRunIds.length - 1) {
      newselectedRunIds = newselectedRunIds.concat(selectedRunIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedRunIds = newselectedRunIds.concat(
        selectedRunIds.slice(0, selectedIndex),
        selectedRunIds.slice(selectedIndex + 1)
      );
    }

    setSelectedRunIds(newselectedRunIds);
    setRunsSelected(newselectedRunIds);
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
                    checked={selectedRunIds.length === runs.length}
                    color="primary"
                    indeterminate={
                      selectedRunIds.length > 0
                      && selectedRunIds.length < runs.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Run ID
                </TableCell>
                <TableCell>
                  Pipeline / Module
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {runs.slice(0+limit*page, limit+limit*page).map((run) => (
                <TableRow
                  hover
                  key={run.id}
                  selected={selectedRunIds.indexOf(run.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRunIds.indexOf(run.id) !== -1}
                      onChange={(event) => handleSelectOne(event, run.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {run.date_submitted.split(' ')[0]}
                  </TableCell>
                  <TableCell>
                    {run.runid}
                  </TableCell>
                  <TableCell>
                    {run.pipeline_module}
                  </TableCell>
                  <TableCell>
                    {run.hasOwnProperty("status") ? run.status : "UNKNOWN"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={runs.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RunListResults.propTypes = {
  runs: PropTypes.array.isRequired
};
