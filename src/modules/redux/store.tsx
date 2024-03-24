import {useDispatch} from 'react-redux';
import {combineReducers, configureStore, Store} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLUSH, PAUSE, PERSIST, PersistConfig, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {InventoryApi} from '../api/apiSlice';
import appStateSlicer from './appStateSlicer';
import warehouseFiltersSlicer from './wareHouseFiltersSlicer';
import itemOptions from './itemOptions';
import clientSlicer from './clientsSlicer';
import projectSlicer from './projectSlicer';
import configsSlicer from './configsSlicer';
import ordersSlicer from './orderSlicer';
import purchaseSlicer from './purchaseSlicer';
import tableConfigsSlicer from './tableConfigs';
import inventorySlicer from './inventorySlicer';
import itemsSlicer from './itemsSlicer';
import userSlicer from './userSlicer';


const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage: AsyncStorage,
    version: 2,
    whitelist: ['configs', 'tableConfigs', 'user'],
    stateReconciler: autoMergeLevel2,
    migrate: (state) => {
        console.log("REDUX-PERSIST: Migrations Running");
        return Promise.resolve(state);
    }
};

const rootReducer = combineReducers(
    {
        [InventoryApi.reducerPath]: InventoryApi.reducer,
        appStateSlicer,
        itemsSlicer,
        itemOptions,
        clientSlicer,
        projectSlicer,
        ordersSlicer,
        purchaseSlicer,
        inventorySlicer,
        warehouseFiltersSlicer,
        configs: configsSlicer,
        tableConfigs: tableConfigsSlicer,
        user: userSlicer
    }
);

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,],
                warnAfter: 150,
            },
            immuatableCheck: false

        }).concat(InventoryApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);


export const persistor = persistStore(store);


export default store;