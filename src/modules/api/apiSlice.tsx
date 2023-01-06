// Need to use the React-specific entry point to import createApi
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { itemQueryParams, ItemResponse, itemResponseFull } from '../../types/ItemsQuery';
import { RootState } from '../redux/store';

// Define a service using a base URL and expected endpoints

const asyncFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const baseUrl = (api.getState() as RootState).configs.apiURL;
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
                    url: '/item/all',
                    params: filter,
                };
            },
        }),
        getItemCodeSuggestions: build.query<{ lastCodes: { code: string; }[]; suggestedCodes: { code: string; }[]; }, undefined | { categoryId: number; itemCode: string; }>({
            providesTags: ['codeSuggestions'],
            query: (codeParams) => {
                return {
                    url: '/item/code/suggestions',
                    params: codeParams,
                };
            },
        }),
        getItem: build.query<itemResponseFull, number | undefined>({
            providesTags: ['item'],
            query: (id) => {
                return {
                    url: `/item/full/${id}`,
                };
            },
        }),
        getItemInputs: build.query<undefined, any>({
            providesTags: ['itemInputs'],
            query: () => {
                return {
                    url: '/item/inputs'
                };
            }
        }),
        deleteManyItems: build.mutation<undefined, number[]>({
            query: (Ids) => {
                return {
                    url: '/item/',
                    body: Ids,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['items']
        }),
        getItemQrCode: build.query<undefined, number>({
            query: (id) => {
                return {
                    url: `/item/qr/${id}`,
                };
            },
            providesTags: ['qrCode']
        }),
        addItem: build.mutation<undefined, any>({
            query: (body) => {
                return {
                    url: '/item/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['items', 'codeSuggestions']
        }),
        editItem: build.mutation<undefined, { body: any; id: number; }>({
            query: ({ body, id }) => {
                return {
                    url: `/item/${id}`,
                    body: body,
                    method: 'PATCH'
                };
            },
            invalidatesTags: ['items', 'item']
        }),
        printBarcode: build.mutation<undefined, { itemId: number; }>({
            query: (body) => {
                return {
                    url: `/item/print/barcode/`,
                    body: body,
                    method: 'POST'
                };
            },
        }),
    }),
    tagTypes: [
        'items',
        'itemInputs',
        'itemOptions',
        'clients',
        'qrCode',
        'item',
        'projects',
        'clientForPicker',
        'orders',
        'codeSuggestions',
        'itemForOrder'
    ]
});

export const {
    useGetAllItemsQuery,
    useDeleteManyItemsMutation,
    useAddItemMutation,
    useGetItemInputsQuery,
    useEditItemMutation,
    useGetItemQrCodeQuery,
    useGetItemQuery,
    useGetItemCodeSuggestionsQuery,
    usePrintBarcodeMutation
} = InventoryApi;
