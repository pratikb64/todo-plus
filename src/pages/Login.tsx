import React from 'react'
import { Navbar } from '../components'
import { Link } from 'react-router-dom'

const Login = () => {
	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div className='max-w-sm m-auto mt-5 sm:mt-16'>
				<div>
					<h1 className='text-2xl font-semibold text-center sm:text-3xl'>
						Login to your account
					</h1>
					<div className='h-1 mt-5 bg-white rounded-full sm:mt-1 sm:w-20 sm:ml-7'></div>
				</div>
				<div className='mt-5 sm:mt-10'>
					<div>
						<div className='flex flex-col mx-1 mb-6 sm:mx-6'>
							<span className='mb-2 text-sm font-semibold'>
								Email address
							</span>
							<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="email" id="email" />
						</div>
					</div>
					<div>
						<div className='flex flex-col mx-1 mb-6 sm:mx-6'>
							<span className='mb-2 text-sm font-semibold'>
								Password
							</span>
							<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="password" id="password" />
						</div>
					</div>
					<div className='flex items-center justify-between mx-6 mt-8'>
						<button className='p-2 px-4 bg-[#0277FA] rounded-md hover:bg-[#0276fad8] active:bg-[#0276fac9]'>Login</button>
						<Link to='/reset-password' className='text-sm text-gray-500 cursor-pointer'>Forgot password</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
