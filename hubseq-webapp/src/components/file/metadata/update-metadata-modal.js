import { useState } from 'react';
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField, Box, Container } from '@mui/material';
import { Upload as UploadIcon } from '../../../icons/upload';
import { getMetadataCall } from './get-metadata-api-call';
import { MetadataListResults } from './get-metadata-list-results';

export const MetadataModal = ({currentPath, selectedFiles}) => {
    const [open, setOpen] = useState(false);
    const [metadata, setMetadata] = useState([[]]);
    // const [sharedMetadata, setSharedMetadata] = useState([]);
    // const [uniqueMetadata, setUniqueMetadata] = useState([[]]);
    // const files = ["IT.png","JerryChen.jpg", "demobutton.png"];
    let update_metadata_button;

    React.useEffect(() => {
      console.log('DID METADATAMODAL UPDATE??? ', metadata);
    }, [metadata, selectedFiles, setMetadata]);

    async function getMetadata() {
      const new_metadata = await getMetadataCall(selectedFiles, currentPath);
      setMetadata(new_metadata);
      // setSharedMetadata(extractSharedTags(new_metadata));
      // setUniqueMetadata(createNewTagsArray(new_metadata, extractSharedTags(new_metadata)));
    };

    // adds new tag
    const addTag = (tagToAdd, tagType, _idx) => {
      let newTags = [];
      for( let i=0; i<metadata.length;i++ ){
        newTags.push(metadata[i]);
      }
      if (tagType == "shared"){
        newTags.map((e, idx) => {e.push({"Key": tagToAdd["Key"],
                                         "Value": tagToAdd["Value"]})});
        setMetadata(newTags);
      } else if (tagType == "unique"){
        newTags[_idx].push({"Key": tagToAdd["Key"], "Value": tagToAdd["Value"]});
        setMetadata(newTags);
      }
    };

    // removes a tag
    const removeTag = (tagToRemove, tagType, table_idx, row_idx) => {
      let newTags = [];
      const yesRemove = confirm('Are you sure you want to delete this field?');
      if (yesRemove) {
        if (tagType=="unique"){
          for( let i=0; i<metadata.length;i++ ){
            let newSet = [];
            for( let j=0; j<metadata[i].length;j++ ){
              if (i!=table_idx || j!=row_idx){
                newSet.push(metadata[i][j]);
              }
            }
            newTags.push(newSet);
          }
        } else if (tagType=="shared"){
          for( let i=0; i<metadata.length;i++ ){
            let newSet = [];
            for( let j=0; j<metadata[i].length;j++ ){
              if (tagToRemove["Key"]!=metadata[i][j]["Key"]){
                newSet.push(metadata[i][j]);
              }
            }
            newTags.push(newSet);
          }
        }
        setMetadata(newTags);
      }
    };

    const handleClickOpen = () => {
      getMetadata();
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

      // upload button - always show
    update_metadata_button = <Button startIcon={(<UploadIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Update Metadata
                  </Button>

    return (
        <>
        <Button startIcon={(<UploadIcon fontSize="small" />)}
        sx={{ mr: 1 }}
        onClick={handleClickOpen}> Update Metadata
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth='xl'>
          <DialogTitle>Update Metadata</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 3 }}>
              <MetadataListResults myfiles={selectedFiles} mytags={metadata} addTag={addTag} removeTag={removeTag} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Update</Button>
          </DialogActions>
        </Dialog>
      </>
    );
};
