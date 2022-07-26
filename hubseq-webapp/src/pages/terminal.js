import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

const Terminal = () => (
  <>
    <Head>
      <title>
      HubSeq | Terminal
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
          Terminal Coming Soon
        </Typography>
      </Container>
    </Box>
  </>
);
Terminal.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Terminal;
