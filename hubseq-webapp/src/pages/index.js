import Head from 'next/head';
import { Box, Container } from '@mui/material';
import FileList from '../components/file/file_list_api_call';
import { FileListToolbar } from '../components/file/file-list-toolbar';
import { LandingLayout } from '../components/landingpage-layout';
import { useState } from 'react';
import Image from 'next/image';
import Grid from '@mui/material/Grid';

const Landing = () => {
  return(
    <>
      <Head>
        <title>
        HubSeq | Welcome
        </title>
      </Head>

      <Box
            sx={{
              backgroundColor: 'black',
              flexGrow: 1,
              py: 40,
              height: '100%',
              width: '100%'
            }}
      >
      <div>
        <Image src="/static/hubseq-blue-splash-background.svg" alt="All of your sequencing data, all in one secure platform" layout='fill' />
      </div>
      </Box>

    </>
  );
};

Landing.getLayout = (page) => (
  <LandingLayout>
    {page}
  </LandingLayout>
);

export default Landing;
