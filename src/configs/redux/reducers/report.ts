import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import { getFromStorage } from "../../../libs/storage";

export const fetchAllReports = newAsyncThunk("/report/fetchall", ApiType.GET);

type ReportState = {
	reports: any[];
	showLoading: boolean;
};

const initialState: ReportState = getFromStorage("shop") || {
	reports: [],
	showLoading: false,
};

const shopSlice = createSlice({
	name: "report",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllReports.pending, (state) => {
				state.showLoading = true;
			})
			.addCase(fetchAllReports.fulfilled, (state, action) => {
				state.reports = action.payload;
				state.showLoading = false;
			})
			.addCase(fetchAllReports.rejected, (state) => {
				state.showLoading = false;
			});
	},
});

export const {} = shopSlice.actions;

export default shopSlice.reducer;
