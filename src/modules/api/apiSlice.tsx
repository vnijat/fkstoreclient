import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {ItemOptionForInputs, ItemQueryParams, ItemResponse, ItemResponseFull} from '../../types/item';
import {RootState} from '../redux/store';
import {ApiTags} from './api.tags';


const asyncFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const baseUrl = (api.getState() as RootState).configs.apiURL;
    const rawBaseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders(headers, api) {
            const tokens = (api.getState() as RootState).user.tokens;
            if (tokens?.accessToken) {
                headers.set('Authorization', `Bearer ${tokens.accessToken}`);
            }
            return headers;
        },
    });
    return rawBaseQuery(args, api, extraOptions);
};

export const InventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: asyncFetchBaseQuery,
    endpoints: (build) => ({
        getAllItems: build.query<ItemResponse, undefined | ItemQueryParams>({
            providesTags: ['items'],
            query: (filter) => {
                return {
                    url: '/item/all',
                    params: filter,
                };
            },
        }),
        getItemCodeSuggestions: build.query<{lastCodes: {code: string;}[]; suggestedCodes: {code: string;}[];}, undefined | {categoryId: number; itemCode: string;}>({
            providesTags: ['codeSuggestions'],
            query: (codeParams) => {
                return {
                    url: '/item/code/suggestions',
                    params: codeParams,
                };
            },
        }),
        getItem: build.query<ItemResponseFull, number | undefined>({
            providesTags: ['item'],
            query: (id) => {
                return {
                    url: `/item/full/${id}`,
                };
            },
        }),
        getItemInputs: build.query<ItemOptionForInputs, undefined>({
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
            invalidatesTags: ['items', 'itemForOrder', 'item', 'codeSuggestions']
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
            invalidatesTags: ['items', 'codeSuggestions', 'itemForOrder']
        }),
        editItem: build.mutation<undefined, {body: any; id: number;}>({
            query: ({body, id}) => {
                return {
                    url: `/item/${id}`,
                    body: body,
                    method: 'PATCH'
                };
            },
            invalidatesTags: ['items', 'item', 'itemForOrder']
        }),
        printBarcode: build.mutation<undefined, {itemId: number;}>({
            query: (body) => {
                return {
                    url: `/item/print/barcode/`,
                    body: body,
                    method: 'POST'
                };
            },
        }),
    }),
    tagTypes: ApiTags
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
