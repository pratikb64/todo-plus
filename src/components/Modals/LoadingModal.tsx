import React from 'react'

const LoadingModal = () => {
	return (
		<div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-md bg-[#1a1c2b]'>
			<div>
				<img className='w-48 mb-2' src="/images/Logo.svg" alt="" />
				<div className='loader'>
				</div>
			</div>
		</div>
	)
}

export default LoadingModal
