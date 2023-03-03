import React, { FC, useState, useCallback, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useGetLiveStreamQuery, useGetWidgetsQuery } from '@boilerplate/store';
import { useSnackbar } from 'notistack';
import Widgets from '../../components/widgets/widgets.component';
import WidgetsWithLiveStream 
  from '../../components/widgets-with-livestream/widgets-with-livestream.component';
import { IWidgetItem } from './channel.types';
import { socketClient } from '../../socket';

  

const ChannelPage: FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { id } = useParams();

  const { data: liveStream, error } = useGetLiveStreamQuery(id as string, {
    pollingInterval: 7000
  });

  const { data, isLoading, isError } = useGetWidgetsQuery({
    channelId: id as string, 
    filter: {
      page: page + 1, 
      pageSize
    }
  });

  const handleChangePage = useCallback((e: unknown, newPage: number) => {
    setPage(newPage);
  }, []);
  
  const handleChangeRowsPerPage = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(e.target.value, 10));
    setPage(0);
  }, []);
    
  const rows = useMemo(() => data?.list || [], [data?.list]);

  const count = data?.total || 0;

  const isVideoPlaying = !error && !!liveStream?.playbackUrl;

  const initialWidgetsState: IWidgetItem[] = useMemo(
    () => rows?.map(row => ({
      id: row?.id,
      left: row?.startX || 0,
      top: row?.startY || 0,
      price: row.price,
      title: row.title,
      url: row.url	
    })), 
    [rows]
  );

  const [widgets, setWidgets] = useState<IWidgetItem[]>(initialWidgetsState);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setWidgets(initialWidgetsState);
  }, [initialWidgetsState]);

  const token = useSelector(
    (state: RootState) => state.authReducer.token as string
  );

  useEffect(() => {
    if (token) {
      socketClient.joinBuyingWidgets(token);
  
      socketClient.subscribeOnPurchasediWidget(token, (data) => {
        console.log('purchased - ', data);
  
        enqueueSnackbar(
          `Widget ${data?.title}, price: ${data?.price} is bought`, 
          { 
            variant: 'success', 
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            } 
          }
        );
      });
    }
  
    return () => {
      socketClient.leftBuyingWidgets(token);
      socketClient.unsubscribeOnPurchasedWidget(token);
    };
    }, []);

  return (
    isVideoPlaying 
      ? <WidgetsWithLiveStream
          playbackURL={liveStream?.playbackUrl as string} 
          widgets={widgets}
          setWidgets={setWidgets} 
          count={count} 
          page={page} 
          pageSize={pageSize}
          isLoading={isLoading}
          isError={isError}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage} 
        />
      : <Widgets 
          id={id as string} 
          page={page} 
          rows={rows} 
          pageSize={pageSize} 
          count={count} 
          setPage={setPage}
          isLoading={isLoading}
          isError={isError} 
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage} 
        />    
  );
};

export default ChannelPage;
