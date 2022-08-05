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


export const MetadataListResults = ({ myfiles, mytags, setTags, ...rest }) => {
  const [open, setOpen] = useState(false);

  // helper function - checks if tag is present in tag set
  const containsTag = function(tags, _tag){
    for (let i=0; i<tags.length; i++){
      if( isEqualsJson(tags[i], _tag)){
        return true
      }
    }
    return false
  }

  // extracts tags shared between all files
  const extractSharedTags = (mytags) => {
    let shared_tags = [];
    if (mytags.length > 0){
      shared_tags = mytags[0];
      mytags.forEach(function(e, idx, array){
        shared_tags = shared_tags.filter( val => containsTag(e, val));
      });
      console.log('MY OG TAGS: ', mytags);
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

  // check if two JSONs are equal
  // return true when the two json has same length and all the properties has same value key by key
  const isEqualsJson = function(obj1,obj2){
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
  }

  const handleOpen = () => {
      setOpen(true);
    };

  const addMetadata = (event) => {
    console.log('add metadata: ', event);
    handleOpen();
    console.log('MY TAGS: ', mytags);
  }

  return (
    <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <MetadataTable title="Shared Tags" tagset={extractSharedTags(mytags)} />
            {myfiles.map((myfile, file_idx) => (
              <div>
                <MetadataTable title={myfile+" (Unique Tags)"} tagset={createNewTagsArray(mytags, extractSharedTags(mytags))[file_idx]} />
                <p> &nbsp;&nbsp;&nbsp;<u onClick={()=>{addMetadata()}}>Add Metadata</u> </p>
                <AddMetadataDialog handleOpen={handleOpen} open={open} setOpen={setOpen} tags={mytags} setTags={setTags} />
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
