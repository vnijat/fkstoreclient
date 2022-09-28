import {InventoryApi} from './apiSlice';

export const ClientsApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    getClients: build.query<undefined, undefined>({
      providesTags: ['clients'],
      query: filter => {
        return {
          url: '/client/all',
          params: filter,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {useGetClientsQuery} = ClientsApi;
