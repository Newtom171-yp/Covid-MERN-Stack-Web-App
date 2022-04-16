import React, { useState, useEffect } from 'react'
import './InStyle.css';
const axios = require('axios');
export default function AddDoc() {
    const [value, setValue] = useState([]);
    // const [inputField, setInputField] = useState({ date: '', stateX: '', cases: '', deaths: '' });
    // const [loading, setLoading] = useState(false);
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
        // console.log(inputField);
        // setLoading(!loading);
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
