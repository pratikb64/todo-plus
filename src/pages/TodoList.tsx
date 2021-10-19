import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navbar, TodoListNotFound } from '../components'
import CONSTANTS from '../configs/Constants'
import { setLoading } from '../redux/appReducer'
import { setAuth } from '../redux/authReducer'
import { AppDispatch } from '../redux/store'

const TodoList = (props) => {
	const list_id = props.match.params.id
	const dispatch = useDispatch<AppDispatch>()
	//dispatch(setLoading(false))

	useEffect(() => {
		axios({
			url: CONSTANTS.BASE_URL + "/v1/todo/get-todo-list",
			method: "POST",
			withCredentials: true,
			data: { list_id }
		})
			.then((d) => {
				console.log(d.data)
				dispatch(setLoading(false))
			})
			.catch(() => dispatch(setLoading(false)));
	}, []);

	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			{/*  *** *** *** Error component *** *** ***
			<div className='mt-24'>
				<TodoListNotFound />
			</div> */}
		</div>
	)
}

export default TodoList
