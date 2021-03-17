const mongoose = require("mongoose")

const model = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { type: String, required: true },
	content: { type: String, required: true },
	image: { type: String, required: true }
})

module.exports = mongoose.model("blog", model)
