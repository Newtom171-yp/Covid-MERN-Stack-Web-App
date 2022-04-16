const covidModel = require("./conn");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
//const bodyParser = require('body-parser')
const addData = require("./addData");
const deleteData = require("./deleteData");
const getData = require("./getData");
const { MongoClient } = require("mongodb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/addData", addData);
app.use("/deleteData", deleteData);
app.use("/getData",getData);

mongoose.connect("mongodb://localhost:27017/CollegeProject", {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> console.log("connection successfull...."))
.catch((err)=> console.log(err));

app.listen(5500, () => {
    console.log("Server up");
});

app.use(express.static("public"));
