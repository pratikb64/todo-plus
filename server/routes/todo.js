const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { v4: uuidv4 } = require("uuid");

const isEmpty = (variable) => {
  return variable === "" || variable === null || variable === undefined;
};

//Create new todo list
router.post("/create-todo-list", async (req, res) => {
  const { visibility, secret_code } = req.body;

  if (isEmpty(visibility))
    return res.status(400).json({ message: "'visibility' field is required" });

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

  if (isEmpty(task) || isEmpty(list_id))
    return res
      .status(400)
      .json({ message: "'list_id' and 'task' fields are required" });

  if (task.text.length > 128)
    return res
      .status(400)
      .json({ message: "task text cannot be more than 128 characters" });

  const task_id = uuidv4();

  const findRes = await Todo.find({ list_id: list_id, user_id });

  const updateRes = await Todo.updateOne(
    { list_id: list_id, user_id },
    { $push: { tasks: { ...task, task_id } } }
  );

  return res.json({ message: "Task saved!", task_id });
});

//Remove task in todo list
router.post("/remove-task", async (req, res) => {
  const { task_id, list_id } = req.body;
  const { user_id } = req.user;

  if (isEmpty(task_id) || isEmpty(list_id))
    return res
      .status(400)
      .json({ message: "'list_id' and 'task_id' fields are required" });

  await Todo.updateOne(
    { list_id: list_id, user_id },
    { $pull: { tasks: { task_id: task_id } } }
  );

  return res.json({ message: "Task removed!" });
});

router.post("/update-task", async (req, res) => {
  const { task_id, list_id, text = null, done = null } = req.body;
  const { user_id } = req.user;

  if (isEmpty(task_id) || isEmpty(list_id))
    return res
      .status(400)
      .json({ message: "'list_id' and 'task_id' fields are required" });

  if (text)
    if (text.length > 128)
      return res
        .status(400)
        .json({ message: "task text cannot be more than 128 characters" });

  if (text)
    await Todo.updateOne(
      { list_id: list_id, "tasks.task_id": task_id, user_id },
      { $set: { "tasks.$.text": text } }
    );

  if (done)
    await Todo.updateOne(
      { list_id: list_id, "tasks.task_id": task_id, user_id },
      { $set: { "tasks.$.done": done === "true" } }
    );

  res.json({ message: "Task updated!" });
});

//Get todo list by list id
router.post("/get-todo-list", async (req, res) => {
  const { list_id, secret_code } = req.body;
  const { user_id } = req.user;

  if (isEmpty(list_id))
    return res.status(400).json({ message: "'list_id' field is required" });

  const result = await Todo.find({ list_id: list_id });

  if (!result[0]) return res.status(404).json({ message: "List not found!" });

  if (result[0].visibility === "private" && result[0].user_id !== user_id)
    return res.status(403).json({ message: "Private tasks list!" });

  if (result[0].secret_code !== null && result[0].secret_code !== secret_code)
    return res.status(401).json({ message: "Password did not match!" });

  return res.json({ tasks_data: result[0] });
});

//Remove todo list by list id
router.post("/remove-todo-list", async (req, res) => {
  const { list_id } = req.body;
  const { user_id } = req.user;

  if (isEmpty(list_id))
    return res.status(400).json({ message: "'list_id' field is required" });

  const result = await Todo.findOneAndDelete({ list_id: list_id, user_id });

  return res.json({ message: "Todo list deleted!" });
});

//Update todo list by list id
router.post("/update-todo-list", async (req, res) => {
  const { list_id, visibility, secret_code } = req.body;
  const { user_id } = req.user;
  const code = secret_code === "" ? null : secret_code;

  if (isEmpty(list_id))
    return res.status(400).json({ message: "'list_id' field is required" });

  const result = await Todo.findOneAndUpdate(
    { list_id: list_id, user_id },
    { visibility, secret_code: code }
  );

  return res.json({ message: "Todo list updated!" });
});

//Get all todo list of user by user id
router.get("/get-todo-lists", async (req, res) => {
  const { user_id } = req.user;

  if (isEmpty(user_id))
    return res.status(400).json({ message: "'user_id' field is required" });

  const searchResult = await Todo.find(
    { user_id: user_id },
    {
      list_id: 1,
      user_id: 1,
      visibility: 1,
      date_created: 1,
      secret_code: 1,
    }
  );
  return res.json({ task_lists: searchResult });
});

module.exports = router;
