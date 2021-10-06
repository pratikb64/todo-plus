const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	user_id: { type: String },
	tasks: { type: Array },
	visibility: { type: String },
	date_created: { type: Date },
	secret_code: { type: String }
});

module.exports = mongoose.model("todo", todoSchema);
