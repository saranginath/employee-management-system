import { combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";

import storage from "./storage";

import uiReducer from "../features/ui/uiSlice";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";

import { baseApi } from "../api/baseApi";

const authPersistConfig = {
  key: "auth",

  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const rootReducer = combineReducers({
  ui: uiReducer,

  theme: themeReducer,

  auth: persistedAuthReducer,

  [baseApi.reducerPath]: baseApi.reducer,
});
