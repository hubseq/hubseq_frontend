import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

const Notebook = () => (
  <>
    <Head>
      <title>
      HubSeq | Notebook
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
      <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Notebook Coming Soon
        </Typography>
      </Container>
    </Box>
  </>
);
Notebook.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Notebook;
