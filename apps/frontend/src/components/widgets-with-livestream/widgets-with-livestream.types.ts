import React from 'react';


export interface IWidgetItem {
  id?: string,
  left: number,
  top: number,
  price: number,
  title: string,
  url: string	
}

export interface IWidgetsWithLiveStreamProps {
  widgets: IWidgetItem[],
  count: number,
  page: number,
  pageSize: number,
  playbackURL: string,
  isLoading: boolean,
  isError: boolean,
  setWidgets: React.Dispatch<React.SetStateAction<IWidgetItem[]>>,
  onChangePage(e: unknown, newPage: number): void,
  onChangeRowsPerPage(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void
}

export interface ICurrentCoords {
  x: number, 
  y: number
}

