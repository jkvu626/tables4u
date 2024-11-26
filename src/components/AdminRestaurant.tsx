'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import './components.css'

const AdminRestaurant: React.FC<{name: string; open: number; close: number; address: string}> = ({
  name, 
  address,
  open,
  close
 }) => {
  const router = useRouter(); // Use useRouter from next/navigation

  const makeReservation = () => {
    router.push('/make'); // Perform navigation to /make
  };

  const deleteRestaurant = () => {
    router.push('/delete');
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
