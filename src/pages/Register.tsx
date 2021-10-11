import React from 'react'
import { Navbar } from '../components'
import { Link } from 'react-router-dom'

const Register = () => {
	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div>
				<div className='flex items-center justify-between max-w-5xl m-auto mt-12'>
					<div className='hidden w-2/5 md:block'>
						<img className='w-full' src="/images/personal_info.svg" alt="" />
					</div>
					<div className='w-[95%] sm:w-3/4 m-auto md:m-0 md:w-1/2'>
						<div className='m-auto md:w-4/5'>
							<div className='md:ml-5 md:w-max'>
								<h1 className='text-2xl font-semibold text-center lg:text-3xl'>
									Register your account
								</h1>
								<div className='h-1 mt-5 bg-white rounded-full md:w-24 lg:w-32 '></div>
							</div>
							<div>
								<div className='flex flex-col mx-1 my-6 sm:mx-6'>
									<span className='mb-2 text-sm font-semibold'>
										First Name
									</span>
									<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="email" id="email" />
								</div>
								<div className='flex flex-col mx-1 my-6 sm:mx-6'>
									<span className='mb-2 text-sm font-semibold'>
										Last Name
									</span>
									<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="email" id="email" />
								</div>
								<div className='flex flex-col mx-1 my-6 sm:mx-6'>
									<span className='mb-2 text-sm font-semibold'>
										Email address
									</span>
									<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="email" id="email" />
								</div>
								<div className='flex flex-col mx-1 mb-6 sm:mx-6'>
									<span className='mb-2 text-sm font-semibold'>
										Password
									</span>
									<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="password" id="password" />
								</div>
								<div className='flex items-center justify-between mt-8 sm:mx-6'>
									<button className='p-2 px-4 w-full  bg-[#0277FA] rounded-md hover:bg-[#0276fad8] active:bg-[#0276fac9]'>Create account</button>
								</div>
								<div className='mt-6 text-center sm:mx-6'>
									<hr className='mb-4 border-gray-700' />
									<span className='text-sm text-gray-500'>Already have account? </span>
									<Link to='/login' className='text-sm text-[#0277FA] cursor-pointer'> Sign in.</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
