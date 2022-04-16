const mongoose = require("mongoose");
const express = require("express");
const {CovidData} = require('./conn');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.query);
        await CovidData.deleteOne({state: req.query.state, date: req.query.date});
        res.send('user deleted')
    }
    catch (err) {
        console.log("Inside error");
        res.send({ message: err })
    }
});
module.exports = router;