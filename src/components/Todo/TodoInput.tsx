import { PlusIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import CONSTANTS from '../../configs/Constants'
import { AppDispatch, RootState } from '../../redux/store'
import { addTask } from '../../redux/todoReducer'

const TodoInput = (list_id = null) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.authState.isAuthenticated)
	const taskInput = useRef<HTMLInputElement>(null)
	const dispatch = useDispatch<AppDispatch>()

	const addButtonHandler = () => {
		const input = taskInput.current
		if (input.value.trim() !== '') {
			let data = {
				task_id: Math.ceil(Math.random() * 100000000 + Math.random() * 100000000),
				text: input.value.trim(),
				done: false,
			}
			if (isAuthenticated) {
				axios({
					url: CONSTANTS.BASE_URL + "/v1/todo/add-task",
					method: "POST",
					withCredentials: true,
					data: { task: data, list_id },
				})
					.then((d) => {
						dispatch(addTask(data))
						location.href = '/'
					})
			}
			else {
				dispatch(addTask(data))
			}
		}
		input.value = ''
		input.focus()
	}


	return (
		<>
			<div className='flex items-center rounded-xl drop-shadow-xl'>
				<input ref={taskInput} onKeyUp={event => event.key === 'Enter' && addButtonHandler()} className='box-content w-full pl-4 bg-[#2A2C3E] focus:bg-[#2a2c3ee1] text-lg outline-none h-11 sm:h-[52px] rounded-l-xl' placeholder='Todo Plus...' type="text" />
				<button onClick={() => addButtonHandler()} className='p-3 sm:p-4 h-full bg-[#0277FA] hover:bg-[#0276fad8] active:bg-[#0276fac9] rounded-r-xl'>
					<PlusIcon className='w-5' />
				</button>
			</div>
		</>
	)
}

export default TodoInput
