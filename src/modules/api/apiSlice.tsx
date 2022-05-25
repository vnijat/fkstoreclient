// Need to use the React-specific entry point to import createApi
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { AddItemInterface } from '../../types/addItem';
import { Data, Item, QueryParams } from '../../types/ItemsQuery';
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
        })
    }),
    tagTypes: ['Items', 'itemInputs']
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllItemsQuery, useDeleteManyItemsMutation, useAddItemMutation, useGetItemInputsQuery } = inventoryApi;
