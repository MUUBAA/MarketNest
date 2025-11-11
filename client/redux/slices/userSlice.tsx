import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "./loginUser";
import { createUser } from "../thunk/user";


interface User {
    id: number;
    name: string;
    email: string;
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
}

interface UserState {
    userProfile: UserData | null;
    UserAccount: UserResponse | null;
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userProfile: null,
    UserAccount: null,
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfile(state, action: PayloadAction<UserData | null>) {
            state.userProfile = action.payload;
        },
        resetUserProfile: (state) => {
            state.userProfile = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Extra reducers can be added here for handling async thunks
    },
});

export const { setUserProfile, resetUserProfile } = userSlice.actions;

export default userSlice.reducer;