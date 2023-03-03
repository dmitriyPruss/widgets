import React from 'react';


export interface IWidgetItem {
  id?: string,
  left: number,
  top: number,
  price: number,
  title: string,
  url: string	
}

export interface IProductCardProps {
  widget: IWidgetItem,
  setCurrentCoords: React.Dispatch<React.SetStateAction<{
    x: number;
    y: number;
  }>>   
}