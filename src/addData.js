const mongoose = require("mongoose");
const express = require("express");
const {CovidData} = require('./conn');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const myuser = new CovidData(req.query);
        await myuser.save();
        console.log("user added \n");
        res.send('user added')
    }
    catch (err) {
        console.log("Inside error");
        res.send({ message: err })
    }
});

router.post('/updateData', async (req, res) => {
    try {
        console.log(req.body);
        await CovidData.updateOne({state: req.query.state, date: req.query.date},{state: req.query.state, date: req.query.date, cases: req.query.cases, deaths: req.query.deaths});
        res.send('user updated')
    }
    catch (err) {
        console.log("Inside error");
        res.send({ message: err })
    }
});
module.exports = router;