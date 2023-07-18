const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		trim: true},
	title: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50
	},
	amount: {
		type: Number,
		required: true,
		maxLength: 50,
		trim: true	
	},
	type: {
		type: String,
		default:"income"	
	},
	date: {
		type: Date,
		required: true,
		trim: true
	},
	category: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		maxLength: 200,
		trim: true
	},	
}, {timestamps:true})

module.exports = mongoose.model('Income', IncomeSchema)