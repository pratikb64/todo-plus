import { Menu } from '@headlessui/react'
import { CogIcon, ChevronDownIcon, LogoutIcon, UserIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CONSTANTS from '../../configs/Constants'

const NavbarMenu = ({ authenticated, first_name, last_name }) => {

	const navigation = [
		{ name: 'Settings', href: '/settings', icon: <CogIcon /> },
		{ name: 'Logout', href: '', icon: <LogoutIcon /> },
	]

	const logoutHandler = () => {
		axios({
			url: CONSTANTS.BASE_URL + "/v1/user/logout",
			method: "GET",
			withCredentials: true,
		}).then(() => location.reload())
	}

	return (
		<div className='relative w-max'>
			<Menu as="div">
				<Menu.Button className='flex'>
					<UserIcon className='w-6' />
					<span className='hidden mr-2 text-lg sm:block'>
						{first_name + ' ' + last_name}
					</span>
					<div className='w-7'>
						<ChevronDownIcon />
					</div>
				</Menu.Button>
				<Menu.Items>
					<div className='absolute z-10 drop-shadow-2xl w-full px-3 mt-2 bg-[#13151a] border border-gray-700 rounded-xl'>
						{navigation.map(nav => {
							return <Menu.Item key={nav.name}>
								{({ active }) => (
									<Link to={nav.href}>
										<div onClick={nav.name === 'Logout' ? () => logoutHandler() : null} className={`flex my-4 item-center cursor-pointer ${nav.name === 'Logout' && 'text-red-500'}`}>
											<div className='w-5 mr-2'>
												{nav.icon}
											</div>
											<div>
												{nav.name}
											</div>
										</div>
									</Link>
								)}
							</Menu.Item>
						})}
					</div>
				</Menu.Items>
			</Menu>
		</div>
	)
}

export default NavbarMenu
