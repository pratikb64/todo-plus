const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo')
const { ObjectId } = require('mongodb')

router.post('/create-todo-list', async (req, res) => {
	const { user_id } = req.body

	console.log({ user_id })

	return res.json({ message: "Task list created!" })
})

router.post('/add-task', async (req, res) => {
	const { user_id, task, list_id } = req.body
	console.log({ user_id, task })

	await Todo.updateOne({ _id: ObjectId(list_id) }, { $push: { tasks: task } }, { upsert: true })

	return res.json({ message: "Task saved!" })
})

router.post('/get-todo-list', async (req, res) => {
	const { list_id } = req.body

	const result = await Todo.find({ list_id: list_id })

	return res.json({ result })
})

module.exports = router;
