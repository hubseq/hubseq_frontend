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

/*
// extracts tags shared between all files
const extractSharedTags = (_mytags) => {
  let shared_tags = [];
  if (_mytags.length > 0){
    shared_tags = _mytags[0];
    _mytags.forEach(function(e, idx, array){
      shared_tags = shared_tags.filter( val => containsTag(e, val));
    });
    console.log('MY OG TAGS: ', _mytags);
    console.log('SHARED TAGS: ', shared_tags);
  }
  return shared_tags;
}

// creates a new tags array where shared tags are removed,
const createNewTagsArray = (mytags, shared_tags) => {
  let unique_tags = [];
  mytags.forEach(function(e, idx, array){
    unique_tags.push(e.filter( val => !containsTag(shared_tags, val)));
    unique_tags[unique_tags.length-1]['id'] = idx;
  });
  console.log('UNIQUE TAGS: ', unique_tags);
  return unique_tags;
}
*/
