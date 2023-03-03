import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router-dom'
import { 
  Box, 
  Button, 
  Typography, 
  Tooltip 
} from '@mui/material';
import { blue } from '@mui/material/colors';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { useModal } from 'mui-modal-provider';
import { useSnackbar } from 'notistack';
import { logout } from '@boilerplate/store';
import ChannelForm from '../channel-form/channel-form.component';
import HeaderPrivateTitle from '../header-private-title/header-private-title.component';
import ChannelDetails from '../channel-details/channel-details.component';
import { 
  btnStyle, 
  iconStyle, 
  logoutIconStyle
} from './header-private.styles';


const HeaderPrivate: FC = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = useCallback(async () => {
    dispatch(logout());
  }, [dispatch]);

  const { id } = useParams();

  const { showModal } = useModal();

  const { enqueueSnackbar } = useSnackbar();

  const openChannelForm = useCallback(() => {
	showModal(ChannelForm, { enqueueSnackbar });
  }, [showModal, enqueueSnackbar]);

  const openChannelDetailsWindow = useCallback(() => 
	id ? showModal(ChannelDetails, { id, enqueueSnackbar }) : null, 
    [id, enqueueSnackbar, showModal]
  );

  const buttonClickHandler = useCallback(() => {
	id
	  ? openChannelDetailsWindow()
	  : openChannelForm(); 
  }, [id, openChannelDetailsWindow, openChannelForm]);

  const headerButtonName = id 
	? 'Show Channel Details' 
	: 'Create Channel';
	
  return (
	<Box
	  width="100%"
	  height="70px"
	  display="flex"
	  justifyContent="space-between"
	  alignItems="center"
	  bgcolor={blue[500]}
	  p="0 20px"
	  boxShadow="0 0 6px 3px grey"
	>
	  {id 
	    ? <HeaderPrivateTitle id={id} /> 
		: <Box 	
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			color="white"
		  >
			<ImportantDevicesIcon sx={iconStyle} />	
			<Typography marginLeft="5px" fontSize={24}>Test App</Typography>
		  </Box>
	  }
	  <Box 
		display="flex" 
		alignItems="center"
	  >
		<Button 
		  variant="contained"
		  sx={btnStyle} 
		  onClick={buttonClickHandler}
		>
		  {headerButtonName}
		</Button>
		<Tooltip title="Logout" arrow>
		  <LogoutIcon
			sx={logoutIconStyle} 
			onClick={handleLogoutClick} 
		  />
		</Tooltip>
	  </Box>
	</Box>
  )
};

export default HeaderPrivate;