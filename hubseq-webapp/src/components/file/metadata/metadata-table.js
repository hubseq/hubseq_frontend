// import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { isEqualsJson } from '../../../utils/jsutils'
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

export const MetadataTable = ({ title, tagset, removeTag, tabletype, tableindex, ...rest }) => {
  const [tagrows, setTagrows] = useState([]);
  let metadata_table;

  React.useEffect(() => {
    console.log('DID METADATATABLE UPDATE??? ', tagset);
    if (tagset && tabletype=="shared"){
      setTagrows(extractSharedTags(tagset));
    } else if (tagset && tableindex >= 0 && tabletype=="unique"){
      setTagrows(createNewTagsArray(tagset, extractSharedTags(tagset))[tableindex]);
    }
  }, [tagset]);

  // extracts tags shared between all files
  const extractSharedTags = (mytags) => {
    let shared_tags = [];
    if (mytags.length > 0){
      shared_tags = mytags[0];
      mytags.forEach(function(e, idx, array){
        shared_tags = shared_tags.filter( val => containsTag(e, val));
      });
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
    // console.log('UNIQUE TAGS: ', unique_tags);
    return unique_tags;
  }

  // helper function - checks if tag is present in tag set
  const containsTag = function(tags, _tag){
    for (let i=0; i<tags.length; i++){
      if( isEqualsJson(tags[i], _tag)){
        return true
      }
    }
    return false
  }

  if (tagrows) { // } && tagset.length > 0){
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
            {tagrows.map((mytag, idx) => (
              <TableRow
                hover
                key={title + idx.toString()}
              >
                <Tooltip title="Remove Field" placement="top-start" arrow>
                  <TableCell onClick={()=>{removeTag(mytag,tabletype,tableindex,idx)}}>
                    {mytag.Key}
                  </TableCell>
                </Tooltip>
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
