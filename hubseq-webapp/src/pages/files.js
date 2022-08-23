import React from 'react';
import Head from 'next/head';
import { Box, Container, Tooltip } from '@mui/material';
import { getFileCall } from '../components/file/file_list_api_call';
import { FileListResults } from '../components/file/file-list-results';
import FileList from '../components/file/file_list_api_call';
import { FileListToolbar } from '../components/file/file-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';
import { addTrailingSlash } from '../utils/jsutils';
import { useSession } from "next-auth/react"

const Files = () => {
  const [filesSelected, setFilesSelected] = useState([]);
  const [shownFiles, setShownFiles] = useState([]);
  // replace default with teamid as default home path
  const [currentPath, setCurrentPath] = useState("tranquis/"); // "www.hubseq.com/assets/"
  const { data: session, status } = useSession();

  async function getFiles(path, idToken) {
    const newfiles = await getFileCall(path, idToken);
    console.log('SHOWN FILES: ', newfiles);
    setShownFiles(newfiles);
  }

  React.useEffect(() => {
    if (session) {
    getFiles(currentPath, session.idToken);
    }
  }, [session]);

  const upOnePath = (path) => {
      console.log('UP ONE PATH!', path);
      const pathSplit = addTrailingSlash(path).split('/');
      if (pathSplit.length > 2){
        const newPath = addTrailingSlash(pathSplit.slice(0,pathSplit.length-2).join('/'));
        console.log('UP ONE PATH: new path: ', newPath);
        setCurrentPath(newPath);
        getFiles(newPath, session.idToken);
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
          <FileListToolbar currentPath={currentPath} filesSelectedInfo={shownFiles.filter(val => filesSelected.includes(val.id))} filesSelected={filesSelected} setFilesSelected={setFilesSelected} session={session} />
          <Box sx={{ mt: 2 }}> &nbsp;&nbsp;&nbsp; <b>Current Folder:</b> {currentPath} &nbsp;&nbsp; [<Tooltip title="Go up one folder" placement="top-start"><u onClick={() => upOnePath(currentPath)}>Back</u></Tooltip>] </Box>
          <Box sx={{ mt: 3 }}>
            <FileListResults files={shownFiles} setFiles={setShownFiles} currentPath={currentPath} setFilesSelected={setFilesSelected} setCurrentPath={setCurrentPath} session={session}/>
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
