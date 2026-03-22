import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import type { UserProfileData } from "../../../libs/types";

export const fetchallUsers = newAsyncThunk("/user/fetchall", ApiType.GET);

export const deleteUser = newAsyncThunk("/user/delete", ApiType.DEL);

export const assignRole = newAsyncThunk("/user/assign/role", ApiType.PATCH);

type UserState = {
	users: UserProfileData[];
	showLoading: boolean;
};

const initialState: UserState = {
	users: [],
	showLoading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchallUsers.pending, (state) => {
				state.showLoading = true;
				//state = JSON.parse(localStorage.getItem("user") || "");
			})
			.addCase(fetchallUsers.fulfilled, (state, action) => {
				state.users = action.payload;
				state.showLoading = false;
				// localStorage.setItem("user", JSON.stringify(state));
			})
			.addCase(fetchallUsers.rejected, (state) => {
				state.showLoading = false;
				// state = JSON.parse(localStorage.getItem("user") || "");
			})
			.addCase(assignRole.fulfilled, (state, action) => {
				state.users = state.users.map(
					(user: UserProfileData) => {
						if (user.id === action.payload.id) {
							return action.payload;
						}
						return user;
					},
				);
			});
	},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
