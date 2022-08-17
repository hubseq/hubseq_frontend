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

export const JobListResults = ({ myruns, myjobs, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  console.log("RUNSRUNS: ", myruns);
  console.log("JOBSJOBS: ", myjobs);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Date Submitted
                </TableCell>
                <TableCell>
                  Job ID
                </TableCell>
                <TableCell>
                  Module
                </TableCell>
                <TableCell>
                  Sample ID
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myjobs.slice(0+limit*page, limit+limit*page).map((job) => (
                <TableRow
                  hover
                  key={job.id}
                >
                  <TableCell>
                    {job.submitted}
                  </TableCell>
                  <TableCell>
                    {job.jobid}
                  </TableCell>
                  <TableCell>
                    {job.module}
                  </TableCell>
                  <TableCell>
                    {job.sampleid}
                  </TableCell>
                  <TableCell>
                    {job.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={myjobs.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

JobListResults.propTypes = {
  myruns: PropTypes.array.isRequired,
  myjobs: PropTypes.array.isRequired
};
