import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import type { TransactionData } from "../../../libs/types";

export const fetchAllTransactions = newAsyncThunk(
	"/transaction/fetchall",
	ApiType.GET,
);

export const setTransactionAsDone = newAsyncThunk(
	"/transaction/setdone",
	ApiType.PATCH,
);

type TransactionState = {
	transactions: TransactionData[];
	showLoading: boolean;
};

const initialState: TransactionState = {
	transactions: [],
	showLoading: false,
};

const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllTransactions.pending, (state) => {
				state.showLoading = true;
			})
			.addCase(fetchAllTransactions.fulfilled, (state, action) => {
				state.transactions = action.payload;
				state.showLoading = false;
			})
			.addCase(fetchAllTransactions.rejected, (state) => {
				state.showLoading = false;
			});
	},
});

export const {} = transactionSlice.actions;

export default transactionSlice.reducer;
