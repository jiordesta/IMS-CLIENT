import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";

export const createShop = newAsyncThunk("/shop/create", ApiType.POST);

export const fetchAllShops = newAsyncThunk("/shop/fetchall", ApiType.GET);

type ShopState = {
	shops: any[];
	showLoading: boolean;
};

const initialState: ShopState = {
	shops: [],
	showLoading: false,
};

const shopSlice = createSlice({
	name: "shop",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllShops.pending, (state) => {
				state.showLoading = true;
				// state = JSON.parse(localStorage.getItem("shop") || "");
			})
			.addCase(fetchAllShops.fulfilled, (state, action) => {
				state.shops = action.payload;
				state.showLoading = false;
				// localStorage.setItem("shop", JSON.stringify(state));
			})
			.addCase(fetchAllShops.rejected, (state) => {
				state.showLoading = false;
				// state = JSON.parse(localStorage.getItem("shop") || "");
			})
			.addCase(createShop.pending, (state) => {
				state.showLoading = true;
			})
			.addCase(createShop.fulfilled, (state, action) => {
				state.shops.push(action.payload);
				state.showLoading = false;
			})
			.addCase(createShop.rejected, (state) => {
				state.showLoading = false;
			});
	},
});

export const {} = shopSlice.actions;

export default shopSlice.reducer;
