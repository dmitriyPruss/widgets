import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import HeaderPrivate from '../components/header-private/header-private.component';
import Footer from '../components/footer/footer.component';


const AuthorizedArea: FC = () => (
  <Box 
    minWidth="360px" 
    position="relative" 
    height="100vh" 
    bgcolor={blue[50]}
  >
    <HeaderPrivate />
    <Outlet />
    <Footer />
  </Box>
)

export default AuthorizedArea;
