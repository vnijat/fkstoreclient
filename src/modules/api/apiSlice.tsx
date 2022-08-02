// Need to use the React-specific entry point to import createApi
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { AddBarcode } from '../../types/barcode';
import { AddCategory } from '../../types/category';
import { AddColor } from '../../types/color';
import { AddItemInterface } from '../../types/Item';
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

export const inventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: asyncFetchBaseQuery,
    endpoints: (build) => ({
        getAllItems: build.query<Data<Item>, undefined | QueryParams>({
            providesTags: ['Items'],
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
            invalidatesTags: ['Items']
        }),
        addItem: build.mutation<undefined, any>({
            query: (body) => {
                return {
                    url: '/items/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['Items']
        }),
        addUnit: build.mutation<undefined, AddUnit>({
            query: (body) => {
                return {
                    url: '/unit/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['itemInputs']
        }),
        addSupplier: build.mutation<undefined, AddSupplier>({
            query: (body) => {
                return {
                    url: '/supplier/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['itemInputs']
        }),
        addCategory: build.mutation<undefined, AddCategory>({
            query: (body) => {
                return {
                    url: '/category/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['itemInputs']
        }),
        addColor: build.mutation<undefined, AddColor>({
            query: (body) => {
                return {
                    url: '/color/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['itemInputs']
        }),
        addLabel: build.mutation<undefined, AddLabel>({
            query: (body) => {
                return {
                    url: '/label/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['itemInputs']
        }),
        addLocation: build.mutation<undefined, AddLocation>({
            query: (body) => {
                return {
                    url: '/location/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['itemInputs']
        }),
        addStore: build.mutation<undefined, AddStore>({
            query: (body) => {
                return {
                    url: '/store/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['itemInputs']
        }),
        addBarcode: build.mutation<undefined, AddBarcode>({
            query: (body) => {
                return {
                    url: '/barcode/',
                    body: body,
                    method: 'POST'
                };
            },
            invalidatesTags: ['itemInputs']
        }),
    }),
    tagTypes: ['Items', 'itemInputs']
});

export const {
    useGetAllItemsQuery,
    useDeleteManyItemsMutation,
    useAddItemMutation,
    useGetItemInputsQuery,
    useAddColorMutation,
    useAddLabelMutation,
    useAddCategoryMutation,
    useAddStoreMutation,
    useAddUnitMutation,
    useAddSupplierMutation,
    useAddLocationMutation,
    useAddBarcodeMutation
} = inventoryApi;
