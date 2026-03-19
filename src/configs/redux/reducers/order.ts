import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";

export const createOrder = newAsyncThunk("/order/create", ApiType.POST);

export const fetchOrdersByDate = newAsyncThunk(
	"/order/fetchbydate",
	ApiType.GET,
);

export const updateOrder = newAsyncThunk("/order/update", ApiType.PATCH);

type OrderState = {
	orders: any[];
	showLoading: boolean;
};

const initialState: OrderState = {
	orders: [],
	showLoading: false,
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrdersByDate.pending, (state) => {
				state.showLoading = true;
			})
			.addCase(fetchOrdersByDate.fulfilled, (state, action) => {
				state.orders = action.payload;
				state.showLoading = false;
			})
			.addCase(fetchOrdersByDate.rejected, (state) => {
				state.showLoading = false;
			});
	},
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
