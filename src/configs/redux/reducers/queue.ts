import { createSlice } from "@reduxjs/toolkit";
import { isQueueDuplicate } from "../../../libs/utils";

type QueueState = {
	queue: any[];
};

const initialState: QueueState = {
	queue: [],
};

const configSlice = createSlice({
	name: "queue",
	initialState,
	reducers: {
		addToQueue: (state, action) => {
			if (isQueueDuplicate(state.queue, action.payload.service))
				return;
			state.queue.push(action.payload);
		},
	},
});

export const { addToQueue } = configSlice.actions;

export default configSlice.reducer;
