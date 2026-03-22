import { createSlice } from "@reduxjs/toolkit";
import { ApiType, newAsyncThunk } from "../../newAsyncThunk";
import type { UserProfileData } from "../../../libs/types";

export const register = newAsyncThunk("/auth/register", ApiType.POST);
export const login = newAsyncThunk("/auth/login", ApiType.POST);
export const authenticate = newAsyncThunk("/auth", ApiType.GET);

type AuthenticationState = {
	accessToken: string | null;
	refreshToken: string | null;
	user: UserProfileData | null;
	isFetchingUser: boolean;
	isLoggingIn: boolean;
	isRegistering: boolean;
};

const initialState: AuthenticationState = {
	accessToken: null,
	refreshToken: null,
	user: null,
	isFetchingUser: false,
	isLoggingIn: false,
	isRegistering: false,
};

const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		setTokens: (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
		},
		removeTokens: (state) => {
			localStorage.setItem("refreshToken", "");
			localStorage.setItem("accessToken", "");
			state.accessToken = null;
			state.refreshToken = null;
		},
		removeUserInfo: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isRegistering = true;
			})
			.addCase(register.fulfilled, (state) => {
				state.isRegistering = false;
			})
			.addCase(register.rejected, (state) => {
				state.isRegistering = false;
			})
			.addCase(login.pending, (state) => {
				state.isLoggingIn = true;
			})
			.addCase(login.rejected, (state) => {
				state.isLoggingIn = false;
			})
			.addCase(login.fulfilled, (state, action) => {
				const accessToken = action.payload.accessToken;
				const refreshToken = action.payload.refreshToken;
				//NOTE: BAD PRACTICE
				localStorage.setItem("refreshToken", refreshToken);
				localStorage.setItem("accessToken", accessToken);
				state.isLoggingIn = false;
			})
			.addCase(authenticate.pending, (state) => {
				state.isFetchingUser = true;
				// state = JSON.parse(localStorage.getItem("user") || "");
			})
			.addCase(authenticate.fulfilled, (state, action) => {
				state.isFetchingUser = false;
				state.user = action.payload;

				// localStorage.setItem("auth", JSON.stringify(state));
			})
			.addCase(authenticate.rejected, (state) => {
				state.isFetchingUser = false;
				// state = JSON.parse(localStorage.getItem("auth") || "");
			});
	},
});

export const { setTokens, removeTokens, removeUserInfo } =
	authenticationSlice.actions;

export default authenticationSlice.reducer;
