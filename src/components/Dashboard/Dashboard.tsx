import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { DashboardItem } from '..'
import CONSTANTS from '../../configs/Constants';
import { setLoading } from '../../redux/appReducer';
import { AppDispatch } from '../../redux/store';

const Dashboard = () => {
	let history = useHistory();
	const dispatch = useDispatch<AppDispatch>()

	const createNewList = () => {
		axios({
			url: CONSTANTS.BASE_URL + "/v1/todo/create-todo-list",
			method: "POST",
			withCredentials: true,
			data: { visibility: 'private', secret_code: null }
		})
			.then((d) => {
				history.push("/t/" + d.data['list_id'])
				dispatch(setLoading(false))
			})
			.catch(() => dispatch(setLoading(false)));
	}

	return (
		<div className='max-w-3xl m-auto'>
			<div className='flex items-center justify-center mt-10'>
				<button onClick={() => createNewList()} className='p-2 px-8 bg-[#0277FA] hover:bg-[#0276fad8] active:bg-[#0276fac9] rounded-md font-medium text-lg'>Create new</button>
			</div>
			<div className='w-full h-[1px] bg-gray-600 my-7'></div>
			<div className='flex flex-wrap justify-between mt-10'>
				<DashboardItem index={1} date={23} />
				<DashboardItem index={1} date={23} />
				<DashboardItem index={1} date={23} />
				<DashboardItem index={1} date={23} />
				<DashboardItem index={1} date={23} />
			</div>
		</div>
	)
}

export default Dashboard
