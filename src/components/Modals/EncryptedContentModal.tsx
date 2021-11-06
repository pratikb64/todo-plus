import React, { useRef } from 'react'
import { LockClosedIcon, FingerPrintIcon } from '@heroicons/react/outline'
import axios from 'axios'
import CONSTANTS from '../../configs/Constants'
import toast from 'react-hot-toast'

const EncryptedContentModal = ({ getTodoListWithCode, setIsPasswordProtected }) => {
	const code = useRef<HTMLInputElement>(null)

	const submitHandler = () => {
		const input = code.current.value
		getTodoListWithCode(input)
		setIsPasswordProtected(false)
	}

	return (
		<div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/60 backdrop-blur-md'>
			<div className='w-full rounded-lg md:w-3/5 lg:w-2/5 h-2/5'>
				<div className='text-center'>
					<LockClosedIcon className='w-20 m-auto text-white' />
					<h1 className='text-2xl font-semibold capitalize'>Encrypted content</h1>
					<h3 className='mt-1 text-sm text-gray-500'>Enter password to decrypt</h3>
					<div className='flex items-center justify-center mt-8'>
						<input autoFocus onKeyUp={event => event.key === 'Enter' && submitHandler()} className='w-3/5 h-12 px-5 rounded-full bg-[#2A2C3E] outline-none focus:bg-[#2a2c3ee1]' type="text" ref={code} />
						<button onClick={submitHandler} className='w-12 h-12 p-2 bg-[#0FAE0C] hover:bg-[#0d970a] active:bg-[#0b8a09] rounded-full ml-4'>
							<FingerPrintIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EncryptedContentModal
