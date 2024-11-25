'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

const Restaurant: React.FC<{name: string; date: string; address: string}> = ({
  name, 
  date,
  address
 }) => {
  const router = useRouter(); // Use useRouter from next/navigation

  const makeReservation = () => {
    router.push('/make'); // Perform navigation to /make
  };

  return (
    <div className="Restaurant">
      <label>{name}</label>
      <label>{date}</label>
      <label>{address}</label>
      <button onClick={makeReservation}>MAKE RESERVATION</button>
    </div>
  );
};

export default Restaurant;
