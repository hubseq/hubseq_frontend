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
import { useSession } from "next-auth/react";

const Runs = () => {
  const [runsSelected, setRunsSelected] = useState([]);
  const [runInfo, setRunInfo] = useState([]);
  const { data: session, status } = useSession();

  async function getRuns(idToken) {
    const newruns = await getRunsCall(idToken);
    setRunInfo(newruns);
  }

  React.useEffect(() => {
    if (session) {
      getRuns(session.idToken);
    }
  }, [session]);

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
          <RunListToolbar runsSelected={runsSelected} setRunsSelected={setRunsSelected} runInfo={runInfo} setRunInfo={setRunInfo} session={session} />
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
