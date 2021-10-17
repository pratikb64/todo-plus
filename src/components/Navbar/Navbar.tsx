import { Disclosure } from '@headlessui/react'
import NavbarMenu from './NavbarMenu'
import { CogIcon, LoginIcon, LogoutIcon, MenuAlt3Icon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import axios from 'axios'
import CONSTANTS from '../../configs/Constants'

const Navbar = () => {
	const { authenticated, first_name, last_name } = useSelector((state: RootState) => state.auth.authState)

	const navigation = [
		{ name: 'Login', href: '/login', icon: <LoginIcon /> },
		{ name: 'Register', href: '/register', icon: <LogoutIcon /> },
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
		<Disclosure as="nav" className="">
			{({ open }) => (
				<>
					<div className='m-auto my-4 mb-2 max-w-[90vw] xl:max-w-7xl flex justify-between items-center text-white'>
						<Link to='/'>
							<div className='flex'>
								<img className='mr-2 w-7 sm:w-9 sm:hidden' src='/images/todo-plus-icon.svg' alt="Logo" />
								<img className='hidden w-40 sm:block' src='/images/Logo.svg' alt="Logo" />
							</div>
						</Link>
						<Disclosure.Button className="inline-flex items-center justify-center text-gray-400 rounded-md sm:hidden hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							<span className="sr-only">Open main menu</span>
							{open ? (
								<XIcon className="block w-6 h-6" aria-hidden="true" />
							) : (
								<MenuAlt3Icon className="block w-6 h-6" aria-hidden="true" />
							)}
						</Disclosure.Button>
						<div className='hidden sm:block'>
							{authenticated ? <NavbarMenu authenticated={authenticated} first_name={first_name} last_name={last_name} /> :
								<div className='flex justify-between w-36'>
									<Link to='/login'>
										Login
									</Link>
									<Link to='/register'>
										Register
									</Link>
								</div>}
						</div>
					</div>
					<Disclosure.Panel className="sm:hidden">
						<div className="w-full px-3 pb-3 my-2 space-y-1 bg-[#13151a] border border-gray-700 rounded-lg">
							{navigation.map(nav => {
								if (authenticated && (nav.name === 'Login' || nav.name === 'Register'))
									return
								if (!authenticated && (nav.name === 'Settings' || nav.name === 'Logout'))
									return
								return <div key={nav.href}> <Link to={nav.href}>
									<div onClick={nav.name === 'Logout' ? () => logoutHandler() : null} key={nav.name} className={`flex mt-4 item-center cursor-pointer ${nav.name === 'Logout' && 'text-red-500'} `}>
										<div className='w-5 mr-2'>
											{nav.icon}
										</div>
										<div>
											{nav.name}
										</div>
									</div>
								</Link></div>
							})}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default Navbar
