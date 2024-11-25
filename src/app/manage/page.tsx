'use client'
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';

const instance = axios.create({
    baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
  });


const Edit: React.FC = () => {
    const router = useRouter();
    const [err, setErr] = React.useState('');

    const [isActive, setIsActive] = React.useState(true)
    const [restaurant, setRestaurant] = React.useState(null);

    const getActive = () => {
        if (document.cookie) {
            instance.post('/restaurants', {"credential":document.cookie})
                .then(function (response) {
                    let status = response.data.statusCode
                    let active = response.data.restaurant.active
                    if (status == 200) {
                        if (active) {setIsActive(true)}
                        setRestaurant(response.data.restaurant)
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
    }

    const handleAvailability = () => {
        router.push('/availability');
    };

    const handleActivate = () => {
        if (document.cookie && restaurant) {
            instance.post('/activate', {"username":restaurant['name'], "credential":document.cookie})
                .then(function (response) {
                    let status = response.data.statusCode

                    if (status == 200) {
                        setRestaurant(response.data.restaurant)
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

    const Table: React.FC = () => (
        <div className="makeres">
            <label>Table X</label>
            <label>Seats: X</label>
            {!isActive && <button>REMOVE</button>}
        </div>
        );
        

    useEffect(() => {
        getActive();
    });

    return (
        <div className='content-create'>
        <div className='createbox'>
            <h2>{restaurant? restaurant['name'] : "Loading..."}</h2>
            {!isActive && <button onClick={handleActivate}>Activate</button>}
            {!isActive && <div className='createbox'>
                <InputField label = 'Seats:' placeholder='Number of Seats' id  = 'seats'/>
                <button>Add Table</button>
                <label className="error">{err}</label>
            </div>}
            <div className='createbox'>
                <Table/>
                <Table/>
            </div>
        </div>
        <div className='createbox'>
            <h2>Enter Date</h2>
            <InputField label = 'Date' placeholder=''/>
            <button>Open Day</button>
            <button>Close Day</button>
            <button onClick={handleAvailability}>View Availability</button>
        </div>
    </div>
    );
};

export default Edit;