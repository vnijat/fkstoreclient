import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useDispatch } from 'react-redux';
import { InventoryApi } from '../api/apiSlice';
import appStateSlicer from './appStateSlicer';
import itemsSlicer from './ItemsSlicer';
import menuSlicer from './menuSlicer';
import querySlicer from './querySlicer';
import filterSlicer from './filterSlicer';
import itemOptions from './itemOptions';
import clientQuery from './clientsQuerySlicer';

export const store = configureStore({
    reducer: {
        querySlicer,
        menuSlicer,
        appStateSlicer,
        itemsSlicer,
        filterSlicer,
        itemOptions,
        clientQuery,
        [InventoryApi.reducerPath]: InventoryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(InventoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);

export default store;