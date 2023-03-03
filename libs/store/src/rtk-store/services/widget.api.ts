import { FieldValues } from 'react-hook-form';
import { ListWithTotals, WidgetDto, WidgetFilter } from '@boilerplate/shared';
import { mainApi } from './main-api.api';


export const widgetEndpoints = mainApi.injectEndpoints({
  endpoints: (builder) => ({
	getWidgets: builder.query<
	  ListWithTotals<WidgetDto>, 
	  { channelId: string, filter?: WidgetFilter }
	>({
	  query: data => ({
		url: `/widgets/${data['channelId']}`,
		params: {
		  page: data['filter']?.page,
		  pageSize: data['filter']?.pageSize
		}
	  }),
      providesTags: (result, error, page) =>
        result
          ? [
              ...result.list.map(({ id }) => ({ type: 'Widget' as const, id })),
              { type: 'Widget', id: 'PARTIAL-LIST' }
            ]
          : [
              { type: 'Widget', id: 'PARTIAL-LIST' }
            ]
	}),
	addNewWidget: builder.mutation<WidgetDto, FieldValues>({
	  query: data => ({
		url: '/widgets',
		method: 'POST',
		body: data
	  }),
	  invalidatesTags: [{ type: 'Widget', id: 'PARTIAL-LIST' }]
	}),
	updateWidget: builder.mutation<WidgetDto, FieldValues>({
	  query: data => ({
		url: `/widgets/${data['id']}`,
		method: 'PATCH',
		body: data
	  }),
	  invalidatesTags: (result, error, arg) => [
		{ type: 'Widget', id: arg['id'] }
	  ]
	}),
	deleteWidget: builder.mutation<void, { [fieldName: string]: string }>({
	  query: data => ({
		url: `/widgets/${data['widgetId']}`,
		method: 'DELETE',
		body: data
	  }),
	  invalidatesTags: (result, error, arg) => [
        { type: 'Widget', id: arg['id'] },
        { type: 'Widget', id: 'PARTIAL-LIST' }
      ]
	})
  })
});

export const { 
  useGetWidgetsQuery, 
  useAddNewWidgetMutation,
  useUpdateWidgetMutation,
  useDeleteWidgetMutation
} = widgetEndpoints;
