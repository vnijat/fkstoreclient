// Need to use the React-specific entry point to import createApi
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { AddBarcode } from '../../types/barcode';
import { AddCategory } from '../../types/category';
import { AddColor } from '../../types/color';
import { Data, Item, QueryParams } from '../../types/ItemsQuery';
import { AddLabel } from '../../types/label';
import { AddLocation } from '../../types/location';
import { AddStore } from '../../types/store';
import { AddSupplier } from '../../types/supplier';
import { AddUnit } from '../../types/unit';
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
        getAllItems: build.query<Data<Item>, undefined | QueryParams>({
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
    }),
    tagTypes: ['items', 'itemInputs']
});

export const {
    useGetAllItemsQuery,
    useDeleteManyItemsMutation,
    useAddItemMutation,
    useGetItemInputsQuery,
} = InventoryApi;
