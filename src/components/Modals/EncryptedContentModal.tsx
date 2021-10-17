import React from 'react'
import { LockClosedIcon, FingerPrintIcon } from '@heroicons/react/outline'

const EncryptedContentModal = () => {
	return (
		<div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-md'>
			<div className='w-2/5 rounded-lg h-2/5'>
				<div className='text-center'>
					<LockClosedIcon className='w-20 m-auto text-white' />
					<h1 className='text-2xl font-semibold capitalize'>Encrypted content</h1>
					<h3 className='mt-1 text-sm text-gray-500'>Enter password to decrypt</h3>
					<div className='flex items-center justify-center mt-8'>
						<input className='w-3/5 h-12 pl-5 rounded-full bg-[#2A2C3E] outline-none focus:bg-[#2a2c3ee1]' type="text" />
						<button className='w-12 h-12 p-2 bg-[#0FAE0C] hover:bg-[#0d970a] active:bg-[#0b8a09] rounded-full ml-4'>
							<FingerPrintIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EncryptedContentModal
