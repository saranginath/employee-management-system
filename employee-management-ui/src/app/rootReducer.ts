import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from '../features/ui/uiSlice';
import themeReducer from '../features/theme/themeSlice';
import authReducer from '../features/auth/authSlice'
import { baseApi } from "../api/baseApi";
export const rootReducer = combineReducers({
    ui: uiReducer,
    theme: themeReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer
})