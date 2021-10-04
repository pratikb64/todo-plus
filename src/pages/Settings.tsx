import React from 'react'
import { Navbar } from '../components'

const Settings = () => {
	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div>
				<div className='max-w-3xl m-auto mt-5 sm:mt-16'>
					<div className='flex flex-col mb-8 sm:flex-row'>

						<div className='min-w-[33.33%] mb-6 sm:mb-0'>
							<span className='text-xl font-semibold'>
								Account
							</span><br />
							<span className='text-xs font-semibold text-gray-500 whitespace-nowrap'>
								Customize account settings.
							</span>
						</div>

						<div className='w-full'>
							<div className='flex flex-col mb-6 md:flex-row'>
								<div className='flex flex-col w-full mb-6 md:mr-6 md:mb-0'>
									<span className='mb-2 text-sm font-semibold'>
										First name
									</span>
									<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="first_name" id="first_name" />
								</div>
								<div className='flex flex-col w-full'>
									<span className='mb-2 text-sm font-semibold'>
										Last name
									</span>
									<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="last_name" id="last_name" />
								</div>
							</div>
							<div>
								<div className='flex flex-col mb-6'>
									<span className='mb-2 text-sm font-semibold'>
										Email address
									</span>
									<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="email" id="email" />
								</div>
							</div>
							<div>
								<div className='flex flex-col mb-6'>
									<span className='mb-2 text-sm font-semibold'>
										Password
									</span>
									<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="password" id="password" />
								</div>
							</div>
							<div></div>
						</div>
					</div>

					<hr className='border-gray-800' />
					<div className='flex flex-col mt-6 mb-8 sm:flex-row '>
						<div className='min-w-[33.33%] mb-6 sm:mb-0'>
							<span className='text-xl font-semibold'>
								Api keys
							</span><br />
							<span className='text-xs font-semibold text-gray-500 whitespace-nowrap'>
								Manage your API keys.
							</span>
						</div>
						<div className='flex flex-col w-full mb-6'>
							<span className='mb-2 text-sm font-semibold'>
								API key
							</span>
							<div className='w-full'>
								<input className='p-2 bg-[#13151a] w-full border mb-3 border-gray-600/50 rounded-md mr-4 text-sm text-gray-300' defaultValue='f5s64fs6efxzvgh5jtyf12a1s89' type="text" name="api_key" id="api_key" />
								<div className='flex w-full sm:block'>
									<button className='p-2 bg-[#03c000b2] rounded-lg' hidden>Generate key</button>
									<button className='w-full px-4 py-2 mr-3 text-sm bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700 active:bg-blue-800'>Copy</button>
									<button className='w-full px-4 py-2 text-sm bg-red-600 rounded-lg sm:w-auto hover:bg-red-700 active:bg-red-800'>Delete key</button>
								</div>
							</div>
						</div>
					</div>
					<hr className='border-gray-800' />

					<div className='flex flex-col mt-6 mb-8 sm:flex-row'>
						<div className='min-w-[33.33%]'>
							<span className='text-xl font-semibold'>
								Delete account
							</span><br />
							<span className='text-xs font-semibold text-gray-500 whitespace-nowrap'>
								Delete your account permanently.
							</span>
						</div>

						<div>
							<div className='flex flex-col mb-6'>
								<span className='mb-2 text-sm font-semibold'>
									Are you sure about this?
								</span>
								<div>
									<button className='px-4 py-2 text-sm bg-red-600 rounded-lg hover:bg-red-700 active:bg-red-800'>Yes, delete my account</button>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Settings
