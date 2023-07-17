import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user.type";

interface IUserState {
    user: Pick<IUser, "email" | "role" | "author">;
}

const initialState: IUserState = {
    user: {} as Pick<IUser, "email" | "role" | "author">,
};

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (
            state,
            action: PayloadAction<Pick<IUser, "email" | "role" | "author">>
        ) => {
            state.user = action.payload;
        },
    },
});

export const { getUser } = usersSlice.actions;

export default usersSlice.reducer;
