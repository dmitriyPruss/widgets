export interface IErrorMessage {
  message: string 
}

export type IError<T> = T | string;
