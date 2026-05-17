import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import { getFromStorage } from "../../../libs/storage";

export const createRole = newAsyncThunk("/auth/role/create", ApiType.POST);
export const fetchAllRoles = newAsyncThunk("/auth/role/fetchall", ApiType.GET);
export const fetchRolePermissions = newAsyncThunk(
  "/auth/role/permissions",
  ApiType.GET,
);

type RoleState = {
  roles: any[];
  showRolesLoading: boolean;
};

const initialState: RoleState = getFromStorage("role") || {
  shops: [],
  showRolesLoading: false,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoles.pending, (state) => {
        state.showRolesLoading = true;
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.showRolesLoading = false;
      })
      .addCase(fetchAllRoles.rejected, (state) => {
        state.showRolesLoading = false;
      });
  },
});

export const {} = roleSlice.actions;

export default roleSlice.reducer;
