import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
// import Snackbar from '../components/Snackbar';
import Button from '../components/Button';

function ProductCTA() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: 'flex', mb: 10 }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#0C090A',
              py: 8,
              px: 3,
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Typography variant="h3" component="h3" color="#E0E0E0" gutterBottom>
                Interested?
              </Typography>
              <Typography variant="h5" color="#E0E0E0">
                Sign up for product updates
              </Typography>
              <TextField
                noBorder
                placeholder="Your email"
                variant="standard"
                sx={{ width: '100%', mt: 3, mb: 2 }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: '50%', backgroundColor: "#36454F", borderRadius: 8, border: 1, borderColor: "#E0E0E0" }}
              >
                Keep me updated
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;
