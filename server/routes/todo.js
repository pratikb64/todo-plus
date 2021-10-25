const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

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

router.post("/add-task", async (req, res) => {
  const { task, list_id } = req.body;
  const { user_id } = req.user;

  console.log({ task });

  /*const result = await Todo.find({ list_id: list_id });
  
  await Todo.updateOne(
    { _id: ObjectId(list_id), user_id },
    { $push: { tasks: task } },
    { upsert: true }
  ); */

  return res.json({ message: "Task saved!" });
});

router.post("/get-todo-list", async (req, res) => {
  const { list_id } = req.body;

  const result = await Todo.find({ list_id: list_id });

  if (!result[0]) return res.status(404).json({ message: "List not found!" });

  if (result.visibility === "private")
    return res.status(403).json({ message: "Private tasks list!" });

  return res.json({ tasks_data: result[0] });
});

router.post("/remove-todo-list", async (req, res) => {
  const { list_id } = req.body;
  const { user_id } = req.user;

  const result = await Todo.findOneAndDelete({ list_id: list_id, user_id });

  return res.json({ tasks_data: result[0] });
});

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
