import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isInitialized: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isInitialized: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: User;
                accessToken: string;
            }>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        setAccessToken: (
            state,
            action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
        },
        setInitialized: (state) => {
            state.isInitialized = true;
        }
    }
});

export const {
    setCredentials,
    setAccessToken,
    logout, setInitialized,
} = authSlice.actions;


export default authSlice.reducer;