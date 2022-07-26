import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { FileListResults } from '../components/file/file-list-results';
import { FileListToolbar } from '../components/file/file-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { files } from '../__mocks__/files';

const Files = () => (
  <>
    <Head>
      <title>
      HubSeq | File Explorer
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
        <FileListToolbar />
        <Box sx={{ mt: 3 }}>
          <FileListResults files={files} />
        </Box>
      </Container>
    </Box>
  </>
);
Files.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Files;
