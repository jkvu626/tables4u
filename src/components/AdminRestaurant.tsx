'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import './components.css'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
});

const AdminRestaurant: React.FC<{name: string; open: number; close: number; address: string; username: string; refresh: () => void}> = ({
  name, 
  address,
  open,
  close,
  username,
  refresh
 }) => {
  const [err, setErr] = React.useState('')
  const router = useRouter(); // Use useRouter from next/navigation

  const makeReservation = () => {
    router.push('/make'); // Perform navigation to /make
  };

  const deleteRestaurant = () => {
    if(confirm("Are you sure you want to delete " + name + "?")){
      instance.post('/delete', {"credential":document.cookie, "username":username}).then((response) => {
        const status = response.data.statusCode;
        if(status == 200){
          refresh()
        }else{
          setErr(response.data.error)
        }
      })
    }
  }

  // const deleteReservation = () => {
  //   router.push('/delete');
  // }

  return (
    <div className="adminrestaurant">
      <div className="info">
        <label style={{ fontWeight: 'bold' }}>{name}</label>
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
      </div>
    </div>
  );  
};

export default AdminRestaurant;
