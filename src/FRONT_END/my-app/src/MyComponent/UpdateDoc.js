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
            url: `http://localhost:5500/addData/updateData?date=${document.getElementById("date7").value}&state=${document.getElementById("state7").value}&cases=${document.getElementById("cases7").value}&deaths=${document.getElementById("deaths7").value}`,
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
                <h1>Update Data Here</h1>
                <label>
                    Pick Date:
                    <input type="text" id="date7" />
                </label>
                <br />
                <label>
                    Pick State:
                    <input type="text" id = "state7"/>
                </label>
                <br/>
                <label>
                    Update Cases:
                    <input type="text" id="cases7"/>
                </label>
                <br/>
                <label>
                    Update Deaths:
                    <input type="text" id="deaths7"/>
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
