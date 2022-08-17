import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { isEqualsJson } from '../../utils/jsutils'
// import { format } from 'date-fns';

import {
  Table,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from '@mui/material';

export const ReportTable = ({ title, filelist, filetype, ...rest }) => {
  const [files, setFiles] = useState([]);
  let report_table;

  React.useEffect(() => {
    console.log('DID REPORT TABLE UPDATE??? ', filelist);
    if (filelist){
      setFiles(filelist);
    }
  }, [filelist]);

  const openFile = (f) => {
    console.log('in openFile: ', f);
  }

  if (files) { // } && tagset.length > 0){
    report_table = <div>
        <Typography sx={{ m: 1 }} variant="h6">
          {title}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                File Name
              </TableCell>
              <TableCell>
                File Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((myfile, idx) => (
              <TableRow
                hover
                key={title+idx.toString()}
              >
                <Tooltip title="Open File" placement="right-start" arrow>
                  <TableCell onClick={()=>{openFile(myfile)}}>
                    {myfile.Key}
                  </TableCell>
                </Tooltip>
                <TableCell>
                  {filetype}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
  } else {
    report_table = null;
  }

  return (
    <div>
      {report_table}
    </div>
  );
};
