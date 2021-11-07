import React, { useEffect } from 'react'
import Prism from "prismjs";
import '../../prism.css'

const ApiCard = ({ data }) => {

	useEffect(() => {
		Prism.highlightAll();
	}, [])

	return (
		<div className='flex flex-col lg:flex-row'>
			<div className='w-full lg:w-1/2'>
				<div >
					<div className='text-xl'>{data.name}</div>
				</div>
				<hr className='my-4 border-gray-600' />
				<div className='flex items-center mt-2'>
					<div className='p-1 px-4 font-semibold text-white bg-blue-600 rounded-md' >{data.method}</div>
					<div className='p-1 px-4 ml-4 border-[1px] w-max border-gray-500 text-sm rounded-md bg-gray-700'>{data.path}</div>
				</div>
				<hr className='my-4 border-gray-600 lg:mr-4' />
				<div>
					{data.fields.map((field, i) => {
						return <div className='mt-6' key={i}>
							<div className='flex items-center' >
								<div className='text-lg '>{field.name}</div>
								<div className='p-1 px-2 border-[1px] w-max border-gray-500 rounded-md bg-gray-700 ml-4 text-sm'>{field.type}</div>
								<div className={`p-1 px-2 border-[1px] w-max border-gray-500 rounded-md ${field.required ? 'bg-red-600' : 'bg-yellow-600'} ml-4 text-sm`}>{field.required ? 'Required' : 'Optional'}</div>
							</div>
							<div className='flex mt-1'>
								<div className='text-gray-500'>example:</div>
								<div className='ml-4 text-gray-300'>{field.example}</div>
							</div>
						</div>
					})}
				</div>
			</div>
			<div className='w-full mt-4 lg:w-1/2 lg:mt-0'>
				<div className='text-xl text-gray-400'>Response</div>
				<hr className='my-4 border-gray-600' />
				<pre>
					<code className="language-javascript">
						{data.response}
					</code>
				</pre>
			</div >
		</div >
	)
}

export default ApiCard
