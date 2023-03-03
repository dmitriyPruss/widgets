import React from 'react';
import { WidgetDto } from '@boilerplate/shared';


export interface iWidgetsProps {
  id: string,
  page: number,
  count: number,
  pageSize: number,
  rows: WidgetDto[],
  isLoading: boolean,
  isError: boolean,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  onChangePage(e: unknown, newPage: number): void,
  onChangeRowsPerPage(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void
}