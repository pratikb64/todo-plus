import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, TodoInput, TodoListItem, Dashboard } from '../components'
import CONSTANTS from '../configs/Constants'
import { setLoading } from '../redux/appReducer'
import { setAuth } from '../redux/authReducer'
import { AppDispatch, RootState } from '../redux/store'
import { useHistory } from "react-router-dom";

const Home = () => {
	const { todoList, auth } = useSelector((state: RootState) => state)
	const { isAuthenticated } = auth.authState
	const dispatch = useDispatch<AppDispatch>()
	let history = useHistory();


	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div>
				{isAuthenticated ? <Dashboard /> : <div className='max-w-lg m-auto mt-5 sm:mt-16'>
					<TodoInput />
					<div className='w-full h-[1px] bg-gray-600 my-7'></div>
					{todoList.map(task => {
						return <div className='mb-3' key={task.task_id} >
							<TodoListItem data={task} />
						</div>
					})}
				</div>}
			</div>
		</div>
	)
}

export default Home
