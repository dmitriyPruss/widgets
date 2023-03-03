import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { footerStyle } from './footer.styles';


const Footer: FC = () =>  (
  <Box
	width="100%"
	height="45px"
	display="flex"
	justifyContent="center"
	alignItems="center"
	bgcolor={blue[50]}
	position="absolute"
	bottom={0}
	zIndex={5}
  >
	<Typography sx={footerStyle}>Copyright © Training project 2023</Typography>
  </Box>
);

export default Footer;