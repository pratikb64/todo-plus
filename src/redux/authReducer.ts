import { ActionCreatorWithPayload, createSlice } from "@reduxjs/toolkit";
import { auth } from "../types";

const authState: auth = {
	isAuthenticated: false,
	isLoading: true,
	user_id: '',
	first_name: '',
	last_name: '',
	email: '',
	api_key: ''
}

const addStateReducer = createSlice({
	name: 'auth',
	initialState: { authState },
	reducers: {
		setAuth: (state, action) => {
			state.authState = { ...action.payload, isAuthenticated: true }
		}
	}
})

export const { setAuth } = addStateReducer.actions
export const authReducer = addStateReducer.reducer;
