import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import type { ProductData } from "../../../libs/types";

export const createProduct = newAsyncThunk("/product/create", ApiType.POST);

export const fetchAllProducts = newAsyncThunk("/product/fetchall", ApiType.GET);

export const deleteProduct = newAsyncThunk("/product/delete", ApiType.DEL);

export const updateProduct = newAsyncThunk("/product/update", ApiType.PATCH);

type ProductState = {
	products: ProductData[];
	showLoading: boolean;
};

const initialState: ProductState = {
	products: [],
	showLoading: false,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProducts.pending, (state) => {
				state.showLoading = true;
			})
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.products = action.payload;
				state.showLoading = false;
			})
			.addCase(fetchAllProducts.rejected, (state) => {
				state.showLoading = false;
			})
			.addCase(createProduct.pending, (_state) => {})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.products = [...state.products, action.payload];
			})
			.addCase(createProduct.rejected, (_state) => {})
			.addCase(deleteProduct.pending, (state) => {
				state.showLoading = true;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.products = state.products.filter(
					(product: ProductData) =>
						product.id !== action.payload.id,
				);
				state.showLoading = false;
			})
			.addCase(deleteProduct.rejected, (state) => {
				state.showLoading = false;
			})
			.addCase(updateProduct.pending, (state) => {
				state.showLoading = true;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.products = state.products.map(
					(product: ProductData) => {
						if (product.id === action.payload.id) {
							return action.payload;
						}
						return product;
					},
				);
				state.showLoading = false;
			})
			.addCase(updateProduct.rejected, (state) => {
				state.showLoading = false;
			});
	},
});

export const {} = productSlice.actions;

export default productSlice.reducer;
