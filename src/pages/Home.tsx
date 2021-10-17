import { useSelector } from 'react-redux'
import { Navbar, TodoInput, TodoListItem } from '../components'
import { RootState } from '../redux/store'

const Home = () => {
	const { todoList } = useSelector((state: RootState) => state)

	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div>
				<div className='max-w-lg m-auto mt-5 sm:mt-16'>
					<TodoInput />
					<div className='w-full h-[1px] bg-gray-600 my-7'></div>
					{todoList.map(task => {
						return <div className='mb-3' key={task.id} >
							<TodoListItem data={task} />
						</div>
					})}
				</div>
			</div>
		</div>
	)
}

export default Home
