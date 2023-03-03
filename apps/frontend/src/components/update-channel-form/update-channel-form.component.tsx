import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ChannelDto } from '@boilerplate/shared';
import RouterSuspense from '../router-suspense/router-suspense.component';
import {
  useUpdateChannelMutation
} from '@boilerplate/store';
import useShowError from '../../hooks/use-show-error.hooks';
import { IUpdateChannelFormProps } from './update-channel-form.types';
import {
  cancelButtonStyle,
  closeIconStyle,
  confirmButtonStyle,
  dialogStyle,
  dialogContentStyle,
  errorStyle
} from './update-channel-form.styles';


const resolver = classValidatorResolver(ChannelDto);

const UpdateChannelForm: FC<IUpdateChannelFormProps> = (
  { channelData, enqueueSnackbar }: IUpdateChannelFormProps
) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ChannelDto>({defaultValues: channelData, resolver });

	const [open, setOpen] = useState<boolean>(true);

	const closeHandler = useCallback(() => {
		setOpen(false);
	}, []);

  const [updateChannel, { isLoading, error }] = useUpdateChannelMutation();

  const onConfirm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await handleSubmit(
      async (value) => {
        try {
          await updateChannel(value);

          closeHandler();
        } catch (e: any) {
          console.error(e.message);
        }
      }
    )();
  };

  useShowError({ error, enqueueSnackbar });

  return (
    <Dialog
      open={open}
      maxWidth="sm"
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
      <Box 
        m="22px 10px 10px" 
        boxSizing="border-box" 
        width="350px"
      >
        <DialogTitle>
          Update Channel
        </DialogTitle>
        <DialogContent sx={dialogContentStyle}>
          <CloseIcon sx={closeIconStyle} onClick={closeHandler} />
          <form onSubmit={async (e) => { await onConfirm(e); }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
						  <TextField
							  required
							  autoComplete="current-name"
                autoFocus
                error={!!errors.name}
							  aria-describedby="component-error-name"
							  {...register('name')}
						  />
						  <FormHelperText error id="component-error-name" sx={errorStyle}>
							  {errors.name?.message}
						  </FormHelperText>
					  </FormControl>
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                sx={cancelButtonStyle}
                onClick={closeHandler}
              >
                CANCEL
              </Button>
              <Button
                variant="text"
                sx={confirmButtonStyle}
                type="submit"
              >
                CONFIRM
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default UpdateChannelForm;
