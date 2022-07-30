import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import NextLink from 'next/link';

const LandingNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const LandingNavbar = (props) => {
  const { ...other } = props;

  return (
    <>
      <LandingNavbarRoot
        sx={{
          left: {
            lg: 0
          },
          width: {
            lg: '100%'
          },
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            backgroundColor: 'neutral.900'
          }}
        >
          <Box>
            <div>
              <Image src="/static/hubseq-logo-darker.svg" alt="HubSeq" width="150" height="80" />
            </div>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ color: 'white' }}>
            <NextLink href="/login" passHref>
              <a style={{ color: 'white' }}>Login</a>
            </NextLink>
          </Box>
        </Toolbar>
      </LandingNavbarRoot>
    </>
  );
};

LandingNavbar.propTypes = {
};
