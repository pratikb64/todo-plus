import { PlusIcon } from '@heroicons/react/outline'
import { Navbar, TodoInput, TodoListItem } from '../components'

const Home = () => {
	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div>
				<div className='max-w-lg m-auto mt-5 sm:mt-16'>
					<TodoInput />
					<div className='w-full h-[1px] bg-gray-600 my-7'></div>
					<div>
						<TodoListItem />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
