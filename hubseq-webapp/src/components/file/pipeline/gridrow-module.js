import { useState } from 'react';
import React from 'react';
import Grid from '@mui/material/Grid';
import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Checkbox } from '@mui/material';

export const GridRowModule = ({modulelabel, defaultmodule, addParam, addModule, ...rest}) => {
  const [mymodule, setMyModule] = useState(defaultmodule);
  // const [params, setParams] = useState('');
  const moduleTextFieldLabel = modulelabel + " textfield";
  const moduleParamsLabel = "(" + modulelabel + " Parameters)";

  React.useEffect(() => {
    // nothing yet
  }, []);

  const handleParamsChange = (event)=> {
    addParam(modulelabel, event.target.value);
  }

  const handleModuleSelect = (event)=> {
    setMyModule(event.target.value);
    addModule(modulelabel, event.target.value);
  }

  return (
    <>
    <Grid item xs={1}>
      <Checkbox
        checked={true}
        color="primary"
        value="true"
      />
    </Grid>
    <Grid item xs={3}>
      <FormControl variant="standard" fullWidth>
      <InputLabel>Select {modulelabel} Module</InputLabel>
        <Select
          labelId={modulelabel}
          id={modulelabel}
          value={mymodule}
          label={modulelabel}
          onChange={handleModuleSelect}
        >
          <MenuItem value={mymodule}>{mymodule}</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={8}>
      <TextField margin="dense" id={moduleTextFieldLabel} label={moduleParamsLabel}
               size="small" helperText="Example: -p -s 2 -bed ~/genomes/bed/hg38_targeted.bed" fullWidth onChange={handleParamsChange} />
    </Grid>
    </>
  );
};
