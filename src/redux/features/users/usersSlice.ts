import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user.type";

interface IUserState {
    user: IUser | undefined;
    wisList: Pick<IUser, "wishList"> | undefined;
    readSoonBook: Pick<IUser, "readSoonBook"> | undefined;
    completedReadBook: Pick<IUser, "completedReadBook"> | undefined;
}

const initialState: IUserState = {
    user: {} as IUser,
    wisList: {} as Pick<IUser, "wishList">,
    readSoonBook: {} as Pick<IUser, "readSoonBook">,
    completedReadBook: {} as Pick<IUser, "completedReadBook">,
};

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action: PayloadAction<IUser | undefined>) => {
            state.user = action.payload;
        },
        getWishList: (
            state,
            action: PayloadAction<Pick<IUser, "wishList"> | undefined>
        ) => {
            state.wisList = action.payload;
        },
        getReadSoonBook: (
            state,
            action: PayloadAction<Pick<IUser, "readSoonBook"> | undefined>
        ) => {
            state.readSoonBook = action.payload;
        },
        getCompletedReadBook: (
            state,
            action: PayloadAction<Pick<IUser, "completedReadBook"> | undefined>
        ) => {
            state.completedReadBook = action.payload;
        },
    },
});

export const { getUser, getCompletedReadBook, getWishList, getReadSoonBook } =
    usersSlice.actions;

export default usersSlice.reducer;
