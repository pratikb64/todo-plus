import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EncryptedContentModal, Navbar, TodoInput, TodoListItem, TodoListNotFound } from '../components'
import CONSTANTS from '../configs/Constants'
import { setLoading } from '../redux/appReducer'
import { setAuth } from '../redux/authReducer'
import { AppDispatch, RootState } from '../redux/store'
import { setTasksList, updateTask } from '../redux/todoReducer'
import { DocumentAddIcon, RefreshIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'

const TodoList = (props) => {
	const list_id = props.match.params.id
	const { todoList, auth } = useSelector((state: RootState) => state)
	const dispatch = useDispatch<AppDispatch>()
	const [error, setError] = useState(false)
	const [isFetching, setIsFetching] = useState(true)
	const [isPasswordProtected, setIsPasswordProtected] = useState(false)
	//dispatch(setLoading(false))

	const getTodoList = (code = null) => {
		!isFetching && setIsFetching(true)
		axios({
			url: CONSTANTS.BASE_URL + "/v1/todo/get-todo-list",
			method: "POST",
			withCredentials: true,
			data: { list_id, secret_code: code }
		})
			.then((d) => {
				let tasks = d.data['tasks_data']['tasks']
				dispatch(setTasksList(tasks))
				dispatch(setLoading(false))
				code && toast.success('Decrypted!', { duration: 2500 })
				setIsFetching(false)
			})
			.catch((er) => {
				if (er.response.status === 401) {
					setIsPasswordProtected(true)
					toast.error('Enter correct code to view list!', { duration: 1500 })
				}
				else
					setError(true)
				dispatch(setLoading(false))
				setIsFetching(false)
			});
	}

	const getTodoListWithCode = (code) => {
		getTodoList(code)
	}

	useEffect(() => {
		getTodoList()
		return () => { dispatch(setTasksList([])) }
	}, []);


	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			{error ?
				//If list not found show error
				<div className='mt-24'>
					<TodoListNotFound />
				</div> :
				//Else show tasks
				<div>
					<div className='max-w-lg m-auto mt-5 sm:mt-16'>
						<TodoInput list_id={list_id} />
						<div className='w-full h-[1px] bg-gray-600 my-7'></div>
						{isFetching ? <RefreshIcon className='w-16 m-auto text-gray-300 transform rotate-180 animate-spin' /> : <>
							{todoList.length > 0 ? todoList.map((task, i) => {
								return <div className='mb-3' key={task.task_id} >
									<TodoListItem data={task} index={i} list_id={list_id} />
								</div>
							}) :
								<div className='flex flex-col items-center w-full'>
									<DocumentAddIcon className='mb-2 text-gray-400 w-14' />
									<div className='m-auto text-2xl w-max'>Add your first task!</div>
								</div>}
						</>}
					</div>
				</div>
			}
			{isPasswordProtected && <EncryptedContentModal getTodoListWithCode={getTodoListWithCode} setIsPasswordProtected={setIsPasswordProtected} />}
		</div>
	)
}

export default TodoList
