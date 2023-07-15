import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/usersSlice";
import { baseApi } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
