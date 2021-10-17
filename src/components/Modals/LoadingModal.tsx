import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const LoadingModal = ({ fallback = false }) => {
	const { isLoading } = useSelector((state: RootState) => state.app)
	let loading = fallback || isLoading
	return (
		<div className={`${loading ? 'flex' : 'hidden'} fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-md bg-[#181a21]`}>
			<div>
				<img className='w-48 mb-3' src="/images/Logo.svg" alt="" />
				<div className='loader'>
				</div>
			</div>
		</div>
	)
}

export default LoadingModal
