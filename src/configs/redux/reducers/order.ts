import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import { getFromStorage } from "../../../libs/storage";

export const createOrder = newAsyncThunk("/order/create", ApiType.POST);
export const fetchOrdersByDate = newAsyncThunk("/order/fetchall", ApiType.GET);
export const updateOrder = newAsyncThunk("/order/update", ApiType.PATCH);
export const fetchMenu = newAsyncThunk("/order/fetchmenu", ApiType.GET);
export const deleteOrder = newAsyncThunk("/order/delete", ApiType.DEL);

type OrderState = {
  orders: any[];
  showLoading: boolean;
  menu: {
    users: any[];
    menu: any[];
  };
};

const initialState: OrderState = getFromStorage("order") || {
  orders: [],
  menu: null,
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
      })
      .addCase(fetchMenu.pending, (state) => {
        state.showLoading = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.showLoading = false;
      })
      .addCase(fetchMenu.rejected, (state) => {
        state.showLoading = false;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
