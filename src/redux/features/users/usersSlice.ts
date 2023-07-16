import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user.type";

interface IUserState {
    user: Pick<IUser, "email" | "role">;
}

const initialState: IUserState = {
    user: {} as Pick<IUser, "email" | "role">,
};

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (
            state,
            action: PayloadAction<Pick<IUser, "email" | "role">>
        ) => {
            state.user = action.payload;
        },
    },
});

export const { getUser } = usersSlice.actions;

export default usersSlice.reducer;
