import React from 'react'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
	return (
		<div className='w-screen'>
			<div className='max-w-sm m-auto mt-20'>
				<img className='m-auto w-44' src="/images/Logo.svg" alt="logo" />
				<div className='w-11/12 m-auto mt-14'>
					<div className='mb-5 text-sm font-light'>Enter your email associated with your account to receive link to reset password</div>
					<span className='mb-2 text-sm font-semibold'>Email</span>
					<input className='w-full pl-3 mt-2 rounded-md h-9 bg-[#13151a] border border-gray-600/50' type="text" placeholder='john@doe.com' />
					<button className='p-2 mt-3 w-full px-4 bg-[#0277FA] rounded-md hover:bg-[#0276fad8] active:bg-[#0276fac9]'>Send password reset link</button>
				</div>
				<hr className='mt-10 mb-6 border-gray-700' />
				<div className='text-sm text-center'>
					Don't have account? <Link to='/register' className='text-[#0277FA]'>Sign up</Link>
				</div>
			</div>
		</div>
	)
}

export default ResetPassword
