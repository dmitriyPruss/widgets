import { 
  OptionsObject, 
  SnackbarKey, 
  SnackbarMessage 
} from 'notistack';
  
  
export interface IChannelFormProps {
  enqueueSnackbar(
    message: SnackbarMessage, 
    options?: OptionsObject | undefined
  ): SnackbarKey
}