const mongoose = require("mongoose");

const covid = new mongoose.Schema({
    date: String,
    state: String,
    cases: Number,
    deaths: Number
})

const CovidData = new mongoose.model("CovidData",covid);


const createDocument = async () => {
    try{
        const newData = new CovidData({
            date: "23-2-2020",
            state: "Washington",
            cases: 1000,
            deaths: 1000
        })
        
        const result =  await newData.save();
        console.log(result);
    }catch(err){
        console.log(err);
    }
    

}

// createDocument();
const getDocument = async () => {
    try{
        const result = await CovidData.find({state : "Washington", cases: 50000});
        console.log(result);
    }catch(err){
        console.log(err);
    }
    
}
// getDocument();
exports.CovidData=CovidData;