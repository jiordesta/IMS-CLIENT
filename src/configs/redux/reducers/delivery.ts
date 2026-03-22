import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import type { DeliveryData } from "../../../libs/types";

type DeliveryState = {
	deliveries: DeliveryData[];
	showLoading: boolean;
};

export const fetchAllDeliveries = newAsyncThunk(
	"/delivery/fetchall",
	ApiType.GET,
);

export const createDelivery = newAsyncThunk("/delivery/create", ApiType.POST);

const initialState: DeliveryState = {
	deliveries: [],
	showLoading: false,
};

const deliverySlice = createSlice({
	name: "delivery",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllDeliveries.pending, (state) => {
				state.showLoading = true;
				// state = JSON.parse(
				// 	localStorage.getItem("delivery") || "",
				// );
			})
			.addCase(fetchAllDeliveries.fulfilled, (state, action) => {
				state.deliveries = action.payload;
				state.showLoading = false;
				// localStorage.setItem("delivery", JSON.stringify(state));
			})
			.addCase(fetchAllDeliveries.rejected, (state) => {
				state.showLoading = false;
				// state = JSON.parse(
				// 	localStorage.getItem("delivery") || "",
				// );
			})
			.addCase(createDelivery.pending, (_state) => {})
			.addCase(createDelivery.fulfilled, (state, action) => {
				state.deliveries = [
					action.payload,
					...state.deliveries,
				];
			})
			.addCase(createDelivery.rejected, (_state) => {});
	},
});

export const {} = deliverySlice.actions;

export default deliverySlice.reducer;
