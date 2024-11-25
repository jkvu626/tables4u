'use client'
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';

const instance = axios.create({
    baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
  });


const Table: React.FC = () => (
<div className="makeres">
    <label>Table X</label>
    <label>Seats: X</label>
    <button>REMOVE</button>
</div>
);

const Edit: React.FC = () => {
    const router = useRouter();
    const [err, setErr] = React.useState('');

    const handleAvailability = () => {
        router.push('/availability');
    };

    const handleActivate = () => {
        const rename = document.getElementById('name') as HTMLInputElement
        const user = document.getElementById('user') as HTMLInputElement

        console.log(rename.value)
        console.log(user.value)

        if (rename.value != '' && user.value != '') {
            instance.post('/edit', {
                name: rename.value,
                username: user.value
            }).then(function (response) {
                const status = response.data.statusCode;
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
    };

    return (
        <div className='content-create'>
        <div className='createbox'>
            <h2>Restaurant Name</h2>
            <InputField label ='Name:' placeholder='' id  ='name'/>
            <InputField label ='User:' placeholder='' id  ='user'/>
            <button onClick={handleActivate}>Activate</button>
            <div className='createbox'>
                <InputField label = 'Seats:' placeholder='Number of Seats' id  = 'seats'/>
                <button>Add Table</button>
                <label className="error">{err}</label>
            </div>
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