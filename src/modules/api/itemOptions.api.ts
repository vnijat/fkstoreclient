import {IItemOptions} from '../redux/itemOptions';
import {InventoryApi} from './apiSlice';

export const ItemOptionsApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    addOption: build.mutation<
      undefined,
      {
        optionName: keyof IItemOptions['options'];
        body: IItemOptions['options'][keyof IItemOptions['options']];
      }
    >({
      query: ({optionName, body}) => {
        return {
          url: `/${optionName}/`,
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['itemInputs'],
    }),
    editOption: build.mutation<
      undefined,
      {
        id: number;
        optionName: keyof IItemOptions['options'] | undefined;
        body: IItemOptions['options'][keyof IItemOptions['options']];
      }
    >({
      query: ({id, body, optionName}) => {
        return {
          url: `/${optionName}/${id}`,
          body: body,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['itemInputs', 'itemOptions', 'items', 'item'],
    }),
    getOption: build.query<
      undefined,
      any | {optionName: keyof IItemOptions['options']; id: number}
    >({
      providesTags: ['itemOptions'],
      query: ({optionName, id}) => {
        return {
          url: `/${optionName}/${id}`,
        };
      },
    }),
  }),

  overrideExisting: true,
});

export const {useAddOptionMutation, useEditOptionMutation, useGetOptionQuery} =
  ItemOptionsApi;
