import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import { getFromStorage } from "../../../libs/storage";

export const createPermission = newAsyncThunk(
  "/auth/permission/create",
  ApiType.POST,
);
export const fetchAllPermissions = newAsyncThunk(
  "/auth/permission/fetchall",
  ApiType.GET,
);
export const deletePermission = newAsyncThunk(
  "/auth/permission/delete",
  ApiType.DEL,
);

type PermissionState = {
  permissions: any[];
  showPermissionsLoading: boolean;
};

const initialState: PermissionState = getFromStorage("permission") || {
  permissions: [],
  showPermissionsLoading: false,
};

const permissionSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPermissions.pending, (state) => {
        state.showPermissionsLoading = true;
      })
      .addCase(fetchAllPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload;
        state.showPermissionsLoading = false;
      })
      .addCase(fetchAllPermissions.rejected, (state) => {
        state.showPermissionsLoading = false;
      });
  },
});

export const {} = permissionSlice.actions;

export default permissionSlice.reducer;
