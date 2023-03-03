import { FieldValues } from 'react-hook-form';
import { 
  ListWithTotals, 
  ChannelDto, 
  ChannelFilter, 
  StreamPlaybackDto 
} from '@boilerplate/shared';
import { mainApi } from './main-api.api';


export const channelEndpoints = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query<ListWithTotals<ChannelDto>, ChannelFilter>({
      query: params => ({
        url: '/channels',
        params
      }),
      providesTags: (result, error, page) =>
        result
          ? [
              ...result.list.map(({ id }) => ({ type: 'Channel' as const, id })),
              { type: 'Channel', id: 'PARTIAL-LIST' },
            ]
          : [
              { type: 'Channel', id: 'PARTIAL-LIST' }
            ]
    }),
    getChannelById: builder.query<ChannelDto, string>({
      query: id => `/channels/${id}`,
      providesTags: (result, error, id) => [{ type: 'Channel', id }]
    }),
    getLiveStream: builder.query<StreamPlaybackDto, string>({
      query: id => `/channels/${id}/live_stream`,
      providesTags: (result, error, id) => [{ type: 'Channel', id }]
    }),
    addNewChannel: builder.mutation<ChannelDto, FieldValues>({
      query: data => ({
        url: '/channels',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'Channel', id: 'PARTIAL-LIST' }]
    }),
    updateChannel: builder.mutation<ChannelDto, FieldValues>({
      query: data => ({
        url: `/channels/${data['id']}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Channel', id: arg['id'] }
      ]
    }),
    deleteChannel: builder.mutation<void, string>({
      query: id => ({
        url: `/channels/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Channel', id },
        { type: 'Channel', id: 'PARTIAL-LIST' }
      ],
    })
  })
});

export const {
  useGetChannelsQuery,
  useGetChannelByIdQuery,
  useGetLiveStreamQuery,
  useAddNewChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation
} = channelEndpoints;
