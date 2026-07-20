import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{
            user: User, accessToken: string;
            refreshToken: string
        }>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken

        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null
        }
    }

})
export const { setCredentials, logout } = authSlice.actions;

export default authSlice;