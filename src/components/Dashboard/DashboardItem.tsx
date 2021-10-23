import { TrashIcon } from '@heroicons/react/outline'
import React from 'react'

const DashboardItem = ({ index, date }) => {
	return (
		<div className='flex h-9 sm:h-12 bg-[#2A2C3E] w-full sm:w-[48%] my-2 rounded-md cursor-pointer'>
			<div className='flex items-center justify-center h-full text-xl font-light w-9 sm:text-xl sm:w-12'>{index}</div>
			<div className='h-full w-[2px] bg-[#181a21]'></div>
			<div className='flex items-center justify-between w-full'>
				<span className='ml-3'>{date}</span>
				<button /* onClick={() => dispatch(removeTask({ task_id: data.task_id }))} */ className='h-full p-2 bg-red-500 rounded-r-md sm:p-3 hover:bg-red-600 active:bg-red-700 '>
					<TrashIcon className='w-5' />
				</button>
			</div>
		</div>
	)
}

export default DashboardItem
