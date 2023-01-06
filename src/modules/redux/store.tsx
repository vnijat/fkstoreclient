import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
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
import configsSlicer from './configsSlicer';
import ordersQueryParams from './orderQuerySlicer';
import ordersSlicer from './orderSlicer';
import { FLUSH, PAUSE, PERSIST, PersistConfig, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['configs']
};

const rootReducer = combineReducers(
    {
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
        ordersQueryParams,
        ordersSlicer,
        configs: configsSlicer
    }
);

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                warnAfter: 128
            },
        }).concat(InventoryApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);


export const persistor = persistStore(store);


export default store;