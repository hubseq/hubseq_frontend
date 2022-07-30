import Head from 'next/head';
import { Box, Container } from '@mui/material';
import FileList from '../components/file/file_list_api_call';
import { FileListToolbar } from '../components/file/file-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';

const Files = () => {
  const [filesSelected, setFilesSelected] = useState([]);

  return(
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
          <FileListToolbar filesSelected={filesSelected} setFilesSelected={setFilesSelected} />
          <Box sx={{ mt: 3 }}>
            <FileList setFilesSelected={setFilesSelected} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Files.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Files;
