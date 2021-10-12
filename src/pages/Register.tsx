import React, { FormEvent, useRef, useState } from 'react'
import { Navbar } from '../components'
import { Link } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

const Register = () => {
	const [eyeState, setEyeState] = useState(false)
	const passwordInput = useRef<HTMLInputElement>(null)

	let formData = {}

	const isFormValid = () => {
		return Boolean
	}

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		if (isFormValid()) {
			alert("Form submitted");
		} else {
			alert("Form has errors.")
		}
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
			<div>
				<div className='flex items-center justify-between max-w-5xl m-auto mt-12'>
					<div className='hidden w-2/5 md:block'>
						<img className='w-full' src="/images/personal_info.svg" alt="" />
					</div>
					<div className='w-[95%] sm:w-3/4 m-auto md:m-0 md:w-1/2'>
						<form onSubmit={(event) => submitHandler(event)}>
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
										<input onChange={event => handleChange(event.target)} className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="first_name" id="first_name" required />
									</div>
									<div className='flex flex-col mx-1 my-6 sm:mx-6'>
										<span className='mb-2 text-sm font-semibold'>
											Last Name
										</span>
										<input onChange={event => handleChange(event.target)} className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="last_name" id="last_name" required />
									</div>
									<div className='flex flex-col mx-1 my-6 sm:mx-6'>
										<span className='mb-2 text-sm font-semibold'>
											Email address
										</span>
										<input onChange={event => handleChange(event.target)} className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="email" name="email" id="email" required />
									</div>
									<div className='relative flex flex-col mx-1 mb-6 sm:mx-6'>
										<span className='mb-2 text-sm font-semibold'>
											Password
										</span>
										<input minLength={8} onChange={event => handleChange(event.target)} ref={passwordInput} className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="password" name="password" id="password" required />
										<div onClick={() => togglePasswordVisibility()} className='absolute cursor-pointer top-9 right-3'>
											{eyeState ? <EyeIcon className='w-5' /> : <EyeOffIcon className='w-5' />}
										</div>
									</div>
									<div className='flex items-center justify-between mt-8 sm:mx-6'>
										<button type='submit' className='p-2 px-4 w-full  bg-[#0277FA] rounded-md hover:bg-[#0276fad8] active:bg-[#0276fac9]'>Create account</button>
									</div>
									<div className='mt-6 text-center sm:mx-6'>
										<hr className='mb-4 border-gray-700' />
										<span className='text-sm text-gray-500'>Already have account? </span>
										<Link to='/login' className='text-sm text-[#0277FA] cursor-pointer'> Sign in</Link>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
