import { 
  OptionsObject, 
  SnackbarKey, 
  SnackbarMessage 
} from 'notistack';


export interface IUpdateChannelFormProps {
  channelData: { [field: string]: string | number },
  enqueueSnackbar(
    message: SnackbarMessage, 
    options?: OptionsObject | undefined
  ): SnackbarKey
};