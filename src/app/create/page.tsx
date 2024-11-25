'use client';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';

// Axios instance with base URL
const instance = axios.create({
  baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
});

const Create: React.FC = () => {
  const router = useRouter();
  const [err, setErr] = React.useState('');

  const handleCreate = () => {
    console.log("HandleCreate function invoked."); // Debug: Log function call

    // Fetching input fields
    const inputs = [
      document.getElementById('name') as HTMLInputElement,
      document.getElementById('address') as HTMLInputElement,
      document.getElementById('open') as HTMLInputElement,
      document.getElementById('close') as HTMLInputElement,
      document.getElementById('username') as HTMLInputElement,
      document.getElementById('password') as HTMLInputElement,
      document.getElementById('confirm') as HTMLInputElement,
    ];

    const allFilled = inputs.every((input) => input.value.trim() !== '');
    console.log("All inputs filled:", allFilled); // Debug: Log input validation check

    if (!allFilled) {
      console.warn("Validation failed: Not all fields are filled."); // Debug: Log failed validation
      alert('All fields must be filled out!');
      return;
    } else if (inputs[5].value !== inputs[6].value) {
      console.warn("Validation failed: Passwords do not match."); // Debug: Log failed password validation
      alert('Passwords do not match');
      return;
    } else {
      console.log("Validation successful. Sending POST request to API."); // Debug: Log successful validation
      instance
        .post('/create', {
          username: inputs[4].value,
          name: inputs[0].value,
          address: inputs[1].value,
          open: parseInt(inputs[2].value, 10),
          close: parseInt(inputs[3].value, 10),
          password: inputs[5].value,
        })
        .then(function (response) {
          console.log("API response received:", response.data); // Debug: Log API response

          const status = response.data.statusCode;
          if (status === 200) {
            console.log("Restaurant created successfully. Redirecting to /edit."); // Debug: Log successful creation
            document.cookie = response.data.credential;
            router.push('/edit');
          } else {
            console.warn("Error from API:", response.data.error); // Debug: Log API error
            setErr(response.data.error);
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
        });
        
    }
  };

  return (
    <div className="content-create">
      <div className="createbox">
        <h2>Create your Restaurant</h2>
        <InputField id="name" label="Name " placeholder="" />
        <InputField id="address" label="Address " placeholder="" />
        <div className="createbox">
          <InputField id="open" label="Open Time " placeholder="00:00 - 23:00" />
          <InputField id="close" label="Close Time " placeholder="00:00 - 23:00" />
          <button onClick={handleCreate}>Create Restaurant</button>
          <label className="error">{err}</label>
        </div>
      </div>
      <div className="createbox">
        <h2>Set Credentials</h2>
        <InputField id="username" label="Username " placeholder="" />
        <InputField id="password" label="Password " placeholder="" type="password" />
        <InputField id="confirm" label="Confirm Password " placeholder="" type="password" />
      </div>
    </div>
  );
};

export default Create;
