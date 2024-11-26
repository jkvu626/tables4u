'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import './components.css'

const Restaurant: React.FC<{name: string; open: number; close: number; address: string}> = ({
  name, 
  address,
  open,
  close
 }) => {
  const router = useRouter(); // Use useRouter from next/navigation

  const makeReservation = () => {
    router.push('/make'); // Perform navigation to /make
  };

  return (
    <div className="restaurant">
      <div className="name-address">
        <label className="name">{name}</label>
        <label className="address">{address}</label>
      </div>
      <div className="hours">
        <label className="open">Open: {open}:00</label>
        <label className="close">Close: {close}:00</label>
      </div>
      <button onClick={makeReservation}>MAKE RESERVATION</button>
    </div>
  );
};

export default Restaurant;
