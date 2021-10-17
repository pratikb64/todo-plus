import { TrashIcon, CheckIcon } from "@heroicons/react/outline"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { debounce } from ".."
import { AppDispatch } from "../../redux/store"
import { removeTask, updateTask } from "../../redux/todoReducer"

const TodoListItem = ({ data }) => {
	const dispatch = useDispatch<AppDispatch>()
	const taskText = useRef<HTMLInputElement>(null)

	const handleChange = () => {
		dispatch(updateTask({ id: data.id, data: taskText.current.value }))
	}

	return (
		<div className='flex items-center justify-between'>
			<div onClick={() => dispatch(updateTask({ id: data.id, done: !data.done }))}>
				{data.done ? <div className='bg-[#04C000] border-[#04C000] border-4 rounded-full cursor-pointer w-7 h-7 sm:w-9 sm:h-9 drop-shadow-xl'>
					<CheckIcon />
				</div> : <div className='w-7 h-7 sm:w-9 sm:h-9 border-4 border-[#2A2C3E] rounded-full cursor-pointer drop-shadow-xl'>
				</div>
				}
			</div>
			<div className='flex items-center w-11/12 ml-2 overflow-hidden rounded-lg sm:w-full sm:rounded-xl drop-shadow-xl'>
				<input ref={taskText} onChange={debounce(() => handleChange(), 2000)} defaultValue={data.data} className='box-content pl-4 w-full bg-[#2A2C3E] focus:bg-[#2a2c3ee1] outline-none h-9 sm:h-11' type="text" />
				<button onClick={() => dispatch(removeTask({ id: data.id }))} className='h-full p-2 bg-red-500 sm:p-3 hover:bg-red-600 active:bg-red-700 '>
					<TrashIcon className='w-5' />
				</button>
			</div>
		</div>
	)
}

export default TodoListItem
