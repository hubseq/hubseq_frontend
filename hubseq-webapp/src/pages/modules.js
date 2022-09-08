import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

const Modules = () => (
  <>
    <Head>
      <title>
      HubSeq | Modules
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
          Modules Coming Soon
        </Typography>
      </Container>
    </Box>
  </>
);
Modules.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Modules;
