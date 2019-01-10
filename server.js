const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');

const sensorData = require('./routes/api/sensor_data');
const buttonAPI = require('./routes/api/plug');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('db connected'))
	.catch(err => console.log(err));

app.use('/api/sensor', sensorData.router);
app.use('/api/plug', buttonAPI);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`server run on port ${port}`);
	startDeleteSchedule();
});

const startDeleteSchedule = () => {
	schedule.scheduleJob('0 0 * * *', sensorData.deleteOlder);
};
