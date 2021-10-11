const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	list_id: { type: String },
	user_id: { type: String },
	tasks: { type: Array },
	visibility: { type: String },
	date_created: { type: Date },
	secret_code: { type: String, default: null }
});

module.exports = mongoose.model("todo_lists", todoSchema);
