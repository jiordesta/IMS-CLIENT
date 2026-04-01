import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import type { InventoryData } from "../../../libs/types";
import { getFromStorage } from "../../../libs/storage";

type InventoryState = {
	items: InventoryData[];
	showLoading: boolean;
};

export const fetchAllItems = newAsyncThunk("/inventory/fetchall", ApiType.GET);

const initialState: InventoryState = getFromStorage("inventory") || {
	items: [],
	showLoading: false,
};

const inventorySlice = createSlice({
	name: "inventory",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllItems.pending, (state) => {
				state.showLoading = true;
			})
			.addCase(fetchAllItems.fulfilled, (state, action) => {
				state.items = action.payload;
				state.showLoading = false;
			})
			.addCase(fetchAllItems.rejected, (state) => {
				state.showLoading = false;
			});
	},
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
