import React from 'react'
import { ApiCard, Navbar } from '../components'

const ApiDocs = () => {
	const doc = [
		{
			name: 'Create todo list',
			path: '/create-todo-list',
			method: 'POST',
			fields: [
				{
					name: 'visibility',
					type: 'String',
					example: '"private" or "public"',
					required: true
				},
				{
					name: 'secret_code',
					type: 'String',
					example: 'abc123',
					required: false
				}
			],
			response:
				`{
	list_id : "abcdefghi"
}`
		},
		{
			name: 'Get a todo list',
			path: '/get-todo-list',
			method: 'POST',
			fields: [
				{
					name: 'list_id',
					type: 'String',
					example: '9e2b986f-2cf9-47f2-b0a4-e17be81169ba',
					required: true
				},
				{
					name: 'secret_code',
					type: 'String',
					example: 'abc123',
					required: false
				}
			],
			response:
				`{
    "tasks_data": {
        "_id": "61751824522859161f29b173",
        "list_id": "9e2b986f-2cf9-47f2-b0a4-e17be81169ba",
        "user_id": "615f168ed1c196f6b2c4ec37",
        "tasks": [
            {
                "task_id": "9e9af89a-ccea-4bce-a1a5-c85d7344b31a",
                "text": "sfdaw",
                "done": true
            }
        ],
        "visibility": "private",
        "date_created": "2021-10-24T08:24:04.367Z",
        "secret_code": "asdaa",
    }
}`
		},
		{
			name: 'Remove a todo list',
			path: '/remove-todo-list',
			method: 'POST',
			fields: [
				{
					name: 'list_id',
					type: 'String',
					example: '9e2b986f-2cf9-47f2-b0a4-e17be81169ba',
					required: true
				}
			],
			response:
				`{
    message: 'Todo list deleted!'
}`
		},
		{
			name: 'Update a todo list',
			path: '/update-todo-list',
			method: 'POST',
			fields: [
				{
					name: 'list_id',
					type: 'String',
					example: '9e2b986f-2cf9-47f2-b0a4-e17be81169ba',
					required: true
				},
				{
					name: 'visibility',
					type: 'String',
					example: '"private" or "public"',
					required: false
				},
				{
					name: 'secret_code',
					type: 'String',
					example: 'abc123',
					required: false
				}
			],
			response:
				`{
    message: "Todo list updated!"
}`
		},
		{
			name: 'Get all todo list',
			path: '/get-todo-lists',
			method: 'POST',
			fields: [
				{
					name: 'user_id',
					type: 'String',
					example: '5adw5f6f-2cf9-47f2-b0a4-e17be81169ba',
					required: true
				},
			],
			response:
				`{
    "task_lists": [
        {
            "_id": "61751824522859161f29b173",
            "list_id": "9e2b986f-2cf9-47f2-b0a4-e17be81169ba",
            "user_id": "615f168ed1c196f6b2c4ec37",
            "visibility": "private",
            "date_created": "2021-10-24T08:24:04.367Z",
            "secret_code": "asda"
        },
        {
            "_id": "617830712752c38d3a206dfb",
            "list_id": "8669f0b7-9ade-4ad1-90d7-4b52087ff69b",
            "user_id": "615f168ed1c196f6b2c4ec37",
            "visibility": "public",
            "date_created": "2021-10-26T16:44:33.283Z",
            "secret_code": "asd"
        }
    ]
}`
		},
		{
			name: 'Add task in todo list',
			path: '/add-task',
			method: 'POST',
			fields: [
				{
					name: 'task',
					type: 'Object',
					example: `{"task" : { "task_id" : "b29572c5-8665-4aaf-8579-49894ad3df69" , "text" : "das" , "done" : false } , "list_id" : "9e2b986f-2cf9-47f2-b0a4-e17be81169ba" }`,
					required: true
				},
				{
					name: 'list_id',
					type: 'String',
					example: '9e2b986f-2cf9-47f2-b0a4-e17be81169ba',
					required: true
				}
			],
			response:
				`{
    "message": "Task saved!",
    "task_id": "2d7aaac8-014c-47b0-af04-67ff048500f6"
}`
		},
		{
			name: 'Remove task from todo list',
			path: '/remove-task',
			method: 'POST',
			fields: [
				{
					name: 'task_id',
					type: 'String',
					example: '9e2b986f-2cf9-47f2-b0a4-e17be81169b',
					required: true
				},
				{
					name: 'list_id',
					type: 'String',
					example: '9e2b986f-2cf9-47f2-b0a4-e17be81169ba',
					required: true
				}
			],
			response:
				`{
    message: "Task removed!"
}`
		},
		{
			name: 'Update task in todo list',
			path: '/update-task',
			method: 'POST',
			fields: [
				{
					name: 'task_id',
					type: 'String',
					example: '9e2b986f-2cf9-47f2-b0a4-e17be81169b',
					required: true
				},
				{
					name: 'list_id',
					type: 'String',
					example: '9e2b986f-2cf9-47f2-b0a4-e17be81169ba',
					required: true
				},
				{
					name: 'text',
					type: 'String',
					example: '9e2b986f-2cf9-47f2-b0a4-e17be81169ba',
					required: false
				},
				{
					name: 'done',
					type: 'Boolean',
					example: '"true" or "false"',
					required: false
				}
			],
			response:
				`{
    message: "Task updated!"
}`
		},
	]

	return (
		<div className='m-auto max-w-[90vw] xl:max-w-7xl'>
			<Navbar />
			<div className='max-w-4xl m-auto mt-10'>
				<div className='text-3xl text-center'>
					API Documentation
				</div>
				<hr className='my-4 border-gray-600' />
				<div className='mt-4'>
					Base url : <i>https://todopluss.herokuapp.com</i> <br />
					To make API calls add <span className='font-semibold'>'token'</span> as header and your API key as value in your request headers.
				</div>
				{doc.map((data, i) => {
					return <div className='mb-10' key={i}>
						<hr className='my-4 border-gray-600' />
						<ApiCard data={data} />
					</div>
				})}
			</div>
		</div>
	)
}

export default ApiDocs
