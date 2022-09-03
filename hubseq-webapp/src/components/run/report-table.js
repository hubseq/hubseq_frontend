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
  Tooltip,
  Link
} from '@mui/material';
import { fileDownloadCall } from '../file/file-download-api-call';

export const ReportTable = ({ title, filelist, filetype, session, ...rest }) => {
  const [files, setFiles] = useState([]);
  const [clickedUrl, setClickedUrl] = useState('');

  let report_table;

  React.useEffect(() => {
    // console.log('DID REPORT TABLE UPDATE??? ', filelist);
    if (filelist){
      setFiles(filelist);
    }
  }, [filelist]);

  const getLink = async (f) => {
    const response = await fileDownloadCall(f.Key, '', session.idToken, setClickedUrl);
    console.log('CLICKED URL: ', clickedUrl);
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
                  <TableCell onMouseEnter={()=>{getLink(myfile)}}>
                    <Link href={clickedUrl} target="_blank" rel="noopener noreferrer">{myfile.Key}</Link>
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
