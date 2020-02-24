const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Review = require("../models/review");
const Temple = require("../models/temple")

// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/', (req, res, next) => {
	Temple.find({}, (error, templesLocDB) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json({
				temples: templesLocDB
			});
		}
	});
});

// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
router.get('/:id', (req, res, next) => {
	let templeId = req.params.id;
	Temple.findOne({
		_id: templeId
	}, (error, oneTempeLocDB) => {
		if (error) {
			next(error)
		} else {
			res.status(200).json({
				temple: oneTempeLocDB
			});
		}
	});
});

module.exports = router;