import { createSlice } from "@reduxjs/toolkit";

const appState = { isLoading: true, lists: [] };

const appStateReducer = createSlice({
	name: 'appState',
	initialState: appState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		updateLists: (state, action) => {
			state.lists = [...action.payload]
		},
		removeList: (state, action) => {
			state.lists = [...state.lists.filter(list => list.list_id !== action.payload.list_id)]
		}
	}
})


export const { setLoading, updateLists, removeList } = appStateReducer.actions;
export const appReducer = appStateReducer.reducer;
