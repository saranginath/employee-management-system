import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  sideBarOpen: boolean;
}
const initialState: UIState = {
  sideBarOpen: true,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
    openSideBar(state) {
      state.sideBarOpen = true;
    },
    closeSideBar(state) {
      state.sideBarOpen = false;
    },
  },
});
export const { toggleSideBar, openSideBar, closeSideBar } = uiSlice.actions;
export default uiSlice;
