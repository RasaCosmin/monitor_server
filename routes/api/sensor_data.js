const express = require('express');
const router = express.Router();

const Sensor = require('../../models/SensorData');

router.get('/', (req, res) => {
	Sensor.find()
		.sort({ date: -1 })
		.then(s => {
			const processed = s.map(it => {
				return processSensorData(it);
			});

			res.json(processed);
		})
		.catch(err => res.status(404).json({ error: 'Nu exista date pentru senzor' + err }));
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

router.post('/', (req, res) => {
	const newTemp = new Sensor({
		value: req.body.temp_value,
		type: 'temp'
	});

	const newHum = new Sensor({
		value: req.body.hum_value,
		type: 'hum'
	});

	newTemp.save().then(() => {
		newHum.save().then(() => {
			res.json({ message: 'success' });
		});
	});
});

router.get('/temp', (req, res) => {
	Sensor.find({ type: 'temp' })
		.sort({ date: -1 })
		.then(s => {
			const processed = s.map(it => {
				return processSensorData(it);
			});

			res.json(processed);
		})
		.catch(err => res.status(404).json({ error: 'Nu exista date pentru senzor' }));
});
router.get('/hum', (req, res) => {
	Sensor.find({ type: 'hum' })
		.sort({ date: -1 })
		.then(s => {
			const processed = s.map(it => {
				return processSensorData(it);
			});

			res.json(processed);
		})
		.catch(err => res.status(404).json({ error: 'Nu exista date pentru senzor' }));
});

const toTimestamp = str => {
	var data = Date.parse(str);
	return data / 1000;
};

const processSensorData = sensor => {
	return {
		id: sensor._id,
		type: sensor.type,
		value: sensor.value,
		timestamp: toTimestamp(sensor.date)
	};
};

const deleteOlder = () => {
	// Sensor.find()
	// 	.then(infos => {
	// 		console.log(infos.length);
	// 		const datas = infos.filter(it => it.date.getTime() < new Date().getTime() - 86400000);
	// 		console.log(datas.length);
	// 		datas.forEach(data => {
	// 			const id = data._id;
	// 			console.log(id);
	// 			Sensor.findByIdAndDelete(id, (err, resp) => {
	// 				if (err) {
	// 					console.log(err);
	// 				} else {
	// 					console.log(resp);
	// 				}
	// 			});
	// 		});
	// 	})
	// 	.catch(err => console.log(err));
	Sensor.deleteMany({}, (err, resp) => {
		if (err) {
			console.log(err);
		} else {
			console.log(resp);
		}
	});
};

module.exports = { router, deleteOlder };
