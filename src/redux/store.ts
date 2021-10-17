import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { appReducer } from "./appReducer";
import { todoReducer } from "./todoReducer";

const store = configureStore({
	reducer: {
		auth: authReducer,
		app: appReducer,
		todoList: todoReducer
	},
});

export default store;


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
