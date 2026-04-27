import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../../../libs/storage";

export const Theme = {
  LIGHT: "dark",
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
};

const initialState: ConfigState = getFromStorage("config") || {
  theme: Theme.DARK,
  device: Device.DESKTOP,
  isNavActive: true,
};

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
});

export const { setTheme, setDevice, toggleNavigation } = configSlice.actions;

export default configSlice.reducer;
