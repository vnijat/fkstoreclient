import {Item} from '../../types/item';
import {
  AddPurchaseDto,
  PurchaseItem,
  PurchaseQueryParams,
  PurchaseQueryResponse,
} from '../../types/purchase';
import {InventoryApi} from './apiSlice';

export const PurchaseApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    getPurchases: build.query<PurchaseQueryResponse, PurchaseQueryParams>({
      providesTags: ['purchases'],
      query: params => {
        return {
          url: '/purchase/all',
          params: params,
        };
      },
    }),
    addPurchase: build.mutation<undefined, AddPurchaseDto>({
      invalidatesTags: [
        'purchases',
        'items',
        'item',
        'itemForPurchase',
        'inventoryTrackData',
      ],
      query: body => {
        return {
          url: '/purchase/',
          body: body,
          method: 'POST',
        };
      },
    }),
    deletePurchase: build.mutation<undefined, number>({
      invalidatesTags: ['purchases', 'inventoryTrackData'],
      query: purchaseId => {
        return {
          url: `/purchase/${purchaseId}`,
          method: 'DELETE',
        };
      },
    }),
    editPurchase: build.mutation<undefined, {body: any; id: number}>({
      invalidatesTags: [
        'purchases',
        'items',
        'item',
        'itemForOrder',
        'inventoryTrackData',
      ],
      query: ({body, id}) => {
        return {
          url: `/purchase/${id}`,
          body: body,
          method: 'PATCH',
        };
      },
    }),
    getItemForPurchase: build.query<Item[], string>({
      providesTags: ['itemForPurchase'],
      query: value => {
        return {
          url: `/purchase/item/${value}`,
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
  useGetItemForPurchaseQuery,
} = PurchaseApi;
