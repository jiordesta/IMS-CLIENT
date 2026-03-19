import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./axiosInstance";

export const ApiType = {
	GET: 1,
	POST: 2,
	PATCH: 3,
	DEL: 4,
} as const;

export type ApiType = (typeof ApiType)[keyof typeof ApiType];

export interface ThunkArgs {
	payload?: any;
	token?: string;
	id?: number;
}

export const newAsyncThunk = (path: string, type: ApiType) => {
	return createAsyncThunk(
		path,
		async ({ payload, token, id }: ThunkArgs) => {
			try {
				axiosInstance.defaults.headers.common["Authorization"] =
					`Bearer ${token}`;

				let response;

				if (type === ApiType.GET)
					response = await axiosInstance.get(path, {
						params: payload,
					});

				if (type === ApiType.POST)
					response = await axiosInstance.post(
						path,
						payload,
					);

				if (type === ApiType.PATCH)
					response = await axiosInstance.patch(
						path + `/${id}`,
						payload,
					);

				if (type === ApiType.DEL)
					response = await axiosInstance.delete(
						path + `/${id}`,
						{
							data: payload,
						},
					);

				return response?.data;
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		},
	);
};
