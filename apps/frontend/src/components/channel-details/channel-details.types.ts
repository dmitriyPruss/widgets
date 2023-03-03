import { 
  OptionsObject, 
  SnackbarKey, 
  SnackbarMessage 
} from 'notistack';


export interface IChannelDetailsProps {
  id: string;
  enqueueSnackbar(
    message: SnackbarMessage, 
    options?: OptionsObject | undefined
  ): SnackbarKey
}