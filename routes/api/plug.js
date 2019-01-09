const express = require('express');
const axios = require('axios');

const router = express.Router();

// router.get('/', (req, res) => {
// 	const action = req.query.action;
// 	const url = `https://maker.ifttt.com/trigger/${action}/with/key/y2IlWraEbQ7-Mp2tIZqzh`;
// 	console.log(url);
// 	axios.post(url);
// 	res.json({ message: 'success' });
// });

router.get('/state', (req, res) => {
	const url = 'https://eu-wap.tplinkcloud.com?token=b3197b43-B3v9RW7HCMn2L9crm3jYYwr';
	const systemAction = {
		system: {
			get_sysinfo: null
		}
	};

	const body = {
		method: 'passthrough',
		params: {
			deviceId: '80064661942C01EB5C94AE3640F19E061A074011',
			requestData: JSON.stringify(systemAction)
		}
	};

	axios
		.post(url, body)
		.then(resp => {
			console.log(resp.data);

			if (resp.data.error_code === 0) {
				const responseData = resp.data.result.responseData;
				const result = JSON.parse(responseData);
				console.log(responseData);
				console.log(result);
				res.json({ plug_state: result.system.get_sysinfo.relay_state });
			} else {
				res.status(400).json({ message: resp.data.msg });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(404).json({ message: err });
		});
});

router.get('/change_state', (req, res) => {
	const action = parseInt(req.query.action);
	const url = 'https://eu-wap.tplinkcloud.com?token=b3197b43-B3v9RW7HCMn2L9crm3jYYwr';
	console.log(url);

	const systemAction = {
		system: {
			set_relay_state: {
				state: action
			}
		}
	};

	const body = {
		method: 'passthrough',
		params: {
			deviceId: '80064661942C01EB5C94AE3640F19E061A074011',
			requestData: JSON.stringify(systemAction)
		}
	};

	console.log(body);

	axios
		.post(url, body)
		.then(resp => {
			console.log(resp.data);
			res.json({ message: 'success' });
		})
		.catch(err => {
			console.log(resp);
			res.status(404).json({ message: err });
		});
});

module.exports = router;
