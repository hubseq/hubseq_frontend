import Head from 'next/head';
import { Box, Container } from '@mui/material';
import FileList from '../components/file/file_list_api_call';
import { FileListToolbar } from '../components/file/file-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

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
          <FileList />
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
