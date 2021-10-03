import { TrashIcon, MenuIcon, CheckIcon } from "@heroicons/react/outline"
import { useState } from "react"


const TodoListItem = () => {
	const [checked, setChecked] = useState(false)
	return (
		<div className='flex items-center justify-between'>
			<div onClick={() => setChecked(!checked)}>
				{checked ? <div className='bg-[#04C000] border-[#04C000] border-4 rounded-full cursor-pointer w-7 h-7 sm:w-9 sm:h-9 drop-shadow-xl'>
					<CheckIcon />
				</div> : <div className='w-7 h-7 sm:w-9 sm:h-9 border-4 border-[#2A2C3E] rounded-full cursor-pointer drop-shadow-xl'>
				</div>
				}
			</div>
			<div className='flex items-center w-11/12 mx-2 sm:w-10/12 rounded-xl drop-shadow-xl'>
				<input className='box-content pl-4 w-full bg-[#2A2C3E] focus:bg-[#2a2c3ee1] outline-none h-9 sm:h-11 rounded-l-xl' type="text" />
				<button className='h-full p-2 bg-red-500 sm:p-3 hover:bg-red-600 active:bg-red-700 rounded-r-xl'>
					<TrashIcon className='w-5' />
				</button>
			</div>
			<div className='p-1 rounded-md cursor-pointer sm:rounded-lg sm:p-2 hover:bg-gray-800 active:bg-gray-600 drop-shadow-xl'>
				<MenuIcon className='w-3 sm:w-4' />
			</div>
		</div>
	)
}

export default TodoListItem
