import React from 'react';
import Head from 'next/head';
import { Box, Container, Tooltip } from '@mui/material';
import { getFileCall } from '../components/file/file_list_api_call';
import { FileListResults } from '../components/file/file-list-results';
import FileList from '../components/file/file_list_api_call';
import { FileListToolbar } from '../components/file/file-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';
import { addTrailingSlash, hideRootFolder } from '../utils/jsutils';

const Files = () => {
  const [filesSelected, setFilesSelected] = useState([]);
  const [shownFiles, setShownFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState("hubtenants/tranquis/"); // "www.hubseq.com/assets/"

  async function getFiles(path) {
    const newfiles = await getFileCall(path);
    console.log('SHOWN FILES: ', newfiles);
    setShownFiles(newfiles);
  }

  React.useEffect(() => {
    getFiles(currentPath);
  }, []);

  const upOnePath = (path) => {
      console.log('UP ONE PATH!', path);
      const pathSplit = addTrailingSlash(path).split('/');
      if (pathSplit.length > 3){
        const newPath = addTrailingSlash(pathSplit.slice(0,pathSplit.length-2).join('/'));
        console.log('UP ONE PATH: new path: ', newPath);
        setCurrentPath(newPath);
        getFiles(newPath);
      }
  }

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
          <FileListToolbar currentPath={currentPath} filesSelectedInfo={shownFiles.filter(val => filesSelected.includes(val.id))} filesSelected={filesSelected} setFilesSelected={setFilesSelected} />
          <Box sx={{ mt: 2 }}> &nbsp;&nbsp;&nbsp; <b>Current Folder:</b> {hideRootFolder(currentPath, 'hubtenants/')} &nbsp;&nbsp; [<Tooltip title="Go up one folder" placement="top-start"><u onClick={() => upOnePath(currentPath)}>Back</u></Tooltip>] </Box>
          <Box sx={{ mt: 3 }}>
            <FileListResults files={shownFiles} setFiles={setShownFiles} currentPath={currentPath} setFilesSelected={setFilesSelected} setCurrentPath={setCurrentPath} />
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
