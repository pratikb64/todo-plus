const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

//Create new todo list
router.post("/create-todo-list", async (req, res) => {
  const { visibility, secret_code } = req.body;
  const list_id = uuidv4();
  const { user_id } = req.user;
  const date = new Date();

  await Todo.create({
    user_id,
    list_id,
    visibility,
    secret_code,
    date_created: date,
  });

  return res.json({ list_id: list_id });
});

//Add task in todo list
router.post("/add-task", async (req, res) => {
  const { task, list_id } = req.body;
  const { user_id } = req.user;

  const result = await Todo.find({ list_id: list_id.list_id });

  await Todo.updateOne(
    { list_id: list_id.list_id },
    { $push: { tasks: task } }
  );

  return res.json({ message: "Task saved!" });
});

//Remove task in todo list
router.post("/remove-task", async (req, res) => {
  const { task_id, list_id } = req.body;

  await Todo.updateOne(
    { list_id: list_id },
    { $pull: { tasks: { task_id: task_id } } }
  );

  return res.json({ message: "Task removed!" });
});

router.post("/update-task", async (req, res) => {
  const { task_id, list_id, text = null, done = null } = req.body;

  if (text)
    await Todo.updateOne(
      { list_id: list_id, "tasks.task_id": task_id },
      { $set: { "tasks.$.text": text } }
    );

  if (done)
    await Todo.updateOne(
      { list_id: list_id, "tasks.task_id": task_id },
      { $set: { "tasks.$.done": done === "true" } }
    );

  res.json({});
});

//Get todo list by list id
router.post("/get-todo-list", async (req, res) => {
  const { list_id } = req.body;

  const result = await Todo.find({ list_id: list_id });

  if (!result[0]) return res.status(404).json({ message: "List not found!" });

  if (result.visibility === "private")
    return res.status(403).json({ message: "Private tasks list!" });

  return res.json({ tasks_data: result[0] });
});

//Remove todo list by list id
router.post("/remove-todo-list", async (req, res) => {
  const { list_id } = req.body;
  const { user_id } = req.user;

  const result = await Todo.findOneAndDelete({ list_id: list_id, user_id });

  return res.json({ tasks_data: result[0] });
});

//Get all todo list of user by user id
router.get("/get-todo-lists", async (req, res) => {
  const { user_id } = req.user;

  const searchResult = await Todo.find(
    { user_id: user_id },
    {
      list_id: 1,
      user_id: 1,
      tasks: 1,
      visibility: 1,
      date_created: 1,
    }
  );
  return res.json({ task_lists: searchResult });
});

module.exports = router;
