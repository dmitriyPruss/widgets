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
import RouterSuspense from '../router-suspense/router-suspense.component';
import {
  useUpdateWidgetMutation
} from '@boilerplate/store';
import useShowError from '../../hooks/use-show-error.hooks';
import { WidgetDto } from '@boilerplate/shared';
import { IUpdateWidgetFormProps } from './update-widget-form.types';
import {
  closeIconStyle,
  dialogStyle,
  dialogContentStyle,
  errorStyle
} from './update-widget-form.styles';


const resolver = classValidatorResolver(WidgetDto);

const UpdateWidgetForm: FC<IUpdateWidgetFormProps> = (
  { id, enqueueSnackbar, widgetData }: IUpdateWidgetFormProps
) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<WidgetDto>({ defaultValues: widgetData, resolver });

  const [open, setOpen] = useState<boolean>(true);

  const closeHandler = useCallback(() => {
	  setOpen(false);
  }, []);

  const [updateWidget, { isLoading, error }] = useUpdateWidgetMutation();

  const onConfirm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await handleSubmit(
      async (value) => {
        try {
		      value['id'] = id;

          await updateWidget(value);

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
          zIndex={10} 
          bgcolor="#fff"
          sx={{opacity: '0.7'}}
        >
					<RouterSuspense />
        </Box>
      )}
      <Box m={1.2} boxSizing="border-box" width="570px">
        <DialogTitle>
          Update Widget
        </DialogTitle>
        <DialogContent sx={dialogContentStyle}>
          <CloseIcon sx={closeIconStyle} onClick={closeHandler} />
          <form onSubmit={async (e) => { await onConfirm(e); }}>
            <Box 
              display="flex" 
              height="300px" 
              mt={3} 
              flexDirection="column" 
              justifyContent="space-between"
            >
              <FormControl fullWidth>
				        <TextField
				          required
				          autoComplete="current-title"
                  autoFocus
                  label="Title"
                  error={!!errors.title}
				          aria-describedby="component-error-title"
				          {...register('title')}
				        />
		            <FormHelperText error id="component-error-title" sx={errorStyle}>
				          {errors.title?.message}
				        </FormHelperText>
			        </FormControl>
              <FormControl fullWidth>
				        <TextField
				          required
				          autoComplete="current-title"
                  label="URL"
                  error={!!errors.url}
				          aria-describedby="component-error-url"
				          {...register('url')}
				        />
				        <FormHelperText error id="component-error-url" sx={errorStyle}>
				          {errors.url?.message}
				        </FormHelperText>
			        </FormControl>
              <FormControl fullWidth>
				        <TextField
				          required
		              autoComplete="current-price"
                  label="Price"
                  error={!!errors.price}
				          aria-describedby="component-error-price"
				          {...register('price')}
				        />
				        <FormHelperText error id="component-error-price" sx={errorStyle}>
				          {errors.price?.message}
				        </FormHelperText>
			        </FormControl>
			        <Box display="flex" justifyContent="space-between">
                <FormControl>
				          <TextField
					          required
					          autoComplete="current-startX"
                    label="Start X"
                    type="number"
                    error={!!errors.startX}
					          aria-describedby="component-error-start-x"
					          {...register('startX')}
				          />
				          <FormHelperText error id="component-error-start-x" sx={errorStyle}>
				            {errors.startX?.message}
				          </FormHelperText>
				        </FormControl>
                <FormControl>
				          <TextField
					          required
					          autoComplete="current-startY"
                    label="Start Y"
                    type="number"
                    error={!!errors.startY}
					          aria-describedby="component-error-start-y"
					          {...register('startY')}
				          />
				          <FormHelperText error id="component-error-start-y" sx={errorStyle}>
					          {errors.startY?.message}
				          </FormHelperText>
				        </FormControl>
			        </Box>
			      </Box>
            <Box 
              display="flex" 
              justifyContent="flex-end" 
              alignItems="flex-end" 
              height="100px" 
              mb={2}
            >
              <Button
                variant="contained"
				        color="error"
                onClick={closeHandler}
				        sx={{marginRight: '10px'}}
              >
                CANCEL
              </Button>
              <Button
				        variant="contained"
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

export default UpdateWidgetForm;
