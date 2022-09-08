import { useState } from 'react';
//import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField, Box, Container } from '@mui/material';
import { Sell as SellIcon } from '../../../icons/sell';
import { getMetadataCall } from './get-metadata-api-call';
import { setMetadataCall } from './set-metadata-api-call';
import { MetadataListResults } from './get-metadata-list-results';

export const MetadataModal = ({currentPath, selectedFiles, session, ...rest}) => {
    const [open, setOpen] = useState(false);
    const [metadata, setMetadata] = useState([[]]);
    let update_metadata_button;

    //React.useEffect(() => {
    //}, [metadata, selectedFiles, setMetadata]);

    async function getMetadata() {
      const new_metadata = await getMetadataCall(selectedFiles, currentPath, session.idToken);
      setMetadata(new_metadata);
    };

    // adds new tag
    const addTag = (tagToAdd, tagType, _idx) => {
      let newTags = [...metadata]; // creates a shallow copy of metadata
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

    const handleUpdateMetadata = () => {
      // currently makes separate calls for each file, even if all tags are shared.
      for (let i=0;i<selectedFiles.length;i++){
        setMetadataCall(selectedFiles[i], currentPath, metadata[i], session.idToken);
      }
      setOpen(false);
    }
   // metadata button
    update_metadata_button = <Button startIcon={(<SellIcon fontSize="small" />)}
                          sx={{ mr: 1 }}
                          onClick={handleClickOpen}> Update Metadata
                  </Button>

    return (
        <>
        <Button startIcon={(<SellIcon fontSize="small" />)}
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
            <Button onClick={handleUpdateMetadata}>Update</Button>
          </DialogActions>
        </Dialog>
      </>
    );
};
