import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../../../libs/storage";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";

export const Theme = {
  LIGHT: "light",
  DARK: "dark",
};

export const Device = {
  MOBILE: "mobile",
  DESKTOP: "desktop",
};

type ConfigState = {
  theme: (typeof Theme)[keyof typeof Theme];
  device: (typeof Device)[keyof typeof Device];
  isNavActive: boolean;
  permissions: any[];
};

const initialState: ConfigState = getFromStorage("config") || {
  theme: Theme.DARK,
  device: Device.DESKTOP,
  isNavActive: true,
  permissions: [],
};

export const fetchPermissionsList = newAsyncThunk(
  "/config/list/permissions",
  ApiType.GET,
);

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    },
    setDevice: (state, action) => {
      state.device = action.payload ? Device.MOBILE : Device.DESKTOP;
    },
    toggleNavigation: (state) => {
      state.isNavActive = !state.isNavActive;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPermissionsList.fulfilled, (state, action) => {
      state.permissions = action.payload;
    });
  },
});

export const { setTheme, setDevice, toggleNavigation } = configSlice.actions;

export default configSlice.reducer;
