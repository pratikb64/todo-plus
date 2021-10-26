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
			return [...action.payload]
		},
		updateTask: (state, action) => {
			return state.map((todo) => {
				if (todo.task_id === action.payload.task_id) {
					return {
						...todo,
						...action.payload,
					};
				}
				return todo;
			});
		},
		removeTask: (state, action) => {
			return state.filter(task => task.task_id !== action.payload.task_id)
		}
	}
})


export const { addTask, setTasksList, updateTask, removeTask } = todoStateReducer.actions;
export const todoReducer = todoStateReducer.reducer;
