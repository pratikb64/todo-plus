import React, { FormEvent, useRef, useState } from 'react'
import { Navbar } from '../components'
import { Link } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

const Login = () => {
	const [eyeState, setEyeState] = useState(false)
	const passwordInput = useRef<HTMLInputElement>(null)
	let formData = {}

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();

	}

	const handleChange = (e: HTMLInputElement) => {
		formData[e.name] = e.value;
	}

	const togglePasswordVisibility = () => {
		setEyeState(!eyeState)
		if (!eyeState)
			passwordInput.current?.setAttribute('type', 'text')
		else
			passwordInput.current?.setAttribute('type', 'password')
	}

	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div className='max-w-sm m-auto mt-5 sm:mt-16'>
				<form onSubmit={event => submitHandler(event)}>
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
								<input onChange={(event) => handleChange(event.target)} className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="email" required name="email" id="email" />
							</div>
						</div>
						<div>
							<div className='relative flex flex-col mx-1 mb-6 sm:mx-6'>
								<span className='mb-2 text-sm font-semibold'>
									Password
								</span>
								<input minLength={8} onChange={(event) => handleChange(event.target)} ref={passwordInput} className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="password" required name="password" id="password" />
								<div onClick={() => togglePasswordVisibility()} className='absolute cursor-pointer top-9 right-3'>
									{eyeState ? <EyeIcon className='w-5' /> : <EyeOffIcon className='w-5' />}
								</div>
							</div>
						</div>
						<div className='flex items-center justify-between mx-6 mt-8'>
							<button type='submit' className='p-2 px-4 bg-[#0277FA] rounded-md hover:bg-[#0276fad8] active:bg-[#0276fac9]'>Login</button>
							<Link to='/reset-password' className='text-sm text-gray-500 cursor-pointer'>Forgot password</Link>
						</div>
						<div className='mt-6 text-center sm:mx-6'>
							<hr className='mb-4 border-gray-700' />
							<span className='text-sm text-gray-500'>Don't have account? </span>
							<Link to='/register' className='text-sm text-[#0277FA] cursor-pointer'> Sign up.</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
