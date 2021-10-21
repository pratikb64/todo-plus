const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

router.post("/create-todo-list", async (req, res) => {
  const { visibility, secret_code } = req.body;
  const list_id = uuidv4();

  return res.json({ list_id: list_id });
});

router.post("/add-task", async (req, res) => {
  const { user_id, task, list_id } = req.body;
  console.log({ user_id, task });

  const result = await Todo.find({ list_id: list_id });

  /* await Todo.updateOne(
    { _id: ObjectId(list_id), user_id },
    { $push: { tasks: task } },
    { upsert: true }
  ); */

  return res.json({ message: "Task saved!" });
});

router.post("/get-todo-list", async (req, res) => {
  const { list_id } = req.body;

  const result = await Todo.find({ list_id: list_id });

  if (result.visibility === "private")
    return res.status(403).json({ message: "Private tasks list!" });

  return res.json({ tasks_data: result[0] });
});

module.exports = router;
