import React, { FC, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { omit } from 'lodash';
import { Box, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useModal } from 'mui-modal-provider';
import UpdateWidgetForm from 
  '../update-widget-form/update-widget-form.component';
import { useDeleteWidgetMutation } from '@boilerplate/store';
import { IWidgetRow, IWidgetData } from './widget-row.types';
import {  
  cellStyle,
  iconStyle,
  widgetRowStyle 
} from './widget-row.styles';


const WidgetRow: FC<IWidgetRow> = ({ row, enqueueSnackbar }: IWidgetRow) => {
  const widgetData: IWidgetData = useMemo(
    () => omit(row, ['channelId', 'createdAt', 'updatedAt']), [row]);

  const { id } = useParams();

  const [deleteWidget] = useDeleteWidgetMutation();

  const { showModal } = useModal();

  const openUpdateWidgetForm = useCallback(() => 
	  row?.id 
      ? showModal(UpdateWidgetForm, { id: row?.id, widgetData, enqueueSnackbar }) 
      : null, 
    [row?.id, widgetData, showModal, enqueueSnackbar]
  );

  const deleteWidgetRow = async () => {
	  try {
      if (!id) {
        return;
      }

	    await deleteWidget({
		    channelId: id, 
		    widgetId: widgetData['id'] as string
	    });
    } catch (e: any) {
      console.error(e.message);
    }
  }

  return (
	<TableRow
	  sx={widgetRowStyle}
	>
	  {Object.keys(widgetData).map((key: string) => (
		<TableCell key={key} sx={cellStyle}>
      <Box 
        width="180px" 
        sx={{overflowWrap: 'break-word'}}
      >
        {widgetData[key]}
      </Box>
		</TableCell>
	  ))}
    <TableCell sx={iconStyle}>
		  <EditIcon sx={{ color: 'blue' }} onClick={openUpdateWidgetForm} />
	  </TableCell>
    <TableCell sx={iconStyle}>
      <DeleteIcon sx={{ color: 'red' }} onClick={deleteWidgetRow} />
    </TableCell>
	</TableRow>
  );
}

export default WidgetRow;
