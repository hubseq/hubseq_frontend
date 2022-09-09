import Head from 'next/head';

import * as React from 'react';
import ProductCategories from '../components/landing/views/ProductCategories';
import ProductSmokingHero from '../components/landing/views/ProductSmokingHero';
import AppFooter from '../components/landing/views/AppFooter';
import ProductHero from '../components/landing/views/ProductHero';
import ProductValues from '../components/landing/views/ProductValues';
import ProductHowItWorks from '../components/landing/views/ProductHowItWorks';
import ProductCTA from '../components/landing/views/ProductCTA';
import AppAppBar from '../components/landing/views/AppAppBar';
// import withRoot from '../components/landing/withRoot';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <AppFooter />
    </React.Fragment>
  );
}

export default Index;

/*
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
*/
