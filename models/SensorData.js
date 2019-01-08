const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SensorSchema = new Schema({
	value: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Sensor = mongoose.model('sensors', SensorSchema);
