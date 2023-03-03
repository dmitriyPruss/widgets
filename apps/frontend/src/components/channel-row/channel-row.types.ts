import { 
  OptionsObject, 
  SnackbarKey, 
  SnackbarMessage 
} from 'notistack';
import { ChannelDto } from '@boilerplate/shared';


export interface IChannelRow {
  row: ChannelDto,
  enqueueSnackbar(
    message: SnackbarMessage, 
    options?: OptionsObject | undefined
  ): SnackbarKey
}

export interface IChannelData {
  [field: string]: string
}