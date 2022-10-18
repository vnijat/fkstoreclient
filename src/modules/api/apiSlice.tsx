// Need to use the React-specific entry point to import createApi
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { itemQueryParams, ItemResponse } from '../../types/ItemsQuery';
import { RootState } from '../redux/store';

// Define a service using a base URL and expected endpoints

const asyncFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const baseUrl = (api.getState() as RootState).appStateSlicer.url;
    const rawBaseQuery = fetchBaseQuery({ baseUrl });
    return rawBaseQuery(args, api, extraOptions);
};

export const InventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: asyncFetchBaseQuery,
    endpoints: (build) => ({
        getAllItems: build.query<ItemResponse, undefined | itemQueryParams>({
            providesTags: ['items'],
            query: (filter) => {
                return {
                    url: '/items/',
                    params: filter,
                };
            },
        }),
        getItemInputs: build.query<undefined, any>({
            providesTags: ['itemInputs'],
            query: () => {
                return {
                    url: '/items/inputs'
                };
            }
        }),
        deleteManyItems: build.mutation<undefined, { Ids: number[]; }>({
            query: (Ids) => {
                return {
                    url: '/items/',
                    body: Ids,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['items']
        }),
        getItemQrCode: build.query<undefined, number>({
            query: (id) => {
                return {
                    url: `/items/qr/${id}`,
                };
            },
            providesTags: ['qrCode']
        }),
        addItem: build.mutation<undefined, any>({
            query: (body) => {
                return {
                    url: '/items/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['items']
        }),
        editItem: build.mutation<undefined, any>({
            query: (body) => {
                return {
                    url: `/items/${body.id}`,
                    body: body,
                    method: 'PATCH'
                };
            },
            invalidatesTags: ['items']
        }),
    }),
    tagTypes: ['items', 'itemInputs', 'itemOptions', 'clients', 'qrCode']
});

export const {
    useGetAllItemsQuery,
    useDeleteManyItemsMutation,
    useAddItemMutation,
    useGetItemInputsQuery,
    useEditItemMutation,
    useGetItemQrCodeQuery
} = InventoryApi;
