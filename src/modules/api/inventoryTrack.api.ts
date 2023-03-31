import { InventoryTrackQueryParams, InventoryTrackResponse } from '../../types/inventoryTrack';
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
  }),
  overrideExisting: true,
});

export const {useGetTrackDataQuery} = inventoryTrackApi;
