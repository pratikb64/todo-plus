import { TrashIcon, CogIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListSettings } from '..'
import CONSTANTS from '../../configs/Constants'
import { removeList, updateLists } from '../../redux/appReducer'
import { AppDispatch } from '../../redux/store'

const DashboardItem = ({ index, date, list_id, visibility, secret_code }) => {
	const dispatch = useDispatch<AppDispatch>()
	const [settingsState, setSettingsState] = useState(false)

	const deleteHandler = () => {
		const loading = toast.loading('Deleting todo list!')
		axios({
			url: CONSTANTS.BASE_URL + "/v1/todo/remove-todo-list",
			method: "POST",
			withCredentials: true,
			data: { list_id: list_id }
		})
			.then((d) => {
				toast.success('Todo list deleted!', { id: loading })
				dispatch(removeList({ list_id: list_id }))
			})
			.catch(er => toast.error(er, { id: loading }))
	}

	return (
		<motion.div initial={{ opacity: 0, y: 50 }} animate={{
			opacity: [0, 1],
			y: [50, 0],
		}} transition={{ delay: 0.15 * (index - 1) }} key={list_id} className='flex relative justify-between h-9 sm:h-12 bg-[#2A2C3E] w-full sm:w-[48%] my-2 rounded-md cursor-pointer'>
			<Link to={'/list/' + list_id} className='flex'>
				<div className='flex items-center justify-center h-full text-xl font-light w-9 sm:text-xl sm:w-12'>{index}</div>
				<div className='h-full w-[2px] bg-[#181a21]'></div>
				<div className='flex items-center justify-between w-full'>
					<span className='ml-1 overflow-hidden sm:ml-3 whitespace-nowrap'>{date}</span>
				</div>
			</Link>
			<div className='flex'>
				<CogIcon onClick={() => setSettingsState(!settingsState)} className='mr-1 text-gray-400 sm:mr-2 w-7 hover:text-gray-300' />
				<button onClick={() => deleteHandler()} className='h-full p-2 bg-red-500 rounded-r-md sm:p-3 hover:bg-red-600 active:bg-red-700 '>
					<TrashIcon className='w-5' />
				</button>
			</div>
			{settingsState && <ListSettings setSettingsState={setSettingsState} list_id={list_id} visibility={visibility} secret_code={secret_code} />}
		</motion.div>
	)
}

export default DashboardItem
