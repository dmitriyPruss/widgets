import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useGetChannelByIdQuery } from '@boilerplate/store';
import { IHeaderPrivateTitleProps } from './header-private-title.styles';


const HeaderPrivateTitle: FC<IHeaderPrivateTitleProps> = (
  { id }: IHeaderPrivateTitleProps
) => {
  const { data } = useGetChannelByIdQuery(id);

  return (		
	<Box 	
	  display="flex"
	  justifyContent="space-between"
	  alignItems="center"
	  height="60px"
	  color="white"
	  fontSize={24}
	>
	  <Box 
	    id="video-icon-container" 
		width="35px" 
		display="flex" 
		justifyContent="center" 
		alignItems="center"
	  ></Box>
	  <Typography ml={1} fontSize={24}>{data?.name}</Typography>
	</Box> 
  )
};

export default HeaderPrivateTitle;