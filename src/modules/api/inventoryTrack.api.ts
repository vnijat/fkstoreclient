import {InventoryTrackQueryParams, InventoryTrackResponse, InventoryTransfersParams, InventoryTransfersResponse} from '../../types/inventory';
import {InventoryApi} from './apiSlice';

export const inventoryTrackApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    getTrackData: build.query<InventoryTrackResponse, InventoryTrackQueryParams>({
      providesTags: ['inventoryTrackData'],
      query: params => {
        // console.log("inventoryTrackApi->",params)
        return {
          url: '/inventory/track',
          params: params,
        };
      },
    }),
    getTransfersData: build.query<InventoryTransfersResponse, InventoryTransfersParams>({
      providesTags: ['inventoryTransfers'],
      query: params => {
        return {
          url: '/inventory/transfers',
          params: params,
        };
      }
    })
  }),
  overrideExisting: true,
});

export const {
  useGetTrackDataQuery,
  useGetTransfersDataQuery
} = inventoryTrackApi;
