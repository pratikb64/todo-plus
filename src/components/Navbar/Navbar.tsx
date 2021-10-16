import { Disclosure, Menu } from '@headlessui/react'
import NavbarMenu from './NavbarMenu'
import logo from '../../../public/images/Logo.svg'
import { CogIcon, LogoutIcon, MenuAlt3Icon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const Navbar = () => {
	const navigation = [
		{ name: 'Settings', href: '/settings', icon: <CogIcon /> },
		{ name: 'Logout', href: '', icon: <LogoutIcon /> },
	]
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
							<NavbarMenu />
						</div>
					</div>
					<Disclosure.Panel className="sm:hidden">
						<div className="w-full px-3 pb-3 my-2 space-y-1 bg-[#13151a] border border-gray-700 rounded-lg">
							{navigation.map(nav => {
								return <div key={nav.href}> <Link to={nav.href}>
									<div key={nav.name} className={`flex mt-4 item-center cursor-pointer ${nav.name === 'Logout' && 'text-red-500'} `}>
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
