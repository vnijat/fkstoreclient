import {AddPurchaseDto, PurchaseQueryParams, PurchaseQueryResponse} from '../../types/purchase';
import {InventoryApi} from './apiSlice';

export const PurchaseApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    getPurchases: build.query<PurchaseQueryResponse, undefined | PurchaseQueryParams>({
      providesTags: ['purchases'],
      query: params => {
        return {
          url: '/purchase/all',
          params: params,
        };
      },
    }),
    addPurchase: build.mutation<undefined,  AddPurchaseDto>({
      invalidatesTags: ['purchases', 'items', 'item', 'itemForOrder'],
      query: body => {
        return {
          url: '/purchase/',
          body: body,
          method: 'POST',
        };
      },
    }),
    deletePurchase: build.mutation<undefined, number>({
      invalidatesTags: ['orders'],
      query: purchaseId => {
        return {
          url: `/purchase/${purchaseId}`,
          method: 'DELETE',
        };
      },
    }),
    editPurchase: build.mutation<undefined, {body: any; id: number}>({
      invalidatesTags: ['purchases', 'items', 'item', 'itemForOrder'],
      query: ({body, id}) => {
        return {
          url: `/purchase/${id}`,
          body: body,
          method: 'PATCH',
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useEditPurchaseMutation,
  useGetPurchasesQuery,
  useDeletePurchaseMutation,
  useAddPurchaseMutation,
} = PurchaseApi;
