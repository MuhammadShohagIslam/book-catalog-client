import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user.type";

interface IUserState {
    user: IUser;
}

const initialState: IUserState = {
    user: {} as IUser,
};

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (
            state,
            action: PayloadAction<IUser>
        ) => {
            state.user = action.payload;
        },
    },
});

export const { getUser } = usersSlice.actions;

export default usersSlice.reducer;
