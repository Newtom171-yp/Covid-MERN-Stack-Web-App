import React, { useState, useEffect } from 'react'
import './InStyle.css';
const axios = require('axios');
export default function Frontget() {
    const [value, setValue] = useState([]);
    // const [inputField, setInputField] = useState({ date: '', stateX: '' });
    // const [loading, setLoading] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);
    console.log(isFirstTime);
    useEffect(() => {

        var data = '';
        var config = {
            method: 'post',
            url: `http://localhost:5500/deleteData?date=${document.getElementById("date6").value}&state=${document.getElementById("state6").value}`,
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
                <h1>Delete Document</h1>
                <label>
                    Date:
                    <input type="text" id="date6" />
                </label>
                <br />
                <label>
                    State:
                    <input type="text" id="state6" />
                </label>
                <br />
                <input value="Submit" type="submit" onClick={e => { submitHandler(e) }} />
            </div>
            {!isFirstTime && <div id='dataRender'>
                {value}
                {/* <table>
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
                ))} */}
            </div>}
        </>
    )
}
