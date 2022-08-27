// Need to use the React-specific entry point to import createApi
import {AddBarcode} from '../../types/barcode';
import {AddCategory} from '../../types/category';
import {AddColor} from '../../types/color';
import {AddLabel} from '../../types/label';
import {AddLocation} from '../../types/location';
import {AddStore} from '../../types/store';
import {AddSupplier} from '../../types/supplier';
import {AddUnit} from '../../types/unit';
import {InventoryApi} from './apiSlice';

export const ItemOptionsPostApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    addUnit: build.mutation<undefined, AddUnit>({
      query: body => {
        return {
          url: '/unit/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['itemInputs'],
    }),
    addSupplier: build.mutation<undefined, AddSupplier>({
      query: body => {
        return {
          url: '/supplier/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['itemInputs'],
    }),
    addCategory: build.mutation<undefined, AddCategory>({
      query: body => {
        return {
          url: '/category/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['itemInputs'],
    }),
    addColor: build.mutation<undefined, AddColor>({
      query: body => {
        return {
          url: '/color/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['itemInputs'],
    }),
    addLabel: build.mutation<undefined, AddLabel>({
      query: body => {
        return {
          url: '/label/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['itemInputs'],
    }),
    addLocation: build.mutation<undefined, AddLocation>({
      query: body => {
        return {
          url: '/location/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['itemInputs'],
    }),
    addStore: build.mutation<undefined, AddStore>({
      query: body => {
        return {
          url: '/store/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['itemInputs'],
    }),
    addBarcode: build.mutation<undefined, AddBarcode>({
      query: body => {
        return {
          url: '/barcode/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['itemInputs'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddColorMutation,
  useAddLabelMutation,
  useAddCategoryMutation,
  useAddStoreMutation,
  useAddUnitMutation,
  useAddSupplierMutation,
  useAddLocationMutation,
  useAddBarcodeMutation,
} = ItemOptionsPostApi;
