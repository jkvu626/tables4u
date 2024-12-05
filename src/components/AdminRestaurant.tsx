'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import './components.css'
import axios from 'axios';
import { useAuth } from './AuthProvider';

const instance = axios.create({
  baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
});

const AdminRestaurant: React.FC<{name: string; open: number; close: number; address: string; username: string; active: boolean; refresh: () => void}> = ({
  name, 
  address,
  open,
  close,
  username,
  active,
  refresh
 }) => {
  const [err, setErr] = React.useState('')
  const router = useRouter(); // Use useRouter from next/navigation



  const makeReservation = () => {
    router.push('/make'); // Perform navigation to /make
  };

  const { credential } = useAuth()
  
  const deleteRestaurant = () => {
    if(confirm("Are you sure you want to delete " + name + "?")){
      instance.post('/delete', {"credential":credential, "username":username}).then((response) => {
        const status = response.data.statusCode;
        if(status == 200){
          refresh()
        }else{
          setErr(response.data.error)
        }
      })
    }
  }

  const availReport = () => {
    console.log(username)
    router.push(`/report?username=${encodeURIComponent(username)}`);
  }

  // const deleteReservation = () => {
  //   router.push('/delete');
  // }

  return (
    <div className="adminrestaurant">
      <div className="info">
        <label style={{ fontWeight: 'bold' }} id='username'>{name}</label>
        <label style={active ? {color: 'green'} : {color: 'red'}}>{active ? 'Active' : 'Inactive'}</label>
        <label>{address}</label>
      </div>
      <div className="spacer"></div>
      <div className="timing">
        <label>Open: {open}:00</label>
        <label>Close: {close}:00</label>
      </div>
      <div className="spacer"></div>
  
      <div className="actions">
        <button onClick={makeReservation}>MAKE RESERVATION</button>
        <button>DELETE RESERVATION</button>
        <button onClick={deleteRestaurant}>DELETE RESTAURANT</button>
        <label className='error'>{err}</label>
      </div>
      <div className='spacer'></div>
      <div className='info'>
        <button onClick={availReport}>AVAILABILITY REPORT</button>
      </div>
    </div>
  );  
};

export default AdminRestaurant;
