import React, { FC, useCallback, useState } from 'react';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogContent, 
  DialogTitle,
  Typography  
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RouterSuspense from '../router-suspense/router-suspense.component';
import { useGetChannelByIdQuery } from '@boilerplate/store';
import useShowError from '../../hooks/use-show-error.hooks';
import { IChannelDetailsProps } from './channel-details.types';
import { 
  closeIconStyle,
  dialogStyle, 
  dialogContentStyle
} from './channel-details.styles';


const ChannelDetails: FC<IChannelDetailsProps> = (
  { id, enqueueSnackbar }: IChannelDetailsProps
) => {
  const [open, setOpen] = useState<boolean>(true);

  const closeHandler = useCallback(() => {
	  setOpen(false);
  }, []);

  const { data, isLoading, error } = useGetChannelByIdQuery(id);

  const copyData = useCallback((textData: string, message: string) => {
    navigator.clipboard.writeText(textData).then(() => {
      enqueueSnackbar(message, { variant: 'success' });
    });
  }, [enqueueSnackbar]);

  const streamKey = data?.key || '';
  const ingestEndpoint = data?.ingestEndpoint || ''; 

  useShowError({ error, enqueueSnackbar });
   
  return (
    <Dialog
      open={open}
      maxWidth="md"
      keepMounted
      onClose={closeHandler}
      aria-describedby="alert-dialog-slide-description"
      sx={dialogStyle}
    >
      {isLoading && (
        <Box 
          width="100%" 
          position="absolute" 
          height="100%" 
          top={0} 
          left={0}
          display="flex"
          flexDirection="column" 
          justifyContent="center" 
          alignItems="center" 
          zIndex={999} 
          bgcolor="#fff"
          sx={{opacity: '0.7'}}
        >
          <RouterSuspense />
        </Box>
      )} 
      <Box m={1.2} boxSizing="border-box" position="relative" width="650px">       
        <DialogTitle sx={{fontSize: '24px'}}>
          Channel Details
        </DialogTitle>
        <DialogContent sx={dialogContentStyle}>
          <CloseIcon sx={closeIconStyle} onClick={closeHandler} />
          <Box>
            <Typography variant="h6">Stream Key:</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontSize="14px">{data?.key}</Typography> 
              <Button
                variant="contained"
                onClick={() => { copyData(streamKey, 'Stream key copied'); }}
              >
                COPY
              </Button>   
            </Box> 
          </Box>
          <Box>  
            <Typography variant="h6">Ingest Server:</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontSize="14px">{data?.ingestEndpoint}</Typography>
              <Button
                variant="contained"
                onClick={() => { copyData(ingestEndpoint, 'Ingest server copied'); }}
              >
                COPY
              </Button>    
            </Box>       
          </Box> 
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default ChannelDetails;