import {IsingelSelectData} from '../../containers/customPicker';
import {AddClient} from '../../types/client';
import {ClientsQueryParams, ClientsResponse} from '../../types/clientsQuery';
import {InventoryApi} from './apiSlice';

export const OrdersApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    getOrders: build.query<undefined, undefined>({
      providesTags: ['orders'],
      query: filter => {
        return {
          url: '/order/all',
          params: filter,
        };
      },
    }),
    addOrder: build.mutation<undefined, undefined>({
      invalidatesTags: ['orders'],
      query: body => {
        return {
          url: '/order/',
          body: body,
          method: 'POST',
        };
      },
    }),
    deleteOrder: build.mutation<undefined, number>({
      invalidatesTags: ['orders'],
      query: clientId => {
        return {
          url: `/order/${clientId}`,
          method: 'DELETE',
        };
      },
    }),
    editOrder: build.mutation<undefined, {body: any; id: number}>({
      invalidatesTags: ['orders'],
      query: ({body, id}) => {
        return {
          url: `/order/${id}`,
          body: body,
          method: 'PATCH',
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useEditOrderMutation,
  useDeleteOrderMutation,
} = OrdersApi;
