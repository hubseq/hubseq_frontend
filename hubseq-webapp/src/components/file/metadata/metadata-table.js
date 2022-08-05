// import { useState } from 'react';
import PropTypes from 'prop-types';
// import { format } from 'date-fns';
import {
  Table,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

export const MetadataTable = ({ title, tagset, ...rest }) => {

  let metadata_table;

  if (tagset && tagset.length > 0){
    metadata_table = <div>
        <Typography sx={{ m: 1 }} variant="h6">
          {title}
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
            {tagset.map((mytag, idx) => (
              <TableRow
                hover
                key={title + idx.toString()}
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
        </div>
  } else {
    metadata_table = null;
  }

  return (
    <div>
      {metadata_table}
    </div>
  );
};
