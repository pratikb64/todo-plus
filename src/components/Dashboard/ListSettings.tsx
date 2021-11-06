import React, { useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'
import axios from 'axios'
import CONSTANTS from '../../configs/Constants'

const ListSettings = ({ setSettingsState, list_id, visibility, secret_code }) => {

	const [formInputs, setFormInputs] = useState({
		visibility: visibility,
		secret_code: secret_code
	});

	const saveHandler = () => {

		const loading = toast.loading('Updating settings!')
		axios({
			url: CONSTANTS.BASE_URL + "/v1/todo/update-todo-list",
			method: "POST",
			withCredentials: true,
			data: { ...formInputs, list_id }
		})
			.then((d) => {
				toast.success('Settings updated!', { id: loading })
			})
			.catch(er => toast.error(er, { id: loading }))
		setSettingsState(false)
	}

	const changeHandler = event => {
		switch (event.target.name) {
			case 'visibility':
				setFormInputs({ ...formInputs, visibility: event.target.value })
				break;

			case 'secret_code':
				setFormInputs({ ...formInputs, secret_code: event.target.value })
				break;

			default:
				break;
		}
	}

	return (
		<div className='fixed top-0 left-0 z-10 w-full h-full backdrop-blur-sm'>
			<div onClick={() => setSettingsState(false)} className='absolute w-full h-full'></div>
			<div className='absolute cursor-default w-11/12  max-w-md transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#2A2C3E] left-1/2 top-1/2'>
				<XIcon onClick={() => setSettingsState(false)} className='absolute w-6 text-gray-400 cursor-pointer top-3 right-3' />
				<div className='mt-2 text-2xl text-center text-gray-50'>
					List Settings
				</div>
				<hr className='m-2 border-gray-500' />
				<div className='p-2 px-6 my-4'>
					<div className='flex mb-6'>
						<label htmlFor='visibility' className='w-1/2 text-lg'>Visibility</label>
						<div className='w-1/2'>
							<select value={formInputs.visibility} onChange={event => changeHandler(event)} className='w-full p-1 text-black rounded-lg' name="visibility" id="visibility">
								<option value="public">Public</option>
								<option value="private">Private</option>
							</select>
						</div>
					</div>
					<div className='mb-6 '>
						<div className='flex'>
							<label htmlFor='secret_code' className='w-1/2 text-lg'>Password</label>
							<div className='w-1/2'><input value={formInputs.secret_code || ''} onChange={event => changeHandler(event)} className='w-full p-1 pl-2 text-black rounded-lg' type="text" name='secret_code' id='secret_code' /></div>
						</div>
						<div className='mt-2 text-sm text-gray-400'>(Keep it empty to remove password protection)</div>
					</div>
					<div className='flex w-full mt-4'>
						<button onClick={saveHandler} className='py-2 m-auto bg-blue-600 rounded-lg px-14 hover:bg-blue-700 active:bg-blue-800'>Save</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListSettings
