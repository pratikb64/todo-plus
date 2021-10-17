import React from 'react'
import { useDispatch } from 'react-redux'
import { Navbar, TodoListNotFound } from '../components'
import { setLoading } from '../redux/appReducer'
import { AppDispatch } from '../redux/store'

const TodoList = (props) => {
	const dispatch = useDispatch<AppDispatch>()
	//dispatch(setLoading(false))

	console.log(props.match)
	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div className='mt-24'>
				<TodoListNotFound />
			</div>
		</div>
	)
}

export default TodoList
