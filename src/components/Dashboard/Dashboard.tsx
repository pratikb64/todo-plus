import { RefreshIcon } from '@heroicons/react/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { DashboardItem } from '..'
import CONSTANTS from '../../configs/Constants';
import { setLoading, updateLists } from '../../redux/appReducer';
import { AppDispatch, RootState } from '../../redux/store';

const Dashboard = () => {
	const lists = useSelector((state: RootState) => state.app.lists)
	let history = useHistory();
	const dispatch = useDispatch<AppDispatch>()
	const [isLoading, setIsLoading] = useState(true)

	const createNewList = () => {
		axios({
			url: CONSTANTS.BASE_URL + "/v1/todo/create-todo-list",
			method: "POST",
			withCredentials: true,
			data: { visibility: 'private', secret_code: null }
		})
			.then((d) => {
				history.push("/list/" + d.data['list_id'])
				dispatch(setLoading(false))
			})
			.catch(() => dispatch(setLoading(false)));
	}

	useEffect(() => {
		axios({
			url: CONSTANTS.BASE_URL + "/v1/todo/get-todo-lists",
			method: "GET",
			withCredentials: true
		})
			.then((d) => {
				dispatch(updateLists(d.data['task_lists']))
				setIsLoading(false)
			})
			.catch(() => setIsLoading(false));
	}, [])

	return (
		<div className='max-w-3xl m-auto'>
			<div className='flex items-center justify-center mt-10'>
				<button onClick={() => createNewList()} className='p-2 px-8 bg-[#0277FA] hover:bg-[#0276fad8] active:bg-[#0276fac9] rounded-md font-medium text-lg'>Create new</button>
			</div>
			<div className='w-full h-[1px] bg-gray-600 my-7'></div>
			{isLoading ? <RefreshIcon className='w-16 m-auto text-gray-300 transform rotate-180 animate-spin' /> : <div className='flex flex-wrap justify-between mt-10'>
				{lists.map((list, index) => {
					const created_at = new Date(list.date_created)
					const date = created_at.toLocaleDateString()
					const time = created_at.toLocaleTimeString()
					return <DashboardItem key={list._id} index={index + 1} date={date + ' - ' + time} list_id={list.list_id} />
				})}
			</div>}
		</div>
	)
}

export default Dashboard
