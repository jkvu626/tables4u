'use client'
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import Table from '@/components/Table';

const instance = axios.create({
    baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
  });

const Edit: React.FC = () => {
    const router = useRouter();
    const [err, setErr] = React.useState('');
    const [restname, setRestName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [tables, setTables] = React.useState([]);

    React.useEffect(() => {
        instance.post("/restaurants", {"credential": document.cookie})
        .then(function (response){
            const status = response.data.statusCode;
            if (status == 200) {
                const restaurant = response.data.restaurant;
                if (restaurant && restaurant.name) {
                    setRestName(restaurant.name);
                    setUsername(restaurant.username);
                    setAddress(restaurant.address);
                } else {
                    setErr("Restaurant not found")
                }
            } else {
                setErr("Error fetching restaurant details.")
            }
        })
        .catch((err) => {
            setErr("Error: " + err.message);
        })
    }, [username]);

    React.useEffect(() => {
        instance.post("/tables_get", {username: username})
        .then(function (response){
            console.log(response.data.tables)
            const status = response.data.statusCode;
            if (status == 200) {
                setTables(Object.values(response.data.tables))
            } else {
                console.log(response.data.err)
                console.log("TABLE ERROR")
                setTables([])
            }
        })
    }, [username])

    React.useEffect(() => {
        if (username) {
            console.log("USERNAME SET TO: " + username);
        }
    }, [username]);  // This runs whenever `username` changes

    const handleAvailability = () => {
        router.push('/availability');
    };

    const handleAddTable = () => {
        const seats = document.getElementById('seats') as HTMLInputElement
        const tid = document.getElementById('tid') as HTMLInputElement

        if (seats.value != '' && tid.value != '') {
            instance.post('/addtable'   , {
                username: username,
                tid: tid.value,
                seats: seats.value
            }).then(function (response) {
                const status =  response.data.statusCode;
                if (status == 200) {
                    setErr('')
                    setTables(Object.values(response.data.tables))
                    console.log("TABLE ADDED")
                } else {
                    setErr(response.data.error)
                }
            })
        } else {
            setErr("Fields not filled out")
        }
    }

    const handleEdit = () => {
        const rename = document.getElementById('name') as HTMLInputElement

        if (rename.value != '' && username != '') {
            instance.post('/edit', {
                name: rename.value,
                username: username
            }).then(function (response) {
                const status = response.data.statusCode;
                if (status == 200) {
                    setRestName(rename.value)
                } else {
                    setErr(response.data.error)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made, and the server responded with a status code outside the 2xx range
                    console.error("API responded with an error:");
                    console.error("Status code:", error.response.status);
                    console.error("Response data:", error.response.data);
                    console.error("Headers:", error.response.headers);
                
                    setErr(`API error (${error.response.status}): ${error.response.data.message || 'Unknown error'}`);
                  } else if (error.request) {
                    // The request was made, but no response was received
                    console.error("No response received from API:");
                    console.error("Request details:", error.request);
                
                    setErr('No response from server. Please try again later.');
                  } else {
                    // Something happened in setting up the request that triggered an error
                    console.error("Error setting up the API request:");
                    console.error("Message:", error.message);
                
                    setErr('Error setting up request: ' + error.message);
                  }
                
                  console.error("Full error object for debugging:", error); // Log the full error object
            }) 
        } else {
            setErr('Fields empty')
        }
    }

    const handleActivate = () => {
        if (username && document.cookie) {
            instance.post('/activate', {"username":username, "credential":document.cookie})
                .then(function (response) {
                    let status = response.data.statusCode
                    let restaurant = response.data.body

                    console.log(restaurant)

                    if (status == 200) {
                        router.push('/active')
                    } else {
                        setErr(response.data.error)
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made, and the server responded with a status code outside the 2xx range
                        console.error("API responded with an error:");
                        console.error("Status code:", error.response.status);
                        console.error("Response data:", error.response.data);
                        console.error("Headers:", error.response.headers);
                    
                        setErr(`API error (${error.response.status}): ${error.response.data.message || 'Unknown error'}`);
                }})
        }
    };

    return (
        <div className='content-create'>
        <div className='createbox'>
            <h2>{restname}</h2>
            <label>{address}</label>
            <button onClick={handleActivate}>Activate</button>
            <div className='createbox'>
            <InputField label = 'Table ID:' placeholder='' id  = 'tid'/>
                <InputField label = 'Seats:' placeholder='Number of Seats' id  = 'seats'/>
                <button onClick={handleAddTable}>Add Table</button>
                <label className="error">{err}</label>
            </div>
            <div className='createbox'>
                {tables?.map(({tableid, seats}) => (
                    <Table
                    key={tableid}
                    tableid={tableid}
                    seats={seats}
                    /> 
                ))}
            </div>
        </div>
        <div className='createbox'>
            <h2>Edit Restaurant Details</h2>
            <InputField label = 'Name ' placeholder='' id='name'/>
            <InputField label = 'Address ' placeholder=''/>
            <InputField label = 'Open ' placeholder=''/>
            <InputField label = 'Close ' placeholder=''/>
            <button onClick={handleEdit}>Make Changes</button>
        </div>
    </div>
    );
};

export default Edit;