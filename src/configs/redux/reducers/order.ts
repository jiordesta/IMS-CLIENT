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
				// state = JSON.parse(localStorage.getItem("order") || "");
			})
			.addCase(fetchOrdersByDate.fulfilled, (state, action) => {
				state.orders = action.payload;
				state.showLoading = false;
				// localStorage.setItem("order", JSON.stringify(state));
			})
			.addCase(fetchOrdersByDate.rejected, (state) => {
				state.showLoading = false;
				// state = JSON.parse(localStorage.getItem("order") || "");
			});
	},
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
