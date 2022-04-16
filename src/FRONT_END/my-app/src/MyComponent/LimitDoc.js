import React, { useState, useEffect } from 'react'
import './InStyle.css';
const axios = require('axios');
export default function LimitDoc() {
    const [value, setValue] = useState([]);
    // const [inputField, setInputField] = useState({ date: '', stateX: '' });
    // const [loading, setLoading] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);
    console.log(isFirstTime);
    useEffect(() => {

        var data = '';
        var config = {
            method: 'get',
            url: `http://localhost:5500/getData/getLimit?cases=${document.getElementById("cases5").value}`,
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
                <h1>States where the cases are more than your input:</h1>
                <label>
                    Cases:
                    <input type="text" id="cases5" />
                </label>
                <br />
                
                <input value="Submit" type="submit" onClick={e => { submitHandler(e) }} />
            </div>
            {!isFirstTime && <div id='dataRender'>
                <table>
                    <thead>
                        <tr>
                            <th>State </th>
                            <th>Cases </th>
                            <th> Deaths </th>
                            <th> Date </th>
                        </tr>
                    </thead>
                </table>
                {value.map(v => (
                    <p>

                        <table>
                            <tbody>
                                <tr>
                                    <td>{v.state}  </td>
                                    <td>{v.cases} </td>
                                    <td>{v.deaths} </td>
                                    <td>{v.date} </td>
                                </tr>
                            </tbody>
                        </table>
                    </p>
                ))}
            </div>}
        </>
    )
}
