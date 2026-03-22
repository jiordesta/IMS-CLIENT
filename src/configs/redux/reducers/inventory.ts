import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import type { InventoryData } from "../../../libs/types";

type InventoryState = {
	items: InventoryData[];
	showLoading: boolean;
};

export const fetchAllItems = newAsyncThunk("/inventory/fetchall", ApiType.GET);

const initialState: InventoryState = {
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
				// state = JSON.parse(
				// 	localStorage.getItem("inventory") || "",
				// );
			})
			.addCase(fetchAllItems.fulfilled, (state, action) => {
				state.items = action.payload;
				state.showLoading = false;
				// localStorage.setItem(
				// 	"inventory",
				// 	JSON.stringify(state),
				// );
			})
			.addCase(fetchAllItems.rejected, (state) => {
				state.showLoading = false;
				// state = JSON.parse(
				// 	localStorage.getItem("inventory") || "",
				// );
			});
	},
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
