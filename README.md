# Covid-MERN-Stack-Web-App

It is a basic MERN stack application which displays, edits and filters covid stats.

# **Project video link here:**
https://drive.google.com/file/d/1qxDAx6qd86n-NElcMvtt2BJwnUlx6J_l/view

## Introduction

The most famous four key technologies these days to build a complete web application are MongoDB, Express, React & NodeJS, popularly known as MERN stack. These four technologies are easily integrable with each other and generally used together. We’re provided with a covid data which have four attributes naming ‘date’, ‘state’, ‘cases’ and ‘deaths’. The covid data provides the information of covid number of deaths and cases reported in a particular state and on a particular date of USA. The aim of the project is to make an application which could query the information in a user friendly fashion with a defined frontend and backend architecture.  

## Project Plan

The plan of the project was done in the bottom up approach. The first step was to design the architecture and map it. All the backend tasks were done from the start and then it eventually came to rendering data on the designed user interface. Also to carry out the development, some tools and technologies were used to facilitate the development process:

* **MongoDB Compass:** Compass is the Graphic User Interface(GUI) for MongoDB. It makes it easy to visualize the data and perform operations in the database while having deeper knowledge of MongoDB terminal commands.
* **Visual Studio Code:** It is a widely used code editor and an IDE which allows us to code in any programming language. It comes in very handy as it also provides us with the facility of using various useful extensions.
* **Microsoft Excel:** It is a spreadsheet application used for organizing data and performing various calculations and statistical analysis over it.
* **Nodemon:** It is a command line interface utility which automatically runs and restarts our application and saves time in saving and running our application again and again after every change we perform in the code.

## Body

For making the API, query methods were used and the parameters in the API were passed in the URL.
Backend

### 1.1. Created a MongoDB Database naming ‘CollegeProject’ and inside that a collection naming ‘coviddatas’. 

![](/Appendix_Images/image4.png)

Used MongoDB compass and imported the CSV data into the collection using the import data command.

![](/Appendix_Images/image5.png)

### 1.2. Created schema and module for the database:

```js
const mongoose = require("mongoose");
 
const covid = new mongoose.Schema({
    date: String,
    state: String,
    cases: Number,
    deaths: Number
})
 
const CovidData = new mongoose.model("CovidData",covid);
 
exports.CovidData=CovidData;
```

### 1.3. Created a separate file for connection with MongoDB

```js
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
```

### 1.4. Added a Post method to add data using REST API

```js
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
 
module.exports = router;
```

### 1.5. Added another Post method to update data

```js
const mongoose = require("mongoose");
const express = require("express");
const {CovidData} = require('./conn');
const router = express.Router();
 
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
```

### 1.6. Created a separate endpoint file to delete data using POST method

```js
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
```

### 1.7. Added a get method to show total number of deaths and cases for a given state

```js
const mongoose = require("mongoose");
const express = require("express");
const {CovidData} = require('./conn');
const router = express.Router();
 
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

module.exports = router;
```

### 1.8.  Added the endpoint using get method to display the first 20 results for a given date and state.

```js
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
module.exports = router;
```

### 1.9. Added the endpoint using get method which shows those states which have a higher value of cases than the entered input.

```js
const mongoose = require("mongoose");
const express = require("express");
const {CovidData} = require('./conn');
const router = express.Router();
 
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
```

## Frontend

Created front end using Axios API

![](/Appendix_Images/image2.png)

```js
import './App.css';
import React from 'react';
import Frontget from "./MyComponent/Frontget";
import AddDoc from './MyComponent/AddDoc';
import TotalDoc from './MyComponent/TotalDoc';
import LimitDoc from './MyComponent/LimitDoc';
import DeleteDoc from "./MyComponent/DeleteDoc";
import UpdateDoc from "./MyComponent/UpdateDoc";
function App() {
 
  return (
    <div className="App">
      <Frontget/>
      <AddDoc/>
      <TotalDoc/>
      <LimitDoc/>
      <DeleteDoc/>
      <UpdateDoc/>
 
     
    </div>
  );
}
 
export default App;
```

### 2.1. Created Frontend to add data using Form and HTML elements

![](/Appendix_Images/image7.png)

![](/Appendix_Images/image9.png)

```js
import React, { useState, useEffect } from 'react'
import './InStyle.css';
const axios = require('axios');
export default function AddDoc() {
    const [value, setValue] = useState([]);
    const [isFirstTime, setIsFirstTime] = useState(true);
    console.log(isFirstTime);
    useEffect(() => {
 
        var data = '';
        var config = {
            method: 'post',
            url: `http://localhost:5500/addData?date=${document.getElementById("date2").value}&state=${document.getElementById("state2").value}&cases=${document.getElementById("cases2").value}&deaths=${document.getElementById("deaths2").value}`,
            headers: {},
            data: data
        };
 
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log("Data fetched successfully");
                setValue(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
        , [isFirstTime])
    function submitHandler(e) {
        console.log("In submit handler");
        setIsFirstTime(false);
    }
    return (
        <>
            <div>
                <h1>Add Data Here</h1>
                <label>
                    Add Date:
                    <input type="text" id="date2" />
                </label>
                <br />
                <label>
                    Add State:
                    <input type="text" id = "state2"/>
                </label>
                <br/>
                <label>
                    Add Cases:
                    <input type="text" id="cases2"/>
                </label>
                <br/>
                <label>
                    Add Deaths:
                    <input type="text" id="deaths2"/>
                </label>
                <br />
                <input value="Submit" type="submit" onClick={e => { submitHandler(e) }} />
            </div>
            {!isFirstTime && <div id='dataRender'>
                <p>{value}
                </p>        
            </div>}
        </>
    )
}
```

For the other task documents, the same code was manipulated by changing the API url and request method name.

### 2.2. Developed code for updating data using date and state as parameter to match the data to be updated

![](/Appendix_Images/image12.png)

![](/Appendix_Images/image3.png)

### 2.3. Developed User Interface to show the total number of deaths and cases for a given state.

![](/Appendix_Images/image8.png)

### 2.4. Developed User Interface to delete the document entered. 

![](/Appendix_Images/image11.png)

![](/Appendix_Images/image6.png)

### 2.5. Developed User Interface to get the first 20 documents for a given date and state.

![](/Appendix_Images/image1.png)

### 2.6. Developed the User Interface for showing the results where cases were more than the input value in a single day.

![](/Appendix_Images/image10.png)
