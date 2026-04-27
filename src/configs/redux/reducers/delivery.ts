import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import type { DeliveryData } from "../../../libs/types";
import { getFromStorage } from "../../../libs/storage";

type DeliveryState = {
  deliveries: DeliveryData[];
  showLoading: boolean;
};

export const fetchAllDeliveries = newAsyncThunk(
  "/delivery/fetchall",
  ApiType.GET,
);

export const createDelivery = newAsyncThunk("/delivery/create", ApiType.POST);
export const updateDelivery = newAsyncThunk("/delivery/update", ApiType.PATCH);

const initialState: DeliveryState = getFromStorage("delivery") || {
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
      })
      .addCase(fetchAllDeliveries.fulfilled, (state, action) => {
        state.deliveries = action.payload;
        state.showLoading = false;
      })
      .addCase(fetchAllDeliveries.rejected, (state) => {
        state.showLoading = false;
      })
      .addCase(createDelivery.fulfilled, () => {})
      .addCase(updateDelivery.fulfilled, () => {});
  },
});

export const {} = deliverySlice.actions;

export default deliverySlice.reducer;
