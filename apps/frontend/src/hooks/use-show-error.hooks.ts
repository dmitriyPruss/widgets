import { useEffect } from 'react';
import { 
  OptionsObject, 
  SnackbarKey, 
  SnackbarMessage 
} from 'notistack';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';


interface IDataError {
  description?: string,
  message: string,
  path?: string,
  statusCode?: number,
  timestamp?: Date
}
  
export interface IError { 
  status: number, 
  data: IDataError
}

interface IUseShowErrorParams {
  error: FetchBaseQueryError | SerializedError | undefined,
  enqueueSnackbar(
    message: SnackbarMessage, 
    options?: OptionsObject | undefined
  ): SnackbarKey
}

const useShowError = ({ error, enqueueSnackbar } : IUseShowErrorParams) => {
  useEffect(() => {
    if (error) {
      const errorMessage: IError = error as IError;
    
      enqueueSnackbar(
        `Error: ${errorMessage?.data?.message || 'unknown'}`, 
        { 
          variant: 'error', 
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          } 
        }
      );
    }
  }, [error, enqueueSnackbar]);
}

export default useShowError;




