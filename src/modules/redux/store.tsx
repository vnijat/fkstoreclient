import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useDispatch } from 'react-redux';
import { InventoryApi } from '../api/apiSlice';
import appStateSlicer from './appStateSlicer';
import itemsSlicer from './itemsSlicer';
import menuSlicer from './menuSlicer';
import itemQuerySlicer from './itemQuerySlicer';
import filterSlicer from './filterSlicer';
import itemOptions from './itemOptions';
import clientQuery from './clientsQuerySlicer';
import clientSlicer from './clientsSlicer';
import projectQuery from './projectQuerySlicer';
import projectSlicer from './projectSlicer';

export const store = configureStore({
    reducer: {
        [InventoryApi.reducerPath]: InventoryApi.reducer,
        appStateSlicer,
        menuSlicer,
        itemQuerySlicer,
        itemsSlicer,
        itemOptions,
        filterSlicer,
        clientQuery,
        clientSlicer,
        projectQuery,
        projectSlicer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(InventoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);

export default store;