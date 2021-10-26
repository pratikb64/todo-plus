import { TrashIcon, CheckIcon } from "@heroicons/react/outline"
import axios from "axios"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { debounce } from ".."
import CONSTANTS from "../../configs/Constants"
import { AppDispatch, RootState } from "../../redux/store"
import { removeTask, updateTask } from "../../redux/todoReducer"

const TodoListItem = ({ data, list_id = null }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.authState.isAuthenticated)
	const dispatch = useDispatch<AppDispatch>()
	const taskText = useRef<HTMLInputElement>(null)

	const handleChange = () => {
		const inputData = taskText.current.value
		dispatch(updateTask({ task_id: data.task_id, text: inputData }))
		if (isAuthenticated) {
			axios({
				url: CONSTANTS.BASE_URL + "/v1/todo/update-task",
				method: "POST",
				withCredentials: true,
				data: { task_id: data.task_id, list_id, text: inputData },
			})
		}
	}

	const removeHandler = () => {
		dispatch(removeTask({ task_id: data.task_id }))
		if (isAuthenticated) {
			axios({
				url: CONSTANTS.BASE_URL + "/v1/todo/remove-task",
				method: "POST",
				withCredentials: true,
				data: { task_id: data.task_id, list_id },
			})
		}
	}

	const doneHandler = () => {
		const doneState = !data.done
		dispatch(updateTask({ task_id: data.task_id, done: doneState }))
		if (isAuthenticated) {
			axios({
				url: CONSTANTS.BASE_URL + "/v1/todo/update-task",
				method: "POST",
				withCredentials: true,
				data: { task_id: data.task_id, list_id, done: '' + doneState },
			})
		}
	}

	return (
		<div className='flex items-center justify-between'>
			<div onClick={() => doneHandler()}>
				{data.done ? <div className='bg-[#04C000] border-[#04C000] border-4 rounded-full cursor-pointer w-7 h-7 sm:w-9 sm:h-9 drop-shadow-xl'>
					<CheckIcon />
				</div> : <div className='w-7 h-7 sm:w-9 sm:h-9 border-4 border-[#2A2C3E] rounded-full cursor-pointer drop-shadow-xl'>
				</div>
				}
			</div>
			<div className='flex items-center w-11/12 ml-2 overflow-hidden rounded-lg sm:w-full sm:rounded-xl drop-shadow-xl'>
				<input ref={taskText} onChange={debounce(() => handleChange(), 2000)} defaultValue={data.text} className='box-content pl-4 w-full bg-[#2A2C3E] focus:bg-[#2a2c3ee1] outline-none h-9 sm:h-11' type="text" />
				<button onClick={() => removeHandler()} className='h-full p-2 bg-red-500 sm:p-3 hover:bg-red-600 active:bg-red-700 '>
					<TrashIcon className='w-5' />
				</button>
			</div>
		</div>
	)
}

export default TodoListItem
