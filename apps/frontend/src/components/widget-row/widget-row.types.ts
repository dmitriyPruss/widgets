import { 
  OptionsObject, 
  SnackbarKey, 
  SnackbarMessage 
} from 'notistack';
import { WidgetDto } from '@boilerplate/shared';


export interface IWidgetRow {
  row: WidgetDto;
  enqueueSnackbar(
    message: SnackbarMessage, 
    options?: OptionsObject | undefined
  ): SnackbarKey
}

export interface IWidgetData {
  [field: string]: string | number
}