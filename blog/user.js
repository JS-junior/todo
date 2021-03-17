const mongoose = require("mongoose")

const user = mongoose.Schema({
	name: { type: String, required: true },
	password: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true, match: 
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ 
	},
	_id: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model("user", user)

	
