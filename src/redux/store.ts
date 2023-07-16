/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/usersSlice";

import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/apiSlice";

// Local persist storage configuration
const persistConfig = {
    key: "root",
    version: 1,
    storage: storage,
    blacklist: [baseApi.reducerPath],
};

// Session storage configuration
const sessionConfig = {
    key: "session",
    version: 1,
    storage: storageSession,
};

// Combine all the persist reducers (drop all reducers that you would like to store in localStorage)
const rootPersistReducers = combineReducers({
    user: userReducer,
});

// Combine all the session reducers (drop all reducers that you would like to store in session storage)
const sessionReducers = combineReducers({
    user: userReducer,
});

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootPersistReducers);

// Session reducer
const sessionReducer = persistReducer(sessionConfig, sessionReducers);

// Store configuration
const store = configureStore({
    reducer: {
        local: persistedReducer,
        session: sessionReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
