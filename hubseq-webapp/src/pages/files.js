import React from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
// import FileList from '../components/file/file_list_api_call';
import { FileListResults } from '../components/file/file-list-results';
import { getFileCall } from '../components/file/file_list_api_call';
import { FileListToolbar } from '../components/file/file-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';

const Files = () => {
  const [filesSelected, setFilesSelected] = useState([]);
  const [shownFiles, setShownFiles] = useState([]);

  const current_path = "www.hubseq.com/assets/";

  React.useEffect(() => {
    async function getFiles() {
      const newfiles = await getFileCall("s3://"+current_path);
      console.log('SHOWN FILES: ', newfiles);
      setShownFiles(newfiles);
    }
    getFiles();
  }, []);

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
          <FileListToolbar currentPath={current_path} filesSelectedInfo={shownFiles.filter(val => filesSelected.includes(val.id))} filesSelected={filesSelected} setFilesSelected={setFilesSelected} />
          <Box sx={{ mt: 3 }}>
            <FileListResults files={shownFiles} currentpath={current_path} setFilesSelected={setFilesSelected} />
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
