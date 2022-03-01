import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useDispatch } from 'react-redux';
import { inventoryApi } from '../api/apiSlice';
import appStateSlicer from './appStateSlicer';
import itemsSlicer from './ItemsSlicer';
import menuSlicer from './menuSlicer';
import querySlicer from './querySlicer';

export const store = configureStore({
    reducer: {
        querySlicer,
        menuSlicer,
        appStateSlicer,
        itemsSlicer,
        [inventoryApi.reducerPath]: inventoryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(inventoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);

export default store;