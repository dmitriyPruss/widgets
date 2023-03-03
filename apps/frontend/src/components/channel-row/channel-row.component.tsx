import React, { FC, useCallback, useMemo } from 'react';
import { omit } from 'lodash';
import { Box, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'mui-modal-provider';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateChannelForm from '../update-channel-form/update-channel-form.component';
import { 
  useDeleteChannelMutation
} from '@boilerplate/store';
import { IChannelRow, IChannelData } from './channel-row.types';
import { 
  channelRowStyle, 
  cellStyle,
  iconStyle
} from './channel-row.styles';


const ChannelRow: FC<IChannelRow> = ({ row, enqueueSnackbar }: IChannelRow) => {
  const navigate = useNavigate();

  const channelData: IChannelData = useMemo(() => omit(row, ['createdAt', 'updatedAt']), [row]);

  const [deleteChannel] = useDeleteChannelMutation();

  const { showModal } = useModal();

  const openUpdateChannelForm = useCallback(() => {
	  showModal(UpdateChannelForm, { channelData, enqueueSnackbar })
  }, [showModal, channelData, enqueueSnackbar]);

  const deleteChannelRow = async () => {
	  try {
	    await deleteChannel(channelData['id']);
    } catch (e: any) {
	    console.error(e.message);
    }
  }

  return (
	  <TableRow sx={channelRowStyle}>
	    {Object.keys(channelData).map((key: string) => (
		    <TableCell 
          onClick={() => {
            navigate(`stream/${channelData['id']}`, { replace: true });
          }} 
          key={key} 
          sx={cellStyle}
        >
          <Box 
            width="250px" 
            sx={{overflowWrap: 'break-word'}}
          >
            {channelData[key]} 
          </Box>
        </TableCell>
	    ))}
	    <TableCell sx={iconStyle}>
		    <EditIcon sx={{ color: 'blue' }} onClick={openUpdateChannelForm} />
	    </TableCell>
      <TableCell sx={iconStyle}>
        <DeleteIcon sx={{ color: 'red' }} onClick={deleteChannelRow} />
      </TableCell>
	  </TableRow>
  );
}

export default ChannelRow;
