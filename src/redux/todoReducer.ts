import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoStateReducer = createSlice({
	name: 'todoState',
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.push(action.payload);
		},
		setTasksList: (state, action) => {
			return state.concat(action.payload)
		},
		updateTask: (state, action) => {
			return state.map((todo) => {
				if (todo.id === action.payload.id) {
					return {
						...todo,
						...action.payload,
					};
				}
				return todo;
			});
		},
		removeTask: (state, action) => {
			return state.filter(task => task.id !== action.payload.id)
		}
	}
})


export const { addTask, setTasksList, updateTask, removeTask } = todoStateReducer.actions;
export const todoReducer = todoStateReducer.reducer;
