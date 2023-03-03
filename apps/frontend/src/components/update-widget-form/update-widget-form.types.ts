import { 
  OptionsObject, 
  SnackbarKey, 
  SnackbarMessage 
} from 'notistack';


export interface IUpdateWidgetFormProps {
  id: string,
  widgetData: { [field: string]: string | number },
  enqueueSnackbar(
    message: SnackbarMessage, 
    options?: OptionsObject | undefined
  ): SnackbarKey
};