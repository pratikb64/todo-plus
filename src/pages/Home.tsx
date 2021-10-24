import { DocumentAddIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import { Navbar, TodoInput, TodoListItem, Dashboard } from '../components'
import { RootState } from '../redux/store'


const Home = () => {
	const { todoList, auth } = useSelector((state: RootState) => state)
	const { isAuthenticated } = auth.authState

	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div>
				{isAuthenticated ? <Dashboard /> : <div className='max-w-lg m-auto mt-5 sm:mt-16'>
					<TodoInput />
					<div className='w-full h-[1px] bg-gray-600 my-7'></div>
					{todoList.length > 0 ? todoList.map(task => {
						return <div className='mb-3' key={task.task_id} >
							<TodoListItem data={task} />
						</div>
					}) :
						<div className='flex flex-col items-center w-full'>
							<DocumentAddIcon className='mb-2 text-gray-400 w-14' />
							<div className='m-auto text-2xl w-max'>Add your first task!</div>
						</div>}
				</div>}
			</div>
		</div>
	)
}

export default Home
