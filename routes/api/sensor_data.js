const express = require('express');
const router = express.Router();

const Sensor = require('../../models/SensorData');

router.get('/', (req, res) => {
	Sensor.find()
		.sort({ date: -1 })
		.then(data => res.json(data))
		.catch(err => res.status(404).json({ error: 'Nu exista date pentru senzor' }));
});

router.post('/temp', (req, res) => {
	const newData = new Sensor({
		value: req.body.value,
		type: 'temp'
	});

	newData.save().then(sensor => res.json(sensor));
});

router.post('/hum', (req, res) => {
	const newData = new Sensor({
		value: req.body.value,
		type: 'hum'
	});

	newData.save().then(sensor => res.json(sensor));
});

router.get('/temp', (req, res) => {
	Sensor.find({ type: 'temp' })
		.sort({ date: -1 })
		.then(s => res.json(s))
		.catch(err => res.status(404).json({ error: 'Nu exista date pentru senzor' }));
});
router.get('/hum', (req, res) => {
	Sensor.find({ type: 'hum' })
		.sort({ date: -1 })
		.then(s => res.json(s))
		.catch(err => res.status(404).json({ error: 'Nu exista date pentru senzor' }));
});

module.exports = router;
