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
      <label>{name}</label>
      <label>{address}</label>
      <label>{open}</label>
      <label>{close}</label>
      <button onClick={makeReservation}>MAKE RESERVATION</button>
    </div>
  );
};

export default Restaurant;
