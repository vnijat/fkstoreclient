import {IsingelSelectData} from '../../containers/customPicker';
import {AddClient} from '../../types/client';
import {ClientsQueryParams, ClientsResponse} from '../../types/clientsQuery';
import {InventoryApi} from './apiSlice';

export const ClientsApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    getClients: build.query<ClientsResponse, ClientsQueryParams>({
      providesTags: ['clients'],
      query: filter => {
        return {
          url: '/client/all',
          params: filter,
        };
      },
    }),
    addClient: build.mutation<ClientsResponse, AddClient>({
      invalidatesTags: ['clients'],
      query: body => {
        return {
          url: '/client/',
          body: body,
          method: 'POST',
        };
      },
    }),
    deleteClient: build.mutation<undefined, number>({
      invalidatesTags: ['clients'],
      query: clientId => {
        return {
          url: `/client/${clientId}`,
          method: 'DELETE',
        };
      },
    }),
    editClient: build.mutation<ClientsResponse, {body: AddClient; id: number}>({
      invalidatesTags: ['clients'],
      query: ({body, id}) => {
        return {
          url: `/client/${id}`,
          body: body,
          method: 'PATCH',
        };
      },
    }),
    getClientForPicker: build.query<{client: {id: number; label: string}[]},undefined>({
      providesTags: ['clientForPicker'],
      query: () => {
        return {
          url: '/client/data/picker',
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetClientsQuery,
  useAddClientMutation,
  useDeleteClientMutation,
  useEditClientMutation,
  useGetClientForPickerQuery,
} = ClientsApi;
