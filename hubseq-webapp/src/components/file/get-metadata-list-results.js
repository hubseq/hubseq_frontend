import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Checkbox,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

export const MetadataListResults = ({ myfiles, mytags, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
            <Typography sx={{ m: 1 }} variant="h6">
              {myfiles[0]}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Metadata Field
                  </TableCell>
                  <TableCell>
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mytags[0].map((mytag) => (
                  <TableRow
                    hover
                    key={mytags[0].id}
                  >
                    <TableCell>
                      {mytag.Key}
                    </TableCell>
                    <TableCell>
                      {mytag.Value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Typography sx={{ m: 1 }} variant="h6">
              {myfiles[1]}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Metadata Field
                  </TableCell>
                  <TableCell>
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mytags[1].map((mytag) => (
                  <TableRow
                    hover
                    key={mytags[1].id}
                  >
                    <TableCell>
                      {mytag.Key}
                    </TableCell>
                    <TableCell>
                      {mytag.Value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={mytags.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
    </Card>
  );
};

MetadataListResults.propTypes = {
  myfiles: PropTypes.array.isRequired,
  mytags: PropTypes.array.isRequired
};
