import {Item} from '../../types/ItemsQuery';
import {OrderQueryResponse, OrdersQueryParams} from '../../types/projectOrder';
import {InventoryApi} from './apiSlice';

export const OrdersApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    getOrders: build.query<OrderQueryResponse, undefined | OrdersQueryParams>({
      providesTags: ['orders'],
      query: filter => {
        return {
          url: '/order/all',
          params: filter,
        };
      },
    }),
    itemForOrder: build.query<Item[], string>({
      providesTags: ['itemForOrder'],
      query: searchValue => {
        return {
          url: `/order/item/${searchValue}`,
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
  useItemForOrderQuery,
} = OrdersApi;
