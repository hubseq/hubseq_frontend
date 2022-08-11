import Head from 'next/head';
import React from 'react';
import { Box, Container } from '@mui/material';
import { RunListResults } from '../components/run/run-list-results';
import { RunListToolbar } from '../components/run/run-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
//import RunList from '../components/run/run-list-api-call';
import { getRunsCall } from '../components/run/run-list-api-call';
import { useState } from 'react';
// import { runs } from '../__mocks__/runs';

const Runs = () => {
  const [runsSelected, setRunsSelected] = useState([]);
  const [runInfo, setRunInfo] = useState([]);
  
  async function getRuns() {
    const newruns = await getRunsCall();
    setRunInfo(newruns);
  }

  React.useEffect(() => {
    getRuns();
  }, []);

  return(
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
          <RunListToolbar runsSelected={runsSelected} setRunsSelected={setRunsSelected} runInfo={runInfo} setRunInfo={setRunInfo} />
          <Box sx={{ mt: 3 }}>
            <RunListResults runs={runInfo} setRunsSelected={setRunsSelected} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Runs.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Runs;
