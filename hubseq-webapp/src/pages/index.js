import Head from 'next/head';
import { LandingLayout } from '../components/landingpage-layout';

const Landing = () => {
  return(
      <Head>
        <title>
        HubSeq | Welcome
        </title>
      </Head>
  );
};

Landing.getLayout = (page) => (
  <LandingLayout>
    {page}
  </LandingLayout>
);

export default Landing;
