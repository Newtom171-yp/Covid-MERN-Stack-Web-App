import React, { useState, useEffect } from 'react'
import './InStyle.css';
const axios = require('axios');
export default function TotalDoc() {
    const [value, setValue] = useState([]);
    // const [inputField, setInputField] = useState({ date: '', stateX: '' });
    // const [loading, setLoading] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);
    console.log(isFirstTime);
    useEffect(() => {

        var data = '';
        var config = {
            method: 'get',
            url: `http://localhost:5500/getData/getTotal?state=${document.getElementById("state4").value}`,
            headers: {},
            data: data
        };
        console.log(config.url);
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
                <h1>Get Total Number of Cases and Deaths</h1>
                <label>
                    State:
                    <input type="text" id="state4" />
                </label>
                <br />
                <input value="Submit" type="submit" onClick={e => { submitHandler(e) }} />
            </div>
            {!isFirstTime && <div id='dataRender'>
                <table>
                    <thead>
                        <tr>
                            <th>Total Cases </th>
                            <th>Total Deaths </th>
                        </tr>
                    </thead>
                </table>
                
                    <p>

                        <table>
                            <tbody>
                                <tr>
                                    <td>{value.totalDeaths} </td>
                                    <td>{value.totalCases} </td>
                                </tr>
                            </tbody>
                        </table>
                    </p>
            </div>}
        </>
    )
}
