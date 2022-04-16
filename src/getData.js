const mongoose = require("mongoose");
const express = require("express");
const {CovidData} = require('./conn');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('getting data', req.query);
    CovidData.find({state: req.query.state, date: req.query.date }, null, {limit: 20}).then(entry =>{
        console.log(entry)
        res.send(entry)
    }).catch(error=>{
        console.log(error.message)
    })
    
});
router.get('/getTotal', (req, res) => {
    console.log('getting data', req.query);
    CovidData.find({state: req.query.state }).then(entry =>{
        console.log(entry);
        var totalDeaths=0, totalCases=0;
        for (let i =0; i<entry.length; i++){
            totalDeaths+=entry[i].deaths;
            totalCases+=entry[i].cases;
        }
        var total = {totalDeaths, totalCases}
        res.send(total);
    }).catch(error=>{
        console.log(error.message)
    })
    
});
router.get('/getLimit', (req, res) => {
    console.log('getting data', req.query);
    CovidData.find({cases: {$gt:req.query.cases}}).then(entry =>{
        console.log(entry)
        res.send(entry.map(caseX=>{
            return {state: caseX.state,date: caseX.date, cases: caseX.cases, deaths: caseX.deaths}
        }))
    }).catch(error=>{
        console.log(error.message)
    })
    
});
module.exports = router;