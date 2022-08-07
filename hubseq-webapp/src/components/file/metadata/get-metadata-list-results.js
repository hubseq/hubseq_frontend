import React from 'react';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { MetadataTable } from './metadata-table';
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
import { AddMetadataDialog } from './add-metadata-dialog';


export const MetadataListResults = ({ myfiles, mytags, addTag, removeTag, ...rest }) => {

  React.useEffect(() => {
    console.log('DID METADATALISTRESULTS UPDATE??? ', mytags);
  }, [myfiles, mytags, addTag, removeTag]);

  return (
    <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <MetadataTable title="Shared Tags" tagset={mytags} removeTag={removeTag} tabletype="shared" tableindex={-1} />
            <AddMetadataDialog addNewTags={addTag} tabletype="shared" fileIndex={-1} />
            {myfiles.map((myfile, file_idx) => (
              <div key={"div_"+myfile+"_"+file_idx.toString()}>
                <MetadataTable title={myfile+" (Unique Tags)"} tagset={mytags} removeTag={removeTag} tabletype="unique" tableindex={file_idx} />
                <AddMetadataDialog addNewTags={addTag} tabletype="unique" fileIndex={file_idx} />
              </div>
            ))}
          </Box>
        </PerfectScrollbar>
    </Card>
  );
};

MetadataListResults.propTypes = {
  myfiles: PropTypes.array.isRequired,
  mytags: PropTypes.array.isRequired
};
