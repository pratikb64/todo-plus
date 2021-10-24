import { TrashIcon } from '@heroicons/react/outline'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import CONSTANTS from '../../configs/Constants'
import { removeList, updateLists } from '../../redux/appReducer'
import { AppDispatch } from '../../redux/store'

const DashboardItem = ({ index, date, list_id }) => {
	const dispatch = useDispatch<AppDispatch>()

	const deleteHandler = () => {
		axios({
			url: CONSTANTS.BASE_URL + "/v1/todo/remove-todo-list",
			method: "POST",
			withCredentials: true,
			data: { list_id: list_id }
		})
			.then((d) => {
				dispatch(removeList({ list_id: list_id }))
			})
	}

	return (
		<div className='flex justify-between h-9 sm:h-12 bg-[#2A2C3E] w-full sm:w-[48%] my-2 rounded-md cursor-pointer'>
			<Link to={'/list/' + list_id} className='flex'>
				<div className='flex items-center justify-center h-full text-xl font-light w-9 sm:text-xl sm:w-12'>{index}</div>
				<div className='h-full w-[2px] bg-[#181a21]'></div>
				<div className='flex items-center justify-between w-full'>
					<span className='ml-3'>{date}</span>
				</div>
			</Link>
			<button onClick={() => deleteHandler()} className='h-full p-2 bg-red-500 rounded-r-md sm:p-3 hover:bg-red-600 active:bg-red-700 '>
				<TrashIcon className='w-5' />
			</button>
		</div>
	)
}

export default DashboardItem
