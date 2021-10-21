import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, TodoInput, TodoListItem, TodoListNotFound } from '../components'
import CONSTANTS from '../configs/Constants'
import { setLoading } from '../redux/appReducer'
import { setAuth } from '../redux/authReducer'
import { AppDispatch, RootState } from '../redux/store'
import { setTasksList, updateTask } from '../redux/todoReducer'

const TodoList = (props) => {
	const list_id = props.match.params.id
	const { todoList } = useSelector((state: RootState) => state)
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
				let tasks = d.data['tasks_data']['tasks']
				dispatch(setTasksList(tasks))
				dispatch(setLoading(false))
			})
			.catch(() => dispatch(setLoading(false)));
	}, []);

	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div>
				<div className='max-w-lg m-auto mt-5 sm:mt-16'>
					<TodoInput />
					<div className='w-full h-[1px] bg-gray-600 my-7'></div>
					{todoList.map(task => {
						return <div className='mb-3' key={task.task_id} >
							<TodoListItem data={task} />
						</div>
					})}
				</div>
			</div>
			{/*  *** *** *** Error component *** *** ***
			<div className='mt-24'>
				<TodoListNotFound />
			</div> */}
		</div>
	)
}

export default TodoList
