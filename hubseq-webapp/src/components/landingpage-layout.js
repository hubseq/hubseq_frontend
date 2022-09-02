import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LandingNavbar } from './landingpage-navbar';

const LandingLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  backgroundImage: 'url("/static/hubseq-blue-splash-background.svg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat  : 'no-repeat',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 0
  }
}));

export const LandingLayout = (props) => {
  const { children } = props;

  return (
    <>
      <LandingLayoutRoot>
        <Box
          sx={{
            height: '100%',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </LandingLayoutRoot>
      <LandingNavbar />
    </>
  );
};
