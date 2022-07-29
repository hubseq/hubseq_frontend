import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { RunListResults } from '../components/run/run-list-results';
import { RunListToolbar } from '../components/run/run-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import RunList from '../components/run/run-list-api-call';
// import { runs } from '../__mocks__/runs';

const Runs = () => (
  <>
    <Head>
      <title>
      HubSeq | Runs
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
        <RunListToolbar />
        <Box sx={{ mt: 3 }}>
          <RunList />
        </Box>
      </Container>
    </Box>
  </>
);
Runs.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Runs;
