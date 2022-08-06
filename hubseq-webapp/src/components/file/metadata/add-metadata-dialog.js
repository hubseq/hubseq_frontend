import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const AddMetadataDialog = ({ addNewTags, tabletype, fileIndex, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [field, setField] = useState('');
  const [mvalue, setValue] = useState('');

  const handleSelectField = (event) => {
    setField(event.target.value);
  };

  const handleSelectValue = (event) => {
    setValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAdd = () => {
    const newTags = {"Key": field, "Value": mvalue};
    addNewTags(newTags, tabletype, fileIndex);
    setOpen(false);
  };

  return (
    <div>
      <p> &nbsp;&nbsp;&nbsp;<u onClick={handleOpen}>Add Metadata</u> </p>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Metadata</DialogTitle>
        <DialogContent>
          <FormControl variant="standard" fullWidth>
          <InputLabel>New Field</InputLabel>
          <Select
            autoFocus
            labelId="select-field-dropdown"
            id="select-field-dropdown"
            value={field}
            label="Field"
            onChange={handleSelectField}
          >
            <MenuItem value={'sampleid'}>Sample ID</MenuItem>
            <MenuItem value={'group'}>Group</MenuItem>
            <MenuItem value={'condition'}>Condition</MenuItem>
            <MenuItem value={'experimentid'}>Experiment ID</MenuItem>
            <MenuItem value={'library'}>Library</MenuItem>
            <MenuItem value={'tissue'}>Tissue</MenuItem>
            <MenuItem value={'celltype'}>Cell Type</MenuItem>
            <MenuItem value={'description'}>Description</MenuItem>
          </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="name"
            label="Value"
            value={mvalue}
            fullWidth
            variant="standard"
            onChange={handleSelectValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
