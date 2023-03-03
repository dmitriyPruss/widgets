import React from 'react';


export interface IWidgetItem {
  id?: string,
  left: number,
  top: number,
  price: number,
  title: string,
  url: string	
}

export interface ICurrentCoords {
  x: number, 
  y: number
}

export interface IDndWidgetContainerProps {
  widgets: IWidgetItem[],
  setWidgets: React.Dispatch<React.SetStateAction<IWidgetItem[]>>,
  currentCoords: ICurrentCoords,
  children: React.ReactElement
}

export interface IMoveWidget {
  (id: string, left: number, top: number): void
}



