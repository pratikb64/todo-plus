import { PlusIcon } from '@heroicons/react/outline'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { addTask } from '../../redux/todoReducer'

const TodoInput = () => {
	const taskInput = useRef<HTMLInputElement>(null)
	const dispatch = useDispatch<AppDispatch>()

	const addButtonHandler = () => {
		const input = taskInput.current
		if (input.value.trim() !== '')
			dispatch(addTask({
				task_id: Math.ceil(Math.random() * 100000000 + Math.random() * 100000000),
				text: input.value.trim(),
				done: false,
			}))
		input.value = ''
	}

	return (
		<>
			<div className='flex items-center rounded-xl drop-shadow-xl'>
				<input ref={taskInput} className='box-content w-full pl-4 bg-[#2A2C3E] focus:bg-[#2a2c3ee1] text-lg outline-none h-11 sm:h-[52px] rounded-l-xl' placeholder='Todo Plus...' type="text" />
				<button onClick={() => addButtonHandler()} className='p-3 sm:p-4 h-full bg-[#0277FA] hover:bg-[#0276fad8] active:bg-[#0276fac9] rounded-r-xl'>
					<PlusIcon className='w-5' />
				</button>
			</div>
		</>
	)
}

export default TodoInput
