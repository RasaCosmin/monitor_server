const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
	const action = req.query.action;
	const url = `https://maker.ifttt.com/trigger/${action}/with/key/y2IlWraEbQ7-Mp2tIZqzh`;
	console.log(url);
	axios.post(url);
	res.json({ message: 'success' });
});

module.exports = router;
