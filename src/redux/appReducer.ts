import { createSlice } from "@reduxjs/toolkit";

const appState = { isLoading: true };

const appStateReducer = createSlice({
	name: 'appState',
	initialState: appState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload
		}
	}
})


export const { setLoading } = appStateReducer.actions;
export const appReducer = appStateReducer.reducer;
